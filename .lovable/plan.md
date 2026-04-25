## Fix saved-quotation access — students only

### What's wrong now

I added parent-scoped RLS policies on `saved_quotations`. But students don't sign in with Supabase Auth (they use the custom `verify_student_login` RPC and have no JWT), so `auth.uid()` is null when the student app calls the table. Result: students can't read/save/delete, and worse, the policy as written would let parents do it from their dashboard. The opposite of what you want.

### Fix — same pattern your app already uses for student data

Mirror `submit_student_response` / `get_student_week_submissions`: keep RLS **on** with **no policies** (so direct table access is denied for everyone), and route every operation through `SECURITY DEFINER` functions that take `p_student_id`.

```sql
DROP POLICY IF EXISTS "Parents read own student quotes"   ON public.saved_quotations;
DROP POLICY IF EXISTS "Parents insert own student quotes" ON public.saved_quotations;
DROP POLICY IF EXISTS "Parents delete own student quotes" ON public.saved_quotations;

CREATE OR REPLACE FUNCTION public.get_saved_quotations(p_student_id uuid)
RETURNS TABLE(id uuid, quote text, author text, week int, day int, created_at timestamptz)
LANGUAGE sql SECURITY DEFINER SET search_path = public AS $$
  SELECT id, quote, author, week, day, created_at
  FROM public.saved_quotations
  WHERE student_id = p_student_id
  ORDER BY created_at DESC;
$$;

CREATE OR REPLACE FUNCTION public.delete_saved_quotation(p_student_id uuid, p_id uuid)
RETURNS json LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  DELETE FROM public.saved_quotations WHERE id = p_id AND student_id = p_student_id;
  RETURN json_build_object('success', true);
EXCEPTION WHEN OTHERS THEN
  RETURN json_build_object('success', false, 'error', SQLERRM);
END; $$;
```

The existing `save_quotation(...)` RPC (which already enforces the 24-quote cap) keeps working unchanged.

### Front-end change

`src/pages/StudentPortal.tsx`:
- Read list: `supabase.rpc('get_saved_quotations', { p_student_id: student.id })` instead of `from('saved_quotations').select(...)`.
- Delete: `supabase.rpc('delete_saved_quotation', { p_student_id: student.id, p_id: id })` instead of `from('saved_quotations').delete()`.

`CelestialMessage.tsx` — no change (already calls `save_quotation` RPC).

### Access model after this change

- **Student app** (Celestial Message + Student Portal): can save / read / delete *its own* quotations only. Each call passes the logged-in student's id.
- **Parent dashboard / anyone else**: cannot touch `saved_quotations`. RLS on, no policies, no direct table access.
- **Parents already cannot enter the Student Portal** — that route is reached only from the student-login flow and requires a `student` in `LionsPenContext`. No change needed there.

### Trust note

Same trust model as `submit_student_response` etc.: the student client passes `student_id`. Tightening that further would require giving students real Supabase Auth sessions — separate, larger change.
