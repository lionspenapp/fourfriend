

## Plan: Fix Scroll Size + Add Babylon Background for Academic Page

### Changes to `src/pages/QuestionPage.tsx`

**1. Make scroll larger** — Change the aspect ratio from `2 / 1.1` to something taller like `2 / 1.8` so the scroll image stretches to fully contain both the question prompt and the textarea. Reduce internal padding slightly to maximize usable space.

**2. Add Babylon city background for academic page only** — Copy the uploaded image to `src/assets/babylon-bg.jpg`. On the academic question page, set this as the full-page background image (similar to how `CelestialMessage.tsx` uses `celestial-bg.png`) with a dark overlay for readability. Emotion and Character pages keep the current plain `bg-background`.

### Steps

1. **Copy asset** — Save uploaded image as `src/assets/babylon-bg.jpg`
2. **Update QuestionPage.tsx**:
   - Import `babylonBg` from `@/assets/babylon-bg.jpg`
   - For `type === "academic"`: apply `backgroundImage: url(babylonBg)` with `bg-cover bg-center` on the outer div, plus a `bg-black/40` overlay for readability
   - Change scroll container aspect ratio to `2 / 1.8` and adjust padding to `8% 15%` so content fits within the scroll
   - Emotion and Character pages remain unchanged (no city background)

### Result
- All three pages: scroll is large enough to contain question + textarea
- Academic page only: Babylon city panorama behind everything, with scroll floating over it

