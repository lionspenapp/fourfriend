-- Allow parent sign-up flow (anon JWT right after signUp) to call register_student.
-- SECURITY DEFINER already enforces correct inserts; without EXECUTE, PostgREST returns 401/permission errors.

GRANT EXECUTE ON FUNCTION public.register_student(
  uuid, text, text, integer, text, text, text, text
) TO anon;

GRANT EXECUTE ON FUNCTION public.register_student(
  uuid, text, text, integer, text, text, text, text
) TO authenticated;
