-- Parent sign-up registers the first student in the same request. Often there is no
-- JWT yet (email confirmation), so auth.uid() is NULL — the old "must be signed in"
-- check incorrectly blocked that flow.
--
-- Rules:
-- 1) If auth.uid() is set: it must equal p_parent_id (dashboard "add child").
-- 2) If auth.uid() is NULL: p_parent_id must be a recently created auth user
--    (same browser flow right after signUp). Stops arbitrary UUID guessing on old accounts.

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
DECLARE
  v_uid uuid := auth.uid();
BEGIN
  IF v_uid IS NOT NULL THEN
    IF v_uid IS DISTINCT FROM p_parent_id THEN
      RETURN json_build_object(
        'success', false,
        'error',
        'You can only register students for your own account.'
      );
    END IF;
  ELSE
    -- Sign-up flow: no session yet (e.g. email confirmation). Only allow linking
    -- the first student to a brand-new parent account — not arbitrary UUIDs.
    IF NOT EXISTS (
      SELECT 1 FROM auth.users u WHERE u.id = p_parent_id
    ) OR EXISTS (
      SELECT 1 FROM public.students s WHERE s.parent_id = p_parent_id
    ) OR NOT EXISTS (
      SELECT 1
      FROM auth.users u
      WHERE u.id = p_parent_id
        AND u.created_at > now() - interval '30 days'
    ) THEN
      RETURN json_build_object(
        'success', false,
        'error',
        'Could not link student to your new account. Finish email confirmation if asked, sign in to the parent portal, then use Add Child if needed.'
      );
    END IF;
  END IF;

  INSERT INTO public.students (parent_id, first_name, last_name, grade, gender, email, username, password_hash)
  VALUES (p_parent_id, p_first_name, p_last_name, p_grade, p_gender, p_email, p_username, p_password);

  RETURN json_build_object('success', true);
EXCEPTION WHEN unique_violation THEN
  RETURN json_build_object('success', false, 'error', 'Username already taken');
WHEN OTHERS THEN
  RETURN json_build_object('success', false, 'error', SQLERRM);
END;
$$;
