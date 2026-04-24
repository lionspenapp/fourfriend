## Goal

Swap the BreathingPage background with the uploaded `sunny_river.jpg`.

## Changes

- Copy `user-uploads://sunny_river.jpg` → `src/assets/river-bg.jpg` (overwrite).
- No code edits: `src/pages/BreathingPage.tsx` already imports `riverBg from "@/assets/river-bg.jpg"`, so Vite will rebundle automatically.
- Keep the existing `bg-black/40` overlay so the breathing circle, timer, and sound buttons stay readable against the bright sky.

## Verification

After the swap, open the breathing page in the preview to confirm the new background renders correctly.

## Note on themes

The app uses a single Babylonian-themed palette (no light/dark toggle exists in the codebase). The background image will appear identically across the app — the dark overlay ensures readability either way.
