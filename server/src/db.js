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
      name TEXT NOT NULL DEFAULT 'Student Scholar',
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

    CREATE TABLE IF NOT EXISTS saved_experiment (
      id TEXT PRIMARY KEY,
      experiment_id TEXT NOT NULL,
      title TEXT NOT NULL,
      discipline TEXT NOT NULL,
      link TEXT NOT NULL,
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    );
  `);

  const studentCount = db.prepare('SELECT COUNT(*) AS c FROM student').get().c;
  if (studentCount === 0) {
    db.prepare(
      `INSERT INTO student (id, name, level, xp, xp_for_level)
       VALUES (1, 'Student Scholar', 1, 0, 1000)`
    ).run();
  } else {
    db.prepare("UPDATE student SET name = 'Student Scholar' WHERE name LIKE '%Alex%'").run();
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

export function updateStudent({ name, level, xp, xp_for_level } = {}) {
  const current = getStudent() || { name: 'Student Scholar', level: 1, xp: 0, xp_for_level: 1000 };
  const updatedName = name !== undefined ? name : current.name;
  const updatedLevel = level !== undefined ? Number(level) : current.level;
  const updatedXp = xp !== undefined ? Number(xp) : current.xp;
  const updatedXpForLevel = xp_for_level !== undefined ? Number(xp_for_level) : current.xp_for_level;

  db.prepare(
    'UPDATE student SET name = ?, level = ?, xp = ?, xp_for_level = ? WHERE id = 1'
  ).run(updatedName, updatedLevel, updatedXp, updatedXpForLevel);
  return getStudent();
}

export function getSavedExperiments() {
  return db.prepare('SELECT * FROM saved_experiment ORDER BY created_at DESC').all();
}

export function saveExperiment({ id, experiment_id, title, discipline, link } = {}) {
  const saveId = id || experiment_id || `exp-${Date.now()}`;
  db.prepare(`
    INSERT OR REPLACE INTO saved_experiment (id, experiment_id, title, discipline, link, created_at)
    VALUES (?, ?, ?, ?, ?, datetime('now'))
  `).run(
    saveId,
    experiment_id || saveId,
    title || 'Virtual Experiment',
    discipline || 'Science',
    link || '/chemistry'
  );
  return getSavedExperiments();
}

export function unsaveExperiment(id) {
  db.prepare('DELETE FROM saved_experiment WHERE id = ? OR experiment_id = ?').run(id, id);
  return getSavedExperiments();
}

export function getQuestions({
  subject,
  chapter,
  topic,
  exam_level,
  limit = 50,
  random = false,
} = {}) {
  const clauses = [];
  const params = [];

  if (subject) {
    clauses.push('LOWER(subject) = LOWER(?)');
    params.push(subject);
  }
  if (chapter) {
    clauses.push('LOWER(chapter) = LOWER(?)');
    params.push(chapter);
  }
  if (topic) {
    clauses.push('LOWER(topic) LIKE LOWER(?)');
    params.push(`%${topic}%`);
  }
  if (exam_level) {
    clauses.push('LOWER(exam_level) = LOWER(?)');
    params.push(exam_level);
  }

  let sql = 'SELECT * FROM question_bank';
  if (clauses.length > 0) {
    sql += ` WHERE ${clauses.join(' AND ')}`;
  }

  if (random) {
    sql += ' ORDER BY RANDOM()';
  } else {
    sql += ' ORDER BY id ASC';
  }

  const numLimit = Math.min(Math.max(Number(limit) || 50, 1), 200);
  sql += ` LIMIT ${numLimit}`;

  return db.prepare(sql).all(...params);
}

export function getQuestionBankChapters(subject) {
  let sql = `
    SELECT subject, chapter, COUNT(*) as count
    FROM question_bank
  `;
  const params = [];
  if (subject) {
    sql += ' WHERE LOWER(subject) = LOWER(?)';
    params.push(subject);
  }
  sql += ' GROUP BY subject, chapter ORDER BY subject, chapter';
  return db.prepare(sql).all(...params);
}

export function getQuestionBankStats() {
  const total = db.prepare('SELECT COUNT(*) as c FROM question_bank').get().c;
  const bySubject = db
    .prepare('SELECT subject, COUNT(*) as count FROM question_bank GROUP BY subject')
    .all();
  const byLevel = db
    .prepare('SELECT exam_level, COUNT(*) as count FROM question_bank GROUP BY exam_level')
    .all();
  const chaptersCount = db
    .prepare('SELECT COUNT(DISTINCT chapter) as c FROM question_bank')
    .get().c;

  return {
    total,
    chaptersCount,
    bySubject,
    byLevel,
  };
}

export default db;

