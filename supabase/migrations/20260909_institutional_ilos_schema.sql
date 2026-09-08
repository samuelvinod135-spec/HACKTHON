-- ==============================================================================
-- LabXplore: Enterprise Institutional Learning Operating System (ILOS) Schema
-- Multi-Tenant RBAC, Telemetry Ingestion, and Autonomous Scaffolding Architecture
-- ==============================================================================

-- 1. Create institutions table (Schools, Colleges, Educational Organizations)
CREATE TABLE IF NOT EXISTS public.institutions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  code TEXT UNIQUE NOT NULL, -- Unique School ID / Invite code (e.g. 'DPS-RKP-2026')
  domain TEXT,
  tier TEXT DEFAULT 'enterprise' CHECK (tier IN ('pilot', 'standard', 'enterprise')),
  city TEXT DEFAULT 'New Delhi',
  state TEXT DEFAULT 'Delhi',
  settings JSONB DEFAULT '{"max_students": 1000, "features": ["stealth_scaffolding", "telemetry_analytics", "ai_tutor"]}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Create cohorts (classes/sections) table linked to institution
CREATE TABLE IF NOT EXISTS public.cohorts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  institution_id UUID NOT NULL REFERENCES public.institutions(id) ON DELETE CASCADE,
  name TEXT NOT NULL, -- e.g. 'Grade 10 - Section A'
  code TEXT UNIQUE NOT NULL, -- e.g. 'DPS-10A'
  teacher_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  grade_level TEXT DEFAULT 'Grade 10',
  academic_year TEXT DEFAULT '2026-2027',
  subject_focus TEXT DEFAULT 'Integrated Science (Physics & Chemistry)',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Update profiles table with ILOS multi-tenant and RBAC columns
ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS role TEXT DEFAULT 'student' CHECK (role IN ('student', 'teacher', 'admin')),
  ADD COLUMN IF NOT EXISTS institution_id UUID REFERENCES public.institutions(id) ON DELETE SET NULL,
  ADD COLUMN IF NOT EXISTS cohort_id UUID REFERENCES public.cohorts(id) ON DELETE SET NULL,
  ADD COLUMN IF NOT EXISTS school_code TEXT,
  ADD COLUMN IF NOT EXISTS assigned_teacher_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL;

-- Create indexes for rapid multi-tenant filtering
CREATE INDEX IF NOT EXISTS idx_profiles_institution_role ON public.profiles(institution_id, role);
CREATE INDEX IF NOT EXISTS idx_profiles_cohort ON public.profiles(cohort_id);
CREATE INDEX IF NOT EXISTS idx_cohorts_institution ON public.cohorts(institution_id);

-- 4. Create pervasive student telemetry events table (Data Ingestion)
CREATE TABLE IF NOT EXISTS public.student_telemetry_events (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  institution_id UUID REFERENCES public.institutions(id) ON DELETE SET NULL,
  cohort_id UUID REFERENCES public.cohorts(id) ON DELETE SET NULL,
  event_type TEXT NOT NULL, -- 'topic_dwell', 'reaction_attempt', 'parameter_adjust', 'quiz_error', 'simulation_interaction', 'task_fail', 'scaffold_triggered'
  topic TEXT NOT NULL, -- 'Kinematics', 'Ray Optics', 'Stoichiometry', 'Thermodynamics', 'Acids and Bases', etc.
  subtopic TEXT, -- 'Snell Law Refraction', 'Exothermic Combustion', 'Pendulum Harmonic Law'
  dwell_time_ms INTEGER DEFAULT 0,
  error_count INTEGER DEFAULT 0,
  success_flag BOOLEAN DEFAULT true,
  payload JSONB DEFAULT '{}'::jsonb,
  recorded_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index telemetry table for real-time aggregation queries
CREATE INDEX IF NOT EXISTS idx_telemetry_user_topic ON public.student_telemetry_events(user_id, topic, recorded_at);
CREATE INDEX IF NOT EXISTS idx_telemetry_cohort ON public.student_telemetry_events(cohort_id, recorded_at);
CREATE INDEX IF NOT EXISTS idx_telemetry_institution ON public.student_telemetry_events(institution_id, recorded_at);

-- 5. Autonomous Stealth Scaffolding Interventions table
CREATE TABLE IF NOT EXISTS public.scaffolding_interventions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  cohort_id UUID REFERENCES public.cohorts(id) ON DELETE SET NULL,
  topic TEXT NOT NULL,
  subtopic TEXT,
  trigger_reason TEXT NOT NULL, -- e.g. 'error_threshold_exceeded', 'low_mastery_detected'
  adaptation_type TEXT NOT NULL, -- 'visual_ghost_guide', 'parameter_glow', 'curated_micro_task'
  resolved BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. Trigger / Stored Procedure: Auto-map Student to School & Teacher Cohort via School Code
CREATE OR REPLACE FUNCTION public.assign_student_by_school_code(
  p_user_id UUID,
  p_school_code TEXT,
  p_cohort_code TEXT DEFAULT NULL
)
RETURNS JSONB AS $$
DECLARE
  v_inst RECORD;
  v_cohort RECORD;
  v_res JSONB;
BEGIN
  -- 1. Look up institution by code
  SELECT * INTO v_inst FROM public.institutions WHERE UPPER(code) = UPPER(TRIM(p_school_code));
  IF NOT FOUND THEN
    RETURN jsonb_build_object('success', false, 'message', 'Invalid School ID / Invite code.');
  END IF;

  -- 2. Find assigned or default cohort
  IF p_cohort_code IS NOT NULL AND TRIM(p_cohort_code) <> '' THEN
    SELECT * INTO v_cohort FROM public.cohorts 
    WHERE institution_id = v_inst.id AND UPPER(code) = UPPER(TRIM(p_cohort_code));
  ELSE
    SELECT * INTO v_cohort FROM public.cohorts 
    WHERE institution_id = v_inst.id 
    ORDER BY created_at ASC LIMIT 1;
  END IF;

  -- 3. Update student profile
  UPDATE public.profiles
  SET 
    institution_id = v_inst.id,
    school_code = v_inst.code,
    cohort_id = v_cohort.id,
    assigned_teacher_id = v_cohort.teacher_id,
    role = COALESCE(role, 'student')
  WHERE id = p_user_id;

  RETURN jsonb_build_object(
    'success', true,
    'institution_name', v_inst.name,
    'institution_id', v_inst.id,
    'cohort_name', COALESCE(v_cohort.name, 'Unassigned Cohort'),
    'cohort_id', v_cohort.id
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 7. Seed Baseline Institutions & Cohorts for instant enterprise demonstration
DO $$
DECLARE
  v_dps_id UUID;
  v_kv_id UUID;
BEGIN
  -- Seed Institution 1: Delhi Public School R.K. Puram
  INSERT INTO public.institutions (id, name, code, domain, tier, city, state)
  VALUES (
    'a1b2c3d4-e5f6-4a5b-8c9d-0e1f2a3b4c5d',
    'Delhi Public School R.K. Puram',
    'DPS-RKP-2026',
    'dpsrkp.net',
    'enterprise',
    'New Delhi',
    'Delhi'
  )
  ON CONFLICT (code) DO UPDATE SET name = EXCLUDED.name
  RETURNING id INTO v_dps_id;

  IF v_dps_id IS NULL THEN
    SELECT id INTO v_dps_id FROM public.institutions WHERE code = 'DPS-RKP-2026';
  END IF;

  -- Seed Institution 2: Kendriya Vidyalaya IIT Powai
  INSERT INTO public.institutions (id, name, code, domain, tier, city, state)
  VALUES (
    'b2c3d4e5-f6a7-4b5c-9d0e-1f2a3b4c5d6e',
    'Kendriya Vidyalaya IIT Powai',
    'KV-IIT-101',
    'kviitpowai.ac.in',
    'standard',
    'Mumbai',
    'Maharashtra'
  )
  ON CONFLICT (code) DO UPDATE SET name = EXCLUDED.name
  RETURNING id INTO v_kv_id;

  IF v_kv_id IS NULL THEN
    SELECT id INTO v_kv_id FROM public.institutions WHERE code = 'KV-IIT-101';
  END IF;

  -- Seed Cohorts for DPS
  INSERT INTO public.cohorts (id, institution_id, name, code, grade_level, academic_year, subject_focus)
  VALUES
    ('c3d4e5f6-a7b8-4c5d-9e0f-2a3b4c5d6e7f', v_dps_id, 'Grade 10 - Section A (Physics & Chemistry)', 'DPS-10A', 'Grade 10', '2026-2027', 'Advanced STEM'),
    ('d4e5f6a7-b8c9-4d5e-0f1a-3b4c5d6e7f8a', v_dps_id, 'Grade 10 - Section B (Optics & Kinetics)', 'DPS-10B', 'Grade 10', '2026-2027', 'Foundational STEM'),
    ('e5f6a7b8-c9d0-4e5f-1a2b-4c5d6e7f8a9b', v_dps_id, 'Grade 11 - Higher Secondary Chemistry', 'DPS-11CHEM', 'Grade 11', '2026-2027', 'Physical & Organic')
  ON CONFLICT (code) DO NOTHING;

  -- Seed Cohorts for KV IIT
  INSERT INTO public.cohorts (id, institution_id, name, code, grade_level, academic_year, subject_focus)
  VALUES
    ('f6a7b8c9-d0e1-4f5a-2b3c-5d6e7f8a9b0c', v_kv_id, 'Grade 10 - Science Section Alpha', 'KV-10ALPHA', 'Grade 10', '2026-2027', 'Core NCERT Science')
  ON CONFLICT (code) DO NOTHING;
END $$;

-- 8. Row Level Security Policies
ALTER TABLE public.institutions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cohorts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.student_telemetry_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.scaffolding_interventions ENABLE ROW LEVEL SECURITY;

-- Allow read access to institutions and cohorts
CREATE POLICY "Public read for institutions" ON public.institutions FOR SELECT USING (true);
CREATE POLICY "Public read for cohorts" ON public.cohorts FOR SELECT USING (true);

-- Telemetry RLS: Mathematical cohort isolation
CREATE POLICY "Users can insert own telemetry" ON public.student_telemetry_events
  FOR INSERT WITH CHECK (auth.uid() = user_id OR user_id IS NULL);

CREATE POLICY "Strict cohort isolation for telemetry" ON public.student_telemetry_events
  FOR SELECT USING (
    -- 1. Student reads their own data
    auth.uid() = user_id 
    OR
    -- 2. Admin reads all telemetry across their own institution
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE profiles.id = auth.uid() 
      AND profiles.role = 'admin'
      AND profiles.institution_id = student_telemetry_events.institution_id
    )
    OR
    -- 3. Teacher can ONLY read data for cohorts strictly assigned to them
    (
      cohort_id IS NOT NULL AND cohort_id IN (
        SELECT id FROM public.cohorts WHERE teacher_id = auth.uid()
      )
    )
  );

-- Scaffolding RLS: Strict cohort isolation
CREATE POLICY "Strict cohort isolation for scaffolding" ON public.scaffolding_interventions
  FOR SELECT USING (
    auth.uid() = user_id
    OR
    EXISTS (
      SELECT 1 FROM public.profiles admin_p
      JOIN public.profiles student_p ON student_p.id = scaffolding_interventions.user_id
      WHERE admin_p.id = auth.uid() 
      AND admin_p.role = 'admin'
      AND admin_p.institution_id = student_p.institution_id
    )
    OR
    (
      cohort_id IS NOT NULL AND cohort_id IN (
        SELECT id FROM public.cohorts WHERE teacher_id = auth.uid()
      )
    )
  );
