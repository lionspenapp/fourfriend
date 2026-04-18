
Increase signature font visual size to fill more of the input height.

### Change in `src/pages/ScriberOath.tsx`
- On the signature `Input`: change `text-7xl` → `text-8xl` or `text-9xl`
- Tighten vertical spacing: `py-1` → `py-0` or `py-px`
- Add `leading-[0.6]` to compress line-height so script ascenders/descenders fill the box
- Keep `h-24` height

This makes the handwritten script visually occupy ~60-80% of the input rectangle.

Only file touched: `src/pages/ScriberOath.tsx`.
