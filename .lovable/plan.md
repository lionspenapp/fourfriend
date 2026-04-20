

## Why the reset link lands on Lovable's page

Your code in `src/pages/ParentAuth.tsx` already passes `redirectTo: ${window.location.origin}/reset-password`. That part is correct.

The problem: this project uses **Lovable's default auth email templates**, which don't honor the per-call `redirectTo` and instead point users at Lovable's hosted auth page. To get the recovery email link to land on your own `/reset-password` page (which already exists and works), you need custom auth email templates branded for Lion's Pen.

## Fix: scaffold custom auth email templates

1. **Set up email infrastructure** for the project — Lovable will guide through adding a sender domain (e.g. `notify.yourdomain.com`). If you don't own a domain, we can still scaffold templates that will activate once a domain is added; in the meantime the default Lovable email will continue.

2. **Scaffold the 6 auth email templates** (signup, recovery, magic link, invite, email change, reauthentication). The recovery template will use `{{ confirmationUrl }}`, which Supabase generates from your `redirectTo` value — so the button in the email will go to `https://yourapp/reset-password#access_token=...&type=recovery`.

3. **Brand the templates** in Lion's Pen colors:
   - Body background: white (#ffffff) — required for email clients
   - Primary button: Lapis `#1B3A6B` with white text
   - Accent: Ochre `#C8962E`
   - Heading font: Cinzel (with serif fallback for email clients)
   - Add the Lion's Pen logo at the top of each email
   - Copy tone: ceremonial / "Scriber" language to match the app

4. **Deploy the `auth-email-hook` edge function** so Supabase routes auth emails through the new templates.

5. **No code changes needed** in `ResetPassword.tsx` or `ParentAuth.tsx` — both are already wired correctly. Once the templates are live, the existing `redirectTo` flow works end-to-end.

## What you'll need to provide

A sender domain you own (e.g. `lionspen.app`, `mylionspen.com`). Lovable will provision a subdomain like `notify.lionspen.app` and walk through DNS setup. DNS verification can take a few minutes to 72 hours; templates can be scaffolded immediately and will activate as soon as DNS verifies.

## Files touched

- New: `supabase/functions/auth-email-hook/index.ts` + `deno.json`
- New: `supabase/functions/_shared/email-templates/recovery.tsx` (+ 5 other auth templates)
- Updated: `supabase/config.toml` (registers the new function)
- No changes to `ParentAuth.tsx` or `ResetPassword.tsx`

