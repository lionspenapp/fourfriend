
Plan: Tighten layout + signature font + horizontal pen divider.

### 1. `src/pages/QuestionPage.tsx` — fit everything on one screen
- Reduce top padding: `pt-6` → `pt-2`, and `mt-6` on motion div → `mt-2`
- Shrink scroll: change `aspectRatio: "2 / 1.6"` → `"2 / 1.3"` (less tall)
- Shrink papyrus padding: `p-6` → `p-3`, inner overlay `p-3` → `p-2`
- Reduce textarea `min-h-[100px]` → `min-h-[80px]`
- Tighten divider margin: `my-3` → `my-2`
- Reduce button section margin: `mt-4` → `mt-2`

### 2. Divider — replace `PenLine` icon with a long horizontal pen graphic
- Use lucide `Feather` rotated 90° OR build a custom inline SVG of a horizontal quill/pen that spans wider (~`w-32 h-4`)
- Approach: inline SVG of a stylized quill pen lying flat (gold/secondary stroke) — nib on left, feather barbs on right
- Side gold lines stay (`flex-1 h-px bg-secondary/60`) but pen sits in the middle as a real, recognizable horizontal pen

### 3. `src/pages/ScriberOath.tsx` — handwritten signature font
- Add Google Font import to `src/index.css`: add `Allura` (similar to Alex Brush / Monte Carlo — elegant English script) and `Great Vibes` to the existing `<link>` import
- Add Tailwind utility class `font-signature` in `tailwind.config.ts`: `signature: ["Allura", "cursive"]`
- Apply to the name `Input` on oath page: add `font-signature text-3xl` so as user types, it renders in flowing handwritten script
- Also inflate input height (`h-14`) so the larger script fits

### Files changed
- `src/pages/QuestionPage.tsx`
- `src/pages/ScriberOath.tsx`
- `src/index.css` (add font import)
- `tailwind.config.ts` (add `font-signature`)
