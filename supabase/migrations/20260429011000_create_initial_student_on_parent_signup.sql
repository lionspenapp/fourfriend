CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO public, extensions
AS $$
DECLARE
  v_display_name text := COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email);
  v_child jsonb := NEW.raw_user_meta_data->'initial_student';
  v_child_username text := lower(trim(COALESCE(v_child->>'username', '')));
BEGIN
  INSERT INTO public.profiles (user_id, display_name)
  VALUES (NEW.id, v_display_name)
  ON CONFLICT (user_id) DO UPDATE
    SET display_name = EXCLUDED.display_name,
        updated_at = now();

  INSERT INTO public.parent_profiles (user_id, display_name, email)
  VALUES (NEW.id, v_display_name, NEW.email)
  ON CONFLICT (user_id) DO UPDATE
    SET display_name = EXCLUDED.display_name,
        email = EXCLUDED.email,
        updated_at = now();

  IF v_child IS NOT NULL
     AND v_child_username <> ''
     AND COALESCE(v_child->>'password', '') <> '' THEN
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
      NEW.id,
      trim(COALESCE(v_child->>'first_name', '')),
      trim(COALESCE(v_child->>'last_name', '')),
      COALESCE((v_child->>'grade')::integer, 3),
      COALESCE(NULLIF(trim(COALESCE(v_child->>'gender', '')), ''), 'male'),
      NULLIF(trim(COALESCE(v_child->>'email', '')), ''),
      v_child_username,
      v_child->>'password'
    );
  END IF;

  RETURN NEW;
EXCEPTION WHEN unique_violation THEN
  RAISE EXCEPTION 'Student username already taken';
END;
$$;
