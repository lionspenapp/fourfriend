
-- Recreate the view with SECURITY INVOKER (default but explicit)
DROP VIEW IF EXISTS public.students_safe;
CREATE VIEW public.students_safe WITH (security_invoker = true) AS
  SELECT id, parent_id, first_name, last_name, grade, username, gender, email, created_at, updated_at
  FROM public.students;
