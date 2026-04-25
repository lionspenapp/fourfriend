# Increase Scroll & Reflection Text Size

Make the question text and the reflection textarea larger and easier to read across all three question pages (Academic, Emotion, Character), without disturbing the current scroll/papyrus layout.

## Changes

### 1. Question text on the scroll — `src/pages/QuestionPage.tsx`
- Change the `<p>` inside the safe-zone container from `text-[1.2rem]` to `text-[1.4rem]` (22px).
- Keep all other styling: `font-garamond`, `font-medium`, `leading-[1.6]`, centered, carbon-ink color `rgba(28,28,28,0.9)`.
- Keep the safe-zone container (`top-[26%] bottom-[26%] left-[14%] right-[14%]`) and `overflow-y-auto scroll-ink` so longer questions still scroll inside the parchment without touching the wooden rollers.

### 2. Reflection textarea — `src/pages/QuestionPage.tsx`
- Update the `Textarea` className: replace `text-base` with `text-[1.4rem]` (22px) and keep `leading-relaxed`, transparent background, and existing padding.
- Bump `min-h-[80px]` to `min-h-[110px]` so the bigger text has comfortable room before scrolling.
- Placeholder will inherit the new size automatically.

## Not changing
- Scroll background, wooden roller positions, papyrus background.
- Safe-zone insets, side padding (25px), or scrollbar styling (`.scroll-ink`).
- Caption, divider, button, and validation text sizes.

## Files
- `src/pages/QuestionPage.tsx`
