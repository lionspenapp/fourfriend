-- Program calendar day follows US Eastern Time (not server TZ, e.g. Europe/Stockholm).

CREATE OR REPLACE FUNCTION public.eastern_calendar_today()
RETURNS date
LANGUAGE sql
STABLE
SET search_path TO 'public'
AS $$
  SELECT (timezone('America/New_York', now()))::date;
$$;

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
  v_today date := public.eastern_calendar_today();
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
           submitted_at = now(),
           completed_at = now()
     WHERE id = v_existing.id;
    RETURN json_build_object('success', true, 'day', v_existing.day);
  END IF;

  SELECT COALESCE(MAX(day), 0) + 1 INTO v_next_day
    FROM public.submissions
   WHERE student_id = p_student_id AND week = p_week AND completed_at IS NOT NULL;

  INSERT INTO public.submissions
    (student_id, academic_response, emotion_response, character_response, week, day, entry_date, completed_at)
  VALUES
    (p_student_id, p_academic, p_emotion, p_character, p_week, v_next_day, v_today, now());

  RETURN json_build_object('success', true, 'day', v_next_day);
EXCEPTION WHEN OTHERS THEN
  RETURN json_build_object('success', false, 'error', SQLERRM);
END;
$function$;

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
     AND entry_date = public.eastern_calendar_today()
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
       AND entry_date = public.eastern_calendar_today() AND completed_at IS NOT NULL
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

ALTER TABLE public.submissions
  ALTER COLUMN entry_date SET DEFAULT public.eastern_calendar_today();
