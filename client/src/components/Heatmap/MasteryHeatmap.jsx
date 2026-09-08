import React, { useState } from 'react';
import {
  Sparkles,
  AlertTriangle,
  CheckCircle2,
  TrendingUp,
  Search,
  Filter,
  Info,
  Layers,
} from 'lucide-react';

export const COHORT_STUDENTS_SAMPLE = [
  {
    id: 'stud-1',
    name: 'Aarav Patel',
    rollNo: '10A-01',
    avatar: 'AP',
    overallMastery: 71,
    status: 'struggling',
    topics: {
      'Kinematics': { score: 48, status: 'struggling', errors: 4, scaffolding: 'Visual Velocity Vectors Deployed' },
      'Ray Optics': { score: 88, status: 'mastered', errors: 0, scaffolding: 'None' },
      'Stoichiometry': { score: 56, status: 'struggling', errors: 3, scaffolding: 'Molar Ratio Guide Active' },
      'Thermodynamics': { score: 82, status: 'mastered', errors: 1, scaffolding: 'None' },
      'Acids & Bases': { score: 91, status: 'mastered', errors: 0, scaffolding: 'None' },
      'Harmonic Motion': { score: 76, status: 'in_progress', errors: 2, scaffolding: 'None' },
    },
  },
  {
    id: 'stud-2',
    name: 'Diya Sen',
    rollNo: '10A-02',
    avatar: 'DS',
    overallMastery: 89,
    status: 'nominal',
    topics: {
      'Kinematics': { score: 92, status: 'mastered', errors: 0, scaffolding: 'None' },
      'Ray Optics': { score: 94, status: 'mastered', errors: 0, scaffolding: 'None' },
      'Stoichiometry': { score: 85, status: 'mastered', errors: 1, scaffolding: 'None' },
      'Thermodynamics': { score: 88, status: 'mastered', errors: 0, scaffolding: 'None' },
      'Acids & Bases': { score: 96, status: 'mastered', errors: 0, scaffolding: 'None' },
      'Harmonic Motion': { score: 79, status: 'in_progress', errors: 1, scaffolding: 'None' },
    },
  },
  {
    id: 'stud-3',
    name: 'Rohan Mehta',
    rollNo: '10A-03',
    avatar: 'RM',
    overallMastery: 64,
    status: 'struggling',
    topics: {
      'Kinematics': { score: 52, status: 'struggling', errors: 3, scaffolding: 'Apex Trajectory Guide' },
      'Ray Optics': { score: 68, status: 'in_progress', errors: 2, scaffolding: 'None' },
      'Stoichiometry': { score: 45, status: 'struggling', errors: 5, scaffolding: 'Mole Ratio Guide Active' },
      'Thermodynamics': { score: 74, status: 'in_progress', errors: 1, scaffolding: 'None' },
      'Acids & Bases': { score: 82, status: 'mastered', errors: 1, scaffolding: 'None' },
      'Harmonic Motion': { score: 63, status: 'in_progress', errors: 2, scaffolding: 'None' },
    },
  },
  {
    id: 'stud-4',
    name: 'Ananya Roy',
    rollNo: '10A-04',
    avatar: 'AR',
    overallMastery: 84,
    status: 'nominal',
    topics: {
      'Kinematics': { score: 86, status: 'mastered', errors: 1, scaffolding: 'None' },
      'Ray Optics': { score: 89, status: 'mastered', errors: 0, scaffolding: 'None' },
      'Stoichiometry': { score: 79, status: 'in_progress', errors: 1, scaffolding: 'None' },
      'Thermodynamics': { score: 84, status: 'mastered', errors: 1, scaffolding: 'None' },
      'Acids & Bases': { score: 92, status: 'mastered', errors: 0, scaffolding: 'None' },
      'Harmonic Motion': { score: 74, status: 'in_progress', errors: 2, scaffolding: 'None' },
    },
  },
  {
    id: 'stud-5',
    name: 'Kabir Khan',
    rollNo: '10A-05',
    avatar: 'KK',
    overallMastery: 59,
    status: 'struggling',
    topics: {
      'Kinematics': { score: 42, status: 'struggling', errors: 5, scaffolding: 'Velocity Vectors Deployed' },
      'Ray Optics': { score: 55, status: 'struggling', errors: 4, scaffolding: 'Ghost Focal Guide Active' },
      'Stoichiometry': { score: 61, status: 'in_progress', errors: 2, scaffolding: 'None' },
      'Thermodynamics': { score: 67, status: 'in_progress', errors: 2, scaffolding: 'None' },
      'Acids & Bases': { score: 70, status: 'in_progress', errors: 2, scaffolding: 'None' },
      'Harmonic Motion': { score: 58, status: 'struggling', errors: 3, scaffolding: 'Pendulum Period Aid' },
    },
  },
  {
    id: 'stud-6',
    name: 'Ishaan Verma',
    rollNo: '10A-06',
    avatar: 'IV',
    overallMastery: 78,
    status: 'nominal',
    topics: {
      'Kinematics': { score: 74, status: 'in_progress', errors: 2, scaffolding: 'None' },
      'Ray Optics': { score: 82, status: 'mastered', errors: 1, scaffolding: 'None' },
      'Stoichiometry': { score: 71, status: 'in_progress', errors: 2, scaffolding: 'None' },
      'Thermodynamics': { score: 86, status: 'mastered', errors: 0, scaffolding: 'None' },
      'Acids & Bases': { score: 85, status: 'mastered', errors: 1, scaffolding: 'None' },
      'Harmonic Motion': { score: 72, status: 'in_progress', errors: 1, scaffolding: 'None' },
    },
  },
  {
    id: 'stud-7',
    name: 'Meera Nair',
    rollNo: '10A-07',
    avatar: 'MN',
    overallMastery: 93,
    status: 'nominal',
    topics: {
      'Kinematics': { score: 95, status: 'mastered', errors: 0, scaffolding: 'None' },
      'Ray Optics': { score: 96, status: 'mastered', errors: 0, scaffolding: 'None' },
      'Stoichiometry': { score: 90, status: 'mastered', errors: 0, scaffolding: 'None' },
      'Thermodynamics': { score: 92, status: 'mastered', errors: 0, scaffolding: 'None' },
      'Acids & Bases': { score: 98, status: 'mastered', errors: 0, scaffolding: 'None' },
      'Harmonic Motion': { score: 89, status: 'mastered', errors: 0, scaffolding: 'None' },
    },
  },
  {
    id: 'stud-8',
    name: 'Tanvi Joshi',
    rollNo: '10A-08',
    avatar: 'TJ',
    overallMastery: 73,
    status: 'nominal',
    topics: {
      'Kinematics': { score: 68, status: 'in_progress', errors: 2, scaffolding: 'None' },
      'Ray Optics': { score: 84, status: 'mastered', errors: 1, scaffolding: 'None' },
      'Stoichiometry': { score: 58, status: 'struggling', errors: 3, scaffolding: 'Mole Ratio Guide Active' },
      'Thermodynamics': { score: 77, status: 'in_progress', errors: 1, scaffolding: 'None' },
      'Acids & Bases': { score: 89, status: 'mastered', errors: 0, scaffolding: 'None' },
      'Harmonic Motion': { score: 62, status: 'in_progress', errors: 2, scaffolding: 'None' },
    },
  },
];

const CURRICULAR_TOPICS = [
  'Kinematics',
  'Ray Optics',
  'Stoichiometry',
  'Thermodynamics',
  'Acids & Bases',
  'Harmonic Motion',
];

export default function MasteryHeatmap({ className = '' }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterMode, setFilterMode] = useState('all'); // 'all' | 'struggling' | 'mastered'
  const [hoveredCell, setHoveredCell] = useState(null);

  const filteredStudents = COHORT_STUDENTS_SAMPLE.filter((st) => {
    const matchesSearch = st.name.toLowerCase().includes(searchQuery.toLowerCase()) || st.rollNo.toLowerCase().includes(searchQuery.toLowerCase());
    if (!matchesSearch) return false;
    if (filterMode === 'struggling') return st.status === 'struggling';
    if (filterMode === 'mastered') return st.overallMastery >= 85;
    return true;
  });

  const getCellColor = (score) => {
    if (score >= 80) return 'bg-emerald-500 text-white font-black hover:bg-emerald-600';
    if (score >= 60) return 'bg-amber-400 text-slate-950 font-black hover:bg-amber-500';
    return 'bg-rose-500 text-white font-black hover:bg-rose-600 animate-pulse-slow';
  };

  return (
    <div className={`clay-card rounded-3xl border border-sky-100 bg-white p-5 sm:p-6 shadow-sm space-y-5 ${className}`}>
      {/* 1. Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-tr from-sky-500 to-indigo-600 text-white shadow-xs">
              <Layers size={17} />
            </span>
            <div>
              <h3 className="text-base font-black text-slate-900 tracking-tight flex items-center gap-2">
                <span>Classroom Mastery Heatmap</span>
                <span className="rounded-full bg-sky-100 text-sky-800 px-2 py-0.5 text-[9px] font-black uppercase">
                  Real-Time 2D Matrix
                </span>
              </h3>
              <p className="text-xs text-slate-400">
                Pervasive telemetry matrix tracking individual student competencies across core NCERT topics.
              </p>
            </div>
          </div>
        </div>

        {/* Filter and Search Controls */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search scholar..."
              className="pl-8 pr-3 py-1.5 rounded-xl border border-slate-200 text-xs text-slate-800 bg-slate-50 focus:bg-white focus:outline-none focus:border-sky-400 w-36 sm:w-44"
            />
          </div>

          <div className="flex items-center gap-1 rounded-xl bg-slate-100 p-1">
            <button
              type="button"
              onClick={() => setFilterMode('all')}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition cursor-pointer ${
                filterMode === 'all' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-500'
              }`}
            >
              All ({COHORT_STUDENTS_SAMPLE.length})
            </button>
            <button
              type="button"
              onClick={() => setFilterMode('struggling')}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition cursor-pointer ${
                filterMode === 'struggling' ? 'bg-rose-500 text-white shadow-2xs' : 'text-rose-600'
              }`}
            >
              Struggling
            </button>
            <button
              type="button"
              onClick={() => setFilterMode('mastered')}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition cursor-pointer ${
                filterMode === 'mastered' ? 'bg-emerald-500 text-white shadow-2xs' : 'text-emerald-700'
              }`}
            >
              Mastered
            </button>
          </div>
        </div>
      </div>

      {/* 2. Legend Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs bg-slate-50/70 p-3 rounded-2xl border border-slate-100">
        <div className="flex items-center gap-4">
          <span className="text-slate-400 text-[11px] font-bold uppercase">Mastery Legend:</span>
          <div className="flex items-center gap-1.5">
            <span className="h-3 w-3 rounded-md bg-emerald-500" />
            <span className="text-[11px] font-bold text-slate-700">≥ 80% (Mastered)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="h-3 w-3 rounded-md bg-amber-400" />
            <span className="text-[11px] font-bold text-slate-700">60% – 79% (In Progress)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="h-3 w-3 rounded-md bg-rose-500" />
            <span className="text-[11px] font-bold text-rose-800">&lt; 60% (Stealth AI Triggered)</span>
          </div>
        </div>

        <span className="text-[11px] text-slate-400">
          Showing <strong>{filteredStudents.length}</strong> of <strong>{COHORT_STUDENTS_SAMPLE.length}</strong> enrolled scholars
        </span>
      </div>

      {/* 3. Heatmap Matrix Table */}
      <div className="overflow-x-auto rounded-2xl border border-slate-100">
        <table className="w-full border-collapse text-left text-xs">
          <thead>
            <tr className="bg-slate-100/70 text-slate-700 font-bold border-b border-slate-200">
              <th className="p-3 pl-4 min-w-[160px]">Student Scholar</th>
              <th className="p-3 text-center min-w-[70px]">Aggregate</th>
              {CURRICULAR_TOPICS.map((topic) => (
                <th key={topic} className="p-3 text-center min-w-[110px] whitespace-nowrap">
                  {topic}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 bg-white font-medium text-slate-800">
            {filteredStudents.map((student) => (
              <tr key={student.id} className="hover:bg-sky-50/40 transition-colors">
                {/* Student Column */}
                <td className="p-3 pl-4">
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-tr from-sky-400 to-indigo-600 text-[10px] font-black text-white shadow-2xs">
                      {student.avatar}
                    </div>
                    <div>
                      <p className="font-bold text-slate-900 leading-tight flex items-center gap-1.5">
                        <span>{student.name}</span>
                        {student.status === 'struggling' && (
                          <span className="h-2 w-2 rounded-full bg-rose-500 animate-pulse" title="Autonomous Scaffolding Active" />
                        )}
                      </p>
                      <p className="text-[10px] text-slate-400">{student.rollNo}</p>
                    </div>
                  </div>
                </td>

                {/* Aggregate Column */}
                <td className="p-3 text-center">
                  <span className="font-mono font-black text-xs text-slate-900">
                    {student.overallMastery}%
                  </span>
                </td>

                {/* Heatmap Topic Cells */}
                {CURRICULAR_TOPICS.map((topic) => {
                  const topicData = student.topics[topic] || { score: 75, status: 'nominal', errors: 0, scaffolding: 'None' };
                  return (
                    <td key={topic} className="p-2 text-center">
                      <div
                        onMouseEnter={() => setHoveredCell({ student: student.name, topic, ...topicData })}
                        onMouseLeave={() => setHoveredCell(null)}
                        className={`mx-auto flex h-9 w-14 items-center justify-center rounded-xl text-xs shadow-2xs transition-transform hover:scale-105 cursor-pointer ${getCellColor(
                          topicData.score
                        )}`}
                      >
                        <span className="font-mono">{topicData.score}%</span>
                      </div>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 4. Interactive Hover Inspector Card */}
      {hoveredCell && (
        <div className="rounded-2xl border border-sky-200 bg-sky-50/80 p-3.5 flex items-center justify-between text-xs animate-in fade-in">
          <div className="flex items-center gap-3">
            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-sky-600 text-white font-black shadow-2xs">
              <Info size={16} />
            </span>
            <div>
              <p className="font-bold text-slate-900">
                <strong>{hoveredCell.student}</strong> · {hoveredCell.topic}
              </p>
              <p className="text-[11px] text-slate-600">
                Empirical diagnostic score: <strong className="text-slate-900 font-mono">{hoveredCell.score}%</strong> · 
                Recorded errors: <strong className="text-rose-600 font-mono">{hoveredCell.errors}</strong>
              </p>
            </div>
          </div>
          <div className="text-right">
            <span className="text-[10px] font-bold text-slate-400 block uppercase">Autonomous Remediation:</span>
            <span className="text-[11px] font-black text-sky-800 bg-white px-2 py-0.5 rounded border border-sky-200 shadow-2xs">
              {hoveredCell.scaffolding}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
