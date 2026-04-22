

## Generate new Lion's Pen logo (new composition, original palette)

Generate a fresh logo combining the uploaded image's composition with the current logo's Babylonian palette, then swap it into the Student Login screen.

### Generation prompt

Use Nano Banana Pro (`google/gemini-3-pro-image-preview`) for a square 1024×1024 PNG with **transparent background**:

> Heraldic emblem logo, transparent background. Circular medallion in deep Lapis blue (#1B3A6B) with an Ochre gold (#C8962E) double-ring border. Inside the medallion: a majestic golden lion (seated, calm, regal, facing forward) holding a quill pen, with an unfurled cream Sand-colored (#F5E6C8) scroll behind it. Above the lion, an eight-point Ochre gold star with radiating rays. Below the medallion, a bold Lapis blue banner with Ochre gold borders containing the words "THE LION'S PEN" in Cinzel-style serif capitals in Ochre gold. Rich, hand-painted illuminated-manuscript feel. Palette strictly limited to Lapis #1B3A6B, Ochre #C8962E, Sand #F5E6C8. Crisp lines, high contrast, no gradients outside the palette, no extra text.

### Steps

1. Generate the image via the Lovable AI gateway (Nano Banana Pro).
2. QA: view the output. If the lion is malformed, the banner text is misspelled, palette drifts, or the background isn't transparent → regenerate (up to 2 retries) tightening the prompt.
3. Save as `src/assets/lions_pen_v2.png`.
4. In `src/pages/StudentLogin.tsx`, change the import from `lions_pen.png` → `lions_pen_v2.png`. Keep the old file in place so revert is one line.

### Scope

- Only the Student Login logo image changes.
- No layout, copy, sizing, or other pages touched.
- `src/assets/lions_pen.png` stays in the repo as instant fallback.

### If you don't love the result

Tell me what to adjust ("lion bigger", "rampant pose", "drop the rays", "swap banner to THE INNER SCRIPTORIUM") and I regenerate — cheap and fast.

