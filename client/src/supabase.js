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

/**
 * For a Quiz: "Fetch 10 random questions where chapter = 'Kinematics'"
 * Queries Supabase question_bank with resilient fallback to local API
 */
export async function fetchQuizQuestions({ chapter = 'Kinematics', limit = 10, subject } = {}) {
  try {
    let query = supabase
      .from('question_bank')
      .select('*')
      .eq('chapter', chapter);

    if (subject) {
      query = query.eq('subject', subject);
    }

    const { data, error } = await query.limit(Math.max(limit * 3, 50));
    if (error) throw error;
    if (data && data.length > 0) {
      const shuffled = [...data].sort(() => 0.5 - Math.random());
      return shuffled.slice(0, limit);
    }
  } catch (err) {
    console.warn('Supabase quiz query fallback:', err);
  }

  // Fallback to local API
  const params = new URLSearchParams({ chapter, limit: String(limit), random: 'true' });
  if (subject) params.set('subject', subject);
  const res = await fetch(`/api/questions?${params.toString()}`);
  const json = await res.json();
  return json.questions || [];
}

/**
 * For a Mock Test: "Fetch 50 random questions where exam_level = 'Main-Moderate'"
 * Queries Supabase question_bank with resilient fallback to local API
 */
export async function fetchMockTestQuestions({ examLevel = 'Main-Moderate', limit = 50, subject } = {}) {
  try {
    let query = supabase
      .from('question_bank')
      .select('*')
      .eq('exam_level', examLevel);

    if (subject) {
      query = query.eq('subject', subject);
    }

    const { data, error } = await query.limit(Math.max(limit * 2, 100));
    if (error) throw error;
    if (data && data.length > 0) {
      const shuffled = [...data].sort(() => 0.5 - Math.random());
      return shuffled.slice(0, limit);
    }
  } catch (err) {
    console.warn('Supabase mock test query fallback:', err);
  }

  // Fallback to local API
  const params = new URLSearchParams({ exam_level: examLevel, limit: String(limit), random: 'true' });
  if (subject) params.set('subject', subject);
  const res = await fetch(`/api/questions?${params.toString()}`);
  const json = await res.json();
  return json.questions || [];
}

/**
 * Fetch all available chapters from the Question Bank
 */
export async function fetchQuestionBankChapters(subject) {
  try {
    const res = await fetch(`/api/questions/chapters${subject ? `?subject=${encodeURIComponent(subject)}` : ''}`);
    const json = await res.json();
    return json.chapters || [];
  } catch {
    return [];
  }
}
