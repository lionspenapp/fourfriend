

## Plan: Set up branded password-reset emails from `mycaptainslog.com`

You bought a fresh domain — `mycaptainslog.com` — so we can start clean (no Hostinger NS-record troubles like before). Here's the full path from "domain bought" to "parents receive a Lion's Pen-branded password reset email."

### Step 1 — Open the email setup dialog and register the domain

I'll surface the email setup dialog. In it, you'll:

1. Enter `mycaptainslog.com` as your domain.
2. Lovable will provision the subdomain `notify.mycaptainslog.com` and show you **two NS records** to add at your domain registrar (where you bought `mycaptainslog.com`).

### Step 2 — Add the two NS records at your registrar

At whichever registrar you bought `mycaptainslog.com` from, go to the DNS / DNS Zone / DNS Records section and add **two NS records**:

| Type | Name / Host | Value (Points to) | TTL |
|---|---|---|---|
| NS | `notify` | `ns3.lovable.cloud` (exact value shown in dialog) | default |
| NS | `notify` | `ns4.lovable.cloud` (exact value shown in dialog) | default |

Both records use the same Name (`notify`), different Values. The dialog will show the exact nameserver values to use — copy those, not the examples above.

### Step 3 — I scaffold and brand the auth email templates

As soon as the domain is registered (you do NOT have to wait for DNS to verify), I will:

1. Scaffold the 6 standard auth email templates: signup confirmation, password recovery, magic link, invite, email change, reauthentication.
2. Apply Lion's Pen brand styling to each:
   - White email body background (required for email clients)
   - Lapis blue (`#1B3A6B`) primary button
   - Ochre (`#C8962E`) accents and dividers
   - Cinzel font for headings, Inter/Arial fallback for body
   - Ceremonial Scriber tone in the copy ("Step into your Inner Scriptorium…")
3. Deploy the `auth-email-hook` edge function so password-reset requests route through these templates.

### Step 4 — Verify the password reset flow end-to-end

Your existing code is already correct:
- `ParentAuth.tsx` — "Forgot password?" modal calls `supabase.auth.resetPasswordForEmail` with redirect to `/reset-password` ✓
- `ResetPassword.tsx` — handles the `type=recovery` token and updates the password ✓

So no code changes are needed in those files. Once DNS verifies (usually under an hour at a fresh registrar), parents who request a password reset will receive the branded Lion's Pen email from `notify@mycaptainslog.com`.

### Timeline expectations

- **Step 1 (dialog + domain entry)**: ~1 minute
- **Step 2 (add NS records at registrar)**: ~3 minutes
- **Step 3 (I scaffold + deploy)**: ~30 seconds, runs immediately after Step 1
- **Step 4 (DNS verification)**: typically under 1 hour on a fresh domain; up to 72h worst case
- **In the meantime**: parents still receive default Lovable reset emails, so no one is locked out

### What I need from you

Just approve this plan. After approval I'll open the email setup dialog. Once you've entered the domain in the dialog, I'll immediately scaffold and brand the templates and deploy the hook — you can add the two NS records at your registrar in parallel.

### Out of scope (intentionally)

- Custom domain for the **app itself** (i.e., serving the Lion's Pen site at `mycaptainslog.com` instead of `pen-guard-vault.lovable.app`) — that's a separate setup using A records, not NS records. Happy to plan that next if you want.
- Transactional emails (e.g., notifying parents when their child completes a reflection) — also separate; can layer on after auth emails are live.

