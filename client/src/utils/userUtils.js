/**
 * Dynamic Username Extraction Utility
 * Extracts username from active Supabase session.user.email by splitting at the '@' symbol.
 * e.g., "nitin@gmail.com" becomes "nitin", "samuel.vinod@school.edu" becomes "samuel.vinod"
 */
export function extractUsername(email, fallback = 'Scholar') {
  if (!email || typeof email !== 'string') return fallback;
  const raw = email.split('@')[0]?.trim();
  if (!raw) return fallback;

  // Handle dot or underscore separated names e.g. "samuel.vinod" -> "Samuel Vinod"
  if (raw.includes('.') || raw.includes('_')) {
    const parts = raw.split(/[._]/).filter(Boolean);
    if (parts.length > 0) {
      return parts.map((p) => p.charAt(0).toUpperCase() + p.slice(1)).join(' ');
    }
  }

  // Capitalize first character, preserving camelCase or numbers (e.g. samVinod123 -> SamVinod123, nature -> Nature)
  const cleaned = raw.charAt(0).toUpperCase() + raw.slice(1);
  return cleaned || fallback;
}

/**
 * Derives a display-ready full name from a user object or session.
 */
export function getDisplayUsername(user, profile, student, fallback = 'Scholar') {
  const email = user?.email || profile?.email;
  if (profile?.username) return profile.username;
  if (email) return extractUsername(email, fallback);
  if (profile?.full_name) return profile.full_name.split(' ')[0];
  if (student?.name && student.name !== 'samuel' && student.name !== 'Student Scholar') {
    return student.name.split(' ')[0];
  }
  return fallback;
}
