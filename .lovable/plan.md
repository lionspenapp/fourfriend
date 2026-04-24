# Add tagline between lion image and title

## What you'll see

A short catch phrase will appear in the empty space at the bottom of the logo image — visually sitting between the lion artwork and the "Lion's Pen" title underneath:

> **Daily Reflection That Builds Leaders Who Direct and Command the AI Era**

It will be styled in the existing Cinzel font, in the secondary (ochre) color, small and tracked-out so it reads as a refined sub-header — not competing with the title.

## Where it appears

The same logo block is reused on three auth screens, so the tagline will show on all three for consistency:

- Student Login (`/student`)
- Parent Login / Sign Up (`/`)
- Reset Password (`/reset-password`)

(Not added to the dashboards, where the logo is a small header icon.)

## How it's placed

The logo PNG has visual whitespace below the lion artwork. To put text *inside* that whitespace (rather than below the whole image), the logo `<img>` will be wrapped in a `relative` container, and the tagline will be an absolutely-positioned element pinned near the bottom of that container, horizontally centered.

```text
┌─────────────────────────┐
│                         │
│      🦁  (lion art)     │
│                         │
│  ‹ tagline overlays ›   │  ← absolute, bottom of image box
└─────────────────────────┘
        Lion's Pen           ← existing title, unchanged
   THE INNER SCRIPTORIUM
```

If on small screens the overlay starts to crowd the lion, the tagline will hide on very narrow widths (`hidden sm:block`) and reappear from the `sm` breakpoint up.

## Technical changes

Files to edit:
- `src/pages/StudentLogin.tsx`
- `src/pages/ParentAuth.tsx`
- `src/pages/ResetPassword.tsx`

In each, replace the current logo `<img>` with:

```tsx
<div className="relative w-[27rem] mx-auto mb-4">
  <img src={lionsPenLogo} alt="Lion's Pen" className="w-full h-auto" />
  <p className="hidden sm:block absolute bottom-[6%] left-1/2 -translate-x-1/2 w-[88%] text-center font-cinzel text-secondary text-[0.7rem] md:text-xs tracking-[0.18em] uppercase leading-snug">
    Daily Reflection That Builds Leaders Who Direct &amp; Command the AI Era
  </p>
</div>
```

Notes:
- `bottom-[6%]` is tuned to land in the empty band below the lion. After the change I'll verify in the preview and nudge the percentage if needed.
- No new assets, no DB changes, no routing changes.
- The existing "Lion's Pen" title and "The Inner Scriptorium" subtitle stay exactly as they are.

## Open question

You wrote "Direct and Command AI Era". I'll render it as **"Direct & Command the AI Era"** for rhythm. If you'd rather keep it verbatim ("Direct and Command AI Era"), tell me and I'll use that exact wording.
