## Goal
Refine the question scroll text on the three Question pages (academic, emotion, character) so the prompt looks like ink on papyrus, stays contained inside the scroll's parchment area, and scrolls cleanly with a thin custom scrollbar.

All changes are in **`src/pages/QuestionPage.tsx`** (one file, applies to all three categories) plus a font import in **`src/index.css`**.

## Changes

### 1. Font (src/index.css)
Add `EB Garamond` to the existing Google Fonts import so the prompt can use a true serif ink-style face. Add a `.font-garamond` utility under `@layer utilities`.

### 2. Scroll text container (QuestionPage.tsx, the inner `<div>` at line 142–149)
- Keep the parchment background (scroll image) as-is.
- Inner container: remove the `[&::-webkit-scrollbar]:hidden` and `scrollbarWidth: none` (we want a visible thin scrollbar now).
- Replace horizontal padding with **25px left/right** (`px-[25px]`) instead of percentage padding, keep vertical padding so text stays vertically centered within the parchment.
- Background remains transparent (already is).
- Add a custom thin-scrollbar class (defined in index.css) so:
  - Width: `5px`
  - Track: fully transparent
  - Thumb: `#8B7355` at ~60% opacity, rounded.

### 3. Prompt text styling (the `<p>` at line 146)
Replace current classes with:
- Font: `font-garamond` (EB Garamond, serif), fallback serif.
- Color: `#1C1C1C` at opacity `0.9` (carbon-ink brown/black).
- Line height: `1.6`.
- Size: keep responsive `text-base sm:text-lg md:text-xl` for readability on parchment.
- Remove `text-white drop-shadow-lg` (no longer needed since ink sits on papyrus).
- Keep `break-words hyphens-auto`.

### 4. Thin scrollbar utility (src/index.css)
Add a reusable class, e.g.:

```css
.scroll-ink::-webkit-scrollbar { width: 5px; }
.scroll-ink::-webkit-scrollbar-track { background: transparent; }
.scroll-ink::-webkit-scrollbar-thumb {
  background-color: rgba(139, 115, 85, 0.6);
  border-radius: 9999px;
}
.scroll-ink { scrollbar-width: thin; scrollbar-color: rgba(139,115,85,0.6) transparent; }
```

Apply `scroll-ink` to the inner scrolling div.

### 5. Containment / overflow
- The outer scroll-image div keeps its responsive aspect ratio (acts as the fixed parchment frame).
- The inner div keeps `absolute inset-0 overflow-y-auto`, so any overly long question scrolls vertically inside the parchment without ever bleeding past the wooden rollers.

## Out of scope
- No changes to the response/papyrus textarea below.
- No changes to the section caption, divider, or buttons.
- No DB or logic changes.
