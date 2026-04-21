

## Fix: Question text overflowing the scroll artifact on mobile

### The problem

On `QuestionPage.tsx`, the question prompt sits inside a fixed-aspect-ratio div (2 / 1.3) that uses `scroll-bg.png` as a background image. The text is rendered with `font-cinzel text-lg` and absolute padding of `6% 14%`. On phone widths (~360–414 px), the scroll image scales down but the text doesn't — long prompts overflow the scroll edges, sometimes spilling out the bottom or sides.

Root cause: the scroll is a **bitmap with a fixed shape**, but the text inside it is laid out independently. There is no link between "how tall the scroll is on screen" and "how big the text and padding are."

### Fix strategy

Make the text scale and wrap to fit the scroll at every viewport, and give it a safe overflow path on the rare prompt that's still too long.

1. **Responsive text size**: replace `text-lg` with a clamped, viewport-aware size that's small on phones and grows on larger screens. Same for the category label above it.
2. **Responsive aspect ratio**: keep the current `2 / 1.3` on desktop, but loosen to roughly `2 / 1.6` on phones so the scroll is taller (more vertical room for wrapped text) without distorting the image — `backgroundSize: contain` already letterboxes cleanly.
3. **Tighter padding on mobile**: drop the inner padding from `6% 14%` to about `8% 10%` on phones so the usable text area is wider relative to the scroll.
4. **Safe overflow path**: add `overflow-y-auto` and a small max-height tied to the scroll's inner area, so an unusually long prompt scrolls *inside* the scroll graphic instead of spilling out. Hide the scrollbar visually for cleanliness.
5. **Line clamp safety**: use `break-words` and `hyphens-auto` so long words can't punch through the right edge.

No changes to the response textarea, buttons, backgrounds, or any other page — only the scroll prompt block on `QuestionPage.tsx`.

### Files touched

- `src/pages/QuestionPage.tsx` — only the scroll/prompt block (the `div` with `backgroundImage: url(${scrollBg})` and its inner content)

### Technical details

- Use Tailwind responsive prefixes (`sm:`, `md:`) rather than JS media queries — keeps it simple and consistent with the rest of the codebase.
- New text sizing: `text-[11px] sm:text-xs` for the category label, `text-sm sm:text-base md:text-lg` for the prompt heading.
- New aspect ratio: apply `2 / 1.6` by default, override to `2 / 1.3` at `sm` and up via inline style swap or by moving the aspect ratio to a Tailwind class with responsive variants.
- Inner content wrapper: `overflow-y-auto max-h-full` plus `scrollbar-width: none` / `::-webkit-scrollbar { display: none }` (added inline via a small style attribute or via existing Tailwind utilities).
- Padding: `px-[10%] py-[8%] sm:px-[14%] sm:py-[6%]`.
- Add `break-words hyphens-auto` to the `<h2>`.

### Verification

After the change, on a 375 px viewport (iPhone SE / 12 mini class), every prompt currently in `questions` table renders fully inside the scroll image with no edge spillover; on desktop (≥768 px), the scroll looks identical to today. If a single prompt is still too long, it scrolls vertically inside the scroll graphic invisibly (no visible scrollbar).

