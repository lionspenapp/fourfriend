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
SET search_path TO 'public', 'extensions'
AS $$
BEGIN
  INSERT INTO public.students (parent_id, first_name, last_name, grade, gender, email, username, password_hash)
  VALUES (p_parent_id, p_first_name, p_last_name, p_grade, p_gender, p_email, p_username, p_password);

  RETURN json_build_object('success', true);
EXCEPTION WHEN unique_violation THEN
  RETURN json_build_object('success', false, 'error', 'Username already taken');
WHEN OTHERS THEN
  RETURN json_build_object('success', false, 'error', SQLERRM);
END;
$$;