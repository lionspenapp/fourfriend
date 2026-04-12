CREATE OR REPLACE FUNCTION public.hash_student_password()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public', 'extensions'
AS $function$
BEGIN
  IF NEW.password_hash IS NOT NULL AND NEW.password_hash NOT LIKE '$2a$%' AND NEW.password_hash NOT LIKE '$2b$%' THEN
    NEW.password_hash := extensions.crypt(NEW.password_hash, extensions.gen_salt('bf'));
  END IF;
  RETURN NEW;
END;
$function$;

CREATE OR REPLACE FUNCTION public.verify_student_login(p_username text, p_password text)
 RETURNS json
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public', 'extensions'
AS $function$
DECLARE
  v_student record;
BEGIN
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
    AND password_hash = extensions.crypt(p_password, password_hash);

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
$function$;