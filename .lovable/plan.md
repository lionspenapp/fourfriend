## Goal

Two changes:

1. **Student Portal** — stop showing the daily written reflections (academic / emotion / character). The data still goes to the database as today; only the UI on the portal hides it.
2. **Celestial Message page** — add a **Save Quotation** button so a student can keep the day's quote + author (not the long message). Each student can keep up to **24** saved quotations; once there are more than 24, the oldest is deleted automatically.

---

## 1. Student Portal — hide written entries

File: `src/pages/StudentPortal.tsx`

- Keep the 5-dot weekly tracker and the "Day X — date" rows.
- Remove the expandable `Collapsible` content that shows Academic / Emotion / Character text. Replace each row with a non-expanding row that just shows `Day N` + the date + a small "Completed" pill.
- Remove the `ChevronDown` icon and the `Collapsible*` imports that are no longer used.
- No changes to data fetching — submissions still load (we use them to know which days are done) but we never render their text.
- Add a new section/card **"My Saved Quotations"** that lists the student's saved quotes (quote + author + date saved), newest first. Each row gets a small trash button to delete it.

---

## 2. Celestial Message — Save Quotation button

File: `src/pages/CelestialMessage.tsx`

- Add a third button next to **Read to Me** / **Close**: **"⭐ Save Quotation"**.
- On click: insert `{ student_id, quote, author, week, day }` into the new `saved_quotations` table.
- After insert, if that student now has more than 24 rows, delete the oldest ones so only 24 remain.
- Show a toast: "Quotation saved" or "Already saved" if it's a duplicate of the current quote for this student.
- Button becomes disabled / shows "Saved ✓" once saved in the current view.

Only the **quote and author** are stored — never the long `message` body.

---

## 3. Database — new table `saved_quotations`

Schema (migration):

```sql
create table public.saved_quotations (
  id uuid primary key default gen_random_uuid(),
  student_id uuid not null references public.students(id) on delete cascade,
  quote text not null,
  author text not null,
  week integer,
  day integer,
  created_at timestamptz not null default now()
);

create index on public.saved_quotations (student_id, created_at desc);

alter table public.saved_quotations enable row level security;

-- Parents (the only authenticated users) can read/write rows for their own students
create policy "Parents read own student quotes"
  on public.saved_quotations for select to authenticated
  using (exists (select 1 from public.students s
                 where s.id = student_id and s.parent_id = auth.uid()));

create policy "Parents insert own student quotes"
  on public.saved_quotations for insert to authenticated
  with check (exists (select 1 from public.students s
                      where s.id = student_id and s.parent_id = auth.uid()));

create policy "Parents delete own student quotes"
  on public.saved_quotations for delete to authenticated
  using (exists (select 1 from public.students s
                 where s.id = student_id and s.parent_id = auth.uid()));
```

Plus a security-definer RPC that does the save + 24-cap trim atomically:

```sql
create or replace function public.save_quotation(
  p_student_id uuid, p_quote text, p_author text,
  p_week int, p_day int
) returns json
language plpgsql security definer set search_path = public as $$
declare v_id uuid;
begin
  insert into public.saved_quotations(student_id, quote, author, week, day)
  values (p_student_id, p_quote, p_author, p_week, p_day)
  returning id into v_id;

  -- Keep only the newest 24 for this student
  delete from public.saved_quotations
   where student_id = p_student_id
     and id not in (
       select id from public.saved_quotations
        where student_id = p_student_id
        order by created_at desc
        limit 24
     );

  return json_build_object('success', true, 'id', v_id);
exception when others then
  return json_build_object('success', false, 'error', sqlerrm);
end; $$;
```

Front-end calls `supabase.rpc('save_quotation', {...})`, and reads the list with a normal `select * from saved_quotations where student_id = ... order by created_at desc`.

---

## Notes

- Submissions table and `submit_student_response` flow are unchanged — written entries still get saved to the database; we're only hiding them from the student-facing portal.
- The 24 cap is enforced server-side in the RPC, so it can't be bypassed from the client.
- Cap chosen: **24** (your final number). Easy to change later.
