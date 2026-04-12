CREATE OR REPLACE FUNCTION public.update_student_password(p_student_id uuid, p_parent_id uuid, p_new_password text)
RETURNS json
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public', 'extensions'
AS $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM public.students WHERE id = p_student_id AND parent_id = p_parent_id) THEN
    RETURN json_build_object('success', false, 'error', 'Student not found');
  END IF;

  UPDATE public.students
  SET password_hash = extensions.crypt(p_new_password, extensions.gen_salt('bf')),
      updated_at = now()
  WHERE id = p_student_id AND parent_id = p_parent_id;

  RETURN json_build_object('success', true);
EXCEPTION WHEN OTHERS THEN
  RETURN json_build_object('success', false, 'error', SQLERRM);
END;
$$;