# ezaz.dev — Astro 6 + Tailwind CSS v4

Fast, minimal engineering blog/portfolio. Stack: **Astro 6.1** (Vite 7) + **Tailwind CSS v4**.

---

## Astro 6

- Content Collections are stable and fully typed
- Astro Actions for type-safe server logic (replaces API route patterns)
- Improved SSR, middleware, streaming, and asset optimization
- Requires **Node.js v24+**

---

## Tailwind CSS v4

**CSS-first. No `tailwind.config.js` unless absolutely necessary.**

### Configuration

```css
@theme {
  --color-primary: #your-color;
  --radius-base: 0.5rem;
}
```

### Custom utilities

```css
@utility btn {
  padding: 1rem;
  border-radius: var(--radius-base);
}
```

### Rules

- Configure via `@theme`, not JS config
- Do NOT add `content: []`
- Use `var(--...)` CSS variables throughout
- Utility-first styling only

---

## Code Generation Rules

- Use Astro 6 patterns (islands, actions, collections)
- Assume Vite 7 environment
- Write Tailwind v4 CSS-first config
- Prefer minimal, modern setups — avoid v3/v4 legacy patterns
- No unnecessary config files
