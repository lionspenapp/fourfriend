## Make Student Login the Landing Page

Swap the default route so opening the app shows the Student Login (the Scriber's entry) instead of the Parent Auth screen. Parents will get a dedicated `/parent` route, and the existing "Parent Login →" link on the student page will point there.

### Routing changes (`src/App.tsx`)

Current behavior:
- `/` → `ParentAuth` (or `ParentDashboard` if logged in)
- `/student` → `Index` (which renders `StudentLogin` based on flow step)

New behavior:
- `/` → `Index` (Student Login flow) — main entry for everyone
- `/student` → `Index` (kept as alias so existing links keep working)
- `/student/portal` → `StudentPortal` (unchanged)
- `/parent` → `ParentAuth` (new dedicated parent entry)
- `/parent/dashboard` → `ParentDashboard` when authenticated, otherwise redirect to `/parent`
- `/reset-password` → `ResetPassword` (unchanged)
- `*` → `NotFound`

Authenticated parents who land on `/parent` will be redirected to `/parent/dashboard` so they don't have to re-login.

### Link updates

- `src/pages/StudentLogin.tsx`: change the "Parent Login →" button from `navigate("/")` to `navigate("/parent")`.
- `src/pages/ParentAuth.tsx`: any post-login navigation that goes to `/` will be updated to `/parent/dashboard`. Any "back to student" link will point to `/`.
- `src/pages/ParentDashboard.tsx`: post sign-out navigation will go to `/parent` (or `/`) as appropriate.
- `src/pages/ResetPassword.tsx`: post-reset redirect updated to `/parent`.

I'll grep for any other `navigate("/")` / `<Link to="/">` usages and adjust them to the correct new destination during implementation.

### What stays the same

- All visuals (logo, gold buttons, catchphrase) untouched.
- Student auth flow, Supabase RPCs, and the multi-step ritual (`lock` → `breathing` → `oath` → ...) unchanged.
- Parent signup/login logic unchanged — only the URL it lives at changes.