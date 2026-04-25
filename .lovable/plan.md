## Replace the Scribe's Oath tablet image

Swap the existing oath tablet artwork on the Scribe's Oath page (`/oath`) with the newly uploaded Babylonian-style stone tablet that contains the "Young Scribe's Oath" text.

### Changes

1. **Add the new asset**
   - Copy the uploaded image into the project at `src/assets/oath-tablet-young-scribe.png`.

2. **Update `src/pages/ScribeOath.tsx`**
   - Replace the import:
     ```ts
     import oathTablet from "@/assets/oath-tablet.png";
     ```
     with:
     ```ts
     import oathTablet from "@/assets/oath-tablet-young-scribe.png";
     ```
   - Keep the existing `<img>` tag, sizing (`max-w-md`), rounded corners, and shadow — only the source changes.
   - Since the uploaded tablet already contains the full oath text rendered in stone, no other UI text on this page needs to change. The page heading ("The Scribe's Oath"), grade label, signature input, and "Enter the Scriptorium" button all remain.

3. **Leave the old asset** (`src/assets/oath-tablet.png`) in place untouched — no other file references it, but removing it isn't necessary and avoids any risk if it's used elsewhere later.

### Out of scope
- No changes to oath copy in `src/data/mockContent.ts` (that data isn't shown on this page).
- No layout, color, or typography changes — only the image source.