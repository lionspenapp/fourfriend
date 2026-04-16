

## Plan: Separate Scroll (Question) + Papyrus (Response) — No Custom Image Yet

Since the papyrus image hasn't been uploaded yet, I'll use a **CSS-styled parchment** as a placeholder that can be swapped for the real image later.

### Changes to `src/pages/QuestionPage.tsx`

**1. Scroll — question only, moved higher**
- Reduce outer padding to `pt-6`
- Scroll keeps the `scrollBg` image but with a smaller aspect ratio (`2 / 1.4`) since it only holds the category label and question prompt
- Remove the `Textarea` from inside the scroll

**2. Papyrus response area — below the scroll**
- New `div` styled as parchment: `bg-[#E8D5B7]` background, `border border-[#C8A882]`, rounded corners, subtle shadow
- Compact `Textarea` inside: `min-h-[100px]` (fits ~6-7 sentences), transparent background, dark brown text (`text-[#3B2F1E]`), placeholder in muted brown
- When you upload the real papyrus image later, I'll swap the CSS background for the image

**3. Footer unchanged**
- Sentence counter and Next/Submit button remain below

### Visual layout
```text
┌─────────────────────────────┐
│  [background image + overlay]│
│  ┌── Scroll ──────────────┐ │
│  │  Category label         │ │
│  │  Question prompt        │ │
│  └────────────────────────┘ │
│  ┌── Papyrus ─────────────┐ │
│  │  [compact textarea]     │ │
│  └────────────────────────┘ │
│  sentence count    [Button]  │
└─────────────────────────────┘
```

### File changed
- `src/pages/QuestionPage.tsx`

