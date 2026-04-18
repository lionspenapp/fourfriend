-- Add completed_at column to track when student finishes celestial message
ALTER TABLE public.submissions ADD COLUMN IF NOT EXISTS completed_at timestamptz;

-- Add unique constraint so we can upsert on (student_id, week, day)
DO $$ BEGIN
  ALTER TABLE public.submissions ADD CONSTRAINT submissions_student_week_day_unique UNIQUE (student_id, week, day);
EXCEPTION WHEN duplicate_table THEN NULL; WHEN duplicate_object THEN NULL;
END $$;

-- Update submit_student_response to upsert (so resumed sessions can overwrite)
CREATE OR REPLACE FUNCTION public.submit_student_response(p_student_id uuid, p_academic text, p_emotion text, p_character text, p_week integer, p_day integer)
 RETURNS json
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM public.students WHERE id = p_student_id) THEN
    RETURN json_build_object('success', false, 'error', 'Student not found');
  END IF;

  -- Block re-submit only if the day was fully completed (celestial closed)
  IF EXISTS (SELECT 1 FROM public.submissions WHERE student_id = p_student_id AND week = p_week AND day = p_day AND completed_at IS NOT NULL) THEN
    RETURN json_build_object('success', false, 'error', 'Already completed today');
  END IF;

  INSERT INTO public.submissions (student_id, academic_response, emotion_response, character_response, week, day)
  VALUES (p_student_id, p_academic, p_emotion, p_character, p_week, p_day)
  ON CONFLICT (student_id, week, day) DO UPDATE
    SET academic_response = EXCLUDED.academic_response,
        emotion_response = EXCLUDED.emotion_response,
        character_response = EXCLUDED.character_response,
        submitted_at = now();

  RETURN json_build_object('success', true);
EXCEPTION WHEN OTHERS THEN
  RETURN json_build_object('success', false, 'error', SQLERRM);
END;
$function$;

-- New RPC: mark a submission complete (called when student closes celestial message)
CREATE OR REPLACE FUNCTION public.mark_submission_complete(p_student_id uuid, p_week integer, p_day integer)
 RETURNS json
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
BEGIN
  UPDATE public.submissions
     SET completed_at = now()
   WHERE student_id = p_student_id AND week = p_week AND day = p_day AND completed_at IS NULL;

  RETURN json_build_object('success', true);
EXCEPTION WHEN OTHERS THEN
  RETURN json_build_object('success', false, 'error', SQLERRM);
END;
$function$;