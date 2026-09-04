import Database from 'better-sqlite3';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mkdirSync } from 'node:fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dataDir = path.join(__dirname, '..', 'data');
mkdirSync(dataDir, { recursive: true });

const db = new Database(path.join(dataDir, 'labxplore.db'));
db.pragma('journal_mode = WAL');
db.pragma('foreign_keys = ON');

export function initDb() {
  db.exec(`
    CREATE TABLE IF NOT EXISTS student (
      id INTEGER PRIMARY KEY CHECK (id = 1),
      name TEXT NOT NULL DEFAULT 'Alex Chen',
      level INTEGER NOT NULL DEFAULT 1,
      xp INTEGER NOT NULL DEFAULT 0,
      xp_for_level INTEGER NOT NULL DEFAULT 1000
    );

    CREATE TABLE IF NOT EXISTS achievement (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      slug TEXT UNIQUE NOT NULL,
      name TEXT NOT NULL,
      description TEXT NOT NULL,
      icon TEXT NOT NULL,
      unlocked INTEGER NOT NULL DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS lab_run (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      experiment TEXT NOT NULL,
      kind TEXT NOT NULL DEFAULT 'experiment',
      completed_at TEXT NOT NULL DEFAULT (datetime('now')),
      xp_earned INTEGER NOT NULL DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS completion (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      kind TEXT NOT NULL,
      ref TEXT NOT NULL,
      completed_at TEXT NOT NULL DEFAULT (datetime('now')),
      UNIQUE(kind, ref)
    );
  `);

  const studentCount = db.prepare('SELECT COUNT(*) AS c FROM student').get().c;
  if (studentCount === 0) {
    db.prepare(
      `INSERT INTO student (id, name, level, xp, xp_for_level)
       VALUES (1, 'Alex Chen', 13, 2450, 3000)`
    ).run();
  }

  seedAchievements();
}

const ACHIEVEMENTS = [
  { slug: 'first-burn', name: 'First Ignition', description: 'Run any experiment for the first time', icon: 'flame' },
  { slug: 'chem-whiz', name: 'Chem Whiz', description: 'Complete 5 chemistry experiments', icon: 'beaker' },
  { slug: 'physicist', name: 'Young Physicist', description: 'Complete a physics experiment', icon: 'atom' },
  { slug: 'perfect-score', name: 'Perfect Score', description: 'Score 100% on any quiz', icon: 'star' },
  { slug: 'streak-7', name: 'On a Roll', description: 'Keep a 7 day learning streak', icon: 'trending-up' },
  { slug: 'explorer', name: 'Explorer', description: 'Try 5 different experiments', icon: 'compass' },
  { slug: 'lab-master', name: 'Lab Master', description: 'Reach Level 10', icon: 'crown' },
  { slug: 'speed-runner', name: 'Speed Runner', description: 'Complete a simulation in under its target time', icon: 'timer' },
];

export function seedAchievements() {
  const insert = db.prepare(
    `INSERT OR IGNORE INTO achievement (slug, name, description, icon, unlocked)
     VALUES (@slug, @name, @description, @icon, 0)`
  );
  for (const a of ACHIEVEMENTS) insert.run(a);
}

export function getStudent() {
  return db.prepare('SELECT * FROM student WHERE id = 1').get();
}

export function getAchievements() {
  return db.prepare('SELECT * FROM achievement ORDER BY id').all();
}

export function getCompletions() {
  return db.prepare('SELECT * FROM completion ORDER BY completed_at').all();
}

export function addXp(amount) {
  const student = getStudent();
  let { id, xp, level, xp_for_level } = student;
  xp += amount;
  let leveled = false;
  while (xp >= xp_for_level) {
    xp -= xp_for_level;
    level += 1;
    xp_for_level = Math.round(xp_for_level * 1.35);
    leveled = true;
  }
  db.prepare(
    'UPDATE student SET xp = ?, level = ?, xp_for_level = ? WHERE id = ?'
  ).run(xp, level, xp_for_level, id);
  return { leveled, ...getStudent() };
}

export function recordCompletion(kind, ref, xp = 0) {
  db.prepare(
    'INSERT OR IGNORE INTO completion (kind, ref) VALUES (?, ?)'
  ).run(kind, ref);

  if (xp > 0) {
    db.prepare(
      'INSERT INTO lab_run (experiment, kind, xp_earned) VALUES (?, ?, ?)'
    ).run(ref, kind, xp);
    addXp(xp);
  }
  return {
    student: getStudent(),
    completions: getCompletions(),
  };
}

export function unlockAchievement(slug) {
  db.prepare('UPDATE achievement SET unlocked = 1 WHERE slug = ?').run(slug);
  return getAchievements();
}

export function countLabRuns() {
  return db.prepare('SELECT COUNT(*) AS c FROM completion').get().c;
}

export default db;
