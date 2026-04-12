
-- Profiles for parents (auth users)
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile" ON public.profiles FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = user_id);

-- Students managed by parents
CREATE TABLE public.students (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  parent_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  grade INTEGER NOT NULL CHECK (grade >= 3 AND grade <= 8),
  username TEXT NOT NULL,
  password_hash TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(parent_id, username)
);
ALTER TABLE public.students ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Parents can view own students" ON public.students FOR SELECT USING (auth.uid() = parent_id);
CREATE POLICY "Parents can create students" ON public.students FOR INSERT WITH CHECK (auth.uid() = parent_id);
CREATE POLICY "Parents can update own students" ON public.students FOR UPDATE USING (auth.uid() = parent_id);
CREATE POLICY "Parents can delete own students" ON public.students FOR DELETE USING (auth.uid() = parent_id);

-- Questions bank
CREATE TABLE public.questions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category TEXT NOT NULL CHECK (category IN ('academic', 'emotion', 'character')),
  grade_band TEXT NOT NULL CHECK (grade_band IN ('3-4', '5-6', '7-8')),
  week INTEGER NOT NULL CHECK (week >= 1 AND week <= 4),
  day INTEGER NOT NULL CHECK (day >= 1 AND day <= 5),
  prompt TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.questions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Questions readable by all authenticated" ON public.questions FOR SELECT TO authenticated USING (true);

-- Celestial messages
CREATE TABLE public.celestial_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  week INTEGER NOT NULL CHECK (week >= 1 AND week <= 4),
  day INTEGER NOT NULL CHECK (day >= 1 AND day <= 5),
  author TEXT NOT NULL,
  quote TEXT NOT NULL,
  body TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.celestial_messages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Messages readable by all authenticated" ON public.celestial_messages FOR SELECT TO authenticated USING (true);

-- Submissions
CREATE TABLE public.submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID NOT NULL REFERENCES public.students(id) ON DELETE CASCADE,
  academic_response TEXT NOT NULL DEFAULT '',
  emotion_response TEXT NOT NULL DEFAULT '',
  character_response TEXT NOT NULL DEFAULT '',
  week INTEGER NOT NULL,
  day INTEGER NOT NULL,
  submitted_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.submissions ENABLE ROW LEVEL SECURITY;

-- Parents can view their students' submissions
CREATE POLICY "Parents can view student submissions" ON public.submissions
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.students WHERE students.id = submissions.student_id AND students.parent_id = auth.uid())
  );

-- Authenticated users can insert submissions (student flow)
CREATE POLICY "Authenticated can create submissions" ON public.submissions
  FOR INSERT TO authenticated WITH CHECK (true);

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (user_id, display_name)
  VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email));
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Updated_at trigger
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_students_updated_at BEFORE UPDATE ON public.students FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
