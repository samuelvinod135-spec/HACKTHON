import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import Database from 'better-sqlite3';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const physicsCsvPath = path.join(__dirname, '..', 'data', 'physics_questions.csv');
const chemistryCsvPath = path.join(__dirname, '..', 'data', 'chemistry_questions.csv');
const dbPath = path.join(__dirname, '..', 'data', 'labxplore.db');

const SUPABASE_URL = process.env.VITE_SUPABASE_URL || 'https://htgsiuqtlfdebxepsslh.supabase.co';
// Legacy service_role key to bypass any insert restrictions
const SUPABASE_SERVICE_KEY =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh0Z3NpdXF0bGZkZWJ4ZXBzc2xoIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4NjcxODE1NiwiZXhwIjoyMTAyMjk0MTU2fQ.usYAxzSHcfdu1-fPrQIJPZq8KME8h7UTQHo57BI4mtY';

// Robust RFC-4180 CSV parser
function parseCSV(text) {
  const lines = [];
  let row = [];
  let inQuotes = false;
  let currentStr = '';

  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    const nextChar = text[i + 1];

    if (char === '"') {
      if (inQuotes && nextChar === '"') {
        currentStr += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === ',' && !inQuotes) {
      row.push(currentStr.trim());
      currentStr = '';
    } else if ((char === '\r' || char === '\n') && !inQuotes) {
      if (char === '\r' && nextChar === '\n') i++;
      row.push(currentStr.trim());
      currentStr = '';
      if (row.length > 1 || (row.length === 1 && row[0] !== '')) {
        lines.push(row);
      }
      row = [];
    } else {
      currentStr += char;
    }
  }

  if (currentStr || row.length > 0) {
    row.push(currentStr.trim());
    lines.push(row);
  }

  return lines;
}

function loadCsvQuestions(filePath, defaultSubject) {
  if (!fs.existsSync(filePath)) {
    console.error(`File not found: ${filePath}`);
    return [];
  }

  const raw = fs.readFileSync(filePath, 'utf8');
  const rows = parseCSV(raw);
  if (rows.length < 2) return [];

  const header = rows[0].map((h) => h.toLowerCase());
  const colIndex = {
    id: header.indexOf('id'),
    subject: header.indexOf('subject'),
    chapter: header.indexOf('chapter'),
    topic: header.indexOf('topic'),
    exam_level: header.indexOf('exam_level'),
    question_type: header.indexOf('question_type'),
    question: header.indexOf('question'),
    option_a: header.indexOf('option_a'),
    option_b: header.indexOf('option_b'),
    option_c: header.indexOf('option_c'),
    option_d: header.indexOf('option_d'),
    correct_option: header.indexOf('correct_option'),
    answer: header.indexOf('answer'),
    explanation: header.indexOf('explanation'),
    source: header.indexOf('source'),
    xp: header.indexOf('xp'),
  };

  const questions = [];
  for (let i = 1; i < rows.length; i++) {
    const r = rows[i];
    if (!r[colIndex.id] || !r[colIndex.question]) continue;

    questions.push({
      id: r[colIndex.id],
      subject: r[colIndex.subject] || defaultSubject,
      chapter: r[colIndex.chapter] || 'General',
      topic: r[colIndex.topic] || 'Concepts',
      exam_level: r[colIndex.exam_level] || 'Main-Moderate',
      question_type: r[colIndex.question_type] || 'MCQ',
      question: r[colIndex.question],
      option_a: r[colIndex.option_a] || '',
      option_b: r[colIndex.option_b] || '',
      option_c: r[colIndex.option_c] || '',
      option_d: r[colIndex.option_d] || '',
      correct_option: (r[colIndex.correct_option] || 'A').toUpperCase().trim(),
      answer: r[colIndex.answer] || '',
      explanation: r[colIndex.explanation] || '',
      source: r[colIndex.source] || 'JEE Question Bank',
      xp: Number(r[colIndex.xp]) || 10,
    });
  }

  return questions;
}

// 1. Seed Local SQLite database
function seedLocalDatabase(allQuestions) {
  console.log(`\n📦 Seeding local SQLite database (${allQuestions.length} records)...`);
  const db = new Database(dbPath);
  db.pragma('journal_mode = WAL');

  db.exec(`
    CREATE TABLE IF NOT EXISTS question_bank (
      id TEXT PRIMARY KEY,
      subject TEXT NOT NULL,
      chapter TEXT NOT NULL,
      topic TEXT NOT NULL,
      exam_level TEXT NOT NULL,
      question_type TEXT NOT NULL DEFAULT 'MCQ',
      question TEXT NOT NULL,
      option_a TEXT NOT NULL,
      option_b TEXT NOT NULL,
      option_c TEXT NOT NULL,
      option_d TEXT NOT NULL,
      correct_option TEXT NOT NULL,
      answer TEXT NOT NULL,
      explanation TEXT,
      source TEXT,
      xp INTEGER NOT NULL DEFAULT 10,
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE INDEX IF NOT EXISTS idx_sqlite_qb_chapter ON question_bank(chapter);
    CREATE INDEX IF NOT EXISTS idx_sqlite_qb_exam_level ON question_bank(exam_level);
    CREATE INDEX IF NOT EXISTS idx_sqlite_qb_subject ON question_bank(subject);
  `);

  const insertStmt = db.prepare(`
    INSERT OR REPLACE INTO question_bank (
      id, subject, chapter, topic, exam_level, question_type,
      question, option_a, option_b, option_c, option_d,
      correct_option, answer, explanation, source, xp
    ) VALUES (
      @id, @subject, @chapter, @topic, @exam_level, @question_type,
      @question, @option_a, @option_b, @option_c, @option_d,
      @correct_option, @answer, @explanation, @source, @xp
    )
  `);

  const insertMany = db.transaction((rows) => {
    for (const row of rows) insertStmt.run(row);
  });

  insertMany(allQuestions);

  const count = db.prepare('SELECT COUNT(*) as c FROM question_bank').get().c;
  console.log(`✅ Local SQLite question_bank now has ${count} records.`);
  db.close();
}

// 2. Upload to Supabase REST API in batches
async function uploadToSupabase(allQuestions) {
  console.log(`\n🚀 Uploading to Supabase (${SUPABASE_URL}) via REST API...`);
  const endpoint = `${SUPABASE_URL}/rest/v1/question_bank`;
  const BATCH_SIZE = 100;
  let totalUploaded = 0;

  for (let i = 0; i < allQuestions.length; i += BATCH_SIZE) {
    const batch = allQuestions.slice(i, i + BATCH_SIZE);
    let attempts = 0;
    let success = false;

    while (attempts < 3 && !success) {
      attempts++;
      try {
        const res = await fetch(endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            apikey: SUPABASE_SERVICE_KEY,
            Authorization: `Bearer ${SUPABASE_SERVICE_KEY}`,
            Prefer: 'resolution=merge-duplicates,return=minimal',
          },
          body: JSON.stringify(batch),
        });

        if (res.ok) {
          totalUploaded += batch.length;
          process.stdout.write(
            `\rProgress: ${totalUploaded}/${allQuestions.length} uploaded (${Math.round((totalUploaded / allQuestions.length) * 100)}%)`
          );
          success = true;
        } else {
          const errText = await res.text();
          console.error(`\nBatch ${i / BATCH_SIZE + 1} failed (status ${res.status}): ${errText}`);
          await new Promise((resolve) => setTimeout(resolve, 1000 * attempts));
        }
      } catch (err) {
        console.error(`\nNetwork error on batch ${i / BATCH_SIZE + 1}: ${err.message}`);
        await new Promise((resolve) => setTimeout(resolve, 1500 * attempts));
      }
    }

    if (!success) {
      console.warn(`\n⚠️ Skipping batch starting at row ${i} after 3 failed attempts.`);
    }
  }

  console.log(`\n\n🎉 Finished uploading ${totalUploaded} questions to Supabase!`);
}

async function main() {
  console.log('📖 Reading physics_questions.csv...');
  const physicsQuestions = loadCsvQuestions(physicsCsvPath, 'Physics');
  console.log(`   Loaded ${physicsQuestions.length} physics questions.`);

  console.log('📖 Reading chemistry_questions.csv...');
  const chemistryQuestions = loadCsvQuestions(chemistryCsvPath, 'Chemistry');
  console.log(`   Loaded ${chemistryQuestions.length} chemistry questions.`);

  const allQuestions = [...physicsQuestions, ...chemistryQuestions];
  console.log(`Total Question Bank collection size: ${allQuestions.length} questions.`);

  // 1. Seed local SQLite database
  seedLocalDatabase(allQuestions);

  // 2. Upload to Supabase database
  await uploadToSupabase(allQuestions);
}

main().catch((err) => {
  console.error('Fatal error in Question Bank upload:', err);
  process.exit(1);
});
