-- ==============================================================================
-- LabXplore Schema Upgrade: Format Preference Tracker & Mastery Deltas
-- Migration: 20260909_format_preference_and_mastery.sql
-- ==============================================================================

-- 1. Extend profiles table with learning_style_weights JSONB column
ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS learning_style_weights JSONB DEFAULT '{
    "visual_simulation": 0.333,
    "textual_derivation": 0.333,
    "numerical_practice": 0.334
  }'::jsonb;

-- Comment for schema documentation
COMMENT ON COLUMN public.profiles.learning_style_weights IS 
  'Dynamic learning preference weights tracking visual_simulation, textual_derivation, and numerical_practice normalized to 1.0 (starting at ~33% each)';

-- 2. Update trigger to populate learning_style_weights on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (
    id, 
    username, 
    full_name, 
    avatar_url, 
    level, 
    xp, 
    xp_for_level, 
    grade_level,
    learning_style_weights
  )
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'username', split_part(NEW.email, '@', 1)),
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name', split_part(NEW.email, '@', 1)),
    COALESCE(NEW.raw_user_meta_data->>'avatar_url', '/clay/avatar.jpg'),
    1,
    0,
    1000,
    COALESCE(NEW.raw_user_meta_data->>'grade_level', 'Grade 9-10'),
    '{
      "visual_simulation": 0.333,
      "textual_derivation": 0.333,
      "numerical_practice": 0.334
    }'::jsonb
  )
  ON CONFLICT (id) DO UPDATE SET
    full_name = COALESCE(public.profiles.full_name, EXCLUDED.full_name),
    avatar_url = COALESCE(public.profiles.avatar_url, EXCLUDED.avatar_url),
    learning_style_weights = COALESCE(public.profiles.learning_style_weights, EXCLUDED.learning_style_weights);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 3. Mastery Deltas Table (Proves that learning occurred on the platform)
CREATE TABLE IF NOT EXISTS public.mastery_deltas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  chapter_id TEXT NOT NULL,
  pre_test_score NUMERIC(5, 2) NOT NULL CHECK (pre_test_score >= 0 AND pre_test_score <= 100),
  post_test_score NUMERIC(5, 2) NOT NULL CHECK (post_test_score >= 0 AND post_test_score <= 100),
  delta_improvement NUMERIC(5, 2) GENERATED ALWAYS AS (post_test_score - pre_test_score) STORED,
  recorded_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indices for rapid queries by user and chapter
CREATE INDEX IF NOT EXISTS idx_mastery_deltas_user ON public.mastery_deltas(user_id);
CREATE INDEX IF NOT EXISTS idx_mastery_deltas_chapter ON public.mastery_deltas(chapter_id);

-- 4. Enable Row Level Security (RLS) on mastery_deltas
ALTER TABLE public.mastery_deltas ENABLE ROW LEVEL SECURITY;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'mastery_deltas' AND policyname = 'Users can view own mastery deltas'
  ) THEN
    CREATE POLICY "Users can view own mastery deltas" 
      ON public.mastery_deltas 
      FOR SELECT 
      USING (auth.uid() = user_id);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'mastery_deltas' AND policyname = 'Users can insert own mastery deltas'
  ) THEN
    CREATE POLICY "Users can insert own mastery deltas" 
      ON public.mastery_deltas 
      FOR INSERT 
      WITH CHECK (auth.uid() = user_id);
  END IF;
END $$;
