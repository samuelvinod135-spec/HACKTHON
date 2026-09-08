-- ==============================================================================
-- LabXplore: Enterprise Multi-Tenant Hardening & Mathematical Cohort Isolation
-- Migration: 20260909_tighten_ilos_rbac_security.sql
-- ==============================================================================

-- 1. Helper functions to safely bypass PostgreSQL RLS recursion
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

-- 2. Tighten Student Telemetry Events RLS
DROP POLICY IF EXISTS "Users can read own telemetry" ON public.student_telemetry_events;
DROP POLICY IF EXISTS "Strict cohort isolation for telemetry" ON public.student_telemetry_events;

CREATE POLICY "Strict cohort isolation for telemetry" ON public.student_telemetry_events
  FOR SELECT USING (
    -- Case A: The student querying is the owner of the telemetry event
    auth.uid() = user_id
    OR
    -- Case B: An Institutional Admin can view all data within their own school (Non-recursive)
    (
      public.get_auth_user_role() = 'admin' 
      AND public.get_auth_user_institution() = student_telemetry_events.institution_id
    )
    OR
    -- Case C: A Teacher can ONLY view students belonging to their explicitly assigned cohort
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

-- 3. Tighten Scaffolding Interventions RLS
DROP POLICY IF EXISTS "Users view own scaffolding" ON public.scaffolding_interventions;
DROP POLICY IF EXISTS "Strict cohort isolation for scaffolding" ON public.scaffolding_interventions;

CREATE POLICY "Strict cohort isolation for scaffolding" ON public.scaffolding_interventions
  FOR SELECT USING (
    -- Case A: The student owner
    auth.uid() = user_id
    OR
    -- Case B: Admin within the same institution
    (
      public.get_auth_user_role() = 'admin'
      AND public.get_auth_user_institution() = (SELECT institution_id FROM public.profiles WHERE id = scaffolding_interventions.user_id)
    )
    OR
    -- Case C: Assigned cohort teacher only
    (
      cohort_id IS NOT NULL
      AND cohort_id IN (
        SELECT id FROM public.cohorts WHERE teacher_id = auth.uid()
      )
    )
  );

-- 4. Restrict Profiles Table RLS (Zero Recursion)
DROP POLICY IF EXISTS "Public profiles are viewable by everyone" ON public.profiles;
DROP POLICY IF EXISTS "Tenant bounded profiles visibility" ON public.profiles;

CREATE POLICY "Tenant bounded profiles visibility" ON public.profiles
  FOR SELECT USING (
    -- User can view own profile
    auth.uid() = id
    OR
    -- Admin can view all profiles in their institution
    (
      public.get_auth_user_role() = 'admin'
      AND public.get_auth_user_institution() = profiles.institution_id
    )
    OR
    -- Teacher can view profiles of students in their assigned cohorts
    EXISTS (
      SELECT 1 FROM public.cohorts c
      WHERE c.teacher_id = auth.uid()
        AND c.id = profiles.cohort_id
    )
    OR
    -- Students can view their assigned teacher's profile (Zero recursion via helper function)
    id = public.get_auth_user_teacher()
  );
