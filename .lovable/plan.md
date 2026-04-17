
Plan: Add divider + use uploaded papyrus image as response background.

1. Save image: copy `user-uploads://red_papayrus.jpg` → `src/assets/papyrus-bg.jpg` and import in `QuestionPage.tsx`.

2. Decorative divider between scroll and papyrus (in `src/pages/QuestionPage.tsx`, between the scroll div and papyrus div):
   - A horizontal flex row, centered, ~`my-3`
   - Left + right thin gold lines (`flex-1 h-px bg-secondary/60`) with a centered ornament (a small pen icon rotated horizontal, using `lucide-react` `Feather` or `PenLine` icon in gold `text-secondary`)
   - Looks like: `———— ✒ ————`

3. Replace papyrus styling on the response container:
   - Remove the inline `backgroundColor: "#E8D5B7"` 
   - Add `backgroundImage: url(papyrusBg)`, `backgroundSize: cover`, `backgroundPosition: center`
   - Keep border/shadow; bump padding slightly (`p-6`) for breathing room over the texture
   - Textarea text color: change to a darker readable tone over the red/brown texture — use `text-[#2a1810]` with stronger weight, and a subtle white/cream tint placeholder; add `bg-white/10` or leave transparent — will use transparent so texture shows through
   - To keep text legible over the busy hieroglyph texture, wrap textarea in a subtle `bg-[#F5E6C8]/85` (semi-transparent sand overlay) inner panel with rounded corners — preserves papyrus feel at edges while giving a clean writing surface in the middle

File changed: `src/pages/QuestionPage.tsx` (+ new asset `src/assets/papyrus-bg.jpg`)
