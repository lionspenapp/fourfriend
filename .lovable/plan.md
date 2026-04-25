## Goal

Render the full content of `lionspen-parent-short.html` directly below the existing login form on the `/` route, exactly as authored — no Tailwind conversion, no copy edits.

## Why this is safe to inject

The uploaded file uses the `lp-` prefix on every class and CSS variable, has zero global selectors (no `*`, no `body`, no element resets), and ships its own `<style>` block plus its own Google Fonts `<link>`. It will not collide with the existing app styles.

## Changes

### 1. `index.html` — add Google Fonts to `<head>`

Add a single `<link>` for Playfair Display, EB Garamond, and Cormorant Garamond. EB Garamond is already loaded via `src/index.css`, but consolidating the three families in one preconnect-friendly link in `<head>` ensures Playfair and Cormorant are available immediately on first paint of the landing content.

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400;1,700&family=EB+Garamond:ital,wght@0,400;0,500;1,400&family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&display=swap" rel="stylesheet">
```

### 2. `src/pages/StudentLogin.tsx` — append landing markup

- Copy the entire HTML body (everything from the `<style>` block through the closing `</footer>`) of `lionspen-parent-short.html` into a TypeScript string constant `LANDING_HTML`. The inline `<style>` block is preserved as-is so the `lp-*` rules are scoped by class name only.
- After the closing `</motion.div>` of the existing login card, render:

  ```tsx
  <div
    className="w-full"
    dangerouslySetInnerHTML={{ __html: LANDING_HTML }}
  />
  ```

- Wrap the page so the existing centered hero and the new full-width landing flow vertically: change the outermost wrapper from `min-h-screen … flex items-center justify-center` to a column layout (`min-h-screen flex flex-col`), keep the login centered in its own section (`flex-1 flex items-center justify-center relative`), then place the landing markup as a sibling below.
- Keep the existing decorative ochre border bars scoped to the login section only (so they don't run down the entire page).

No other files change. Nothing in the existing login logic, auth flow, or routing is touched.

## Out of scope

- No Tailwind conversion of the landing markup.
- No edits to colours, copy, fonts, or buttons inside the landing block.
- No wiring of the landing CTA buttons to app routes (they remain plain `<button>` elements as authored). Happy to wire them in a follow-up if desired.
