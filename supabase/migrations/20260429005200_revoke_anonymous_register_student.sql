REVOKE EXECUTE ON FUNCTION public.register_student(uuid, text, text, integer, text, text, text, text) FROM anon;
GRANT EXECUTE ON FUNCTION public.register_student(uuid, text, text, integer, text, text, text, text) TO authenticated;
