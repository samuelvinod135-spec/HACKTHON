import express from 'express';
import cors from 'cors';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  REACTIONS,
  count,
  matchReaction,
  categories,
  catalog,
  conditions,
  observations,
} from './reactions/index.js';
import {
  initDb,
  getStudent,
  getAchievements,
  getCompletions,
  recordCompletion,
  unlockAchievement,
  addXp,
} from './db.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
initDb();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5174;

app.get('/api/student', (_req, res) => {
  res.json({ student: getStudent(), achievements: getAchievements() });
});

app.get('/api/achievements', (_req, res) => {
  res.json(getAchievements());
});

app.get('/api/completions', (_req, res) => {
  res.json(getCompletions());
});

app.post('/api/completions', (req, res) => {
  const { kind, ref, xp = 0, achievements = [] } = req.body || {};
  if (!kind || !ref) {
    return res.status(400).json({ error: 'kind and ref are required' });
  }
  recordCompletion(kind, ref, Number(xp) || 0);
  if (Array.isArray(achievements)) {
    for (const slug of achievements) unlockAchievement(slug);
  }
  res.json({
    student: getStudent(),
    achievements: getAchievements(),
    completions: getCompletions(),
  });
});

app.post('/api/achievements/:slug/unlock', (req, res) => {
  res.json(unlockAchievement(req.params.slug));
});

app.post('/api/xp', (req, res) => {
  const { amount } = req.body || {};
  res.json(addXp(Number(amount) || 0));
});

// ---- Reaction Engine API ----
app.get('/api/reactions', (_req, res) => {
  res.json({ count: count(), reactions: REACTIONS });
});

app.get('/api/reactions/meta', (_req, res) => {
  res.json({
    count: count(),
    categories: categories(),
    catalog: catalog(),
    conditions: conditions(),
    observations: observations(),
  });
});

app.post('/api/reactions/match', (req, res) => {
  const { inputs = [], conditions: conds = [] } = req.body || {};
  const reaction = matchReaction(inputs, conds);
  res.json({ matched: !!reaction, reaction });
});

app.use(express.static(path.join(__dirname, '..', '..', 'client', 'dist')));

app.listen(PORT, () => {
  console.log(`LabXplore API listening on http://localhost:${PORT}`);
});
