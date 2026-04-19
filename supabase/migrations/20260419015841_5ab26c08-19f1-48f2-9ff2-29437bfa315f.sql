
-- Add entry_date column
ALTER TABLE public.submissions
  ADD COLUMN IF NOT EXISTS entry_date date;

UPDATE public.submissions
   SET entry_date = submitted_at::date
 WHERE entry_date IS NULL;

WITH ranked AS (
  SELECT id,
         row_number() OVER (
           PARTITION BY student_id, week, entry_date
           ORDER BY (completed_at IS NOT NULL) DESC, submitted_at DESC
         ) AS rn
    FROM public.submissions
)
DELETE FROM public.submissions
 WHERE id IN (SELECT id FROM ranked WHERE rn > 1);

WITH ranked AS (
  SELECT id,
         row_number() OVER (PARTITION BY student_id, week ORDER BY submitted_at) AS new_day
    FROM public.submissions
)
UPDATE public.submissions s
   SET day = r.new_day
  FROM ranked r
 WHERE s.id = r.id;

ALTER TABLE public.submissions
  ALTER COLUMN entry_date SET NOT NULL,
  ALTER COLUMN entry_date SET DEFAULT CURRENT_DATE;

-- Drop known unique constraint names on (student_id, week, day)
ALTER TABLE public.submissions DROP CONSTRAINT IF EXISTS submissions_student_id_week_day_key;
ALTER TABLE public.submissions DROP CONSTRAINT IF EXISTS submissions_student_week_day_unique;
ALTER TABLE public.submissions DROP CONSTRAINT IF EXISTS submissions_student_week_day_key;

ALTER TABLE public.submissions
  DROP CONSTRAINT IF EXISTS submissions_student_week_entrydate_unique;

ALTER TABLE public.submissions
  ADD CONSTRAINT submissions_student_week_entrydate_unique
  UNIQUE (student_id, week, entry_date);

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
SET search_path TO 'public'
AS $function$
DECLARE
  v_today date := CURRENT_DATE;
  v_existing record;
  v_next_day integer;
BEGIN
  IF NOT EXISTS (SELECT 1 FROM public.students WHERE id = p_student_id) THEN
    RETURN json_build_object('success', false, 'error', 'Student not found');
  END IF;

  IF (SELECT count(*) FROM public.submissions
       WHERE student_id = p_student_id AND week = p_week AND completed_at IS NOT NULL) >= 5 THEN
    RETURN json_build_object('success', false, 'error', 'Weekly limit reached');
  END IF;

  IF EXISTS (SELECT 1 FROM public.submissions
              WHERE student_id = p_student_id AND week = p_week
                AND entry_date = v_today AND completed_at IS NOT NULL) THEN
    RETURN json_build_object('success', false, 'error', 'Already completed today');
  END IF;

  SELECT id, day INTO v_existing
    FROM public.submissions
   WHERE student_id = p_student_id AND week = p_week AND entry_date = v_today;

  IF v_existing.id IS NOT NULL THEN
    UPDATE public.submissions
       SET academic_response = p_academic,
           emotion_response = p_emotion,
           character_response = p_character,
           submitted_at = now()
     WHERE id = v_existing.id;
    RETURN json_build_object('success', true, 'day', v_existing.day);
  END IF;

  SELECT COALESCE(MAX(day), 0) + 1 INTO v_next_day
    FROM public.submissions
   WHERE student_id = p_student_id AND week = p_week;

  INSERT INTO public.submissions
    (student_id, academic_response, emotion_response, character_response, week, day, entry_date)
  VALUES
    (p_student_id, p_academic, p_emotion, p_character, p_week, v_next_day, v_today);

  RETURN json_build_object('success', true, 'day', v_next_day);
EXCEPTION WHEN OTHERS THEN
  RETURN json_build_object('success', false, 'error', SQLERRM);
END;
$function$;

DROP FUNCTION IF EXISTS public.mark_submission_complete(uuid, integer, integer);
DROP FUNCTION IF EXISTS public.mark_submission_complete(uuid, integer);

CREATE OR REPLACE FUNCTION public.mark_submission_complete(
  p_student_id uuid,
  p_week integer
)
RETURNS json
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
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
$function$;

CREATE OR REPLACE FUNCTION public.get_student_week_status(
  p_student_id uuid,
  p_week integer
)
RETURNS json
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
DECLARE
  v_completed_count integer;
  v_today_done boolean;
  v_week_full boolean;
BEGIN
  SELECT count(*) INTO v_completed_count
    FROM public.submissions
   WHERE student_id = p_student_id AND week = p_week AND completed_at IS NOT NULL;

  v_today_done := EXISTS (
    SELECT 1 FROM public.submissions
     WHERE student_id = p_student_id AND week = p_week
       AND entry_date = CURRENT_DATE AND completed_at IS NOT NULL
  );

  v_week_full := v_completed_count >= 5;

  RETURN json_build_object(
    'today_done', v_today_done,
    'week_full', v_week_full,
    'completed_count', v_completed_count,
    'next_day', LEAST(v_completed_count + 1, 5)
  );
END;
$function$;

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
  submitted_at timestamp with time zone,
  completed_at timestamp with time zone
)
LANGUAGE sql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
  SELECT id, day, entry_date, academic_response, emotion_response, character_response, submitted_at, completed_at
  FROM public.submissions
  WHERE student_id = p_student_id
    AND week = p_week
    AND completed_at IS NOT NULL
  ORDER BY day ASC;
$function$;
