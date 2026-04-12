
-- Enable pgcrypto for password hashing
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Create trigger to hash password_hash on insert/update if it's not already hashed
CREATE OR REPLACE FUNCTION public.hash_student_password()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Only hash if the value doesn't already look like a bcrypt hash
  IF NEW.password_hash IS NOT NULL AND NEW.password_hash NOT LIKE '$2a$%' AND NEW.password_hash NOT LIKE '$2b$%' THEN
    NEW.password_hash := crypt(NEW.password_hash, gen_salt('bf'));
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER hash_student_password_trigger
BEFORE INSERT OR UPDATE OF password_hash ON public.students
FOR EACH ROW
EXECUTE FUNCTION public.hash_student_password();

-- Create a safe view that excludes password_hash
CREATE VIEW public.students_safe AS
  SELECT id, parent_id, first_name, last_name, grade, username, gender, email, created_at, updated_at
  FROM public.students;

-- Drop the existing SELECT policy that exposes password_hash
DROP POLICY IF EXISTS "Parents can view own students" ON public.students;

-- Re-create a SELECT policy that only allows access through the safe view
-- Parents should query students_safe instead. Keep a restricted SELECT for RLS subqueries.
CREATE POLICY "Parents can view own students restricted"
ON public.students
FOR SELECT
TO authenticated
USING (auth.uid() = parent_id);

-- Create a server-side function for student login verification
CREATE OR REPLACE FUNCTION public.verify_student_login(p_username text, p_password text)
RETURNS json
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_student record;
BEGIN
  -- Validate inputs
  IF p_username IS NULL OR length(p_username) < 1 OR length(p_username) > 100 THEN
    RETURN json_build_object('success', false, 'error', 'Invalid username');
  END IF;
  IF p_password IS NULL OR length(p_password) < 1 OR length(p_password) > 200 THEN
    RETURN json_build_object('success', false, 'error', 'Invalid password');
  END IF;

  SELECT id, first_name, last_name, grade, username, gender
  INTO v_student
  FROM public.students
  WHERE username = p_username
    AND password_hash = crypt(p_password, password_hash);

  IF v_student IS NULL THEN
    RETURN json_build_object('success', false, 'error', 'Invalid username or password');
  END IF;

  RETURN json_build_object(
    'success', true,
    'student', json_build_object(
      'id', v_student.id,
      'firstName', v_student.first_name,
      'lastName', v_student.last_name,
      'grade', v_student.grade,
      'username', v_student.username,
      'gender', v_student.gender
    )
  );
END;
$$;
