/**
 * sound.ts — Web Audio API sound layer
 * Lazy-initialises an AudioContext on first call (respects browser
 * autoplay policies that require a prior user gesture).
 *
 * Exposed as window.__playSound for use from Astro <script> tags.
 */

type SoundType = 'click' | 'toggle' | 'open';

let ctx: AudioContext | null = null;

function getCtx(): AudioContext {
  if (!ctx) {
    ctx = new AudioContext();
  }
  if (ctx.state === 'suspended') {
    ctx.resume();
  }
  return ctx;
}

function ramp(
  gain: GainNode,
  audioCtx: AudioContext,
  startVal: number,
  endVal: number,
  duration: number,
) {
  const now = audioCtx.currentTime;
  gain.gain.setValueAtTime(startVal, now);
  gain.gain.exponentialRampToValueAtTime(
    Math.max(endVal, 0.0001),
    now + duration,
  );
}

export function playSound(type: SoundType): void {
  // Check if sound is enabled
  if (typeof window !== 'undefined' && !(window as any).soundEnabled?.()) {
    return;
  }

  try {
    const audioCtx = getCtx();
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.connect(gain);
    gain.connect(audioCtx.destination);

    const now = audioCtx.currentTime;

    switch (type) {
      case 'click': {
        // 800 Hz sine, 20 ms — sharp, soft click
        osc.type = 'sine';
        osc.frequency.setValueAtTime(800, now);
        gain.gain.setValueAtTime(0.12, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.02);
        osc.start(now);
        osc.stop(now + 0.02);
        break;
      }
      case 'toggle': {
        // 600 → 900 Hz glide, 30 ms — rising confirmation tone
        osc.type = 'sine';
        osc.frequency.setValueAtTime(600, now);
        osc.frequency.linearRampToValueAtTime(900, now + 0.03);
        ramp(gain, audioCtx, 0.1, 0.0001, 0.03);
        osc.start(now);
        osc.stop(now + 0.03);
        break;
      }
      case 'open': {
        // 400 Hz triangle, 40 ms — soft hollow pop
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(400, now);
        ramp(gain, audioCtx, 0.08, 0.0001, 0.04);
        osc.start(now);
        osc.stop(now + 0.04);
        break;
      }
    }
  } catch {
    // AudioContext may be unavailable (e.g. SSR, headless browsers) — fail silently
  }
}

// Expose on window for use in Astro inline <script> tags
if (typeof window !== 'undefined') {
  (window as unknown as Record<string, unknown>).__playSound = playSound;
}
