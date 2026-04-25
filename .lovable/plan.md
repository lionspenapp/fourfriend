## Goal

Append the full content of `lionspen-below-login.html` (952 lines) directly below the existing login form on the **Parent Login Page** (`src/pages/ParentAuth.tsx`, route `/`). Leave `StudentLogin.tsx` and the main landing untouched.

## Why this is safe

- All CSS classes are prefixed `lp-` and all CSS variables are prefixed `--lp-`.
- The file contains no global selectors (`*`, `body`, `html`).
- Google Fonts (Playfair Display, EB Garamond, Cormorant Garamond) are already loaded in `index.html` — no change needed there.

## Changes

### 1. New file: `src/pages/parentLandingHtml.ts`

Export the entire raw HTML (the inline `<style>` block plus all sections through the closing `</footer>`) as a single string constant `PARENT_LANDING_HTML`. The leading `<link>` to Google Fonts is omitted (already in `index.html`).

```ts
export const PARENT_LANDING_HTML = `<style>...</style>...<footer class="lp-footer">...</footer>`;
```

### 2. Edit `src/pages/ParentAuth.tsx`

- Import the constant.
- Restructure the outer wrapper from `min-h-screen … flex items-center justify-center` to a vertical column so the landing flows below the login:
  - Outer: `min-h-screen bg-background flex flex-col`.
  - Wrap the existing login UI (decorative ochre border bars + the centered `motion.div`) in a `<section className="relative flex-1 flex items-center justify-center p-4 overflow-hidden min-h-screen">` so the four border bars stay scoped to the login viewport only.
  - After that section, render:
    ```tsx
    <div className="w-full" dangerouslySetInnerHTML={{ __html: PARENT_LANDING_HTML }} />
    ```
- Keep all auth logic, form, and forgot-password modal exactly as-is.

### 3. `index.html`

No change — the three Google Fonts are already linked.

## Out of scope

- No edits to `StudentLogin.tsx` or the existing short landing on the student route.
- No Tailwind conversion of the injected markup.
- No wiring of the landing's CTA buttons to app routes (they remain plain `<button>` elements as authored).
