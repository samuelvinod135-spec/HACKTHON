-- ==============================================================================
-- LabXplore: Fix PostgreSQL Infinite Recursion in Profiles RLS
-- Migration: 20260909_fix_rls_recursion.sql
-- ==============================================================================

-- 1. Create fast, SECURITY DEFINER helper functions that bypass RLS recursion
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

-- 2. Drop the recursive policies
DROP POLICY IF EXISTS "Tenant bounded profiles visibility" ON public.profiles;
DROP POLICY IF EXISTS "Strict cohort isolation for telemetry" ON public.student_telemetry_events;
DROP POLICY IF EXISTS "Strict cohort isolation for scaffolding" ON public.scaffolding_interventions;

-- 3. Re-create Profiles Policy (Zero Recursion)
CREATE POLICY "Tenant bounded profiles visibility" ON public.profiles
  FOR SELECT USING (
    -- Case A: Student/User views own profile
    auth.uid() = id
    OR
    -- Case B: Admin views profiles within their institution (Non-recursive via SECURITY DEFINER)
    (
      public.get_auth_user_role() = 'admin' 
      AND public.get_auth_user_institution() = profiles.institution_id
    )
    OR
    -- Case C: Teacher views profiles in their cohorts
    EXISTS (
      SELECT 1 FROM public.cohorts c
      WHERE c.teacher_id = auth.uid()
        AND c.id = profiles.cohort_id
    )
    OR
    -- Case D: Student views their assigned teacher
    id = (SELECT assigned_teacher_id FROM public.profiles WHERE id = auth.uid())
  );

-- 4. Re-create Telemetry Policy (Zero Recursion)
CREATE POLICY "Strict cohort isolation for telemetry" ON public.student_telemetry_events
  FOR SELECT USING (
    -- Student owner
    auth.uid() = user_id
    OR
    -- Admin within same institution
    (
      public.get_auth_user_role() = 'admin' 
      AND public.get_auth_user_institution() = student_telemetry_events.institution_id
    )
    OR
    -- Teacher in assigned cohort
    (
      cohort_id IS NOT NULL 
      AND cohort_id IN (
        SELECT id FROM public.cohorts WHERE teacher_id = auth.uid()
      )
    )
  );

-- 5. Re-create Scaffolding Policy (Zero Recursion)
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
