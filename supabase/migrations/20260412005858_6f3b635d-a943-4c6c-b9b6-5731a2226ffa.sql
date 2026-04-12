
DROP POLICY "Authenticated can create submissions" ON public.submissions;

CREATE POLICY "Can create submissions for own students" ON public.submissions
  FOR INSERT TO authenticated
  WITH CHECK (
    EXISTS (SELECT 1 FROM public.students WHERE students.id = submissions.student_id AND students.parent_id = auth.uid())
  );
