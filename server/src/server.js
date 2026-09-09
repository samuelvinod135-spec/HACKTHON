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
  addQuestion,
  deleteQuestion,
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

app.get('/api/student', (req, res) => {
  const userId = req.headers['x-user-id'] || req.query.userId || '1';
  res.json({ student: getStudent(userId), achievements: getAchievements() });
});

app.put('/api/student', (req, res) => {
  const userId = req.headers['x-user-id'] || req.body?.userId || req.body?.id || '1';
  const updated = updateStudent(userId, req.body || {});
  res.json({ student: updated });
});

app.get('/api/saved', (req, res) => {
  try {
    const userId = req.headers['x-user-id'] || req.query.userId || '1';
    res.json(getSavedExperiments(userId));
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve saved experiments' });
  }
});

app.post('/api/saved', (req, res) => {
  try {
    const userId = req.headers['x-user-id'] || req.body?.userId || '1';
    const saved = saveExperiment(req.body || {}, userId);
    res.json(saved);
  } catch (err) {
    res.status(500).json({ error: 'Failed to save experiment' });
  }
});

app.delete('/api/saved/:id', (req, res) => {
  try {
    const userId = req.headers['x-user-id'] || req.query.userId || '1';
    const saved = unsaveExperiment(req.params.id, userId);
    res.json(saved);
  } catch (err) {
    res.status(500).json({ error: 'Failed to remove experiment' });
  }
});

app.get('/api/achievements', (_req, res) => {
  try {
    res.json(getAchievements());
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve achievements' });
  }
});

app.get('/api/completions', (req, res) => {
  try {
    const userId = req.headers['x-user-id'] || req.query.userId || '1';
    res.json(getCompletions(userId));
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve completions' });
  }
});

app.post('/api/completions', (req, res) => {
  try {
    const userId = req.headers['x-user-id'] || req.body?.userId || '1';
    const { kind, ref, xp = 0, achievements = [] } = req.body || {};
    if (!kind || !ref) {
      return res.status(400).json({ error: 'kind and ref are required' });
    }
    recordCompletion(kind, ref, Number(xp) || 0, userId);
    if (Array.isArray(achievements)) {
      for (const slug of achievements) unlockAchievement(slug);
    }
    res.json({
      student: getStudent(userId),
      achievements: getAchievements(),
      completions: getCompletions(userId),
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to record completion' });
  }
});

app.post('/api/achievements/:slug/unlock', (req, res) => {
  try {
    res.json(unlockAchievement(req.params.slug));
  } catch (err) {
    res.status(500).json({ error: 'Failed to unlock achievement' });
  }
});

app.post('/api/xp', (req, res) => {
  try {
    const userId = req.headers['x-user-id'] || req.body?.userId || '1';
    const { amount } = req.body || {};
    res.json(addXp(userId, Number(amount) || 0));
  } catch (err) {
    res.status(500).json({ error: 'Failed to add XP' });
  }
});

// ---- Question Bank API (Local & Fallback) ----
app.get('/api/questions', async (req, res) => {
  try {
    const { subject, chapter, topic, exam_level, limit, random } = req.query || {};
    const isRandom = random === 'true' || random === '1' || random === true;
    const questions = await getQuestions({
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
  } catch (err) {
    console.warn('Questions API error:', err);
    res.status(500).json({ count: 0, questions: [], error: 'Failed to query questions' });
  }
});

app.get('/api/questions/chapters', async (req, res) => {
  try {
    const { subject } = req.query || {};
    const chapters = await getQuestionBankChapters(subject);
    res.json({ count: chapters.length, chapters });
  } catch (err) {
    console.warn('Chapters API error:', err);
    res.status(500).json({ count: 0, chapters: [], error: 'Failed to query chapters' });
  }
});

app.get('/api/questions/stats', async (_req, res) => {
  try {
    const stats = await getQuestionBankStats();
    res.json(stats);
  } catch (err) {
    res.status(500).json({ total: 0, chaptersCount: 0, bySubject: [], byLevel: [] });
  }
});

app.post('/api/questions', async (req, res) => {
  try {
    const questionData = req.body || {};
    if (!questionData.question) {
      return res.status(400).json({ error: 'Question text is required' });
    }
    const created = await addQuestion(questionData);
    res.status(201).json({ success: true, question: created });
  } catch (err) {
    console.warn('Create question error:', err);
    res.status(500).json({ error: 'Failed to create question', message: err.message });
  }
});

app.delete('/api/questions/:id', async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ error: 'Question ID is required' });
    }
    const result = await deleteQuestion(id);
    res.json(result);
  } catch (err) {
    console.warn('Delete question error:', err);
    res.status(500).json({ error: 'Failed to delete question', message: err.message });
  }
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
  const { message = '', context = {}, geminiApiKey = '', mode = 'chat' } = req.body || {};
  if (!message || typeof message !== 'string') {
    return res.status(400).json({ error: 'Valid message string is required.' });
  }

  try {
    const result = await processChatMessage(message, context, geminiApiKey, mode);
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

// ---- Institutional AI Teacher Reporting API ----
app.post('/api/ai/teacher-report', async (req, res) => {
  const {
    cohortId = 'DPS-10A',
    cohortName = 'Grade 10 - Section A',
    teacherName = 'Dr. Sunita Rao',
    students = [],
    interventions = [],
  } = req.body || {};

  try {
    const totalCount = students.length || 1;
    const strugglingStudents = students.filter(
      (s) => s.status === 'struggling' || s.overallMastery < 65
    );
    const meanMastery = Math.round(
      students.reduce((a, s) => a + (s.overallMastery || 70), 0) / totalCount
    );

    const topicErrorTally = {};
    students.forEach((st) => {
      Object.entries(st.topics || {}).forEach(([topic, data]) => {
        if (data.score < 65 || data.errors > 1) {
          topicErrorTally[topic] = (topicErrorTally[topic] || 0) + 1;
        }
      });
    });

    const topFrictionTopics = Object.entries(topicErrorTally)
      .sort((a, b) => b[1] - a[1])
      .map(([t, count]) => `${t} (${count} scholars lagging)`);

    const frictionSummary =
      topFrictionTopics.length > 0
        ? topFrictionTopics.join(', ')
        : 'Kinematics (4 scholars), Stoichiometry (3 scholars)';

    const flaggedList = strugglingStudents.map((st) => ({
      name: st.name,
      rollNo: st.rollNo,
      score: `${st.overallMastery}%`,
      topic:
        Object.entries(st.topics || {})
          .filter(([_, d]) => d.score < 65)
          .map(([t, d]) => `${t} (${d.score}%)`)
          .join(', ') || 'Kinematics & Stoichiometry',
      autonomousAction:
        Object.entries(st.topics || {})
          .filter(([_, d]) => d.scaffolding && d.scaffolding !== 'None')
          .map(([_, d]) => d.scaffolding)
          .join('; ') || 'Autonomous stealth scaffolding active',
    }));

    const plainTextReport = `================================================================================
INSTITUTIONAL AI PEDAGOGICAL REPORT
Cohort: ${cohortName} (${cohortId})
Faculty Lead: ${teacherName}
Generated: ${new Date().toLocaleString()}
================================================================================

1. EXECUTIVE DIAGNOSTIC SUMMARY
The cohort currently operates at a mean scientific mastery of ${meanMastery}%. While student engagement remains exceptionally high across experimental benches, telemetry indicates a concentrated conceptual bottleneck in:
${frictionSummary}.

2. STUDENTS FLAGGED FOR INTERVENTION (${strugglingStudents.length} of ${totalCount})
${flaggedList
  .map(
    (f, i) => `[${i + 1}] ${f.name} (${f.rollNo}): Overall ${f.score}
    - Struggling Topic(s): ${f.topic}
    - Deployed Stealth Remediation: ${f.autonomousAction}`
  )
  .join('\n\n')}

3. RECENT AUTONOMOUS ACTIONS INGESTION
${interventions
  .slice(0, 5)
  .map(
    (iv) =>
      `• [${new Date(iv.timestamp).toLocaleTimeString()}] ${iv.topic}: ${iv.action} (${iv.resolved ? 'Resolved' : 'Active'})`
  )
  .join('\n')}

4. RECOMMENDED IN-CLASS ACTION FOR TOMORROW'S SESSION
Dedicate the first 10-12 minutes of tomorrow's live science session to a physical demonstration of 2D projectile kinematics (comparing 30°, 45°, and 60° range vectors) and review mole-ratio balance in magnesium oxidation before students begin physical bench work.
================================================================================`;

    res.json({
      success: true,
      report: {
        generatedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        cohortId,
        cohortName,
        meanMastery,
        strugglingCount: strugglingStudents.length,
        executiveSummary: `Cohort ${cohortName} operates at ${meanMastery}% mean mastery. Diagnostic telemetry reveals primary friction in ${frictionSummary}. Autonomous stealth remediations have been deployed to all affected student workstations.`,
        flaggedStudents: flaggedList,
        recommendedLessonAction: `Dedicate the first 10-12 minutes of tomorrow's class to a live demonstration of 2D projectile kinematics and mole-ratio stoichiometry before students begin hands-on bench experiments.`,
        plainTextReport,
      },
    });
  } catch (err) {
    console.error('Teacher report error:', err);
    res.status(500).json({ error: 'Failed to generate teacher report' });
  }
});

// Institutional Campus Overview Stats API
app.get('/api/institutional/stats', (_req, res) => {
  res.json({
    institution: 'Delhi Public School R.K. Puram',
    code: 'DPS-RKP-2026',
    activeCohorts: 4,
    totalEnrolled: 124,
    reactionsToday: 412,
    reactionsTotal: 12020,
    labHoursTotal: 752,
    meanMastery: 79,
  });
});

app.use(express.static(path.join(__dirname, '..', '..', 'client', 'dist')));

app.listen(PORT, () => {
  console.log(`LabXplore API listening on http://localhost:${PORT}`);
});
