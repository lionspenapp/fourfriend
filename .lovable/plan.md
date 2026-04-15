

## Plan: Bigger Scroll, Better Readability, Visible Name Input

### 1. Scroll: make bigger and move up (`src/pages/QuestionPage.tsx`)

- Change the outer container from `items-center` to `items-start pt-16` so the scroll sits higher on the page
- Increase scroll aspect ratio from `2 / 1.8` to `2 / 2.2` to make it taller and fit the full question + textarea inside
- Adjust inner padding from `8% 15%` to `6% 14%` to maximize content area

### 2. Improve text readability on question pages (`src/pages/QuestionPage.tsx`)

- Change the subtitle text (`text-secondary`) to `text-white` with a subtle text shadow
- Change the question heading (`text-primary`) to `text-white` with text shadow for contrast against background
- Add text shadow to the sentence counter and warning text below the scroll: `text-white drop-shadow-md`
- Button label text remains as-is (already has solid background)

### 3. Oath page: show typed name visibly (`src/pages/ScriberOath.tsx`)

- The Input already uses `type` defaulting to "text" (not password), so letters should be visible
- Ensure the input explicitly has `type="text"` for clarity
- Make the title and "Sign Your Name" text white with text shadow for readability against the palace school background
- Change `text-primary` on the h1 to `text-white drop-shadow-lg` and `text-secondary` labels to `text-white drop-shadow-md`

### Summary
- Scroll is taller and positioned higher so content stays inside the parchment
- All text over background images becomes white with drop shadow for readability
- Oath name input explicitly shows typed characters (text, not password)

