CREATE OR REPLACE FUNCTION public.register_student(
  p_parent_id uuid,
  p_first_name text,
  p_last_name text,
  p_grade integer,
  p_gender text,
  p_email text,
  p_username text,
  p_password text
)
RETURNS json
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO public, extensions
AS $$
BEGIN
  IF auth.uid() IS NULL THEN
    RETURN json_build_object('success', false, 'error', 'Parent must be signed in to register a student');
  END IF;

  IF p_parent_id IS NULL THEN
    RETURN json_build_object('success', false, 'error', 'Parent is required');
  END IF;

  IF p_parent_id <> auth.uid() THEN
    RETURN json_build_object('success', false, 'error', 'Parent does not match signed-in user');
  END IF;

  IF p_username IS NULL OR length(trim(p_username)) < 3 THEN
    RETURN json_build_object('success', false, 'error', 'Username must be at least 3 characters');
  END IF;

  IF p_password IS NULL OR length(p_password) < 4 THEN
    RETURN json_build_object('success', false, 'error', 'Password must be at least 4 characters');
  END IF;

  INSERT INTO public.students (
    parent_id,
    first_name,
    last_name,
    grade,
    gender,
    email,
    username,
    password_hash
  )
  VALUES (
    auth.uid(),
    trim(p_first_name),
    trim(p_last_name),
    p_grade,
    COALESCE(NULLIF(trim(p_gender), ''), 'male'),
    NULLIF(trim(COALESCE(p_email, '')), ''),
    lower(trim(p_username)),
    p_password
  );

  RETURN json_build_object('success', true);
EXCEPTION WHEN unique_violation THEN
  RETURN json_build_object('success', false, 'error', 'Username already taken');
WHEN OTHERS THEN
  RETURN json_build_object('success', false, 'error', SQLERRM);
END;
$$;

REVOKE EXECUTE ON FUNCTION public.register_student(uuid, text, text, integer, text, text, text, text) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.register_student(uuid, text, text, integer, text, text, text, text) TO authenticated;
