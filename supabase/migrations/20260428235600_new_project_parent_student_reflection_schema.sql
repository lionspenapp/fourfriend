-- Schema-only bootstrap for a fresh Supabase project.
-- This migration creates the parent, student, reflection, quotation, and
-- content tables the app needs. It intentionally does not copy or seed old
-- parent/student/reflection data.

CREATE EXTENSION IF NOT EXISTS pgcrypto WITH SCHEMA extensions;

CREATE TABLE IF NOT EXISTS public.parent_profiles (
  user_id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name text,
  email text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.students (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  parent_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  first_name text NOT NULL,
  last_name text NOT NULL,
  grade integer NOT NULL CHECK (grade >= 3 AND grade <= 8),
  gender text NOT NULL DEFAULT 'male',
  email text,
  username text NOT NULL,
  password_hash text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (parent_id, username)
);

ALTER TABLE public.students ADD COLUMN IF NOT EXISTS gender text NOT NULL DEFAULT 'male';
ALTER TABLE public.students ADD COLUMN IF NOT EXISTS email text;
ALTER TABLE public.students ADD COLUMN IF NOT EXISTS created_at timestamptz NOT NULL DEFAULT now();
ALTER TABLE public.students ADD COLUMN IF NOT EXISTS updated_at timestamptz NOT NULL DEFAULT now();

CREATE TABLE IF NOT EXISTS public.submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id uuid NOT NULL REFERENCES public.students(id) ON DELETE CASCADE,
  academic_response text NOT NULL DEFAULT '',
  emotion_response text NOT NULL DEFAULT '',
  character_response text NOT NULL DEFAULT '',
  week integer NOT NULL CHECK (week >= 1 AND week <= 4),
  day integer NOT NULL CHECK (day >= 1 AND day <= 5),
  entry_date date NOT NULL DEFAULT CURRENT_DATE,
  submitted_at timestamptz NOT NULL DEFAULT now(),
  completed_at timestamptz
);

ALTER TABLE public.submissions ADD COLUMN IF NOT EXISTS entry_date date NOT NULL DEFAULT CURRENT_DATE;
ALTER TABLE public.submissions ADD COLUMN IF NOT EXISTS completed_at timestamptz;
ALTER TABLE public.submissions DROP CONSTRAINT IF EXISTS submissions_student_week_entrydate_unique;
ALTER TABLE public.submissions ADD CONSTRAINT submissions_student_week_entrydate_unique UNIQUE (student_id, week, entry_date);

CREATE TABLE IF NOT EXISTS public.saved_quotations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id uuid NOT NULL REFERENCES public.students(id) ON DELETE CASCADE,
  quote text NOT NULL,
  author text NOT NULL,
  week integer,
  day integer,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.academic_database (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  grade_level text NOT NULL CHECK (grade_level IN ('3-4', '5-6', '7-8')),
  week integer NOT NULL CHECK (week >= 1 AND week <= 4),
  day integer NOT NULL CHECK (day >= 1 AND day <= 5),
  prompt text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (grade_level, week, day)
);

CREATE TABLE IF NOT EXISTS public.emotion_database (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  grade_level text NOT NULL CHECK (grade_level IN ('3-4', '5-6', '7-8')),
  week integer NOT NULL CHECK (week >= 1 AND week <= 4),
  day integer NOT NULL CHECK (day >= 1 AND day <= 5),
  prompt text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (grade_level, week, day)
);

CREATE TABLE IF NOT EXISTS public.character_database (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  grade_level text NOT NULL CHECK (grade_level IN ('3-4', '5-6', '7-8')),
  week integer NOT NULL CHECK (week >= 1 AND week <= 4),
  day integer NOT NULL CHECK (day >= 1 AND day <= 5),
  prompt text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (grade_level, week, day)
);

CREATE TABLE IF NOT EXISTS public.message_database (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  grade_level text NOT NULL CHECK (grade_level IN ('3-4', '5-6', '7-8')),
  week integer NOT NULL CHECK (week >= 1 AND week <= 4),
  day integer NOT NULL CHECK (day >= 1 AND day <= 5),
  author text NOT NULL,
  quotation text NOT NULL,
  explanation text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (grade_level, week, day)
);

CREATE TABLE IF NOT EXISTS public.questions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  category text NOT NULL CHECK (category IN ('academic', 'emotion', 'character')),
  grade_band text NOT NULL CHECK (grade_band IN ('3-4', '5-6', '7-8')),
  week integer NOT NULL CHECK (week >= 1 AND week <= 4),
  day integer NOT NULL CHECK (day >= 1 AND day <= 5),
  prompt text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (category, grade_band, week, day)
);

CREATE TABLE IF NOT EXISTS public.celestial_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  week integer NOT NULL CHECK (week >= 1 AND week <= 4),
  day integer NOT NULL CHECK (day >= 1 AND day <= 5),
  author text NOT NULL,
  quote text NOT NULL,
  body text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (week, day)
);

CREATE INDEX IF NOT EXISTS idx_students_parent_created ON public.students(parent_id, created_at);
CREATE INDEX IF NOT EXISTS idx_submissions_student_week_day ON public.submissions(student_id, week, day);
CREATE INDEX IF NOT EXISTS idx_submissions_student_week_entry_date ON public.submissions(student_id, week, entry_date);
CREATE INDEX IF NOT EXISTS idx_saved_quotations_student_created ON public.saved_quotations(student_id, created_at DESC);

CREATE OR REPLACE VIEW public.students_safe WITH (security_invoker = true) AS
  SELECT id, parent_id, first_name, last_name, grade, username, gender, email, created_at, updated_at
  FROM public.students;

CREATE OR REPLACE VIEW public.student_reflection_activities WITH (security_invoker = true) AS
  SELECT
    id,
    student_id,
    week,
    day,
    entry_date,
    academic_response,
    emotion_response,
    character_response,
    submitted_at,
    completed_at
  FROM public.submissions;

ALTER TABLE public.parent_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.students ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.saved_quotations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.academic_database ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.emotion_database ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.character_database ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.message_database ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.celestial_messages ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Parents can view own parent profile" ON public.parent_profiles;
CREATE POLICY "Parents can view own parent profile"
  ON public.parent_profiles FOR SELECT TO authenticated
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Parents can update own parent profile" ON public.parent_profiles;
CREATE POLICY "Parents can update own parent profile"
  ON public.parent_profiles FOR UPDATE TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;
CREATE POLICY "Users can view own profile"
  ON public.profiles FOR SELECT TO authenticated
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert own profile" ON public.profiles;
CREATE POLICY "Users can insert own profile"
  ON public.profiles FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Parents can view own students" ON public.students;
DROP POLICY IF EXISTS "Parents can view own students restricted" ON public.students;
CREATE POLICY "Parents can view own students"
  ON public.students FOR SELECT TO authenticated
  USING (auth.uid() = parent_id);

DROP POLICY IF EXISTS "Parents can create students" ON public.students;
CREATE POLICY "Parents can create students"
  ON public.students FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = parent_id);

DROP POLICY IF EXISTS "Parents can update own students" ON public.students;
CREATE POLICY "Parents can update own students"
  ON public.students FOR UPDATE TO authenticated
  USING (auth.uid() = parent_id)
  WITH CHECK (auth.uid() = parent_id);

DROP POLICY IF EXISTS "Parents can delete own students" ON public.students;
CREATE POLICY "Parents can delete own students"
  ON public.students FOR DELETE TO authenticated
  USING (auth.uid() = parent_id);

DROP POLICY IF EXISTS "Parents can view student submissions" ON public.submissions;
CREATE POLICY "Parents can view student submissions"
  ON public.submissions FOR SELECT TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.students
      WHERE students.id = submissions.student_id
        AND students.parent_id = auth.uid()
    )
  );

DROP POLICY IF EXISTS "Service functions manage submissions" ON public.submissions;
CREATE POLICY "Service functions manage submissions"
  ON public.submissions FOR ALL TO service_role
  USING (true)
  WITH CHECK (true);

DROP POLICY IF EXISTS "Parents read own student quotes" ON public.saved_quotations;
CREATE POLICY "Parents read own student quotes"
  ON public.saved_quotations FOR SELECT TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.students
      WHERE students.id = saved_quotations.student_id
        AND students.parent_id = auth.uid()
    )
  );

DROP POLICY IF EXISTS "Parents insert own student quotes" ON public.saved_quotations;
CREATE POLICY "Parents insert own student quotes"
  ON public.saved_quotations FOR INSERT TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.students
      WHERE students.id = saved_quotations.student_id
        AND students.parent_id = auth.uid()
    )
  );

DROP POLICY IF EXISTS "Parents delete own student quotes" ON public.saved_quotations;
CREATE POLICY "Parents delete own student quotes"
  ON public.saved_quotations FOR DELETE TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.students
      WHERE students.id = saved_quotations.student_id
        AND students.parent_id = auth.uid()
    )
  );

DROP POLICY IF EXISTS "Public can read academic prompts" ON public.academic_database;
CREATE POLICY "Public can read academic prompts"
  ON public.academic_database FOR SELECT TO anon, authenticated
  USING (true);

DROP POLICY IF EXISTS "Public can read emotion prompts" ON public.emotion_database;
CREATE POLICY "Public can read emotion prompts"
  ON public.emotion_database FOR SELECT TO anon, authenticated
  USING (true);

DROP POLICY IF EXISTS "Public can read character prompts" ON public.character_database;
CREATE POLICY "Public can read character prompts"
  ON public.character_database FOR SELECT TO anon, authenticated
  USING (true);

DROP POLICY IF EXISTS "Public can read messages" ON public.message_database;
CREATE POLICY "Public can read messages"
  ON public.message_database FOR SELECT TO anon, authenticated
  USING (true);

DROP POLICY IF EXISTS "Questions readable by everyone" ON public.questions;
DROP POLICY IF EXISTS "Questions readable by all authenticated" ON public.questions;
CREATE POLICY "Questions readable by everyone"
  ON public.questions FOR SELECT TO anon, authenticated
  USING (true);

DROP POLICY IF EXISTS "Messages readable by everyone" ON public.celestial_messages;
DROP POLICY IF EXISTS "Messages readable by all authenticated" ON public.celestial_messages;
CREATE POLICY "Messages readable by everyone"
  ON public.celestial_messages FOR SELECT TO anon, authenticated
  USING (true);

CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS update_parent_profiles_updated_at ON public.parent_profiles;
CREATE TRIGGER update_parent_profiles_updated_at
  BEFORE UPDATE ON public.parent_profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

DROP TRIGGER IF EXISTS update_profiles_updated_at ON public.profiles;
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

DROP TRIGGER IF EXISTS update_students_updated_at ON public.students;
CREATE TRIGGER update_students_updated_at
  BEFORE UPDATE ON public.students
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_display_name text := COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email);
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

  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

CREATE OR REPLACE FUNCTION public.hash_student_password()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO public, extensions
AS $$
BEGIN
  IF NEW.password_hash IS NOT NULL
     AND NEW.password_hash NOT LIKE '$2a$%'
     AND NEW.password_hash NOT LIKE '$2b$%'
     AND NEW.password_hash NOT LIKE '$2y$%' THEN
    NEW.password_hash := extensions.crypt(NEW.password_hash, extensions.gen_salt('bf'));
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS hash_student_password_trigger ON public.students;
CREATE TRIGGER hash_student_password_trigger
  BEFORE INSERT OR UPDATE OF password_hash ON public.students
  FOR EACH ROW EXECUTE FUNCTION public.hash_student_password();

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
  IF p_parent_id IS NULL THEN
    RETURN json_build_object('success', false, 'error', 'Parent is required');
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
    p_parent_id,
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

CREATE OR REPLACE FUNCTION public.verify_student_login(p_username text, p_password text)
RETURNS json
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO public, extensions
AS $$
DECLARE
  v_student record;
BEGIN
  IF p_username IS NULL OR length(trim(p_username)) < 1 OR length(p_username) > 100 THEN
    RETURN json_build_object('success', false, 'error', 'Invalid username');
  END IF;

  IF p_password IS NULL OR length(p_password) < 1 OR length(p_password) > 200 THEN
    RETURN json_build_object('success', false, 'error', 'Invalid password');
  END IF;

  SELECT id, first_name, last_name, grade, username, gender
  INTO v_student
  FROM public.students
  WHERE username = lower(trim(p_username))
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
$$;

CREATE OR REPLACE FUNCTION public.update_student_password(
  p_student_id uuid,
  p_parent_id uuid,
  p_new_password text
)
RETURNS json
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO public, extensions
AS $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM public.students
    WHERE id = p_student_id
      AND parent_id = p_parent_id
  ) THEN
    RETURN json_build_object('success', false, 'error', 'Student not found');
  END IF;

  UPDATE public.students
  SET password_hash = extensions.crypt(p_new_password, extensions.gen_salt('bf')),
      updated_at = now()
  WHERE id = p_student_id
    AND parent_id = p_parent_id;

  RETURN json_build_object('success', true);
EXCEPTION WHEN OTHERS THEN
  RETURN json_build_object('success', false, 'error', SQLERRM);
END;
$$;

DROP FUNCTION IF EXISTS public.submit_student_response(uuid, text, text, text, integer, integer);
DROP FUNCTION IF EXISTS public.submit_student_response(uuid, text, text, text, integer);
CREATE OR REPLACE FUNCTION public.submit_student_response(
  p_student_id uuid,
  p_academic text,
  p_emotion text,
  p_character text,
  p_week integer
)
RETURNS json
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO public
AS $$
DECLARE
  v_today date := CURRENT_DATE;
  v_existing record;
  v_next_day integer;
BEGIN
  IF NOT EXISTS (SELECT 1 FROM public.students WHERE id = p_student_id) THEN
    RETURN json_build_object('success', false, 'error', 'Student not found');
  END IF;

  IF (
    SELECT count(*)
    FROM public.submissions
    WHERE student_id = p_student_id
      AND week = p_week
      AND completed_at IS NOT NULL
  ) >= 5 THEN
    RETURN json_build_object('success', false, 'error', 'Weekly limit reached');
  END IF;

  IF EXISTS (
    SELECT 1
    FROM public.submissions
    WHERE student_id = p_student_id
      AND week = p_week
      AND entry_date = v_today
      AND completed_at IS NOT NULL
  ) THEN
    RETURN json_build_object('success', false, 'error', 'Already completed today');
  END IF;

  SELECT id, day INTO v_existing
  FROM public.submissions
  WHERE student_id = p_student_id
    AND week = p_week
    AND entry_date = v_today;

  IF v_existing.id IS NOT NULL THEN
    UPDATE public.submissions
    SET academic_response = COALESCE(p_academic, ''),
        emotion_response = COALESCE(p_emotion, ''),
        character_response = COALESCE(p_character, ''),
        submitted_at = now()
    WHERE id = v_existing.id;

    RETURN json_build_object('success', true, 'day', v_existing.day);
  END IF;

  SELECT COALESCE(MAX(day), 0) + 1 INTO v_next_day
  FROM public.submissions
  WHERE student_id = p_student_id
    AND week = p_week;

  INSERT INTO public.submissions (
    student_id,
    academic_response,
    emotion_response,
    character_response,
    week,
    day,
    entry_date
  )
  VALUES (
    p_student_id,
    COALESCE(p_academic, ''),
    COALESCE(p_emotion, ''),
    COALESCE(p_character, ''),
    p_week,
    v_next_day,
    v_today
  );

  RETURN json_build_object('success', true, 'day', v_next_day);
EXCEPTION WHEN OTHERS THEN
  RETURN json_build_object('success', false, 'error', SQLERRM);
END;
$$;

DROP FUNCTION IF EXISTS public.mark_submission_complete(uuid, integer, integer);
DROP FUNCTION IF EXISTS public.mark_submission_complete(uuid, integer);
CREATE OR REPLACE FUNCTION public.mark_submission_complete(
  p_student_id uuid,
  p_week integer
)
RETURNS json
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO public
AS $$
BEGIN
  UPDATE public.submissions
  SET completed_at = now()
  WHERE student_id = p_student_id
    AND week = p_week
    AND entry_date = CURRENT_DATE
    AND completed_at IS NULL;

  RETURN json_build_object('success', true);
EXCEPTION WHEN OTHERS THEN
  RETURN json_build_object('success', false, 'error', SQLERRM);
END;
$$;

CREATE OR REPLACE FUNCTION public.get_student_week_status(
  p_student_id uuid,
  p_week integer
)
RETURNS json
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO public
AS $$
DECLARE
  v_completed_count integer;
  v_today_done boolean;
BEGIN
  SELECT count(*) INTO v_completed_count
  FROM public.submissions
  WHERE student_id = p_student_id
    AND week = p_week
    AND completed_at IS NOT NULL;

  v_today_done := EXISTS (
    SELECT 1
    FROM public.submissions
    WHERE student_id = p_student_id
      AND week = p_week
      AND entry_date = CURRENT_DATE
      AND completed_at IS NOT NULL
  );

  RETURN json_build_object(
    'today_done', v_today_done,
    'week_full', v_completed_count >= 5,
    'completed_count', v_completed_count,
    'next_day', LEAST(v_completed_count + 1, 5)
  );
END;
$$;

DROP FUNCTION IF EXISTS public.get_student_week_submissions(uuid, integer);
CREATE OR REPLACE FUNCTION public.get_student_week_submissions(
  p_student_id uuid,
  p_week integer
)
RETURNS TABLE(
  id uuid,
  day integer,
  entry_date date,
  academic_response text,
  emotion_response text,
  character_response text,
  submitted_at timestamptz,
  completed_at timestamptz
)
LANGUAGE sql
SECURITY DEFINER
SET search_path TO public
AS $$
  SELECT id, day, entry_date, academic_response, emotion_response, character_response, submitted_at, completed_at
  FROM public.submissions
  WHERE student_id = p_student_id
    AND week = p_week
    AND completed_at IS NOT NULL
  ORDER BY day ASC;
$$;

CREATE OR REPLACE FUNCTION public.save_quotation(
  p_student_id uuid,
  p_quote text,
  p_author text,
  p_week integer,
  p_day integer
)
RETURNS json
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO public
AS $$
DECLARE
  v_id uuid;
  v_existing uuid;
BEGIN
  IF NOT EXISTS (SELECT 1 FROM public.students WHERE id = p_student_id) THEN
    RETURN json_build_object('success', false, 'error', 'Student not found');
  END IF;

  SELECT id INTO v_existing
  FROM public.saved_quotations
  WHERE student_id = p_student_id
    AND quote = p_quote
    AND author = p_author
  LIMIT 1;

  IF v_existing IS NOT NULL THEN
    RETURN json_build_object('success', false, 'error', 'already_saved');
  END IF;

  INSERT INTO public.saved_quotations(student_id, quote, author, week, day)
  VALUES (p_student_id, p_quote, p_author, p_week, p_day)
  RETURNING id INTO v_id;

  DELETE FROM public.saved_quotations
  WHERE student_id = p_student_id
    AND id NOT IN (
      SELECT id
      FROM public.saved_quotations
      WHERE student_id = p_student_id
      ORDER BY created_at DESC
      LIMIT 24
    );

  RETURN json_build_object('success', true, 'id', v_id);
EXCEPTION WHEN OTHERS THEN
  RETURN json_build_object('success', false, 'error', SQLERRM);
END;
$$;

DROP FUNCTION IF EXISTS public.get_saved_quotations(uuid);
CREATE OR REPLACE FUNCTION public.get_saved_quotations(p_student_id uuid)
RETURNS TABLE(id uuid, quote text, author text, week integer, day integer, created_at timestamptz)
LANGUAGE sql
SECURITY DEFINER
SET search_path TO public
AS $$
  SELECT id, quote, author, week, day, created_at
  FROM public.saved_quotations
  WHERE student_id = p_student_id
  ORDER BY created_at DESC;
$$;

DROP FUNCTION IF EXISTS public.delete_saved_quotation(uuid, uuid);
CREATE OR REPLACE FUNCTION public.delete_saved_quotation(p_student_id uuid, p_id uuid)
RETURNS json
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO public
AS $$
BEGIN
  DELETE FROM public.saved_quotations
  WHERE id = p_id
    AND student_id = p_student_id;

  RETURN json_build_object('success', true);
EXCEPTION WHEN OTHERS THEN
  RETURN json_build_object('success', false, 'error', SQLERRM);
END;
$$;

GRANT SELECT ON public.academic_database TO anon, authenticated;
GRANT SELECT ON public.emotion_database TO anon, authenticated;
GRANT SELECT ON public.character_database TO anon, authenticated;
GRANT SELECT ON public.message_database TO anon, authenticated;
GRANT SELECT ON public.questions TO anon, authenticated;
GRANT SELECT ON public.celestial_messages TO anon, authenticated;
GRANT SELECT ON public.student_reflection_activities TO authenticated;
GRANT EXECUTE ON FUNCTION public.register_student(uuid, text, text, integer, text, text, text, text) TO authenticated;
GRANT EXECUTE ON FUNCTION public.verify_student_login(text, text) TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.update_student_password(uuid, uuid, text) TO authenticated;
GRANT EXECUTE ON FUNCTION public.submit_student_response(uuid, text, text, text, integer) TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.mark_submission_complete(uuid, integer) TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.get_student_week_status(uuid, integer) TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.get_student_week_submissions(uuid, integer) TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.save_quotation(uuid, text, text, integer, integer) TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.get_saved_quotations(uuid) TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.delete_saved_quotation(uuid, uuid) TO anon, authenticated;
