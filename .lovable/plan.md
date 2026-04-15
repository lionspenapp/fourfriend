

## Plan: Clay Tablet Oath Image + Combined Name Input

### Changes to `src/pages/ScriberOath.tsx`

**1. Add clay tablet image as main content**
- Copy `user-uploads://Oath.png` to `src/assets/oath-tablet.png`
- Import and display the clay tablet image as the central visual element, replacing the current text-based oath display (the `bg-foreground/5` div with oath text lines)
- The image will be centered, with `max-w-md` and rounded styling, with a subtle shadow

**2. Combine two name inputs into one**
- Replace the two separate `firstName` / `lastName` inputs with a single input
- Placeholder: `"First, Last Name"`
- Update `canProceed` to check that the single input contains a comma (or just non-empty text)
- Remove the `lastName` state; rename `firstName` to `fullName`

**3. Keep everything else intact**
- Palace school background, overlay, border trim, title, grade subtitle, "Sign Your Name" prompt, and "Enter the Scriptorium" button all remain unchanged

