
Make the signature text visibly larger on the oath page by fixing both the font choice and the field sizing.

### What I’ll change

1. `src/pages/ScriberOath.tsx`
- Increase the signature input’s visual scale beyond the current setup
- Make the input box taller so the script has room to breathe
- Use a larger explicit font size than the current Tailwind preset if needed
- Keep very tight vertical padding and compressed line-height so typed letters occupy much more of the rectangle
- Preserve the smaller sans-serif placeholder styling so only the typed name becomes large

2. `tailwind.config.ts`
- Change the `font-signature` stack so a taller, more visually substantial script font is used first
- Right now the text is already technically large, but the current script font has a small visual height, which is why names still look tiny

### Expected result
- When the student types first and last name, the signature should feel at least as visually prominent as the “The Scriber’s Oath” title
- The typed name should occupy at least about half of the signature box height, instead of looking thin and undersized

### Technical details
- Likely update from the current `text-8xl h-24 leading-[0.6] py-0`
- Move to a bigger/taller combination such as:
  - larger custom font size
  - taller input height
  - tighter line-height
  - improved script font priority
- Only the oath page styling and the signature font config need to be touched
