-- Per-category prompt banks and celestial messages, matching the app (see .lovable/plan.md).
-- grade_level values: '3-4' | '5-6' | '7-8'

CREATE TABLE IF NOT EXISTS public.academic_database (
  id TEXT PRIMARY KEY,
  grade_level TEXT NOT NULL CHECK (grade_level IN ('3-4', '5-6', '7-8')),
  week INTEGER NOT NULL CHECK (week >= 1 AND week <= 4),
  day INTEGER NOT NULL CHECK (day >= 1 AND day <= 5),
  prompt TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.emotion_database (
  id TEXT PRIMARY KEY,
  grade_level TEXT NOT NULL CHECK (grade_level IN ('3-4', '5-6', '7-8')),
  week INTEGER NOT NULL CHECK (week >= 1 AND week <= 4),
  day INTEGER NOT NULL CHECK (day >= 1 AND day <= 5),
  prompt TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.character_database (
  id TEXT PRIMARY KEY,
  grade_level TEXT NOT NULL CHECK (grade_level IN ('3-4', '5-6', '7-8')),
  week INTEGER NOT NULL CHECK (week >= 1 AND week <= 4),
  day INTEGER NOT NULL CHECK (day >= 1 AND day <= 5),
  prompt TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.message_database (
  id TEXT PRIMARY KEY,
  grade_level TEXT NOT NULL CHECK (grade_level IN ('3-4', '5-6', '7-8')),
  week INTEGER NOT NULL CHECK (week >= 1 AND week <= 4),
  day INTEGER NOT NULL CHECK (day >= 1 AND day <= 5),
  author TEXT NOT NULL,
  quotation TEXT NOT NULL,
  explanation TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.academic_database ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.emotion_database ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.character_database ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.message_database ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Academic content readable by everyone" ON public.academic_database;
CREATE POLICY "Academic content readable by everyone"
  ON public.academic_database FOR SELECT USING (true);

DROP POLICY IF EXISTS "Emotion content readable by everyone" ON public.emotion_database;
CREATE POLICY "Emotion content readable by everyone"
  ON public.emotion_database FOR SELECT USING (true);

DROP POLICY IF EXISTS "Character content readable by everyone" ON public.character_database;
CREATE POLICY "Character content readable by everyone"
  ON public.character_database FOR SELECT USING (true);

DROP POLICY IF EXISTS "Celestial messages readable by everyone" ON public.message_database;
CREATE POLICY "Celestial messages readable by everyone"
  ON public.message_database FOR SELECT USING (true);
