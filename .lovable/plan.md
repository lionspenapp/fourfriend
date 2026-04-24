## Fix #2: PKCE "code verifier" failure on parent password reset

### What's actually happening now (with logs)

The previous fix (handling `?code=...`) **is live** — confirmed by hitting `/reset-password?code=test123` on `pen-guard-vault.lovable.app`. The page now correctly attempts `supabase.auth.exchangeCodeForSession(code)`.

But for the real reset link the parent clicked, that exchange fails with:

> **"invalid request: both auth code and code verifier should be non-empty"**

This is a known PKCE pitfall. When `resetPasswordForEmail()` is called, the Supabase JS client stores a **PKCE code verifier** in `localStorage` of the browser that requested the reset. When the user clicks the email link, the auth server returns a `?code=...`, and `exchangeCodeForSession(code)` needs to combine that code with the locally-stored verifier.

The verifier is missing whenever:
- The user opens the email on a **different device / browser** (phone vs laptop).
- The user opens it inside the **Gmail in-app browser** or another wrapper that has its own isolated storage.
- The `localStorage` was cleared between requesting and clicking.

Meanwhile, the Supabase auth logs show that `/verify` returned **303 (success)** and a `Login` event was recorded for `parkeunhee327@gmail.com` — meaning the recovery token itself was valid and a session was actually established server-side. We just can't complete the PKCE exchange on the page, so we wrongly tell the parent the link is invalid.

### The fix (single file: `src/pages/ResetPassword.tsx`)

Make the page tolerant of the PKCE-verifier mismatch and rely on what actually matters — **does the user have a session and did they arrive via recovery?**

New flow on mount:

1. **Read URL.** Capture `?code=`, `#type=recovery`, `?error=`/`?error_description=` like today.

2. **If `?error=` is present** → show the specific error (unchanged).

3. **If `?code=` is present:**
   - Try `supabase.auth.exchangeCodeForSession(code)`.
   - **On success** → enter recovery mode (as today), strip `?code` from URL.
   - **On failure** (verifier missing or any error):
     - Wait briefly (200ms) and call `supabase.auth.getSession()`.
     - If a session exists (the `/verify` redirect already logged them in) → **enter recovery mode anyway**, strip `?code` from URL, and let them set a new password.
     - If still no session → show a clear, friendlier error: "This reset link must be opened in the same browser where you requested it. Please request a new link from this device."

4. **If `#type=recovery` is present** → enter recovery mode (legacy fallback, unchanged).

5. **Listen for `PASSWORD_RECOVERY`** on `onAuthStateChange` (unchanged) — covers any edge case where Supabase fires that event after redirect.

6. **Also: if we land with no `code`, no hash, no error, but `getSession()` already returns a session** (because `/verify` redirected and set cookies/storage), enter recovery mode. This catches the "already logged in by the verify hop" case.

### Why this works

- Same-device clicks: PKCE exchange succeeds → recovery form (works today).
- Cross-device / Gmail in-app browser clicks: PKCE exchange fails, but Supabase has already established the session via `/verify` → we detect the session and let them set a new password anyway. `updateUser({ password })` requires only an authenticated session, which we have.
- Truly invalid / expired links: no session, exchange fails → we show a helpful message instead of a generic "Invalid" screen.

### Out of scope

- No DB changes.
- No changes to `auth-email-hook`, recovery email template, or `process-email-queue`.
- No change to `ParentAuth.tsx`'s `resetPasswordForEmail` call (`redirectTo` is correct).
- No change to client config (PKCE stays the default — we just gracefully degrade when the verifier isn't available).

### Note on publishing

Since the parent is testing on the **live** domain (`pen-guard-vault.lovable.app`), after I make this change you'll need to click **Publish → Update** to push it live. I'll remind you in the implementation message.
