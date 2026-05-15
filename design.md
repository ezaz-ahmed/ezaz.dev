# ezaz.dev Design Specification

## 1. Product Identity

- Brand name: ezaz.dev
- Owner: Ezaz Ahmed
- Core blurb: Fast, minimal engineering blog and portfolio by Ezaz Ahmed.
- Design system name: Tactile Digital
- Design direction: Low-Contrast Minimalist

## 2. Design Intent

The experience should feel precise, calm, and intentional.

- Prioritize readability and rhythm over decorative complexity.
- Keep interfaces minimal but not sterile.
- Use motion to confirm interaction, not distract from content.
- Preserve a crafted editorial atmosphere across pages.

## 3. Visual Language

### 3.1 Color Strategy

- Light background: #F5F5F7
- Light surface: #FFFFFF
- Dark background: #0E1111
- Dark surface: #161B22
- Accent gradient (light): #6366F1 -> #A855F7
- Accent gradient (dark): #818CF8 -> #C084FC

Rules:

- Avoid pure black and pure white for large surfaces.
- Keep contrast comfortable for long-form reading.
- Apply accent color mostly for hierarchy and interaction cues.

### 3.2 Typography

- Heading font: Plus Jakarta Sans Variable
- Body font: DM Sans Variable
- Monospace font: JetBrains Mono Variable

Rules:

- Headings: compact line-height, strong weight, tight tracking.
- Body: stable line-height (~1.7 to 1.75) and moderate measure.
- Code: mono family for clear differentiation in technical content.

### 3.3 Layout

- Canvas max width: 56rem
- Canvas horizontal padding: 2rem
- Top canvas spacing: 120px

Rules:

- Keep content centered with generous breathing room.
- Maintain consistent vertical spacing between sections.
- Prefer predictable column systems over complex asymmetry.

## 4. Interaction Behavior

### 4.1 Motion

- Spring easing: cubic-bezier(0.34, 1.56, 0.64, 1)
- Smooth easing: cubic-bezier(0.4, 0, 0.2, 1)
- Fast duration: 150ms
- Base duration: 250ms

Rules:

- Use subtle scale and lift on interactive elements.
- Keep transition timing short and responsive.
- Never block interaction with long animation chains.

### 4.2 Theming

- Support light and dark modes.
- Respect system preference if user has no stored preference.
- Persist explicit user preference in localStorage.
- Prevent flash-of-incorrect-theme on first paint.

### 4.3 Sound

- Sounds are optional and user-controlled.
- Persist enabled/disabled sound preference in localStorage.
- Use brief tones only (20ms to 40ms) for interaction feedback.

## 5. Core UI Primitives

Project utility primitives should be treated as design-system building blocks:

- canvas
- accent-gradient
- accent-text
- surface
- btn-primary
- btn-ghost
- card-hover
- mesh-bg
- prose

Rules:

- Reuse primitives before introducing new one-off patterns.
- Ensure dark mode variants exist for any new primitive.
- Keep radius, border, and motion behavior visually consistent.

## 6. Component-Level Behavior

### 6.1 Navbar

- Fixed top navigation.
- Applies frosted/glass effect after slight scroll.
- Active route receives stronger text and accent underline.

### 6.2 Buttons and Links

- Primary button uses accent gradient fill.
- Ghost button and icon controls rely on subtle border and hover tint.
- Hover states should communicate intent without excessive movement.

### 6.3 Content Cards

- Surface + border for hierarchy.
- Mild upward hover shift with soft shadow.
- Clear title-first information architecture.

### 6.4 Blog Prose

- Reading width around 65ch max.
- Strong heading hierarchy.
- Link styles remain discoverable in both themes.

## 7. Content Model and Editorial UX

- Blog and projects are source-of-truth content collections.
- Tags should be first-class navigation surfaces.
- Blog pages should bias scanning first, deep reading second.
- Metadata (date, tags, updates) must stay visible but low-noise.

## 8. Accessibility and Quality Bar

- Always preserve keyboard-visible focus styles.
- Keep semantic landmarks: header, nav, main, article, footer.
- Ensure color contrast remains readable in both themes.
- Respect reduced distraction principles (no autoplay media, no heavy motion).
- Keep interaction targets comfortably clickable.

## 9. Performance Expectations

- Static-first rendering with Astro.
- Zero JavaScript by default where possible.
- Any client script must justify itself by UX value.
- Minimize runtime logic and hydration footprint.

## 10. Known Product Notes

- RSS is linked in UI as /rss.xml.
- If RSS generation is required, add a dedicated feed route implementation.
- README currently reflects starter content and should be replaced by project docs.

## 11. Implementation Guardrails

When creating new UI:

1. Start from existing primitives in global styles.
2. Keep typography and spacing within current rhythm.
3. Add both light and dark visual states.
4. Add hover, active, and focus-visible behavior.
5. Validate mobile and desktop behavior.

When reviewing UI changes:

1. Check visual consistency against Tactile Digital direction.
2. Check readability for long-form content blocks.
3. Check interaction feedback (motion, sound, focus) remains subtle.
4. Check no regressions in static-first performance posture.
