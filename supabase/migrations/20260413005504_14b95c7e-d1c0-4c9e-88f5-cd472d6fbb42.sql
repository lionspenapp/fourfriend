
CREATE OR REPLACE FUNCTION public.submit_student_response(
  p_student_id uuid,
  p_academic text,
  p_emotion text,
  p_character text,
  p_week integer,
  p_day integer
)
RETURNS json
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Validate student exists
  IF NOT EXISTS (SELECT 1 FROM public.students WHERE id = p_student_id) THEN
    RETURN json_build_object('success', false, 'error', 'Student not found');
  END IF;

  -- Check for duplicate submission
  IF EXISTS (SELECT 1 FROM public.submissions WHERE student_id = p_student_id AND week = p_week AND day = p_day) THEN
    RETURN json_build_object('success', false, 'error', 'Already submitted today');
  END IF;

  INSERT INTO public.submissions (student_id, academic_response, emotion_response, character_response, week, day)
  VALUES (p_student_id, p_academic, p_emotion, p_character, p_week, p_day);

  RETURN json_build_object('success', true);
EXCEPTION WHEN OTHERS THEN
  RETURN json_build_object('success', false, 'error', SQLERRM);
END;
$$;
