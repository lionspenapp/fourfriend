## Goal
Fix the reflection prompts so they display exactly as written in the database for Academic, Emotion, and Character. No forced all-caps, no sentence-case conversion.

## What I found
- The question records in the backend already use normal mixed-case text.
- The app is still transforming or styling the prompt at the UI layer.
- In `src/pages/QuestionPage.tsx`, the prompt is rendered inside an `h2`, while `src/index.css` applies global heading styling with the decorative Cinzel font to all `h1–h6` elements.
- That means the database is not the problem; the rendering choice is.

## Plan
1. Update `src/pages/QuestionPage.tsx` so the prompt is rendered exactly as `prompt` from the database/local fallback, with no `toSentenceCase()` transformation.
2. Replace the prompt element with a plain text element instead of an `h2`, so it no longer inherits the global heading font styling.
3. Explicitly keep normal text casing on the prompt text and preserve the existing scroll layout.
4. Verify all three reflection screens (Academic, Emotion, Character) show normal sentence casing.

## Technical details
- Remove the `toSentenceCase` helper from `src/pages/QuestionPage.tsx`.
- Change:
  ```tsx
  {loading ? "Loading question…" : toSentenceCase(prompt)}
  ```
  to:
  ```tsx
  {loading ? "Loading question…" : prompt}
  ```
- Replace the `h2` prompt element with a neutral text tag such as `p` or `div` using the existing readable sans-serif styling.
- Leave the smaller category label unchanged.

## Expected result
If the database says:
```text
If today were a weather report, what would the headline be?
```
the screen will show exactly that text, instead of making it appear all uppercase.

Approve this and I’ll apply the fix directly.