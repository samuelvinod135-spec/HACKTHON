import React, { useState, useEffect } from 'react';
import {
  Swords,
  Users,
  Trophy,
  Flame,
  Clock,
  Zap,
  CheckCircle2,
  XCircle,
  Play,
  RotateCcw,
  ShieldAlert,
  ArrowRight,
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
  question: 'Two identical point charges of +2 μC are separated by 0.3 m in vacuum. What is the magnitude of the electrostatic repulsion force between them? (k = 9 × 10⁹ N·m²/C²)',
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
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-rose-500 to-amber-500 text-white shadow-md">
            <Swords size={24} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-black tracking-tight text-slate-900">
                Real-Time Peer Battles
              </h1>
              <span className="rounded-full bg-rose-100 text-rose-800 px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wide border border-rose-200">
                Hackathon Feature 3
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
            className="rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 shadow-xs"
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
          <div className="lg:col-span-5 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Zap size={16} className="text-amber-500" />
                <span>Instant Matchmaking</span>
              </h3>
              <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                ● 24 Students Active
              </span>
            </div>

            <div className="rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 p-6 text-white text-center space-y-3 shadow-md">
              <div className="flex justify-center -space-x-2">
                <span className="text-3xl">👨‍🎓</span>
                <span className="text-3xl">⚔️</span>
                <span className="text-3xl">👩‍🔬</span>
              </div>
              <h4 className="text-base font-black">Ranked 1v1 Science Duel</h4>
              <p className="text-xs text-slate-300">
                60-second speed challenge. Fast and correct answers score combo points.
              </p>
              <button
                onClick={() => handleStartBattle(ONLINE_PLAYERS[0])}
                className="w-full rounded-2xl bg-gradient-to-r from-rose-500 to-amber-500 py-3 text-xs font-black text-white shadow-lg shadow-rose-500/25 hover:from-rose-400 hover:to-amber-400 active:scale-95 transition"
              >
                Quick Match (Find Opponent)
              </button>
            </div>
          </div>

          {/* Online Users List */}
          <div className="lg:col-span-7 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Users size={16} className="text-blue-600" />
                <span>Online Scholars In Lobby</span>
              </h3>
              <span className="text-xs text-slate-400 font-medium">Click Challenge to Duel</span>
            </div>

            <div className="space-y-3">
              {ONLINE_PLAYERS.map((player) => (
                <div
                  key={player.id}
                  className="flex items-center justify-between p-3.5 rounded-2xl border border-slate-200/80 bg-slate-50/50 hover:bg-white hover:border-slate-300 transition"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{player.avatar}</span>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-900">{player.name}</span>
                        <span className="text-[10px] font-mono text-slate-500">
                          {player.rating} ELO
                        </span>
                      </div>
                      <div className="flex items-center gap-2 mt-0.5 text-[10px] text-slate-500">
                        <span className="text-amber-600 font-bold flex items-center gap-0.5">
                          <Flame size={10} /> {player.winStreak} streak
                        </span>
                        <span>·</span>
                        <span className="text-emerald-600 font-medium">{player.status}</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => handleStartBattle(player)}
                    className="flex items-center gap-1.5 rounded-xl bg-rose-600 px-3.5 py-1.5 text-xs font-bold text-white shadow-xs hover:bg-rose-500 transition active:scale-95"
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
        <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm space-y-6">
          {/* Top 60-Second Countdown Timer */}
          <div className="flex flex-col items-center justify-center">
            <div className="flex items-center gap-2 rounded-2xl bg-slate-900 text-white px-5 py-2 text-sm font-mono font-bold shadow-sm">
              <Clock size={16} className="text-amber-400 animate-spin [animation-duration:3s]" />
              <span>Time Left: {countdown}s</span>
            </div>
          </div>

          {/* Split-Screen Dual Progress Bar (Player 1 vs Player 2) */}
          <div className="grid grid-cols-2 gap-6 items-center">
            {/* Player 1 (You) */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-bold">
                <span className="text-blue-700">You (Scholar)</span>
                <span className="font-mono text-blue-700">{p1Score} pts</span>
              </div>
              <div className="h-3 w-full rounded-full bg-slate-100 overflow-hidden">
                <div
                  className="h-full rounded-full bg-blue-600 transition-all duration-500"
                  style={{ width: `${Math.min(100, p1Score)}%` }}
                />
              </div>
            </div>

            {/* Player 2 (Opponent) */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-bold">
                <span className="text-rose-700">{opponent.name}</span>
                <span className="font-mono text-rose-700">{p2Score} pts</span>
              </div>
              <div className="h-3 w-full rounded-full bg-slate-100 overflow-hidden">
                <div
                  className="h-full rounded-full bg-rose-600 transition-all duration-500"
                  style={{ width: `${Math.min(100, p2Score)}%` }}
                />
              </div>
            </div>
          </div>

          {/* Current Question Card */}
          <div className="rounded-2xl border border-slate-200 bg-slate-50/60 p-6 space-y-4">
            <div className="flex items-center justify-between text-xs text-slate-400 font-medium">
              <span>{BATTLE_QUESTION.subject} · {BATTLE_QUESTION.chapter}</span>
              <span className="font-bold text-amber-600">+50 Points</span>
            </div>

            <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
              {BATTLE_QUESTION.question}
            </h3>

            {/* Large Clickable Options */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {BATTLE_QUESTION.options.map((opt) => {
                const isSelected = selectedAnswer === opt.key;
                const isCorrect = opt.key === BATTLE_QUESTION.correctKey;
                let btnStyle = 'border-slate-200 bg-white hover:bg-slate-50 text-slate-800';

                if (selectedAnswer !== null) {
                  if (isCorrect) {
                    btnStyle = 'border-emerald-400 bg-emerald-50 text-emerald-950 font-bold ring-2 ring-emerald-400';
                  } else if (isSelected) {
                    btnStyle = 'border-rose-400 bg-rose-50 text-rose-950 font-bold ring-2 ring-rose-400';
                  } else {
                    btnStyle = 'border-slate-100 bg-slate-50 text-slate-400 opacity-60';
                  }
                }

                return (
                  <button
                    key={opt.key}
                    onClick={() => handleSelectOption(opt.key)}
                    disabled={selectedAnswer !== null}
                    className={`flex items-center gap-3 p-4 rounded-2xl border text-left transition active:scale-98 shadow-xs ${btnStyle}`}
                  >
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-xl bg-slate-100 font-mono text-xs font-bold text-slate-700">
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
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm text-center max-w-md mx-auto space-y-4">
          <div className="flex justify-center text-4xl">
            {p1Score >= p2Score ? '🏆' : '🥈'}
          </div>
          <h3 className="text-xl font-black text-slate-900">
            {p1Score >= p2Score ? 'Victory! You Won the Duel' : 'Good Effort! Match Finished'}
          </h3>
          <p className="text-xs text-slate-500">
            Final Score: You ({p1Score} pts) vs {opponent.name} ({p2Score} pts)
          </p>

          <div className="pt-4 flex gap-3">
            <button
              onClick={() => handleStartBattle(opponent)}
              className="flex-1 rounded-2xl bg-rose-600 py-3 text-xs font-black text-white hover:bg-rose-500"
            >
              Rematch
            </button>
            <button
              onClick={() => setViewState('lobby')}
              className="rounded-2xl border border-slate-200 px-4 py-3 text-xs font-bold text-slate-700 hover:bg-slate-50"
            >
              Back to Lobby
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
