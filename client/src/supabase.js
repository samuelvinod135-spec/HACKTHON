import { createClient } from '@supabase/supabase-js';

const env = (typeof import.meta !== 'undefined' && import.meta.env) ? import.meta.env : (typeof process !== 'undefined' && process.env ? process.env : {});
const supabaseUrl = env.VITE_SUPABASE_URL || 'https://htgsiuqtlfdebxepsslh.supabase.co';
const supabaseAnonKey = env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh0Z3NpdXF0bGZkZWJ4ZXBzc2xoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODY3MTgxNTYsImV4cCI6MjEwMjI5NDE1Nn0.d_3FLVrNK-3jc8drkTKqRAey1eWlsQr4lNmauy4Wz8E';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
});

const API_BASE = ((env.VITE_API_URL ? env.VITE_API_URL.replace(/\/$/, '') : '') || '') + '/api';

/**
 * Remove synthetic boilerplate prefixes generated during batch question expansion
 */
export function cleanQuestionStem(text) {
  if (!text) return '';
  return text
    .replace(/^(In a standard conceptual situation|In a foundational context|For a standard JEE Main test|Under advanced analytical conditions|In a rigorous JEE Advanced evaluation|During an idealized experiment|For a system satisfying the stated assumptions|For a quantitative JEE-style analysis)[,:\s]*/gi, '')
    .trim();
}

/**
 * Generate a concept signature by stripping numbers and punctuation
 */
export function getConceptFingerprint(text) {
  const cleaned = cleanQuestionStem(text);
  return cleaned
    .replace(/\b\d+(\.\d+)?\b/g, '#')
    .replace(/\s+/g, ' ')
    .toLowerCase()
    .slice(0, 55);
}

/**
 * Select diverse, non-repeating questions across concept buckets
 */
export function selectDiverseQuestions(allQuestions, count = 10, excludeIds = new Set()) {
  if (!allQuestions || allQuestions.length === 0) return [];

  // Filter out questions previously seen in this session if enough remaining exist
  const excludeSet = excludeIds instanceof Set ? excludeIds : new Set(excludeIds || []);
  const available = allQuestions.filter((q) => !excludeSet.has(q.id));
  const pool = available.length >= count ? available : allQuestions;

  // 1. Deduplicate by cleaned question text
  const uniqueQuestions = [];
  const seenCleaned = new Set();
  for (const q of pool) {
    const cleaned = cleanQuestionStem(q.question).toLowerCase();
    if (!cleaned || seenCleaned.has(cleaned)) continue;
    seenCleaned.add(cleaned);
    uniqueQuestions.push({
      ...q,
      question: cleanQuestionStem(q.question),
    });
  }

  // 2. Group by concept fingerprint
  const bucketMap = new Map();
  for (const q of uniqueQuestions) {
    const fp = getConceptFingerprint(q.question);
    if (!bucketMap.has(fp)) bucketMap.set(fp, []);
    bucketMap.get(fp).push(q);
  }

  // 3. Pick 1 question from each unique concept bucket first
  const buckets = Array.from(bucketMap.values()).sort(() => 0.5 - Math.random());
  const selected = [];
  const selectedIds = new Set();

  for (const b of buckets) {
    const pick = b[Math.floor(Math.random() * b.length)];
    if (pick && !selectedIds.has(pick.id)) {
      selected.push(pick);
      selectedIds.add(pick.id);
      if (selected.length >= count) break;
    }
  }

  // 4. If count not reached, fill with remaining distinct questions
  if (selected.length < count) {
    const remaining = uniqueQuestions
      .filter((q) => !selectedIds.has(q.id))
      .sort(() => 0.5 - Math.random());
    for (const r of remaining) {
      selected.push(r);
      selectedIds.add(r.id);
      if (selected.length >= count) break;
    }
  }

  return selected.sort(() => 0.5 - Math.random());
}

/**
 * For a Quiz: "Fetch 10 random questions where chapter = 'Kinematics'"
 * Guaranteed 100% unique questions with conceptual diversity and session tracking
 */
export async function fetchQuizQuestions({ chapter = 'Kinematics', limit = 10, subject, excludeIds } = {}) {
  try {
    // 1. Try Supabase with broader pool and random offset sampling
    const randomOffset = Math.floor(Math.random() * 80);
    let query = supabase
      .from('question_bank')
      .select('*')
      .or(`chapter.eq."${chapter}",chapter.ilike."%${chapter}%"`);

    if (subject) {
      query = query.eq('subject', subject);
    }

    const { data, error } = await query
      .range(randomOffset, randomOffset + 140)
      .limit(140);

    if (!error && data && data.length >= limit) {
      const selected = selectDiverseQuestions(data, limit, excludeIds);
      if (selected.length >= limit) {
        return selected;
      }
    }

    // Secondary Supabase attempt from offset 0 if random range had fewer items
    const { data: fallbackData, error: fbErr } = await supabase
      .from('question_bank')
      .select('*')
      .or(`chapter.eq."${chapter}",chapter.ilike."%${chapter}%"`)
      .limit(150);

    if (!fbErr && fallbackData && fallbackData.length > 0) {
      const selected = selectDiverseQuestions(fallbackData, limit, excludeIds);
      if (selected.length > 0) {
        return selected;
      }
    }
  } catch (err) {
    console.warn('Supabase quiz query fallback:', err);
  }

  // Fallback to local API
  try {
    const params = new URLSearchParams({ chapter, limit: '100', random: 'true' });
    if (subject) params.set('subject', subject);
    const res = await fetch(`${API_BASE}/questions?${params.toString()}`);
    const json = await res.json();
    if (json.questions && json.questions.length > 0) {
      return selectDiverseQuestions(json.questions, limit, excludeIds);
    }
  } catch (err) {
    console.warn('Local API questions query failed:', err);
  }

  return [];
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

    const { data, error } = await query.limit(Math.max(limit * 3, 150));
    if (error) throw error;
    if (data && data.length > 0) {
      return selectDiverseQuestions(data, limit);
    }
  } catch (err) {
    console.warn('Supabase mock test query fallback:', err);
  }

  // Fallback to local API
  try {
    const params = new URLSearchParams({ exam_level: examLevel, limit: String(limit * 2), random: 'true' });
    if (subject) params.set('subject', subject);
    const res = await fetch(`${API_BASE}/questions?${params.toString()}`);
    const json = await res.json();
    if (json.questions && json.questions.length > 0) {
      return selectDiverseQuestions(json.questions, limit);
    }
  } catch (err) {
    console.warn('Mock test API fallback error:', err);
  }

  return [];
}

/**
 * Fetch all available chapters from the Question Bank
 */
export async function fetchQuestionBankChapters(subject) {
  try {
    const res = await fetch(`${API_BASE}/questions/chapters${subject ? `?subject=${encodeURIComponent(subject)}` : ''}`);
    const json = await res.json();
    return json.chapters || [];
  } catch {
    return [];
  }
}
