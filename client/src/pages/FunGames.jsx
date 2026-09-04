import { useState } from 'react';
import {
  Puzzle,
  Brain,
  Atom,
  Rocket,
  Share2,
  PenLine,
  Play,
  CheckCircle2,
  XCircle,
  X,
  Sparkles,
  Trophy,
} from 'lucide-react';
import { useProgress } from '../context/ProgressContext.jsx';

const GAMES = [
  {
    id: 'element-bingo',
    name: 'Element Bingo',
    desc: 'Match atomic numbers, symbols, and element groups on the periodic board.',
    icon: Puzzle,
    discipline: 'Chemistry',
    difficulty: 'Beginner',
    xpReward: 60,
    quickChallenge: {
      q: 'Which element has atomic number 6 and forms organic chemistry foundations?',
      options: ['Nitrogen (N)', 'Carbon (C)', 'Oxygen (O)', 'Helium (He)'],
      answer: 1,
      fact: 'Carbon is unique in its ability to form stable bonds with many elements including itself!',
    },
  },
  {
    id: 'atom-builder',
    name: 'Atom Builder',
    desc: 'Assemble protons, neutrons, and electrons to construct stable isotopes.',
    icon: Brain,
    discipline: 'Physics',
    difficulty: 'Intermediate',
    xpReward: 80,
    quickChallenge: {
      q: 'An atom of Helium-4 contains how many neutrons?',
      options: ['1', '2', '4', '0'],
      answer: 1,
      fact: 'Helium-4 has 2 protons and 2 neutrons in its stable nucleus.',
    },
  },
  {
    id: 'reaction-rush',
    name: 'Reaction Rush',
    desc: 'Race the clock to balance stoichiometry coefficients under pressure.',
    icon: Atom,
    discipline: 'Chemistry',
    difficulty: 'Intermediate',
    xpReward: 75,
    quickChallenge: {
      q: 'In __H₂ + O₂ → 2H₂O, what is the missing coefficient for H₂?',
      options: ['1', '2', '3', '4'],
      answer: 1,
      fact: '2 molecules of H₂ combine with 1 molecule of O₂ to make 2 molecules of water.',
    },
  },
  {
    id: 'launch-physics',
    name: 'Launch Physics',
    desc: 'Calculate launch angle and initial velocity to hit gravitational targets.',
    icon: Rocket,
    discipline: 'Physics',
    difficulty: 'Advanced',
    xpReward: 90,
    quickChallenge: {
      q: 'Neglecting air resistance, what launch angle produces maximum projectile range?',
      options: ['30°', '45°', '60°', '90°'],
      answer: 1,
      fact: '45 degrees provides the optimal trigonometric balance of horizontal and vertical velocity.',
    },
  },
  {
    id: 'lab-connect',
    name: 'Lab Connect',
    desc: 'Link molecular bonds and covalent pairs to form stable organic structures.',
    icon: Share2,
    discipline: 'Chemistry',
    difficulty: 'Beginner',
    xpReward: 60,
    quickChallenge: {
      q: 'How many single covalent bonds can a single Carbon atom form?',
      options: ['2', '3', '4', '6'],
      answer: 2,
      fact: 'Carbon has 4 valence electrons and forms 4 covalent bonds to complete its octet.',
    },
  },
  {
    id: 'formula-quiz',
    name: 'Formula Quiz',
    desc: 'Test your recall of fundamental kinematics and thermodynamics formulas.',
    icon: PenLine,
    discipline: 'Physics',
    difficulty: 'Intermediate',
    xpReward: 70,
    quickChallenge: {
      q: 'Which formula represents kinetic energy of a moving mass?',
      options: ['E = mc²', 'KE = ½ m v²', 'W = F · d', 'P = W / t'],
      answer: 1,
      fact: 'Kinetic energy increases proportionally to velocity squared.',
    },
  },
];

export default function FunGames() {
  const { record } = useProgress();
  const [activeGame, setActiveGame] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [rewardClaimed, setRewardClaimed] = useState(false);

  const openGame = (game) => {
    setActiveGame(game);
    setSelectedOption(null);
    setRewardClaimed(false);
  };

  const handleAnswer = (index) => {
    if (selectedOption !== null || !activeGame) return;
    setSelectedOption(index);
    if (index === activeGame.quickChallenge.answer) {
      setRewardClaimed(true);
      record({
        kind: 'game',
        ref: activeGame.name,
        xp: activeGame.xpReward,
      });
    }
  };

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
          Fun Games to Learn
        </h1>
        <p className="mt-1 text-xs sm:text-sm text-slate-500">
          Reinforce scientific principles, stoichiometry, and physical laws through interactive mini-games.
        </p>
      </div>

      {/* Games Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {GAMES.map((game) => {
          const Icon = game.icon;
          return (
            <div
              key={game.id}
              className="lab-card flex flex-col justify-between p-5 transition hover:border-sky-300"
            >
              <div>
                <div className="flex items-start justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-sky-50 text-sky-600">
                    <Icon size={20} />
                  </div>
                  <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-[10px] font-medium text-slate-600">
                    {game.discipline}
                  </span>
                </div>

                <h3 className="mt-3.5 text-sm font-semibold text-slate-900">{game.name}</h3>
                <p className="mt-1 text-xs text-slate-500 leading-relaxed">
                  {game.desc}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
                <div className="text-[11px] text-slate-400">
                  <span>+{game.xpReward} XP</span> · <span>{game.difficulty}</span>
                </div>
                <button
                  onClick={() => openGame(game)}
                  className="flex items-center gap-1.5 rounded-lg bg-yellow-400 px-3 py-1.5 text-xs font-bold text-slate-900 shadow-xs transition hover:bg-yellow-500"
                >
                  <Play size={12} fill="currentColor" /> Play
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Interactive Game Modal */}
      {activeGame && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-xs">
          <div className="relative w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-6 shadow-xl">
            <button
              onClick={() => setActiveGame(null)}
              className="absolute right-4 top-4 text-slate-400 hover:text-slate-600"
            >
              <X size={18} />
            </button>

            <div className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-50 text-sky-600">
                <activeGame.icon size={16} />
              </span>
              <div>
                <h3 className="text-base font-semibold text-slate-900">{activeGame.name} Challenge</h3>
                <span className="text-xs text-slate-400">Earn +{activeGame.xpReward} XP</span>
              </div>
            </div>

            <div className="mt-4 rounded-xl bg-slate-50 p-4 border border-slate-100">
              <p className="text-sm font-medium text-slate-800">
                {activeGame.quickChallenge.q}
              </p>
            </div>

            {/* Options */}
            <div className="mt-3 space-y-2">
              {activeGame.quickChallenge.options.map((option, idx) => {
                const isSelected = selectedOption === idx;
                const isCorrect = idx === activeGame.quickChallenge.answer;

                let btnClass = 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700';
                if (selectedOption !== null) {
                  if (isCorrect) {
                    btnClass = 'border-emerald-300 bg-emerald-50 text-emerald-900 font-medium';
                  } else if (isSelected) {
                    btnClass = 'border-rose-300 bg-rose-50 text-rose-900';
                  } else {
                    btnClass = 'border-slate-100 bg-slate-50 text-slate-400';
                  }
                }

                return (
                  <button
                    key={idx}
                    onClick={() => handleAnswer(idx)}
                    disabled={selectedOption !== null}
                    className={`flex w-full items-center justify-between rounded-xl border p-3 text-left text-xs transition ${btnClass}`}
                  >
                    <span>{option}</span>
                    {selectedOption !== null && isCorrect && (
                      <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
                    )}
                    {selectedOption !== null && isSelected && !isCorrect && (
                      <XCircle size={16} className="text-rose-500 shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Result / Explanation */}
            {selectedOption !== null && (
              <div className="mt-4 rounded-xl p-3 text-xs bg-slate-50 border border-slate-100">
                <p className="font-semibold text-slate-800 mb-1">
                  {selectedOption === activeGame.quickChallenge.answer
                    ? '🎉 Correct! Science fact:'
                    : '💡 Not quite! Review the principle:'}
                </p>
                <p className="text-slate-600 leading-relaxed">{activeGame.quickChallenge.fact}</p>
                {rewardClaimed && (
                  <p className="mt-2 text-xs font-bold text-amber-700">
                    +{activeGame.xpReward} XP added to your profile!
                  </p>
                )}
              </div>
            )}

            <div className="mt-5 flex justify-end">
              <button
                onClick={() => setActiveGame(null)}
                className="rounded-lg border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
