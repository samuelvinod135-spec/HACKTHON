-- Create question_bank collection/table
CREATE TABLE IF NOT EXISTS public.question_bank (
  id TEXT PRIMARY KEY,
  subject TEXT NOT NULL,
  chapter TEXT NOT NULL,
  topic TEXT NOT NULL,
  exam_level TEXT NOT NULL,
  question_type TEXT NOT NULL DEFAULT 'MCQ',
  question TEXT NOT NULL,
  option_a TEXT NOT NULL,
  option_b TEXT NOT NULL,
  option_c TEXT NOT NULL,
  option_d TEXT NOT NULL,
  correct_option TEXT NOT NULL,
  answer TEXT NOT NULL,
  explanation TEXT,
  source TEXT,
  xp INTEGER NOT NULL DEFAULT 10,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Performance Indexes for fast filtering on Quiz & Mock Test queries
CREATE INDEX IF NOT EXISTS idx_question_bank_chapter ON public.question_bank(chapter);
CREATE INDEX IF NOT EXISTS idx_question_bank_exam_level ON public.question_bank(exam_level);
CREATE INDEX IF NOT EXISTS idx_question_bank_subject ON public.question_bank(subject);
CREATE INDEX IF NOT EXISTS idx_question_bank_chapter_level ON public.question_bank(chapter, exam_level);

-- Row Level Security (RLS)
ALTER TABLE public.question_bank ENABLE ROW LEVEL SECURITY;

-- Allow public read access to Question Bank
DROP POLICY IF EXISTS "Allow public read on question_bank" ON public.question_bank;
CREATE POLICY "Allow public read on question_bank"
  ON public.question_bank
  FOR SELECT
  USING (true);

-- Allow authenticated/service insert & update
DROP POLICY IF EXISTS "Allow authenticated insert on question_bank" ON public.question_bank;
CREATE POLICY "Allow authenticated insert on question_bank"
  ON public.question_bank
  FOR INSERT
  WITH CHECK (true);

DROP POLICY IF EXISTS "Allow authenticated update on question_bank" ON public.question_bank;
CREATE POLICY "Allow authenticated update on question_bank"
  ON public.question_bank
  FOR UPDATE
  USING (true);
