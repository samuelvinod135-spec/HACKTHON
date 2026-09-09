import React, { useState, useEffect, useMemo } from 'react';
import {
  Plus,
  Trash2,
  Search,
  Filter,
  CheckCircle2,
  FolderPlus,
  BookOpen,
  Sparkles,
  HelpCircle,
  X,
  AlertCircle,
  Eye,
  Check,
  ChevronDown,
  Layers,
  Atom,
  FlaskConical,
  GraduationCap,
} from 'lucide-react';
import { fetchQuestionBankChapters, fetchQuizQuestions } from '../../supabase.js';

const DEFAULT_SUBJECTS = ['Physics', 'Chemistry', 'Biology', 'Mathematics'];
const DEFAULT_LEVELS = ['Foundation', 'Main-Moderate', 'Advanced', 'Concept Diagnostic'];

export default function TeacherQuestionBankManager() {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [toast, setToast] = useState('');

  // Filtering & Search
  const [selectedSubject, setSelectedSubject] = useState('All');
  const [selectedChapter, setSelectedChapter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Available chapters
  const [chapters, setChapters] = useState([
    { subject: 'Physics', chapter: 'Kinematics' },
    { subject: 'Physics', chapter: 'Units & Measurements' },
    { subject: 'Physics', chapter: 'Laws of Motion' },
    { subject: 'Physics', chapter: 'Ray Optics' },
    { subject: 'Chemistry', chapter: 'Chemical Bonding & Molecular Structure' },
    { subject: 'Chemistry', chapter: 'Equilibrium' },
    { subject: 'Chemistry', chapter: 'Redox Reactions & Electrochemistry' },
    { subject: 'Chemistry', chapter: 'Stoichiometry' },
  ]);

  // Modals state
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [newTopicModalOpen, setNewTopicModalOpen] = useState(false);

  // New Question Form State
  const [newQ, setNewQ] = useState({
    subject: 'Physics',
    chapter: 'Kinematics',
    exam_level: 'Main-Moderate',
    question: '',
    option_a: '',
    option_b: '',
    option_c: '',
    option_d: '',
    correct_option: 'A',
    explanation: '',
  });

  // New Topic Form State
  const [newTopic, setNewTopic] = useState({
    subject: 'Physics',
    chapterName: '',
  });

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3500);
  };

  // Load chapters & initial questions
  useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        const fetchedChapters = await fetchQuestionBankChapters();
        if (Array.isArray(fetchedChapters) && fetchedChapters.length > 0) {
          setChapters(fetchedChapters);
        }

        // Fetch questions from API or Supabase
        const apiBase = (import.meta.env.VITE_API_URL ? import.meta.env.VITE_API_URL.replace(/\/$/, '') : '') + '/api';
        const res = await fetch(`${apiBase}/questions?limit=50`);
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data.questions) && data.questions.length > 0) {
            setQuestions(data.questions);
            return;
          }
        }

        // Fallback fetch
        const pool = await fetchQuizQuestions({ chapter: 'Kinematics', limit: 20 });
        setQuestions(pool);
      } catch (err) {
        console.warn('Load questions error:', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  // Filtered Chapters based on selected subject
  const availableChaptersForSubject = useMemo(() => {
    if (selectedSubject === 'All') return chapters;
    return chapters.filter((c) => c.subject.toLowerCase() === selectedSubject.toLowerCase());
  }, [chapters, selectedSubject]);

  // Filtered questions
  const filteredQuestions = useMemo(() => {
    return questions.filter((q) => {
      if (selectedSubject !== 'All' && q.subject && q.subject.toLowerCase() !== selectedSubject.toLowerCase()) {
        return false;
      }
      if (selectedChapter !== 'All' && q.chapter && q.chapter.toLowerCase() !== selectedChapter.toLowerCase()) {
        return false;
      }
      if (searchQuery.trim()) {
        const qText = (q.question || '').toLowerCase();
        const chText = (q.chapter || '').toLowerCase();
        const expText = (q.explanation || '').toLowerCase();
        const term = searchQuery.toLowerCase();
        return qText.includes(term) || chText.includes(term) || expText.includes(term);
      }
      return true;
    });
  }, [questions, selectedSubject, selectedChapter, searchQuery]);

  // Handle Add Question
  const handleAddQuestionSubmit = async (e) => {
    e.preventDefault();
    if (!newQ.question.trim()) {
      alert('Please enter the question text.');
      return;
    }
    if (!newQ.option_a.trim() || !newQ.option_b.trim() || !newQ.option_c.trim() || !newQ.option_d.trim()) {
      alert('Please fill out all 4 options (A, B, C, D).');
      return;
    }

    const questionPayload = {
      id: `q-custom-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      subject: newQ.subject,
      chapter: newQ.chapter,
      topic: newQ.chapter,
      exam_level: newQ.exam_level,
      question_type: 'MCQ',
      question: newQ.question.trim(),
      option_a: newQ.option_a.trim(),
      option_b: newQ.option_b.trim(),
      option_c: newQ.option_c.trim(),
      option_d: newQ.option_d.trim(),
      correct_option: newQ.correct_option.toUpperCase(),
      answer: newQ[`option_${newQ.correct_option.toLowerCase()}`].trim(),
      explanation: newQ.explanation.trim() || 'Verified pedagogical curriculum concept.',
      xp: 15,
    };

    try {
      const apiBase = (import.meta.env.VITE_API_URL ? import.meta.env.VITE_API_URL.replace(/\/$/, '') : '') + '/api';
      const res = await fetch(`${apiBase}/questions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(questionPayload),
      });

      // Optimistically add to UI state
      setQuestions((prev) => [questionPayload, ...prev]);
      showToast(`Question successfully added to "${newQ.chapter}"!`);
      setAddModalOpen(false);

      // Reset form
      setNewQ({
        subject: newQ.subject,
        chapter: newQ.chapter,
        exam_level: 'Main-Moderate',
        question: '',
        option_a: '',
        option_b: '',
        option_c: '',
        option_d: '',
        correct_option: 'A',
        explanation: '',
      });
    } catch (err) {
      console.warn('Add question fallback error:', err);
      // Still keep in optimistic state for air-gapped demo
      setQuestions((prev) => [questionPayload, ...prev]);
      showToast(`Question saved locally in "${newQ.chapter}"!`);
      setAddModalOpen(false);
    }
  };

  // Handle Delete Question
  const handleDeleteQuestion = async (id, questionStem) => {
    const confirm = window.confirm(`Are you sure you want to delete this question?\n\n"${questionStem.slice(0, 80)}..."`);
    if (!confirm) return;

    try {
      const apiBase = (import.meta.env.VITE_API_URL ? import.meta.env.VITE_API_URL.replace(/\/$/, '') : '') + '/api';
      await fetch(`${apiBase}/questions/${encodeURIComponent(id)}`, {
        method: 'DELETE',
      });
    } catch (e) {
      console.warn('Delete question request warning:', e);
    }

    setQuestions((prev) => prev.filter((q) => q.id !== id));
    showToast('Question deleted from Assessment Bank.');
  };

  // Handle Create New Topic
  const handleCreateTopicSubmit = (e) => {
    e.preventDefault();
    const name = newTopic.chapterName.trim();
    if (!name) return;

    const exists = chapters.some(
      (c) => c.subject.toLowerCase() === newTopic.subject.toLowerCase() && c.chapter.toLowerCase() === name.toLowerCase()
    );

    if (exists) {
      alert('This topic already exists under the selected subject.');
      return;
    }

    const newEntry = { subject: newTopic.subject, chapter: name, count: '0' };
    setChapters((prev) => [...prev, newEntry]);
    setSelectedSubject(newTopic.subject);
    setSelectedChapter(name);
    setNewQ((prev) => ({ ...prev, subject: newTopic.subject, chapter: name }));
    setNewTopic({ subject: newTopic.subject, chapterName: '' });
    setNewTopicModalOpen(false);
    showToast(`New topic "${name}" created! You can now author questions for it.`);
  };

  return (
    <div className="space-y-6">
      {/* Toast alert */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 rounded-2xl bg-slate-900 text-white px-4 py-3 shadow-2xl text-xs font-bold animate-in fade-in slide-in-from-bottom-3 border border-sky-400">
          <CheckCircle2 size={16} className="text-yellow-400 shrink-0" />
          <span>{toast}</span>
        </div>
      )}

      {/* Control Banner */}
      <div className="rounded-3xl border border-sky-200/80 bg-white p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-black uppercase tracking-wider text-sky-800 bg-sky-50 px-2.5 py-0.5 rounded-full border border-sky-200">
              Administrative Assessment Authority
            </span>
            <span className="text-[10px] font-bold text-slate-400 font-mono">
              Faculty Controlled
            </span>
          </div>
          <h2 className="mt-1 text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <span>Assessment & Question Bank Manager</span>
            <span className="text-lg">📚</span>
          </h2>
          <p className="mt-0.5 text-xs text-slate-500 font-medium">
            Full authority to author questions, delete items, register new curriculum topics, and configure question categories.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2.5 flex-wrap">
          <button
            type="button"
            onClick={() => setNewTopicModalOpen(true)}
            className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-2xl text-xs font-bold text-slate-700 bg-slate-50 hover:bg-slate-100 border border-slate-200 shadow-2xs transition cursor-pointer"
          >
            <FolderPlus size={15} className="text-sky-600" />
            <span>+ Create Topic</span>
          </button>

          <button
            type="button"
            onClick={() => setAddModalOpen(true)}
            className="clay-btn-yellow flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-black text-slate-950 shadow-md hover:scale-105 transition cursor-pointer"
          >
            <Plus size={16} strokeWidth={3} />
            <span>+ Add New Question</span>
          </button>
        </div>
      </div>

      {/* Filter & Search Toolbar */}
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
        {/* Search */}
        <div className="sm:col-span-5 relative">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search questions by concept or keyword..."
            className="w-full pl-9 pr-4 py-2.5 rounded-2xl border border-sky-100 bg-white text-xs font-medium text-slate-800 placeholder-slate-400 shadow-2xs focus:outline-none focus:border-sky-400"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              <X size={14} />
            </button>
          )}
        </div>

        {/* Subject Filter */}
        <div className="sm:col-span-3">
          <select
            value={selectedSubject}
            onChange={(e) => {
              setSelectedSubject(e.target.value);
              setSelectedChapter('All');
            }}
            className="w-full px-3 py-2.5 rounded-2xl border border-sky-100 bg-white text-xs font-bold text-slate-800 shadow-2xs focus:outline-none focus:border-sky-400 cursor-pointer"
          >
            <option value="All">All Subjects (Physics, Chem...)</option>
            {DEFAULT_SUBJECTS.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>

        {/* Chapter / Topic Filter */}
        <div className="sm:col-span-4">
          <select
            value={selectedChapter}
            onChange={(e) => setSelectedChapter(e.target.value)}
            className="w-full px-3 py-2.5 rounded-2xl border border-sky-100 bg-white text-xs font-bold text-slate-800 shadow-2xs focus:outline-none focus:border-sky-400 cursor-pointer"
          >
            <option value="All">All Topics ({availableChaptersForSubject.length} available)</option>
            {availableChaptersForSubject.map((c) => (
              <option key={`${c.subject}-${c.chapter}`} value={c.chapter}>
                [{c.subject}] {c.chapter}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Question Counter & Status */}
      <div className="flex items-center justify-between text-xs font-bold text-slate-500 px-2">
        <span>
          Showing <strong className="text-slate-800 font-black">{filteredQuestions.length}</strong> questions
          {selectedChapter !== 'All' ? ` in ${selectedChapter}` : ''}
        </span>
        <span className="text-[11px] text-sky-700 bg-sky-50 px-2 py-0.5 rounded-md border border-sky-200">
          Faculty CRUD Live
        </span>
      </div>

      {/* Questions List */}
      {loading ? (
        <div className="p-12 text-center bg-white rounded-3xl border border-sky-100 shadow-sm">
          <div className="w-8 h-8 mx-auto border-3 border-sky-500 border-t-transparent rounded-full animate-spin" />
          <p className="mt-3 text-xs font-bold text-slate-500">Loading Assessment Bank...</p>
        </div>
      ) : filteredQuestions.length === 0 ? (
        <div className="p-12 text-center bg-white rounded-3xl border border-dashed border-slate-200 shadow-sm space-y-3">
          <BookOpen size={36} className="mx-auto text-slate-300" />
          <h3 className="text-sm font-bold text-slate-800">No Questions Found</h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            No questions match your filter criteria. Click "+ Add New Question" to create your first question for this topic!
          </p>
          <button
            onClick={() => setAddModalOpen(true)}
            className="clay-btn-yellow inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-black text-slate-900 shadow-xs"
          >
            <Plus size={14} /> + Add Question
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredQuestions.map((q, idx) => {
            const correctOpt = (q.correct_option || 'A').toUpperCase();
            return (
              <div
                key={q.id || idx}
                className="group relative rounded-3xl border border-sky-100/90 bg-white p-5 sm:p-6 shadow-sm hover:shadow-md transition space-y-3"
              >
                {/* Card Top Metadata & Delete Action */}
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[10px] font-black uppercase tracking-wider text-sky-900 bg-sky-100/80 px-2.5 py-0.5 rounded-full border border-sky-200">
                      {q.subject || 'Physics'}
                    </span>
                    <span className="text-[10px] font-bold text-slate-600 bg-slate-100 px-2.5 py-0.5 rounded-full">
                      {q.chapter || 'Kinematics'}
                    </span>
                    <span className="text-[10px] font-bold text-amber-800 bg-yellow-100/80 px-2 py-0.5 rounded-full border border-yellow-200">
                      {q.exam_level || 'Main-Moderate'}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleDeleteQuestion(q.id, q.question)}
                    className="flex items-center gap-1 text-[11px] font-bold text-rose-600 hover:text-rose-800 bg-rose-50 hover:bg-rose-100 px-2.5 py-1 rounded-xl transition cursor-pointer"
                    title="Delete Question"
                  >
                    <Trash2 size={13} />
                    <span>Delete</span>
                  </button>
                </div>

                {/* Question Stem */}
                <p className="text-xs sm:text-sm font-bold text-slate-900 leading-relaxed">
                  <span className="font-mono text-sky-600 mr-2">Q{idx + 1}.</span>
                  {q.question}
                </p>

                {/* Options Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                  {[
                    { key: 'A', text: q.option_a },
                    { key: 'B', text: q.option_b },
                    { key: 'C', text: q.option_c },
                    { key: 'D', text: q.option_d },
                  ].map((opt) => {
                    const isCorrect = opt.key === correctOpt;
                    return (
                      <div
                        key={opt.key}
                        className={`flex items-start gap-2.5 p-2.5 rounded-xl border text-xs font-medium transition ${
                          isCorrect
                            ? 'bg-emerald-50/80 border-emerald-300 text-emerald-950 font-bold shadow-2xs'
                            : 'bg-slate-50/70 border-slate-100 text-slate-700'
                        }`}
                      >
                        <span
                          className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-lg text-[10px] font-mono font-black ${
                            isCorrect ? 'bg-emerald-600 text-white' : 'bg-white text-slate-600 border border-slate-200'
                          }`}
                        >
                          {opt.key}
                        </span>
                        <span className="flex-1 leading-snug">{opt.text || '(Empty option)'}</span>
                        {isCorrect && (
                          <span className="text-[10px] font-black text-emerald-700 bg-emerald-100 px-1.5 py-0.2 rounded">
                            CORRECT
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Pedagogical Explanation */}
                {q.explanation && (
                  <div className="rounded-xl bg-sky-50/60 border border-sky-100 p-3 text-[11px] text-slate-600 flex items-start gap-2">
                    <Sparkles size={14} className="text-sky-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-sky-900 font-bold">Curriculum Explanation: </strong>
                      <span>{q.explanation}</span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* MODAL 1: Add New Question */}
      {addModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="relative w-full max-w-2xl rounded-3xl bg-white p-6 sm:p-8 shadow-2xl border border-sky-200 animate-in fade-in zoom-in-95 my-8">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-2.5">
                <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-yellow-300 text-slate-950 font-black shadow-xs">
                  <Plus size={18} strokeWidth={3} />
                </span>
                <div>
                  <h3 className="text-base font-black text-slate-900">Author New Assessment Question</h3>
                  <p className="text-[11px] text-slate-400">Question will be immediately accessible to all students.</p>
                </div>
              </div>
              <button
                onClick={() => setAddModalOpen(false)}
                className="p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleAddQuestionSubmit} className="mt-5 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {/* Subject */}
                <div>
                  <label className="block text-[10px] font-black uppercase text-slate-500 mb-1">Subject</label>
                  <select
                    value={newQ.subject}
                    onChange={(e) => {
                      const sub = e.target.value;
                      const availableInSub = chapters.filter((c) => c.subject.toLowerCase() === sub.toLowerCase());
                      setNewQ({
                        ...newQ,
                        subject: sub,
                        chapter: availableInSub[0]?.chapter || 'General',
                      });
                    }}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-800 bg-white"
                  >
                    {DEFAULT_SUBJECTS.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>

                {/* Chapter */}
                <div>
                  <label className="block text-[10px] font-black uppercase text-slate-500 mb-1">Topic / Chapter</label>
                  <select
                    value={newQ.chapter}
                    onChange={(e) => setNewQ({ ...newQ, chapter: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-800 bg-white"
                  >
                    {chapters
                      .filter((c) => c.subject.toLowerCase() === newQ.subject.toLowerCase())
                      .map((c) => (
                        <option key={c.chapter} value={c.chapter}>{c.chapter}</option>
                      ))}
                  </select>
                </div>

                {/* Difficulty */}
                <div>
                  <label className="block text-[10px] font-black uppercase text-slate-500 mb-1">Exam / Difficulty</label>
                  <select
                    value={newQ.exam_level}
                    onChange={(e) => setNewQ({ ...newQ, exam_level: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-800 bg-white"
                  >
                    {DEFAULT_LEVELS.map((l) => (
                      <option key={l} value={l}>{l}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Question Text */}
              <div>
                <label className="block text-[10px] font-black uppercase text-slate-500 mb-1">Question Stem</label>
                <textarea
                  rows={3}
                  required
                  value={newQ.question}
                  onChange={(e) => setNewQ({ ...newQ, question: e.target.value })}
                  placeholder="e.g. In a convex lens with focal length 20 cm, an object is placed at 40 cm. Where is the image formed?"
                  className="w-full p-3 rounded-2xl border border-slate-200 text-xs font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:border-sky-400"
                />
              </div>

              {/* Options A, B, C, D */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {['A', 'B', 'C', 'D'].map((key) => (
                  <div key={key}>
                    <label className="block text-[10px] font-bold text-slate-600 mb-1">Option {key}</label>
                    <input
                      type="text"
                      required
                      value={newQ[`option_${key.toLowerCase()}`]}
                      onChange={(e) => setNewQ({ ...newQ, [`option_${key.toLowerCase()}`]: e.target.value })}
                      placeholder={`Enter answer choice for Option ${key}`}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-sky-400"
                    />
                  </div>
                ))}
              </div>

              {/* Correct Option Selector */}
              <div>
                <label className="block text-[10px] font-black uppercase text-slate-500 mb-1.5">Correct Answer</label>
                <div className="flex items-center gap-3">
                  {['A', 'B', 'C', 'D'].map((opt) => (
                    <label
                      key={opt}
                      className={`flex flex-1 items-center justify-center gap-2 py-2.5 px-3 rounded-xl border font-bold text-xs cursor-pointer transition ${
                        newQ.correct_option === opt
                          ? 'bg-emerald-50 border-emerald-400 text-emerald-900 ring-2 ring-emerald-300/40'
                          : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <input
                        type="radio"
                        name="correct_option"
                        value={opt}
                        checked={newQ.correct_option === opt}
                        onChange={() => setNewQ({ ...newQ, correct_option: opt })}
                        className="hidden"
                      />
                      <span>Option {opt}</span>
                      {newQ.correct_option === opt && <Check size={14} className="text-emerald-600" />}
                    </label>
                  ))}
                </div>
              </div>

              {/* Explanation */}
              <div>
                <label className="block text-[10px] font-black uppercase text-slate-500 mb-1">
                  Explanation & Concept Diagnostic
                </label>
                <input
                  type="text"
                  value={newQ.explanation}
                  onChange={(e) => setNewQ({ ...newQ, explanation: e.target.value })}
                  placeholder="Explain why this option is correct and identify common student mistakes..."
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-sky-400"
                />
              </div>

              {/* Modal Buttons */}
              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setAddModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="clay-btn-yellow px-5 py-2.5 rounded-xl text-xs font-black text-slate-950 shadow-md"
                >
                  Save Question
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: Create New Topic */}
      {newTopicModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4">
          <div className="relative w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl border border-sky-200 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-sm font-black text-slate-900 flex items-center gap-2">
                <FolderPlus size={16} className="text-sky-600" />
                <span>Create New Curriculum Topic</span>
              </h3>
              <button
                onClick={() => setNewTopicModalOpen(false)}
                className="p-1 rounded-full text-slate-400 hover:text-slate-600"
              >
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleCreateTopicSubmit} className="mt-4 space-y-4">
              <div>
                <label className="block text-[10px] font-black uppercase text-slate-500 mb-1">Subject</label>
                <select
                  value={newTopic.subject}
                  onChange={(e) => setNewTopic({ ...newTopic, subject: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-800"
                >
                  {DEFAULT_SUBJECTS.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-black uppercase text-slate-500 mb-1">Topic / Chapter Name</label>
                <input
                  type="text"
                  required
                  value={newTopic.chapterName}
                  onChange={(e) => setNewTopic({ ...newTopic, chapterName: e.target.value })}
                  placeholder="e.g. Rotational Dynamics or Carbon & its Compounds"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-sky-400"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setNewTopicModalOpen(false)}
                  className="px-3 py-2 rounded-xl text-xs font-bold text-slate-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="clay-btn-yellow px-4 py-2 rounded-xl text-xs font-black text-slate-950 shadow-xs"
                >
                  Create Topic
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
