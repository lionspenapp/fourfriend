
Increase signature font size on oath page so it fills the input height.

### Change in `src/pages/ScriberOath.tsx`
- On the signature `Input`: change `text-3xl h-14` → `text-5xl h-20`
- Keep `font-signature` (Allura script)
- Placeholder stays readable via existing `placeholder:font-sans placeholder:text-base`

That's the only file touched.
