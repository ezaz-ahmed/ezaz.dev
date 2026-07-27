/*
  Shared chrome for every form control. Lives outside the components so an
  input, a select, and a textarea line up pixel-for-pixel — each component
  appends only what is specific to its own element.
*/
export const controlClass =
  'border-line bg-paper-raised text-ink placeholder:text-ink-soft/60 focus:border-accent w-full rounded-[3px] border-[1.5px] px-3 py-2.5 font-mono text-[14px] outline-none transition-colors';

/**
 * Feeds --tone on .lang-seg / .lang-dot: steps each language down a single
 * accent ramp, so the theme flip is free and there are no extra hues to keep in
 * sync. Shared by the profile bar and the per-repo one.
 */
export const langTone = (index: number) => `${Math.max(12, 92 - index * 22)}%`;
