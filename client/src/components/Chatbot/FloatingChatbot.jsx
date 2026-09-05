import { useState, useEffect, useRef, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import {
  MessageSquare,
  X,
  Send,
  Sparkles,
  RotateCcw,
  Minus,
  Maximize2,
  Atom,
  FlaskConical,
  Compass,
  GraduationCap,
  Calendar,
  AlertCircle,
  HelpCircle,
  CheckCircle2,
  Plus,
  Search,
  BookOpen,
  FileText,
  Clock,
  Pin,
  Trash2,
  Check,
  ExternalLink,
  ChevronRight,
  Bookmark,
  Share2,
  Copy,
} from 'lucide-react';
import { api } from '../../api.js';
import {
  getSessions,
  saveSession,
  deleteSession,
  searchSessions,
} from '../../utils/chatHistory.js';
import {
  getNotes,
  saveNote,
  deleteNote,
  toggleNoteResolved,
  searchNotes,
  pinQuestionToNotes,
} from '../../utils/studentNotes.js';
import { SCIENCE_LIBRARY } from '../../data/scienceLibraryData.js';

function VisualReactionCard({ rawString }) {
  const [equationPart, subtitlePart] = rawString.split('|').map((s) => s?.trim() || '');

  const arrowMatch = equationPart.match(/(.*?)(?:→|->|───>|➔|\\rightarrow)(.*)/);
  let reactants = equationPart;
  let products = '';
  if (arrowMatch) {
    reactants = arrowMatch[1].trim();
    products = arrowMatch[2].trim();
  }

  let reactantSub = '';
  let productSub = '';
  if (subtitlePart) {
    const subMatch = subtitlePart.match(/(.*?)(?:→|->|───>|➔)(.*)/);
    if (subMatch) {
      reactantSub = subMatch[1].trim();
      productSub = subMatch[2].trim();
    } else {
      reactantSub = subtitlePart;
    }
  }

  return (
    <div className="my-3 rounded-2xl border-2 border-blue-200/90 bg-white p-3.5 shadow-sm select-none transition-all hover:shadow-md">
      <div className="flex items-center justify-between mb-1.5 border-b border-slate-100 pb-1.5">
        <span className="text-[10px] font-extrabold uppercase tracking-wider text-blue-600 flex items-center gap-1">
          <FlaskConical size={11} /> Chemical Reaction
        </span>
        <span className="text-[9px] font-bold text-slate-400">
          Balanced Equation
        </span>
      </div>

      <div className="flex items-center justify-center gap-3 sm:gap-4 py-2 font-serif text-xl sm:text-2xl font-bold text-slate-900">
        <span className="tracking-wide text-slate-900">{reactants}</span>
        <div className="flex items-center px-1">
          <div className="h-[2.5px] w-9 sm:w-16 bg-blue-600 relative">
            <div className="absolute -right-1.5 -top-[4.5px] border-solid border-l-blue-600 border-l-[8px] border-y-transparent border-y-[5.5px] border-r-0" />
          </div>
        </div>
        <span className="tracking-wide text-slate-900">{products}</span>
      </div>

      {(reactantSub || productSub) && (
        <div className="mt-1 flex items-center justify-between rounded-lg bg-slate-50 px-2.5 py-1.5 text-[10px] text-slate-600 font-medium">
          <div className="text-left truncate max-w-[48%]">
            <span className="font-bold text-slate-800">Reactants: </span>
            <span>{reactantSub}</span>
          </div>
          <div className="text-right truncate max-w-[48%]">
            <span className="font-bold text-slate-800">Product: </span>
            <span>{productSub}</span>
          </div>
        </div>
      )}
    </div>
  );
}

function VisualEquationCard({ rawString }) {
  const [formula, title] = rawString.split('|').map((s) => s?.trim() || '');
  return (
    <div className="my-2.5 rounded-xl border border-sky-200 bg-sky-50/50 p-2.5 text-center shadow-2xs">
      {title && (
        <p className="text-[9px] font-extrabold uppercase tracking-wider text-sky-700 mb-1">
          {title}
        </p>
      )}
      <div className="font-mono text-sm sm:text-base font-black text-slate-900">
        {formula}
      </div>
    </div>
  );
}

function sanitizeRawLatex(str) {
  if (!str) return '';
  return str
    .replace(/\\mathbf\{([^}]+)\}/g, '$1')
    .replace(/\\text\{([^}]+)\}/g, '$1')
    .replace(/\\xrightarrow\{([^}]+)\}/g, '──($1)──>')
    .replace(/\\cdot/g, '·')
    .replace(/\\times/g, '×')
    .replace(/\\approx/g, '≈')
    .replace(/\\Delta/g, 'Δ')
    .replace(/\\,/g, ' ')
    .replace(/\\sqrt\{([^}]+)\}/g, '√($1)')
    .replace(/\\frac\{([^}]+)\}\{([^}]+)\}/g, '($1 / $2)');
}

function formatMessageContent(content) {
  if (!content) return null;

  const lines = content.split('\n');
  const elements = [];
  let inList = false;
  let listItems = [];

  const flushList = () => {
    if (inList && listItems.length > 0) {
      elements.push(
        <ul key={`list-${elements.length}`} className="my-1.5 space-y-1 pl-4 list-disc marker:text-sky-500">
          {listItems.map((item, i) => (
            <li key={i} className="text-inherit leading-relaxed">
              {renderFormattedText(item)}
            </li>
          ))}
        </ul>
      );
      listItems = [];
      inList = false;
    }
  };

  lines.forEach((line, idx) => {
    const trimmed = line.trim();

    if (trimmed.startsWith('[REACTION:') && trimmed.endsWith(']')) {
      flushList();
      const content = trimmed.slice(10, -1);
      elements.push(<VisualReactionCard key={idx} rawString={content} />);
      return;
    }

    if (trimmed.startsWith('[EQUATION:') && trimmed.endsWith(']')) {
      flushList();
      const content = trimmed.slice(10, -1);
      elements.push(<VisualEquationCard key={idx} rawString={content} />);
      return;
    }

    if (trimmed.startsWith('#### ')) {
      flushList();
      elements.push(
        <h5 key={idx} className="mt-2 mb-0.5 text-xs font-bold text-slate-800">
          {renderFormattedText(trimmed.replace('#### ', ''))}
        </h5>
      );
    } else if (trimmed.startsWith('### ')) {
      flushList();
      elements.push(
        <h4 key={idx} className="mt-2 mb-1 text-xs sm:text-[13px] font-black text-slate-900 flex items-center gap-1.5">
          {renderFormattedText(trimmed.replace('### ', ''))}
        </h4>
      );
    } else if (trimmed.startsWith('## ')) {
      flushList();
      elements.push(
        <h3 key={idx} className="mt-2.5 mb-1.5 text-xs sm:text-sm font-black text-slate-900">
          {renderFormattedText(trimmed.replace('## ', ''))}
        </h3>
      );
    } else if (trimmed.startsWith('* ') || trimmed.startsWith('- ')) {
      inList = true;
      listItems.push(trimmed.slice(2));
    } else if (/^\d+\.\s/.test(trimmed)) {
      flushList();
      elements.push(
        <div key={idx} className="my-1 pl-2 text-inherit leading-relaxed flex items-start gap-1.5">
          <span className="font-bold text-sky-600 shrink-0">{trimmed.match(/^\d+\./)[0]}</span>
          <span>{renderFormattedText(trimmed.replace(/^\d+\.\s*/, ''))}</span>
        </div>
      );
    } else if (trimmed.startsWith('$$') && trimmed.endsWith('$$')) {
      flushList();
      const formula = sanitizeRawLatex(trimmed.slice(2, -2));
      if (formula.includes('→') || formula.includes('->') || formula.includes('──>')) {
        elements.push(<VisualReactionCard key={idx} rawString={formula} />);
      } else {
        elements.push(
          <div
            key={idx}
            className="my-2 overflow-x-auto rounded-lg bg-white border border-slate-200/90 px-3 py-1.5 text-center font-mono text-xs font-bold text-slate-900 shadow-2xs"
          >
            {formula}
          </div>
        );
      }
    } else if (trimmed === '') {
      flushList();
      elements.push(<div key={idx} className="h-1.5" />);
    } else {
      flushList();
      elements.push(
        <p key={idx} className="leading-relaxed text-inherit">
          {renderFormattedText(line)}
        </p>
      );
    }
  });

  flushList();
  return <div className="space-y-1">{elements}</div>;
}

function renderFormattedText(text) {
  if (!text) return '';
  const sanitized = sanitizeRawLatex(text);
  const parts = sanitized.split(/(\*\*.*?\*\*|\$.*?\$|`.*?`)/g);

  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={i} className="font-bold text-slate-950">
          {part.slice(2, -2)}
        </strong>
      );
    }
    if (part.startsWith('$') && part.endsWith('$')) {
      return (
        <code key={i} className="rounded bg-sky-50 px-1 py-0.5 font-mono text-[11px] font-bold text-sky-800">
          {sanitizeRawLatex(part.slice(1, -1))}
        </code>
      );
    }
    if (part.startsWith('`') && part.endsWith('`')) {
      return (
        <code key={i} className="rounded bg-slate-100 px-1 py-0.5 font-mono text-[11px] text-slate-800">
          {part.slice(1, -1)}
        </code>
      );
    }
    return part;
  });
}

function formatTime(isoString) {
  if (!isoString) return '';
  try {
    const d = new Date(isoString);
    return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  } catch {
    return '';
  }
}

export default function FloatingChatbot() {
  const location = useLocation();

  // Navigation & Window state
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [hasUnread, setHasUnread] = useState(true);

  // Active view: 'chat' | 'history' | 'library' | 'notes'
  const [activeTab, setActiveTab] = useState('chat');

  // Chat Session state
  const [currentSessionId, setCurrentSessionId] = useState(`session-${Date.now()}`);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [suggestedPrompts, setSuggestedPrompts] = useState([]);

  // Search Chat & History state
  const [historySearchQuery, setHistorySearchQuery] = useState('');
  const [sessionsList, setSessionsList] = useState([]);

  // Library state
  const [libraryFilter, setLibraryFilter] = useState('All');
  const [librarySearch, setLibrarySearch] = useState('');

  // Student Notes state
  const [notesList, setNotesList] = useState([]);
  const [notesSearch, setNotesSearch] = useState('');
  const [newNoteText, setNewNoteText] = useState('');
  const [newNoteTitle, setNewNoteTitle] = useState('');
  const [isWritingNote, setIsWritingNote] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Derive human-readable active lab context
  const activeContext = useMemo(() => {
    const path = location.pathname;
    if (path.includes('/physics')) {
      return {
        path,
        domain: 'Physics',
        label: 'Physics Lab · Ray Optics & Mechanics',
        icon: <Compass size={13} className="text-sky-500" />,
        badgeBg: 'bg-sky-50 border-sky-200 text-sky-700',
        activeExperiment: 'Ray Optics & Mechanics Canvas',
      };
    }
    if (path.includes('/chemistry')) {
      return {
        path,
        domain: 'Chemistry',
        label: 'Chemistry Lab · Reactions & Synthesis',
        icon: <FlaskConical size={13} className="text-emerald-500" />,
        badgeBg: 'bg-emerald-50 border-emerald-200 text-emerald-700',
        activeExperiment: 'Magnesium Combustion & Reactions',
      };
    }
    if (path.includes('/quizzes')) {
      return {
        path,
        domain: 'Quizzes',
        label: 'Quiz Practice · Concept Reinforcement',
        icon: <GraduationCap size={13} className="text-blue-500" />,
        badgeBg: 'bg-blue-50 border-blue-200 text-blue-700',
        activeExperiment: 'Question Bank Quizzes',
      };
    }
    if (path.includes('/mock-tests')) {
      return {
        path,
        domain: 'Assessment',
        label: 'Mock Tests · Concept Diagnostics',
        icon: <GraduationCap size={13} className="text-purple-500" />,
        badgeBg: 'bg-purple-50 border-purple-200 text-purple-700',
        activeExperiment: 'Diagnostic Assessment',
      };
    }
    if (path.includes('/daily-challenge')) {
      return {
        path,
        domain: 'Challenge',
        label: 'Daily Tasks · Progressive Lab Track',
        icon: <Calendar size={13} className="text-amber-500" />,
        badgeBg: 'bg-amber-50 border-amber-200 text-amber-700',
        activeExperiment: 'Task-Based Progression',
      };
    }
    return {
      path,
      domain: 'Science',
      label: 'LabXplore · Science Assistant',
      icon: <Sparkles size={13} className="text-sky-500" />,
      badgeBg: 'bg-slate-100 border-slate-200 text-slate-700',
      activeExperiment: 'General Workspace',
    };
  }, [location.pathname]);

  // Toast notification helper
  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Initial welcome greeting on load
  useEffect(() => {
    if (messages.length === 0) {
      const welcome = {
        id: 'welcome',
        sender: 'assistant',
        text: `Hello! 👋 I am your **LabXplore Virtual Teaching Assistant**, dedicated exclusively to **Physics & Chemistry**.\n\nI am currently tracking your session in **${activeContext.label}**.\n\nAsk me any questions, use **Libraries** for instant formulas & constants, or check **Notes** to review questions you've pinned for deeper understanding!`,
        timestamp: new Date().toISOString(),
        isScienceRelated: true,
      };
      setMessages([welcome]);
    }
  }, [activeContext, messages.length]);

  // Load history and notes
  const refreshHistoryAndNotes = () => {
    setSessionsList(getSessions());
    setNotesList(getNotes());
  };

  useEffect(() => {
    refreshHistoryAndNotes();
  }, [activeTab]);

  // Auto-save current chat session whenever messages change
  useEffect(() => {
    if (messages.length > 1) {
      saveSession({
        id: currentSessionId,
        messages,
        context: activeContext,
      });
      setSessionsList(getSessions());
    }
  }, [messages, currentSessionId, activeContext]);

  // -------------------------------------------------------------
  // GLOBAL EVENT LISTENERS: QUIZ ASK-AI & PIN TO NOTES
  // -------------------------------------------------------------
  useEffect(() => {
    // 1. Listen for "Ask AI to Explain in Brief" from Quizzes
    const handleAskAiEvent = (event) => {
      const { question, chapter, subject, options = [], answer = '', explanation = '' } = event.detail || {};
      if (!question) return;

      setIsOpen(true);
      setActiveTab('chat');
      setHasUnread(false);

      const promptText = `Please explain this ${chapter || 'Science'} quiz question in brief, simple, student-friendly terms with step-by-step reasoning:\n\n**Question:** ${question}\n\n**Options:**\n${options.map((o) => `• ${o.key || ''}: ${o.text || o}`).join('\n')}\n\n**Correct Answer:** ${answer}\n\nWhy is this correct, and what is the underlying physical/chemical principle?`;

      handleSend(promptText);
    };

    // 2. Listen for "Pin Question to Notes" from Quizzes
    const handlePinNoteEvent = (event) => {
      const qData = event.detail || {};
      if (!qData.question) return;

      pinQuestionToNotes({
        id: qData.id,
        question: qData.question,
        chapter: qData.chapter,
        subject: qData.subject,
        options: qData.options,
        answer: qData.answer,
        correct_option: qData.correct_option,
        explanation: qData.explanation,
        studentComment: qData.studentComment || 'Question pointed out for deeper conceptual review.',
      });

      refreshHistoryAndNotes();
      triggerToast('📌 Question pinned to your Notepad!');
    };

    window.addEventListener('labxplore:ask-ai', handleAskAiEvent);
    window.addEventListener('labxplore:pin-note', handlePinNoteEvent);

    return () => {
      window.removeEventListener('labxplore:ask-ai', handleAskAiEvent);
      window.removeEventListener('labxplore:pin-note', handlePinNoteEvent);
    };
  }, []);

  // Fetch contextual quick prompt chips when context changes
  useEffect(() => {
    let cancelled = false;
    api
      .getChatContextPrompts({
        path: activeContext.path,
        activeExperiment: activeContext.activeExperiment,
      })
      .then((res) => {
        if (!cancelled && res.prompts) {
          setSuggestedPrompts(res.prompts);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setSuggestedPrompts([
            "How does Snell's Law govern refraction in convex lenses?",
            "Why does magnesium combustion produce a dazzling white flare?",
            "What determines the period of a pendulum?",
            "Can you explain Newton's second law of motion?",
          ]);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [activeContext]);

  // Auto-scroll messages
  useEffect(() => {
    if (isOpen && activeTab === 'chat') {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, activeTab, loading]);

  // Focus input on open
  useEffect(() => {
    if (isOpen && activeTab === 'chat') {
      setHasUnread(false);
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen, activeTab]);

  // -------------------------------------------------------------
  // CHAT ACTIONS
  // -------------------------------------------------------------
  const handleSend = async (textToSend) => {
    const query = (textToSend || input).trim();
    if (!query || loading) return;

    const userMsg = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const res = await api.sendChatMessage(query, {
        path: activeContext.path,
        activeExperiment: activeContext.activeExperiment,
        title: activeContext.label,
      });

      const botMsg = {
        id: `bot-${Date.now()}`,
        sender: 'assistant',
        text: res.reply,
        timestamp: res.timestamp || new Date().toISOString(),
        isScienceRelated: res.isScienceRelated,
      };

      setMessages((prev) => [...prev, botMsg]);
      if (res.suggestedPrompts && res.suggestedPrompts.length > 0) {
        setSuggestedPrompts(res.suggestedPrompts);
      }
    } catch (err) {
      const errorMsg = {
        id: `err-${Date.now()}`,
        sender: 'assistant',
        text: `⚠️ **Communication Error**: Unable to reach the Science AI service. Please verify that the LabXplore server is running.`,
        timestamp: new Date().toISOString(),
        isError: true,
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Start New Chat session
  const handleNewChat = () => {
    if (messages.length > 1) {
      saveSession({
        id: currentSessionId,
        messages,
        context: activeContext,
      });
    }

    const newId = `session-${Date.now()}`;
    setCurrentSessionId(newId);
    const welcome = {
      id: `welcome-${Date.now()}`,
      sender: 'assistant',
      text: `Started a **New Chat session** ✨\n\nI am ready for your physics or chemistry questions in **${activeContext.label}**!`,
      timestamp: new Date().toISOString(),
      isScienceRelated: true,
    };
    setMessages([welcome]);
    setActiveTab('chat');
    refreshHistoryAndNotes();
    triggerToast('New chat session started!');
  };

  // Resume a past chat session from History
  const handleResumeSession = (session) => {
    if (messages.length > 1) {
      saveSession({
        id: currentSessionId,
        messages,
        context: activeContext,
      });
    }

    setCurrentSessionId(session.id);
    setMessages(session.messages || []);
    setActiveTab('chat');
    triggerToast(`Loaded "${session.title}"`);
  };

  // Delete a chat session
  const handleDeleteSession = (sessionId, e) => {
    e.stopPropagation();
    deleteSession(sessionId);
    setSessionsList(getSessions());
    triggerToast('Session removed from history.');
  };

  // -------------------------------------------------------------
  // NOTES ACTIONS
  // -------------------------------------------------------------
  const handleCreateNote = () => {
    if (!newNoteText.trim()) return;
    saveNote({
      title: newNoteTitle.trim() || `Note: ${new Date().toLocaleDateString()}`,
      content: newNoteText.trim(),
      tags: [activeContext.domain],
    });
    setNewNoteTitle('');
    setNewNoteText('');
    setIsWritingNote(false);
    setNotesList(getNotes());
    triggerToast('Note saved to your Notepad!');
  };

  const handleDeleteNote = (noteId) => {
    deleteNote(noteId);
    setNotesList(getNotes());
    triggerToast('Note deleted.');
  };

  const handleToggleResolved = (noteId) => {
    toggleNoteResolved(noteId);
    setNotesList(getNotes());
  };

  // Filtered lists for History and Notes
  const filteredSessions = useMemo(() => {
    return searchSessions(historySearchQuery);
  }, [historySearchQuery, sessionsList]);

  const filteredNotes = useMemo(() => {
    return searchNotes(notesSearch, 'All');
  }, [notesSearch, notesList]);

  const filteredLibrary = useMemo(() => {
    return SCIENCE_LIBRARY.filter((item) => {
      const matchCat = libraryFilter === 'All' || item.category === libraryFilter || item.subject === libraryFilter;
      if (!matchCat) return false;
      if (!librarySearch.trim()) return true;
      const q = librarySearch.toLowerCase();
      return (
        item.title.toLowerCase().includes(q) ||
        item.formula.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q)
      );
    });
  }, [libraryFilter, librarySearch]);

  return (
    <div className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-50 flex flex-col items-end pointer-events-none select-none">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="pointer-events-auto mb-2 flex items-center gap-2 rounded-xl bg-slate-900 text-white px-3.5 py-2 text-xs font-semibold shadow-lg animate-in fade-in slide-in-from-bottom-2 duration-200">
          <Sparkles size={13} className="text-amber-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* 1. Main Chat Window Modal */}
      {isOpen && (
        <div
          className={`pointer-events-auto mb-3 flex flex-col overflow-hidden rounded-3xl border border-slate-200/90 bg-white shadow-2xl shadow-slate-900/15 transition-all duration-200 ${
            isExpanded
              ? 'w-[94vw] max-w-[680px] h-[760px] max-h-[90vh]'
              : 'w-[92vw] max-w-[460px] h-[590px] max-h-[85vh]'
          }`}
          data-testid="floating-chatbot-window"
        >
          {/* Header Bar */}
          <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50/90 px-3.5 py-2.5">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="relative flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-gradient-to-tr from-sky-500 to-indigo-600 text-white shadow-xs">
                <Atom size={18} className="animate-spin" style={{ animationDuration: '12s' }} />
                <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-emerald-500 ring-2 ring-white" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <h3 className="truncate text-xs sm:text-sm font-bold text-slate-900">
                    Science AI Teaching Assistant
                  </h3>
                </div>
                <p className="text-[10px] text-slate-500 font-medium truncate">
                  Physics & Chemistry · Concepts & Solutions
                </p>
              </div>
            </div>

            {/* Window Action Controls */}
            <div className="flex items-center gap-1 text-slate-500">
              <button
                onClick={handleNewChat}
                className="flex items-center gap-1 rounded-lg bg-sky-50 text-sky-700 px-2 py-1 text-[10px] font-bold border border-sky-200 hover:bg-sky-100 transition"
                title="Start a new chat"
              >
                <Plus size={12} />
                <span className="hidden sm:inline">New Chat</span>
              </button>
              <button
                onClick={() => setIsExpanded((prev) => !prev)}
                className="hidden sm:inline-flex rounded-lg p-1.5 transition hover:bg-slate-200/60 hover:text-slate-800"
                title={isExpanded ? 'Restore window size' : 'Expand window'}
              >
                {isExpanded ? <Minus size={14} /> : <Maximize2 size={14} />}
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="rounded-lg p-1.5 transition hover:bg-slate-200/60 hover:text-slate-800"
                title="Close chat"
              >
                <X size={15} />
              </button>
            </div>
          </div>

          {/* 4 Feature Navigation Tabs */}
          <div className="flex items-center justify-between border-b border-slate-200 bg-white px-2 py-1 text-xs font-bold">
            {[
              { id: 'chat', label: 'Chat', icon: <MessageSquare size={13} /> },
              { id: 'history', label: 'Recent History', icon: <Clock size={13} />, count: sessionsList.length },
              { id: 'library', label: 'Libraries', icon: <BookOpen size={13} /> },
              { id: 'notes', label: 'Notes & Pointers', icon: <FileText size={13} />, count: notesList.length },
            ].map((tab) => {
              const isSelected = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                    if (tab.id === 'chat') setTimeout(() => inputRef.current?.focus(), 100);
                  }}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition ${
                    isSelected
                      ? 'bg-sky-50 text-sky-700 border border-sky-200 shadow-2xs'
                      : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'
                  }`}
                >
                  {tab.icon}
                  <span>{tab.label}</span>
                  {tab.count !== undefined && tab.count > 0 && (
                    <span className="rounded-full bg-slate-100 px-1.5 py-0.2 text-[9px] font-extrabold text-slate-600">
                      {tab.count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* ========================================================= */}
          {/* TAB 1: ACTIVE CHAT CONVERSATION */}
          {/* ========================================================= */}
          {activeTab === 'chat' && (
            <div className="flex flex-1 flex-col overflow-hidden">
              {/* Context Banner */}
              <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50/50 px-3.5 py-1.5 text-[11px]">
                <div className="flex items-center gap-1.5 truncate">
                  <span className={`inline-flex items-center gap-1 rounded-md border px-2 py-0.5 text-[10px] font-bold ${activeContext.badgeBg}`}>
                    {activeContext.icon}
                    <span className="truncate">{activeContext.label}</span>
                  </span>
                </div>
                <button
                  onClick={() => setActiveTab('notes')}
                  className="text-[10px] text-sky-600 font-bold hover:underline flex items-center gap-1"
                >
                  <Pin size={11} /> View Notepad
                </button>
              </div>

              {/* Message List */}
              <div className="flex-1 overflow-y-auto p-3.5 space-y-3 bg-gradient-to-b from-white to-slate-50/40 text-xs sm:text-[13px]">
                {messages.map((msg) => {
                  const isUser = msg.sender === 'user';
                  return (
                    <div
                      key={msg.id}
                      className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}
                    >
                      <div
                        className={`relative max-w-[88%] rounded-2xl p-3 shadow-xs select-text ${
                          isUser
                            ? 'bg-sky-500 text-white rounded-tr-xs'
                            : msg.isError
                            ? 'bg-red-50 border border-red-200 text-red-900 rounded-tl-xs'
                            : !msg.isScienceRelated
                            ? 'bg-amber-50/90 border border-amber-200/80 text-amber-950 rounded-tl-xs'
                            : 'bg-white border border-slate-200/80 text-slate-800 rounded-tl-xs'
                        }`}
                      >
                        {!isUser && (
                          <div className="mb-1 flex items-center justify-between gap-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                            <div className="flex items-center gap-1">
                              {msg.isError ? (
                                <AlertCircle size={11} className="text-red-500" />
                              ) : !msg.isScienceRelated ? (
                                <HelpCircle size={11} className="text-amber-500" />
                              ) : (
                                <Sparkles size={11} className="text-sky-500" />
                              )}
                              <span>{msg.isError ? 'Warning' : !msg.isScienceRelated ? 'Physics & Chemistry Only' : 'TA Explanation'}</span>
                            </div>

                            {/* Quick Pin to Notes Button on AI Answer */}
                            <button
                              onClick={() => {
                                saveNote({
                                  title: `Insight: ${msg.text.slice(0, 40)}...`,
                                  content: msg.text,
                                  tags: [activeContext.domain, 'AI Explanation'],
                                });
                                triggerToast('📌 Answer pinned to your Notepad!');
                              }}
                              className="text-slate-400 hover:text-sky-600 transition p-0.5 rounded"
                              title="Pin this answer to Notes"
                            >
                              <Pin size={12} />
                            </button>
                          </div>
                        )}

                        <div className="text-[12px] sm:text-[13px] leading-relaxed">
                          {formatMessageContent(msg.text)}
                        </div>

                        <div
                          className={`mt-1 flex justify-end text-[9px] font-medium ${
                            isUser ? 'text-sky-100/90' : 'text-slate-400'
                          }`}
                        >
                          {formatTime(msg.timestamp)}
                        </div>
                      </div>
                    </div>
                  );
                })}

                {loading && (
                  <div className="flex items-center gap-2 text-slate-400 pl-1">
                    <div className="flex h-7 w-7 items-center justify-center rounded-xl bg-sky-50 border border-sky-100 text-sky-600">
                      <Atom size={14} className="animate-spin" />
                    </div>
                    <div className="flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1.5 border border-slate-200">
                      <span className="text-[11px] font-medium text-slate-600">Explaining science concept</span>
                      <span className="flex items-center gap-0.5 ml-1">
                        <span className="h-1.5 w-1.5 rounded-full bg-sky-500 animate-bounce" style={{ animationDelay: '0ms' }} />
                        <span className="h-1.5 w-1.5 rounded-full bg-sky-500 animate-bounce" style={{ animationDelay: '150ms' }} />
                        <span className="h-1.5 w-1.5 rounded-full bg-sky-500 animate-bounce" style={{ animationDelay: '300ms' }} />
                      </span>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Quick Prompt Chips */}
              {suggestedPrompts.length > 0 && !loading && (
                <div className="border-t border-slate-100 bg-slate-50/70 p-2.5">
                  <p className="mb-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                    <Sparkles size={11} className="text-amber-500" /> Suggested Science Inquiries
                  </p>
                  <div className="flex flex-wrap gap-1.5 max-h-20 overflow-y-auto">
                    {suggestedPrompts.map((prompt, i) => (
                      <button
                        key={i}
                        onClick={() => handleSend(prompt)}
                        className="truncate max-w-full text-left rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-[11px] font-medium text-slate-700 shadow-2xs transition hover:border-sky-300 hover:bg-sky-50 hover:text-sky-700 active:scale-98"
                      >
                        {prompt}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Input Bar */}
              <div className="border-t border-slate-200/80 bg-white p-2.5 sm:p-3">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSend();
                  }}
                  className="flex items-center gap-2"
                >
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Ask about formulas, Snell's law, reaction equations…"
                    disabled={loading}
                    className="flex-1 rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-xs sm:text-sm text-slate-800 placeholder-slate-400 outline-none transition focus:border-sky-400 focus:bg-white focus:ring-2 focus:ring-sky-100 disabled:opacity-50"
                  />
                  <button
                    type="submit"
                    disabled={!input.trim() || loading}
                    className="flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-xl bg-sky-500 text-white shadow-sm transition hover:bg-sky-600 active:scale-95 disabled:opacity-40"
                    title="Send inquiry"
                  >
                    <Send size={15} />
                  </button>
                </form>
                <div className="mt-1 flex items-center justify-between text-[10px] text-slate-400 px-1">
                  <span>Press <b>Enter</b> to send</span>
                  <span className="text-[9px] font-semibold text-sky-600 flex items-center gap-0.5">
                    <CheckCircle2 size={10} /> Physics & Chemistry Only
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* TAB 2: RECENT CHAT HISTORY & SEARCH CHAT */}
          {/* ========================================================= */}
          {activeTab === 'history' && (
            <div className="flex flex-1 flex-col overflow-hidden p-3.5 space-y-3 bg-slate-50/50">
              {/* Search Chat Input Bar */}
              <div className="relative">
                <Search size={14} className="absolute left-3 top-2.5 text-slate-400" />
                <input
                  type="text"
                  value={historySearchQuery}
                  onChange={(e) => setHistorySearchQuery(e.target.value)}
                  placeholder="Search past conversations & messages..."
                  className="w-full rounded-xl border border-slate-200 bg-white pl-9 pr-3.5 py-2 text-xs text-slate-800 placeholder-slate-400 outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-100"
                />
              </div>

              {/* Action: Start New Chat */}
              <div className="flex items-center justify-between px-1">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  Past Sessions ({filteredSessions.length})
                </span>
                <button
                  onClick={handleNewChat}
                  className="flex items-center gap-1 text-xs font-bold text-sky-600 hover:text-sky-700"
                >
                  <Plus size={13} /> New Chat
                </button>
              </div>

              {/* Sessions List */}
              <div className="flex-1 overflow-y-auto space-y-2 pr-1">
                {filteredSessions.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-12 text-center text-slate-400 space-y-2">
                    <Clock size={32} className="text-slate-300" />
                    <p className="text-xs font-semibold">No matching conversations found</p>
                    <p className="text-[10px]">Start a new chat to begin asking science questions!</p>
                  </div>
                ) : (
                  filteredSessions.map((session) => (
                    <div
                      key={session.id}
                      onClick={() => handleResumeSession(session)}
                      className={`group cursor-pointer rounded-2xl border p-3 bg-white hover:border-sky-300 hover:shadow-xs transition space-y-1.5 ${
                        session.id === currentSessionId ? 'border-sky-400 bg-sky-50/40 ring-1 ring-sky-200' : 'border-slate-200'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <h4 className="text-xs font-bold text-slate-900 truncate max-w-[80%]">
                          {session.title}
                        </h4>
                        <div className="flex items-center gap-1">
                          <button
                            onClick={(e) => handleDeleteSession(session.id, e)}
                            className="opacity-0 group-hover:opacity-100 text-slate-400 hover:text-rose-500 transition p-1"
                            title="Delete session"
                          >
                            <Trash2 size={13} />
                          </button>
                          <ChevronRight size={14} className="text-slate-400" />
                        </div>
                      </div>

                      <p className="text-[11px] text-slate-500 line-clamp-1">
                        {session.preview || 'No messages'}
                      </p>

                      <div className="flex items-center justify-between text-[10px] text-slate-400 pt-0.5">
                        <span>{session.messageCount || 0} messages</span>
                        <span>{new Date(session.updatedAt || session.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* TAB 3: SCIENCE LIBRARIES & FORMULA REFERENCE */}
          {/* ========================================================= */}
          {activeTab === 'library' && (
            <div className="flex flex-1 flex-col overflow-hidden p-3.5 space-y-3 bg-slate-50/50">
              {/* Filter Pills & Search */}
              <div className="space-y-2">
                <div className="relative">
                  <Search size={14} className="absolute left-3 top-2.5 text-slate-400" />
                  <input
                    type="text"
                    value={librarySearch}
                    onChange={(e) => setLibrarySearch(e.target.value)}
                    placeholder="Search formulas, laws, reactions, constants..."
                    className="w-full rounded-xl border border-slate-200 bg-white pl-9 pr-3.5 py-2 text-xs text-slate-800 placeholder-slate-400 outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-100"
                  />
                </div>

                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
                  {['All', 'Physics', 'Chemistry', 'Constants', 'Optics', 'Mechanics'].map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setLibraryFilter(cat)}
                      className={`px-2.5 py-1 rounded-lg font-bold text-[11px] transition whitespace-nowrap ${
                        libraryFilter === cat
                          ? 'bg-sky-600 text-white'
                          : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Library Cards List */}
              <div className="flex-1 overflow-y-auto space-y-2.5 pr-1">
                {filteredLibrary.map((item) => (
                  <div
                    key={item.id}
                    className="rounded-2xl border border-slate-200 bg-white p-3.5 shadow-2xs space-y-2 hover:border-sky-300 transition"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-extrabold uppercase tracking-wider text-sky-700 bg-sky-50 px-2 py-0.5 rounded border border-sky-100">
                        {item.subject} · {item.category}
                      </span>
                      <button
                        onClick={() => {
                          navigator.clipboard?.writeText(item.formula);
                          triggerToast(`Copied ${item.formula}`);
                        }}
                        className="text-slate-400 hover:text-slate-700 p-1 text-[10px] flex items-center gap-1"
                        title="Copy formula"
                      >
                        <Copy size={11} /> Copy
                      </button>
                    </div>

                    <h4 className="text-xs font-bold text-slate-900">{item.title}</h4>

                    <div className="rounded-xl bg-slate-50 border border-slate-200/80 p-2.5 text-center font-mono text-xs sm:text-[13px] font-black text-slate-900 shadow-inner">
                      {item.formula}
                    </div>

                    <p className="text-[11px] text-slate-600 leading-relaxed">
                      {item.description}
                    </p>

                    <div className="pt-1 flex justify-end">
                      <button
                        onClick={() => {
                          setActiveTab('chat');
                          handleSend(item.prompt);
                        }}
                        className="flex items-center gap-1 rounded-xl bg-sky-50 text-sky-700 border border-sky-200 px-3 py-1.5 text-xs font-bold hover:bg-sky-100 transition"
                      >
                        <Sparkles size={12} className="text-amber-500" />
                        <span>Ask AI to Explain</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* TAB 4: STUDENT NOTEPAD & PINNED QUESTION POINTERS */}
          {/* ========================================================= */}
          {activeTab === 'notes' && (
            <div className="flex flex-1 flex-col overflow-hidden p-3.5 space-y-3 bg-slate-50/50">
              {/* Header with Search & Add Note */}
              <div className="space-y-2">
                <div className="relative">
                  <Search size={14} className="absolute left-3 top-2.5 text-slate-400" />
                  <input
                    type="text"
                    value={notesSearch}
                    onChange={(e) => setNotesSearch(e.target.value)}
                    placeholder="Search personal notes & pinned questions..."
                    className="w-full rounded-xl border border-slate-200 bg-white pl-9 pr-3.5 py-2 text-xs text-slate-800 placeholder-slate-400 outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-100"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1">
                    <Bookmark size={13} className="text-amber-500" />
                    Pinned Questions & Study Notes ({filteredNotes.length})
                  </span>
                  <button
                    onClick={() => setIsWritingNote((prev) => !prev)}
                    className="flex items-center gap-1 text-xs font-bold text-sky-600 hover:text-sky-700"
                  >
                    <Plus size={13} /> {isWritingNote ? 'Cancel' : 'Write Note'}
                  </button>
                </div>
              </div>

              {/* New Note Form */}
              {isWritingNote && (
                <div className="rounded-2xl border border-sky-200 bg-white p-3 space-y-2 shadow-xs animate-in fade-in duration-150">
                  <input
                    type="text"
                    value={newNoteTitle}
                    onChange={(e) => setNewNoteTitle(e.target.value)}
                    placeholder="Note title (e.g. Kinematics circular acceleration doubts)"
                    className="w-full rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-bold text-slate-800 outline-none focus:border-sky-400"
                  />
                  <textarea
                    rows={3}
                    value={newNoteText}
                    onChange={(e) => setNewNoteText(e.target.value)}
                    placeholder="Write your personal notes, formulas you forget, or concepts to ask your teacher..."
                    className="w-full rounded-lg border border-slate-200 p-2.5 text-xs text-slate-700 outline-none focus:border-sky-400 resize-none"
                  />
                  <div className="flex justify-end">
                    <button
                      onClick={handleCreateNote}
                      className="rounded-xl bg-sky-600 text-white px-3.5 py-1.5 text-xs font-bold hover:bg-sky-700 shadow-xs"
                    >
                      Save Note
                    </button>
                  </div>
                </div>
              )}

              {/* Notes & Pinned Questions List */}
              <div className="flex-1 overflow-y-auto space-y-2.5 pr-1">
                {filteredNotes.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-12 text-center text-slate-400 space-y-2">
                    <FileText size={32} className="text-slate-300" />
                    <p className="text-xs font-semibold">Your Notepad is currently empty</p>
                    <p className="text-[10px] max-w-xs leading-relaxed">
                      Tap the <b>📌 Pin to Notes</b> button in Quizzes to point out questions you don't understand, or tap <b>+ Write Note</b> above!
                    </p>
                  </div>
                ) : (
                  filteredNotes.map((note) => {
                    const hasPinnedQ = !!note.pinnedQuestion;
                    return (
                      <div
                        key={note.id}
                        className={`rounded-2xl border p-3.5 bg-white space-y-2 shadow-2xs transition ${
                          note.resolved ? 'border-slate-200 bg-slate-50/60 opacity-80' : 'border-slate-200 hover:border-amber-300'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            {hasPinnedQ && (
                              <span className="rounded bg-amber-100 text-amber-800 px-1.5 py-0.5 text-[9px] font-extrabold flex items-center gap-1">
                                <Pin size={10} /> Pinned Question
                              </span>
                            )}
                            <h4 className="text-xs font-bold text-slate-900 leading-snug">
                              {note.title}
                            </h4>
                          </div>

                          <div className="flex items-center gap-1 shrink-0">
                            <button
                              onClick={() => handleToggleResolved(note.id)}
                              className={`rounded p-1 text-[10px] font-bold transition ${
                                note.resolved ? 'text-emerald-600 bg-emerald-50' : 'text-slate-400 hover:text-slate-600'
                              }`}
                              title={note.resolved ? 'Mark unresolved' : 'Mark concept mastered'}
                            >
                              <Check size={13} />
                            </button>
                            <button
                              onClick={() => handleDeleteNote(note.id)}
                              className="text-slate-400 hover:text-rose-500 transition p-1"
                              title="Delete note"
                            >
                              <Trash2 size={13} />
                            </button>
                          </div>
                        </div>

                        {/* Pinned Question Card Detail */}
                        {hasPinnedQ && (
                          <div className="rounded-xl border border-amber-200/80 bg-amber-50/50 p-3 space-y-1.5 text-xs">
                            <div className="flex items-center justify-between text-[10px] text-amber-800 font-bold">
                              <span>{note.pinnedQuestion.subject} · {note.pinnedQuestion.chapter}</span>
                              {note.pinnedQuestion.correct_option && (
                                <span className="text-emerald-700">Answer: {note.pinnedQuestion.correct_option}</span>
                              )}
                            </div>
                            <p className="font-semibold text-slate-900">
                              {note.pinnedQuestion.question}
                            </p>

                            {/* One-click: Ask AI to explain this pinned question */}
                            <div className="pt-1 flex justify-end">
                              <button
                                onClick={() => {
                                  setActiveTab('chat');
                                  handleSend(
                                    `I previously pinned this question to my notes because I couldn't understand it:\n\n"${note.pinnedQuestion.question}"\n\nCould you please break down the underlying concept and explain step-by-step why the answer is ${note.pinnedQuestion.correct_option || note.pinnedQuestion.answer}?`
                                  );
                                }}
                                className="flex items-center gap-1 text-[11px] font-bold text-sky-700 hover:underline"
                              >
                                <Sparkles size={11} className="text-amber-500" />
                                <span>Ask AI to Explain This</span>
                              </button>
                            </div>
                          </div>
                        )}

                        {/* Student's Custom Note Text */}
                        {note.content && (
                          <p className="text-xs text-slate-700 leading-relaxed pl-1 border-l-2 border-slate-200">
                            {note.content}
                          </p>
                        )}

                        <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1">
                          <div className="flex items-center gap-1">
                            {note.tags?.map((t, idx) => (
                              <span key={idx} className="rounded bg-slate-100 px-1.5 py-0.2 text-slate-600 font-medium">
                                #{t}
                              </span>
                            ))}
                          </div>
                          <span>{new Date(note.updatedAt || note.createdAt).toLocaleDateString()}</span>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* 2. Floating Launcher Button */}
      <div className="pointer-events-auto relative flex items-center gap-2">
        {!isOpen && hasUnread && (
          <div
            onClick={() => setIsOpen(true)}
            className="cursor-pointer hidden sm:flex items-center gap-1.5 rounded-full border border-sky-200 bg-white/95 px-3 py-1.5 text-xs font-bold text-slate-800 shadow-md shadow-sky-500/10 backdrop-blur-xs transition hover:bg-sky-50 hover:border-sky-300 animate-pulse"
          >
            <Sparkles size={13} className="text-amber-500" />
            <span>Ask Science TA & Notes</span>
          </div>
        )}

        <button
          onClick={() => setIsOpen((prev) => !prev)}
          className={`group relative flex h-14 w-14 items-center justify-center rounded-2xl shadow-lg transition-all duration-200 hover:scale-105 active:scale-95 ${
            isOpen
              ? 'bg-slate-800 text-white shadow-slate-900/20'
              : 'bg-gradient-to-tr from-sky-500 to-indigo-600 text-white shadow-sky-500/30 hover:shadow-sky-500/50'
          }`}
          title={isOpen ? 'Close Science Assistant' : 'Open Science Assistant, Notes & Libraries'}
          data-testid="floating-chatbot-launcher"
        >
          {isOpen ? (
            <X size={24} />
          ) : (
            <>
              <Atom
                size={28}
                className="transition-transform group-hover:rotate-45"
                style={{ animation: 'spin 16s linear infinite' }}
              />
              <span className="absolute -top-1 -right-1 flex h-4 w-4">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-4 w-4 bg-amber-400 border-2 border-white items-center justify-center text-[8px] font-black text-slate-950">
                  ⚡
                </span>
              </span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
