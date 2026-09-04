# 🗄️ LabXplore — Database Schema & Data Models

This document details the database architectures of LabXplore, covering both the **Cloud PostgreSQL Schema (Supabase)** and the **Local Edge SQLite Schema (better-sqlite3)**.

---

## 1. Storage Topology

LabXplore utilizes a dual-tier database strategy:
- **Cloud Tier (Supabase Postgres)**: The authoritative system of record for authenticated student identities, multi-device cloud synchronization, bookmarked apparatus configurations, and verified completion telemetry.
- **Local Edge Tier (SQLite WAL)**: Provides sub-millisecond local caching, offline simulation capabilities, and atomic level/XP calculations via Express.

---

## 2. Supabase Cloud Schema (PostgreSQL)

### Table: `public.profiles`
Stores extended user profile metadata, academic curriculum details, and gamification levels.

| Column | Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | `UUID` | `PRIMARY KEY, REFERENCES auth.users(id) ON DELETE CASCADE` | Matches the authenticated Supabase user ID |
| `username` | `TEXT` | `UNIQUE` | Student's unique username handle |
| `full_name` | `TEXT` | `NOT NULL` | Display name of the student |
| `email` | `TEXT` | — | Synchronized student email for fast resolution |
| `avatar_url` | `TEXT` | `DEFAULT ''` | Optional custom profile picture URL |
| `bio` | `TEXT` | `NULL` | Student biography or research statement |
| `streak_count` | `INT` | `DEFAULT 0` | Consecutive days of active laboratory exploration |
| `level` | `INT` | `NOT NULL DEFAULT 1` | Academic mastery level |
| `xp` | `INT` | `NOT NULL DEFAULT 0` | Current earned experience points |
| `xp_for_level` | `INT` | `NOT NULL DEFAULT 1000` | XP threshold required to reach next level |
| `grade_level` | `TEXT` | `DEFAULT 'Grade 9-10'` | Academic grade or curriculum tier |
| `role` | `TEXT` | `DEFAULT 'student'` | Role (`student`, `educator`, `researcher`) |
| `created_at` | `TIMESTAMPTZ` | `DEFAULT NOW()` | Account creation timestamp |

```sql
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username TEXT UNIQUE,
  full_name TEXT NOT NULL,
  email TEXT,
  avatar_url TEXT DEFAULT '',
  bio TEXT,
  streak_count INT DEFAULT 0,
  level INT NOT NULL DEFAULT 1,
  xp INT NOT NULL DEFAULT 0,
  xp_for_level INT NOT NULL DEFAULT 1000,
  grade_level TEXT DEFAULT 'Grade 9-10',
  role TEXT DEFAULT 'student',
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

---

### Table: `public.lab_completions`
Records individual experiment runs, observations, and quiz passes.

| Column | Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | `UUID` | `PRIMARY KEY DEFAULT gen_random_uuid()` | Unique record identifier |
| `user_id` | `UUID` | `REFERENCES auth.users(id) ON DELETE CASCADE` | Associated student user ID |
| `kind` | `TEXT` | `NOT NULL` | `'experiment'`, `'quiz'`, `'challenge'`, `'observation'` |
| `ref` | `TEXT` | `NOT NULL` | Title or reference code of the activity |
| `xp_earned` | `INT` | `DEFAULT 0` | Experience points awarded |
| `completed_at` | `TIMESTAMPTZ` | `DEFAULT NOW()` | Timestamp of completion |

---

### Table: `public.saved_experiments`
Stores apparatus configurations and simulations bookmarked by the student.

| Column | Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | `TEXT` | `PRIMARY KEY` | Custom identifier or experiment UUID |
| `user_id` | `UUID` | `REFERENCES auth.users(id) ON DELETE CASCADE` | Owner student ID |
| `experiment_id` | `TEXT` | `NOT NULL` | Catalog slug (e.g. `chem-mg`, `phys-pendulum`) |
| `title` | `TEXT` | `NOT NULL` | Experiment title |
| `discipline` | `TEXT` | `NOT NULL` | `'Chemistry'`, `'Physics'`, `'Optics'` |
| `link` | `TEXT` | `NOT NULL` | Internal web route to launch simulation |
| `created_at` | `TIMESTAMPTZ` | `DEFAULT NOW()` | Bookmark timestamp |

---

## 3. Database Functions & Triggers

### 1. `handle_new_user()`
Automatically provisions a `public.profiles` row upon new user registration:

```sql
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (
    id, full_name, username, email, avatar_url, level, xp, xp_for_level, grade_level, role
  ) VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1)),
    COALESCE(NEW.raw_user_meta_data->>'username', split_part(NEW.email, '@', 1)),
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'avatar_url', ''),
    1,
    0,
    1000,
    COALESCE(NEW.raw_user_meta_data->>'grade_level', 'Grade 9-10'),
    'student'
  )
  ON CONFLICT (id) DO UPDATE SET
    email = EXCLUDED.email,
    username = COALESCE(EXCLUDED.username, profiles.username),
    full_name = COALESCE(EXCLUDED.full_name, profiles.full_name);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
```

---

### 2. `get_email_by_username(p_username TEXT)`
Securely resolves a student handle to their login email:

```sql
CREATE OR REPLACE FUNCTION public.get_email_by_username(p_username TEXT)
RETURNS TEXT AS $$
DECLARE
  v_email TEXT;
BEGIN
  SELECT email INTO v_email
  FROM public.profiles
  WHERE LOWER(username) = LOWER(TRIM(p_username))
     OR LOWER(full_name) = LOWER(TRIM(p_username))
  LIMIT 1;
  RETURN v_email;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

GRANT EXECUTE ON FUNCTION public.get_email_by_username(TEXT) TO anon, authenticated;
```

---

## 4. Local Edge SQLite Schema (`server/data/labxplore.db`)

Managed by `server/src/db.js` using `better-sqlite3`:

```sql
-- Student Profile Table
CREATE TABLE IF NOT EXISTS student (
  id INTEGER PRIMARY KEY CHECK (id = 1),
  name TEXT NOT NULL DEFAULT 'Student Scholar',
  level INTEGER NOT NULL DEFAULT 1,
  xp INTEGER NOT NULL DEFAULT 0,
  xp_for_level INTEGER NOT NULL DEFAULT 1000
);

-- Achievements Catalog & Status
CREATE TABLE IF NOT EXISTS achievement (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  icon TEXT NOT NULL,
  unlocked INTEGER NOT NULL DEFAULT 0
);

-- Completed Labs Table
CREATE TABLE IF NOT EXISTS completion (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  kind TEXT NOT NULL,
  ref TEXT NOT NULL,
  completed_at TEXT NOT NULL DEFAULT (datetime('now')),
  UNIQUE(kind, ref)
);

-- Saved Experiment Bookmarks Table
CREATE TABLE IF NOT EXISTS saved_experiment (
  id TEXT PRIMARY KEY,
  experiment_id TEXT NOT NULL,
  title TEXT NOT NULL,
  discipline TEXT NOT NULL,
  link TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- Individual Run Log
CREATE TABLE IF NOT EXISTS lab_run (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  experiment TEXT NOT NULL,
  kind TEXT NOT NULL DEFAULT 'experiment',
  completed_at TEXT NOT NULL DEFAULT (datetime('now')),
  xp_earned INTEGER NOT NULL DEFAULT 0
);
```

---

## 5. Security & Row-Level Security (RLS)

All Supabase tables have RLS enabled:
- **`profiles`**: Public read access (`SELECT`) to allow classroom leaderboards and username lookups. Updates and inserts (`UPDATE`, `INSERT`) are restricted to the authenticated student matching `auth.uid() = id`.
- **`lab_completions`**: Read and write restricted to `auth.uid() = user_id`.
- **`saved_experiments`**: Read and write restricted to `auth.uid() = user_id`.
