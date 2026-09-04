import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://htgsiuqtlfdebxepsslh.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh0Z3NpdXF0bGZkZWJ4ZXBzc2xoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODY3MTgxNTYsImV4cCI6MjEwMjI5NDE1Nn0.d_3FLVrNK-3jc8drkTKqRAey1eWlsQr4lNmauy4Wz8E';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
});
