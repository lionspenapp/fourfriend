

## Plan: Replace Celestial Message Background Image

Replace the current `celestial-bg.png` with the uploaded celestial city image for the Celestial Message page.

### Steps

1. **Copy the uploaded image** to `src/assets/celestial-bg.png` (overwrite the existing file)
2. No code changes needed — `CelestialMessage.tsx` already imports from `@/assets/celestial-bg.png`

The dark overlay (`bg-black/50`) already in the component will ensure text remains readable over the new, more detailed background.

