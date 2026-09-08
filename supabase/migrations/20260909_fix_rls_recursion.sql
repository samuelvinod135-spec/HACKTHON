-- ==============================================================================
-- LabXplore: 100% Clean Non-Recursive PostgreSQL RLS for Profiles & ILOS
-- Migration: 20260909_fix_rls_recursion.sql
-- ==============================================================================

-- 1. Create SECURITY DEFINER helper functions (Runs with bypass privileges to prevent recursion)
CREATE OR REPLACE FUNCTION public.get_auth_user_role()
RETURNS TEXT
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT role FROM public.profiles WHERE id = auth.uid();
$$;

CREATE OR REPLACE FUNCTION public.get_auth_user_institution()
RETURNS UUID
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT institution_id FROM public.profiles WHERE id = auth.uid();
$$;

CREATE OR REPLACE FUNCTION public.get_auth_user_teacher()
RETURNS UUID
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT assigned_teacher_id FROM public.profiles WHERE id = auth.uid();
$$;

-- 2. Drop all conflicting/recursive policies on profiles
DROP POLICY IF EXISTS "Tenant bounded profiles visibility" ON public.profiles;
DROP POLICY IF EXISTS "Public profiles are viewable by everyone" ON public.profiles;
DROP POLICY IF EXISTS "Strict cohort isolation for telemetry" ON public.student_telemetry_events;
DROP POLICY IF EXISTS "Strict cohort isolation for scaffolding" ON public.scaffolding_interventions;

-- 3. Clean, Zero-Recursion Profiles Policy
CREATE POLICY "Tenant bounded profiles visibility" ON public.profiles
  FOR SELECT USING (
    -- Case A: The user is looking at their own profile
    auth.uid() = id
    OR
    -- Case B: An Admin can view all profiles in their institution
    (
      public.get_auth_user_role() = 'admin'
      AND public.get_auth_user_institution() = profiles.institution_id
    )
    OR
    -- Case C: A Teacher can view profiles of students in their assigned cohort
    EXISTS (
      SELECT 1 FROM public.cohorts c
      WHERE c.teacher_id = auth.uid()
        AND c.id = profiles.cohort_id
    )
    OR
    -- Case D: A Student can view their assigned teacher profile (via helper function)
    id = public.get_auth_user_teacher()
  );

-- 4. Clean Telemetry Policy (SELECT & INSERT)
CREATE POLICY "Strict cohort isolation for telemetry" ON public.student_telemetry_events
  FOR SELECT USING (
    auth.uid() = user_id
    OR
    (
      public.get_auth_user_role() = 'admin' 
      AND public.get_auth_user_institution() = student_telemetry_events.institution_id
    )
    OR
    (
      cohort_id IS NOT NULL 
      AND cohort_id IN (
        SELECT id FROM public.cohorts WHERE teacher_id = auth.uid()
      )
    )
  );

DROP POLICY IF EXISTS "Users can insert own telemetry" ON public.student_telemetry_events;
CREATE POLICY "Users can insert own telemetry" ON public.student_telemetry_events
  FOR INSERT WITH CHECK (true);

-- 5. Clean Scaffolding Policy (SELECT & INSERT)
CREATE POLICY "Strict cohort isolation for scaffolding" ON public.scaffolding_interventions
  FOR SELECT USING (
    auth.uid() = user_id
    OR
    (
      public.get_auth_user_role() = 'admin'
      AND public.get_auth_user_institution() = (SELECT institution_id FROM public.profiles WHERE id = scaffolding_interventions.user_id)
    )
    OR
    (
      cohort_id IS NOT NULL 
      AND cohort_id IN (
        SELECT id FROM public.cohorts WHERE teacher_id = auth.uid()
      )
    )
  );

DROP POLICY IF EXISTS "Users can insert scaffolding" ON public.scaffolding_interventions;
CREATE POLICY "Users can insert scaffolding" ON public.scaffolding_interventions
  FOR INSERT WITH CHECK (true);
