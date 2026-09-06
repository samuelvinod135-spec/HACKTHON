import React, { useState, useEffect } from 'react';
import {
  Swords,
  Users,
  Trophy,
  Zap,
  Clock,
  CheckCircle2,
  XCircle,
  Play,
  RotateCcw,
  ShieldCheck,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

const ONLINE_PLAYERS = [
  { id: 'p1', name: 'Aarav Sharma', rating: 1420, winStreak: 4, avatar: '👨‍🎓', status: 'Ready for Battle' },
  { id: 'p2', name: 'Ananya Iyer', rating: 1560, winStreak: 7, avatar: '👩‍🔬', status: 'In Matchmaking' },
  { id: 'p3', name: 'Rohan Verma', rating: 1390, winStreak: 2, avatar: '🚀', status: 'Ready for Battle' },
  { id: 'p4', name: 'Priya Patel', rating: 1610, winStreak: 5, avatar: '⚛️', status: 'Online' },
];

const BATTLE_QUESTION = {
  subject: 'Physics',
  chapter: 'Electrostatics',
  question:
    'Two identical point charges of +2 μC are separated by 0.3 m in vacuum. What is the magnitude of the electrostatic repulsion force between them? (k = 9 × 10⁹ N·m²/C²)',
  options: [
    { key: 'A', text: '0.40 N' },
    { key: 'B', text: '1.20 N' },
    { key: 'C', text: '3.60 N' },
    { key: 'D', text: '0.04 N' },
  ],
  correctKey: 'A', // F = (9e9 * 4e-12) / 0.09 = 0.40 N
};

export default function PeerBattlesPage() {
  const [viewState, setViewState] = useState('lobby'); // 'lobby' | 'battle' | 'results'
  const [opponent, setOpponent] = useState(ONLINE_PLAYERS[0]);
  const [countdown, setCountdown] = useState(60);
  const [p1Score, setP1Score] = useState(0);
  const [p2Score, setP2Score] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  // Battle 60s countdown timer
  useEffect(() => {
    let timer = null;
    if (viewState === 'battle' && countdown > 0) {
      timer = setInterval(() => {
        setCountdown((c) => {
          if (c <= 1) {
            setViewState('results');
            return 0;
          }
          return c - 1;
        });

        // Simulated occasional opponent score bump
        if (Math.random() > 0.85) {
          setP2Score((s) => Math.min(100, s + 20));
        }
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [viewState, countdown]);

  const handleStartBattle = (player) => {
    setOpponent(player);
    setViewState('battle');
    setCountdown(60);
    setP1Score(0);
    setP2Score(0);
    setSelectedAnswer(null);
  };

  const handleSelectOption = (key) => {
    if (selectedAnswer !== null) return;
    setSelectedAnswer(key);
    if (key === BATTLE_QUESTION.correctKey) {
      setP1Score((s) => s + 50);
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto py-4 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-300 text-slate-950 shadow-md border-b-4 border-amber-400">
            <Swords size={24} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-black tracking-tight text-slate-900">
                Real-Time Peer Battles
              </h1>
              <span className="rounded-full bg-sky-100 text-sky-800 px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wide border border-sky-200">
                1v1 Duel
              </span>
            </div>
            <p className="text-xs text-slate-500">
              Live head-to-head 60-second multiplayer science quizzes with dual progress bars.
            </p>
          </div>
        </div>

        {viewState !== 'lobby' && (
          <button
            onClick={() => setViewState('lobby')}
            className="clay-card rounded-xl border border-sky-200 bg-white px-4 py-2 text-xs font-bold text-slate-700 hover:bg-sky-50 shadow-xs active:scale-95 transition"
          >
            Leave Battle
          </button>
        )}
      </div>

      {/* ------------------------------------------------------------- */}
      {/* MATCHMAKING LOBBY VIEW                                        */}
      {/* ------------------------------------------------------------- */}
      {viewState === 'lobby' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Quick Matchmaking Card */}
          <div className="clay-card lg:col-span-5 rounded-3xl border border-sky-100 bg-white p-6 shadow-sm space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-sky-100">
              <h3 className="text-sm font-black text-slate-900 flex items-center gap-2">
                <Zap size={16} className="text-amber-500 fill-amber-400" />
                <span>Instant Matchmaking</span>
              </h3>
              <span className="text-[10px] font-black text-sky-800 bg-sky-50 px-2.5 py-0.5 rounded-full border border-sky-200">
                ● 24 Scholars Active
              </span>
            </div>

            <div className="rounded-2xl border-2 border-sky-100 bg-sky-50/60 p-6 text-center space-y-3 shadow-inner">
              <div className="flex justify-center -space-x-2">
                <span className="text-3xl">👨‍🎓</span>
                <span className="text-3xl">⚔️</span>
                <span className="text-3xl">👩‍🔬</span>
              </div>
              <h4 className="text-base font-black text-slate-900">Ranked 1v1 Science Duel</h4>
              <p className="text-xs text-slate-600">
                60-second speed challenge. Fast and correct answers score combo credits & XP.
              </p>
              <button
                onClick={() => handleStartBattle(ONLINE_PLAYERS[0])}
                className="clay-btn-yellow w-full py-3.5 text-xs font-black text-slate-950 shadow-md flex items-center justify-center gap-2"
              >
                <Zap size={14} />
                <span>Quick Match (Find Opponent)</span>
              </button>
            </div>
          </div>

          {/* Online Users List */}
          <div className="clay-card lg:col-span-7 rounded-3xl border border-sky-100 bg-white p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-sky-100">
              <h3 className="text-sm font-black text-slate-900 flex items-center gap-2">
                <Users size={16} className="text-sky-600" />
                <span>Online Scholars In Lobby</span>
              </h3>
              <span className="text-xs text-slate-400 font-medium">Click Challenge to Duel</span>
            </div>

            <div className="space-y-3">
              {ONLINE_PLAYERS.map((player) => (
                <div
                  key={player.id}
                  className="flex items-center justify-between p-3.5 rounded-2xl border border-sky-100 bg-white hover:border-amber-300 hover:bg-amber-50/20 transition shadow-2xs"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{player.avatar}</span>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-900">{player.name}</span>
                        <span className="text-[10px] font-mono font-bold text-sky-700 bg-sky-50 px-1.5 py-0.5 rounded border border-sky-200">
                          {player.rating} ELO
                        </span>
                      </div>
                      <div className="flex items-center gap-2 mt-0.5 text-[10px] text-slate-500">
                        <span className="text-amber-700 font-bold flex items-center gap-0.5 bg-amber-100/60 px-1.5 py-0.2 rounded">
                          ⚡ {player.winStreak} streak
                        </span>
                        <span>·</span>
                        <span className="text-sky-600 font-medium">{player.status}</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => handleStartBattle(player)}
                    className="clay-btn-yellow flex items-center gap-1.5 px-4 py-1.5 text-xs font-black text-slate-950 shadow-xs"
                  >
                    <Swords size={13} />
                    <span>Challenge</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* 60-SECOND BATTLE ARENA VIEW                                   */}
      {/* ------------------------------------------------------------- */}
      {viewState === 'battle' && (
        <div className="clay-card rounded-3xl border border-sky-100 bg-white p-6 sm:p-8 shadow-sm space-y-6">
          {/* Top 60-Second Countdown Timer */}
          <div className="flex flex-col items-center justify-center">
            <div className="clay-pill flex items-center gap-2 rounded-2xl bg-white text-slate-900 px-6 py-2.5 text-sm font-mono font-black shadow-sm border-2 border-amber-300">
              <Clock size={16} className="text-amber-500 animate-spin [animation-duration:4s]" />
              <span>Time Left: {countdown}s</span>
            </div>
          </div>

          {/* Split-Screen Dual Progress Bar (Player 1: Sky Blue vs Player 2: Banana Yellow) */}
          <div className="grid grid-cols-2 gap-6 items-center">
            {/* Player 1 (You - Sky Blue) */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-bold">
                <span className="text-sky-800">You (Scholar)</span>
                <span className="font-mono text-sky-800 font-black">{p1Score} pts</span>
              </div>
              <div className="h-4 w-full rounded-full bg-sky-50 border border-sky-200 overflow-hidden p-0.5 shadow-inner">
                <div
                  className="h-full rounded-full bg-sky-500 transition-all duration-500 shadow-xs"
                  style={{ width: `${Math.min(100, p1Score)}%` }}
                />
              </div>
            </div>

            {/* Player 2 (Opponent - Banana Yellow) */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-bold">
                <span className="text-amber-900">{opponent.name}</span>
                <span className="font-mono text-amber-900 font-black">{p2Score} pts</span>
              </div>
              <div className="h-4 w-full rounded-full bg-amber-50 border border-amber-200 overflow-hidden p-0.5 shadow-inner">
                <div
                  className="h-full rounded-full bg-amber-400 transition-all duration-500 shadow-xs"
                  style={{ width: `${Math.min(100, p2Score)}%` }}
                />
              </div>
            </div>
          </div>

          {/* Current Question Card */}
          <div className="rounded-2xl border-2 border-sky-100 bg-sky-50/40 p-6 space-y-4">
            <div className="flex items-center justify-between text-xs text-slate-500 font-bold">
              <span>
                {BATTLE_QUESTION.subject} · {BATTLE_QUESTION.chapter}
              </span>
              <span className="font-black text-amber-600 bg-amber-100 px-2 py-0.5 rounded-full border border-amber-200">
                +50 Credits / Points
              </span>
            </div>

            <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
              {BATTLE_QUESTION.question}
            </h3>

            {/* Large Clickable Options */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {BATTLE_QUESTION.options.map((opt) => {
                const isSelected = selectedAnswer === opt.key;
                const isCorrect = opt.key === BATTLE_QUESTION.correctKey;
                let btnStyle =
                  'border-sky-100 bg-white hover:border-sky-300 hover:bg-sky-50 text-slate-800 shadow-xs';

                if (selectedAnswer !== null) {
                  if (isCorrect) {
                    btnStyle = 'border-amber-400 bg-amber-100/80 text-slate-950 font-bold ring-2 ring-amber-400';
                  } else if (isSelected) {
                    btnStyle = 'border-sky-400 bg-sky-100 text-sky-950 font-bold ring-2 ring-sky-400';
                  } else {
                    btnStyle = 'border-slate-100 bg-white text-slate-400 opacity-60';
                  }
                }

                return (
                  <button
                    key={opt.key}
                    onClick={() => handleSelectOption(opt.key)}
                    disabled={selectedAnswer !== null}
                    className={`flex items-center gap-3 p-4 rounded-2xl border text-left transition active:scale-98 ${btnStyle}`}
                  >
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-xl bg-sky-100 font-mono text-xs font-bold text-sky-800">
                      {opt.key}
                    </span>
                    <span className="text-xs sm:text-sm font-semibold">{opt.text}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* RESULTS MODAL VIEW                                            */}
      {/* ------------------------------------------------------------- */}
      {viewState === 'results' && (
        <div className="clay-card rounded-3xl border-2 border-sky-100 bg-white p-8 shadow-xl text-center max-w-md mx-auto space-y-5">
          <div className="flex h-20 w-20 mx-auto items-center justify-center rounded-3xl bg-amber-300 text-slate-950 shadow-md border-b-4 border-amber-400 text-4xl">
            {p1Score >= p2Score ? '🏆' : '⭐'}
          </div>
          <h3 className="text-xl font-black text-slate-900">
            {p1Score >= p2Score ? 'Victory! You Won the Duel' : 'Good Effort! Match Finished'}
          </h3>
          <p className="text-xs text-slate-500">
            Final Score: You ({p1Score} pts) vs {opponent.name} ({p2Score} pts)
          </p>

          <div className="pt-2 flex gap-3">
            <button
              onClick={() => handleStartBattle(opponent)}
              className="clay-btn-yellow flex-1 py-3 text-xs font-black text-slate-950 shadow-md"
            >
              Rematch
            </button>
            <button
              onClick={() => setViewState('lobby')}
              className="clay-btn-sky rounded-2xl px-5 py-3 text-xs font-bold text-white shadow-md"
            >
              Back to Lobby
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
