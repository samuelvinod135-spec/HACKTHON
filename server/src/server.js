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
  updateStudent,
  getAchievements,
  getCompletions,
  recordCompletion,
  unlockAchievement,
  addXp,
  getSavedExperiments,
  saveExperiment,
  unsaveExperiment,
  getQuestions,
  getQuestionBankChapters,
  getQuestionBankStats,
} from './db.js';
import {
  generateScienceResponse,
  processChatMessage,
  getContextPrompts,
  STRICT_SYSTEM_PROMPT,
} from './scienceChatEngine.js';

import fs from 'node:fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Auto-load environment variables from server/.env and client/.env
function loadEnvFile(filePath) {
  try {
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, 'utf8');
      content.split('\n').forEach((line) => {
        const trimmed = line.trim();
        if (trimmed && !trimmed.startsWith('#')) {
          const idx = trimmed.indexOf('=');
          if (idx > 0) {
            const key = trimmed.slice(0, idx).trim();
            const val = trimmed.slice(idx + 1).trim();
            if (key && !process.env[key]) {
              process.env[key] = val;
            }
          }
        }
      });
    }
  } catch {}
}
loadEnvFile(path.join(__dirname, '..', '.env'));
loadEnvFile(path.join(__dirname, '..', '..', 'client', '.env'));

initDb();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5174;

app.get('/', (_req, res) => {
  res.json({ status: 'ok', service: 'labxplore-api', version: '1.0.0' });
});

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', service: 'labxplore-api', timestamp: new Date().toISOString() });
});

app.get('/api/student', (_req, res) => {
  res.json({ student: getStudent(), achievements: getAchievements() });
});

app.put('/api/student', (req, res) => {
  const updated = updateStudent(req.body || {});
  res.json({ student: updated });
});

app.get('/api/saved', (_req, res) => {
  res.json(getSavedExperiments());
});

app.post('/api/saved', (req, res) => {
  const saved = saveExperiment(req.body || {});
  res.json(saved);
});

app.delete('/api/saved/:id', (req, res) => {
  const saved = unsaveExperiment(req.params.id);
  res.json(saved);
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

// ---- Question Bank API (Local & Fallback) ----
app.get('/api/questions', (req, res) => {
  const { subject, chapter, topic, exam_level, limit, random } = req.query || {};
  const isRandom = random === 'true' || random === '1' || random === true;
  const questions = getQuestions({
    subject,
    chapter,
    topic,
    exam_level,
    limit: limit ? Number(limit) : 50,
    random: isRandom,
  });
  res.json({
    count: questions.length,
    questions,
  });
});

app.get('/api/questions/chapters', (req, res) => {
  const { subject } = req.query || {};
  const chapters = getQuestionBankChapters(subject);
  res.json({ count: chapters.length, chapters });
});

app.get('/api/questions/stats', (_req, res) => {
  const stats = getQuestionBankStats();
  res.json(stats);
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

// ---- Science Virtual Teaching Assistant Chatbot API ----

app.post('/api/chat/message', async (req, res) => {
  const { message = '', context = {}, geminiApiKey = '' } = req.body || {};
  if (!message || typeof message !== 'string') {
    return res.status(400).json({ error: 'Valid message string is required.' });
  }

  try {
    const result = await processChatMessage(message, context, geminiApiKey);
    res.json({
      ...result,
      timestamp: new Date().toISOString(),
    });
  } catch (err) {
    console.error('Chat error:', err);
    res.status(500).json({ error: 'Internal science engine error' });
  }
});

app.get('/api/chat/context-prompts', (req, res) => {
  const { path = '', activeExperiment = '' } = req.query || {};
  const prompts = getContextPrompts({ path, activeExperiment });
  res.json({ prompts });
});

app.use(express.static(path.join(__dirname, '..', '..', 'client', 'dist')));

app.listen(PORT, () => {
  console.log(`LabXplore API listening on http://localhost:${PORT}`);
});
