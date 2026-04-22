

## Domain mismatch: `.app` vs `.com` — yes, this needs correcting

Short answer: **yes, you have to fix this.** Right now nothing will work end-to-end, because the project is configured for `notify.mycaptainslog.com` but you actually own `mycaptainslog.app`. Two different domains, two different registrars, two different DNS zones.

### What's currently wrong

1. **Project email domain is `notify.mycaptainslog.com`** — a domain you do not own. DNS verification for it will never succeed because nobody can add NS records on a domain they don't control.
2. **NS records were added at GoDaddy on a `.site` zone** — wrong registrar AND wrong TLD. Those records are sitting in a DNS zone that has no relationship to either `.com` or `.app`, so they have zero effect.
3. **Net result:** branded password-reset emails will not send. The system will fall back to default Lovable emails from a generic sender until the domain mismatch is resolved.

### The fix — two clean steps

**Step 1: Remove the wrong email domain from the project**
- Delete `notify.mycaptainslog.com` from Cloud → Emails → Manage Domains. It's a dead-end record we don't want lingering.
- Also clean up the misplaced NS records at GoDaddy on the `.site` zone (they're harmless but confusing).

**Step 2: Add the correct email domain `notify.mycaptainslog.app`**
- Open the email setup dialog and enter `mycaptainslog.app` as the root.
- Lovable will give you two NS records to add at the registrar where you actually bought `mycaptainslog.app` (not GoDaddy unless that's where it's registered):

  | Type | Name | Value |
  |---|---|---|
  | NS | `notify` | `ns3.lovable.cloud` |
  | NS | `notify` | `ns4.lovable.cloud` |

- Add them at the correct registrar, on the correct zone (`mycaptainslog.app`).
- Wait for DNS propagation (usually under 1 hour on a fresh domain, up to 72h worst case).

### What I will do once you confirm

1. Remove the stale `notify.mycaptainslog.com` domain from the project config.
2. Update the `auth-email-hook` edge function's hardcoded constants:
   - `SENDER_DOMAIN`: `notify.mycaptainslog.com` → `notify.mycaptainslog.app`
   - `ROOT_DOMAIN`: `mycaptainslog.com` → `mycaptainslog.app`
   - `FROM_DOMAIN`: `notify.mycaptainslog.com` → `notify.mycaptainslog.app`
3. Open the email setup dialog so you can register `notify.mycaptainslog.app` and get the correct NS records to paste at your real registrar.
4. Redeploy `auth-email-hook` so it sends from the right domain.

### Two questions before I proceed

1. **Where is `mycaptainslog.app` actually registered?** (GoDaddy, Namecheap, Cloudflare, Lovable itself?) — this is where the NS records need to go. If you bought it through Lovable, even better: I can guide you to manage DNS directly inside Lovable with no registrar dance.
2. **Confirm you want `.app` going forward** and I should scrap `.com` entirely from the project? (Just want to make sure you didn't mean to buy both.)

### Out of scope

- Any code changes outside the three constants in `auth-email-hook/index.ts`. Templates, app UI, reset flow — all stay as-is.

