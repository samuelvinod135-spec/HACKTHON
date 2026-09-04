-- LabXplore Schema & Authentication Triggers

-- 1. Extend profiles table with LabXplore education columns
ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS level INTEGER DEFAULT 1,
  ADD COLUMN IF NOT EXISTS xp INTEGER DEFAULT 0,
  ADD COLUMN IF NOT EXISTS xp_for_level INTEGER DEFAULT 1000,
  ADD COLUMN IF NOT EXISTS grade_level TEXT DEFAULT 'Grade 9-10',
  ADD COLUMN IF NOT EXISTS role TEXT DEFAULT 'student';

-- 2. Create trigger to auto-create profile on new user signup (Email/Password or Google OAuth)
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, username, full_name, avatar_url, level, xp, xp_for_level, grade_level)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'username', split_part(NEW.email, '@', 1)),
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name', split_part(NEW.email, '@', 1)),
    COALESCE(NEW.raw_user_meta_data->>'avatar_url', '/clay/avatar.jpg'),
    1,
    0,
    1000,
    COALESCE(NEW.raw_user_meta_data->>'grade_level', 'Grade 9-10')
  )
  ON CONFLICT (id) DO UPDATE SET
    full_name = COALESCE(public.profiles.full_name, EXCLUDED.full_name),
    avatar_url = COALESCE(public.profiles.avatar_url, EXCLUDED.avatar_url);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 3. Lab completions table (tracking experiment and simulation completions)
CREATE TABLE IF NOT EXISTS public.lab_completions (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  kind TEXT NOT NULL,
  ref TEXT NOT NULL,
  xp_earned INTEGER DEFAULT 0,
  completed_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, kind, ref)
);

ALTER TABLE public.lab_completions ENABLE ROW LEVEL SECURITY;

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'lab_completions' AND policyname = 'Users can view own completions') THEN
    CREATE POLICY "Users can view own completions" ON public.lab_completions FOR SELECT USING (auth.uid() = user_id);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'lab_completions' AND policyname = 'Users can insert own completions') THEN
    CREATE POLICY "Users can insert own completions" ON public.lab_completions FOR INSERT WITH CHECK (auth.uid() = user_id);
  END IF;
END $$;

-- 4. Lab achievements table
CREATE TABLE IF NOT EXISTS public.lab_achievements (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  slug TEXT NOT NULL,
  unlocked BOOLEAN DEFAULT TRUE,
  unlocked_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, slug)
);

ALTER TABLE public.lab_achievements ENABLE ROW LEVEL SECURITY;

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'lab_achievements' AND policyname = 'Users can view own achievements') THEN
    CREATE POLICY "Users can view own achievements" ON public.lab_achievements FOR SELECT USING (auth.uid() = user_id);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'lab_achievements' AND policyname = 'Users can manage own achievements') THEN
    CREATE POLICY "Users can manage own achievements" ON public.lab_achievements FOR ALL USING (auth.uid() = user_id);
  END IF;
END $$;

-- 5. Saved experiments table
CREATE TABLE IF NOT EXISTS public.saved_experiments (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  experiment_id TEXT NOT NULL,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  saved_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, experiment_id)
);

ALTER TABLE public.saved_experiments ENABLE ROW LEVEL SECURITY;

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'saved_experiments' AND policyname = 'Users can view own saved experiments') THEN
    CREATE POLICY "Users can view own saved experiments" ON public.saved_experiments FOR SELECT USING (auth.uid() = user_id);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'saved_experiments' AND policyname = 'Users can manage own saved experiments') THEN
    CREATE POLICY "Users can manage own saved experiments" ON public.saved_experiments FOR ALL USING (auth.uid() = user_id);
  END IF;
END $$;

-- 6. Profiles RLS policies
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'profiles' AND policyname = 'Public profiles are viewable by everyone') THEN
    CREATE POLICY "Public profiles are viewable by everyone" ON public.profiles FOR SELECT USING (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'profiles' AND policyname = 'Users can update own profile') THEN
    CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'profiles' AND policyname = 'Users can insert own profile') THEN
    CREATE POLICY "Users can insert own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);
  END IF;
END $$;
