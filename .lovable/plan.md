

## Plan: Display Questions on a Scroll Background

Use the uploaded scroll image as a decorative background behind the question text area on all three reflection pages (Academic, Emotion, Character).

### Steps

1. **Add scroll asset** — Copy `scroll.png` to `src/assets/scroll-bg.png`

2. **Update QuestionPage.tsx** — Wrap the question prompt and textarea inside a container that uses the scroll image as a background:
   - The scroll image sits behind the content area using `background-image` with `contain` sizing
   - Question text and textarea are positioned over the parchment area of the scroll
   - Textarea gets a transparent/semi-transparent background so the scroll texture shows through
   - Internal padding adjusted so text stays within the scroll's parchment bounds (avoiding the rolled edges)

3. **Responsive sizing** — The scroll container scales proportionally, keeping the aspect ratio of the scroll image consistent across screen sizes

### Technical notes
- The scroll image has a roughly 2:1 aspect ratio with rolled edges on left/right and torn edges top/bottom
- Content padding needs ~15% horizontal and ~20% vertical inset to stay within the parchment area
- Textarea background becomes `bg-transparent` or very subtle `bg-black/5` so scroll texture is visible
- The outer page background and border trim remain unchanged

