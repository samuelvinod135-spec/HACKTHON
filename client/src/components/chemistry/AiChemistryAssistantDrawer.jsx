import React, { useState } from 'react';
import {
  Sparkles,
  X,
  Send,
  Bot,
  User,
  Lightbulb,
  FlaskConical,
  CheckCircle2,
  BookOpen
} from 'lucide-react';
import { searchChemistryReactions, getExperimentsCatalog } from '../../data/chemistry/chemistryDatabase.js';

export default function AiChemistryAssistantDrawer({ isOpen, onClose, onInsertReaction }) {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      text: 'Hello! I am your AI Chemistry Lab Tutor grounded in our 10,000+ CBSE chemical reactions and 107 NCERT experiments. Ask me about reaction mechanisms, balancing rules, qualitative salt tests, or titration calculations!'
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const QUICK_PROMPTS = [
    'Explain Aldol Condensation mechanism',
    'How does Fehling solution detect aldehydes?',
    'What is Markownikoff rule with propene and HBr?',
    'Explain the Brown Ring Test for nitrate',
    'Why is H2SO4 used instead of HNO3 in KMnO4 titrations?'
  ];

  const handleSend = (textToSend) => {
    const query = textToSend || inputValue;
    if (!query.trim()) return;

    const userMsg = { role: 'user', text: query };
    setMessages((prev) => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);

    // Search database for grounding
    setTimeout(() => {
      const reactions = searchChemistryReactions(query, {}, 3, 0);
      const experiments = getExperimentsCatalog().filter(
        (e) =>
          e.title.toLowerCase().includes(query.toLowerCase()) ||
          e.aim.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 2);

      let reply = '';
      if (reactions.length > 0) {
        const top = reactions[0];
        reply = `**${top.name}**\n\nEquation: \`${top.equation}\`\n\n**Mechanism & Principles:** ${top.explanation || top.observations || 'Stoichiometric transformation governed by reaction kinetics.'}`;
        if (top.conditions && top.conditions !== 'Standard Ambient') {
          reply += `\n\n**Conditions:** ${top.conditions}`;
        }
        if (top.safety) {
          reply += `\n\n⚠️ **Safety Tip:** ${top.safety}`;
        }
      } else if (experiments.length > 0) {
        const exp = experiments[0];
        reply = `**CBSE Practical: ${exp.title} (Class ${exp.classLevel})**\n\n**Aim:** ${exp.aim}\n\n**Key Reaction:** \`${exp.chemicalEquation}\`\n\n**Observation & Result:** ${exp.observation}`;
      } else {
        reply = `Based on NCERT / CBSE guidelines for "${query}":\n\nThis transformation follows standard stoichiometric and thermodynamic rules. For detailed chemical simulations, please test the reactants directly in our Virtual Lab Bench or use the Chemical Equation Balancer.`;
      }

      setMessages((prev) => [...prev, { role: 'assistant', text: reply }]);
      setIsTyping(false);
    }, 600);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-y-0 right-0 z-50 flex w-full sm:w-96 flex-col border-l border-slate-200 bg-white shadow-2xl animate-in slide-in-from-right duration-200">
      {/* Drawer Header */}
      <div className="flex items-center justify-between border-b border-slate-100 bg-gradient-to-r from-sky-50 to-indigo-50/50 p-4">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-sky-500 to-indigo-600 text-white shadow-xs">
            <Bot size={20} />
          </div>
          <div>
            <h3 className="text-sm font-black text-slate-900 tracking-tight flex items-center gap-1.5">
              <span>AI Chemistry Tutor</span>
              <span className="rounded-full bg-sky-200 text-sky-900 px-1.5 py-0.2 text-[9px] font-bold">
                10k+ Grounded
              </span>
            </h3>
            <p className="text-[11px] text-slate-500">Instant answers from CBSE database</p>
          </div>
        </div>

        <button
          onClick={onClose}
          className="rounded-xl p-1.5 text-slate-400 hover:bg-slate-200 hover:text-slate-700 transition cursor-pointer"
        >
          <X size={18} />
        </button>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3 text-xs leading-relaxed">
        {messages.map((m, idx) => (
          <div
            key={idx}
            className={`flex gap-2.5 ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {m.role === 'assistant' && (
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-sky-100 text-sky-700 font-bold text-[10px]">
                AI
              </div>
            )}
            <div
              className={`rounded-2xl p-3 max-w-[85%] whitespace-pre-wrap ${
                m.role === 'user'
                  ? 'bg-sky-500 text-white font-medium rounded-tr-xs'
                  : 'bg-slate-50 text-slate-800 border border-slate-100 rounded-tl-xs shadow-2xs'
              }`}
            >
              {m.text}
            </div>
            {m.role === 'user' && (
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-slate-900 text-white font-bold text-[10px]">
                U
              </div>
            )}
          </div>
        ))}

        {isTyping && (
          <div className="flex items-center gap-1.5 text-slate-400 text-xs pl-2 animate-pulse">
            <Sparkles size={13} />
            <span>Consulting 10,000+ chemical reactions...</span>
          </div>
        )}
      </div>

      {/* Quick Prompt Chips */}
      <div className="border-t border-slate-100 bg-slate-50/70 p-2.5">
        <span className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Quick Questions:</span>
        <div className="flex gap-1.5 overflow-x-auto pb-1 no-scrollbar">
          {QUICK_PROMPTS.map((qp) => (
            <button
              key={qp}
              onClick={() => handleSend(qp)}
              className="rounded-xl border border-slate-200 bg-white px-2.5 py-1 text-[11px] font-medium text-slate-700 whitespace-nowrap hover:border-sky-300 hover:bg-sky-50/50 transition cursor-pointer shrink-0"
            >
              {qp}
            </button>
          ))}
        </div>
      </div>

      {/* Input Form */}
      <div className="border-t border-slate-100 p-3 bg-white">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Ask about reactions, mechanisms, or lab tests..."
            className="flex-1 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-medium text-slate-800 placeholder:text-slate-400 focus:border-sky-400 focus:bg-white focus:outline-none transition"
          />
          <button
            type="submit"
            disabled={!inputValue.trim()}
            className="flex h-8 w-8 items-center justify-center rounded-xl bg-sky-500 text-white shadow-xs disabled:opacity-40 hover:bg-sky-600 transition cursor-pointer"
          >
            <Send size={14} />
          </button>
        </form>
      </div>
    </div>
  );
}
