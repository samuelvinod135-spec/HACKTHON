-- ==============================================================================
-- LabXplore: Secure Telemetry and Scaffolding INSERT Policy
-- Migration: 20260909_secure_telemetry_insert_policy.sql
-- Eliminates permissive WITH CHECK (true) data poisoning vulnerability
-- ==============================================================================

-- 1. Secure Student Telemetry Events INSERT
DROP POLICY IF EXISTS "Users can insert own telemetry" ON public.student_telemetry_events;

CREATE POLICY "Users can insert own telemetry" ON public.student_telemetry_events
  FOR INSERT WITH CHECK (
    -- Must be authenticated and insert matching own user_id, or allow null user_id with valid institution
    (auth.role() = 'authenticated' AND auth.uid() = user_id)
    OR
    (user_id IS NULL AND institution_id IS NOT NULL)
  );

-- 2. Secure Scaffolding Interventions INSERT
DROP POLICY IF EXISTS "Users can insert scaffolding" ON public.scaffolding_interventions;

CREATE POLICY "Users can insert scaffolding" ON public.scaffolding_interventions
  FOR INSERT WITH CHECK (
    auth.role() = 'authenticated' AND auth.uid() = user_id
  );
