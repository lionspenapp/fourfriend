## Add "Sign Up" Link for New Parents on Landing Page

Add a secondary call-to-action under the existing "Parent Login →" link on the Student Login (landing) page, so first-time parents can jump straight into account creation.

### Changes

**`src/pages/StudentLogin.tsx`** — Replace the single "Parent Login →" line with a small two-line block:

```
Parent Login →
New parent? Create an account
```

Both are buttons styled with the existing gold (`text-secondary`) Cinzel typography. "Create an account" navigates to `/parent?signup=1`.

**`src/pages/ParentAuth.tsx`** — Initialize the existing `isSignUp` state from the URL so `/parent?signup=1` opens directly in Sign Up mode (showing the parent + child registration form). Default behavior (`/parent`) remains Sign In. The existing in-page "Sign In / Sign Up" toggle keeps working as before.

No design tokens, RPCs, or auth logic change — just one new link and a URL-driven default for the signup tab.