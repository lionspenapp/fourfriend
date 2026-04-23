-- 1. Delete Ken's orphan Day 2 (Apr 21, never completed)
DELETE FROM public.submissions
WHERE id = '91716c09-a0f3-4ee4-b7b6-4c40ff4b8180';

-- 2. Renumber today's completed entry from Day 3 to Day 2
UPDATE public.submissions
   SET day = 2
 WHERE id = '8e128814-4fb1-474a-a5ac-5396384ae86c';

-- 3. Patch submit_student_response so completed_at is set on insert/update
CREATE OR REPLACE FUNCTION public.submit_student_response(p_student_id uuid, p_academic text, p_emotion text, p_character text, p_week integer)
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
           submitted_at = now(),
           completed_at = now()
     WHERE id = v_existing.id;
    RETURN json_build_object('success', true, 'day', v_existing.day);
  END IF;

  -- Use next contiguous day based on completed entries (skips orphans if any ever appear)
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