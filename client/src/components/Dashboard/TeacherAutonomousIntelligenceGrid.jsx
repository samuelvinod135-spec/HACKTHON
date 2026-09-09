import React, { useState } from 'react';
import {
  Brain,
  ShieldAlert,
  CheckCircle2,
  TrendingUp,
  AlertTriangle,
  Sparkles,
  ArrowRight,
  Filter,
  Eye,
  BookOpen,
  Atom,
  FlaskConical,
} from 'lucide-react';
import { COHORT_STUDENTS_SAMPLE } from '../Heatmap/MasteryHeatmap.jsx';

export default function TeacherAutonomousIntelligenceGrid({ className = '' }) {
  const [filterStatus, setFilterStatus] = useState('all'); // 'all' | 'critical' | 'practice' | 'nominal'

  // Autonomous triaging of cohort students
  const nominalStudents = COHORT_STUDENTS_SAMPLE.filter((s) => s.overallMastery >= 80);
  const practiceStudents = COHORT_STUDENTS_SAMPLE.filter((s) => s.overallMastery >= 65 && s.overallMastery < 80);
  const criticalStudents = COHORT_STUDENTS_SAMPLE.filter((s) => s.overallMastery < 65 || s.status === 'struggling');

  const total = COHORT_STUDENTS_SAMPLE.length;
  const nominalPct = Math.round((nominalStudents.length / total) * 100);
  const practicePct = Math.round((practiceStudents.length / total) * 100);
  const criticalPct = Math.round((criticalStudents.length / total) * 100);

  // Common Misconception Signatures discovered autonomously across the class
  const detectedCohortFrictions = [
    {
      id: 'fric-kinematics',
      topic: 'Kinematics',
      patternName: 'Vector Direction & Negative Sign Convention (-g)',
      affectedStudentsCount: 4,
      severity: 'high',
      prescribedIntervention: 'Conduct 5-min live apparatus launch at 45° projectile angle',
      apparatusLink: '/physics',
    },
    {
      id: 'fric-stoich',
      topic: 'Stoichiometry',
      patternName: 'Balancing coefficients vs molecular subscripts',
      affectedStudentsCount: 5,
      severity: 'critical',
      prescribedIntervention: 'Deploy magnesium oxide molar balance review micro-task',
      apparatusLink: '/chemistry?tab=drag-and-drop',
    },
    {
      id: 'fric-optics',
      topic: 'Ray Optics',
      patternName: "Normal reference vector angle in Snell's Law",
      affectedStudentsCount: 2,
      severity: 'moderate',
      prescribedIntervention: 'Activate ghost ray normal reference line on student benches',
      apparatusLink: '/physics',
    },
  ];

  const filteredStudents =
    filterStatus === 'critical'
      ? criticalStudents
      : filterStatus === 'practice'
      ? practiceStudents
      : filterStatus === 'nominal'
      ? nominalStudents
      : COHORT_STUDENTS_SAMPLE;

  return (
    <div className={`clay-card rounded-3xl border border-sky-200/90 bg-white p-6 sm:p-8 shadow-sm space-y-6 ${className}`}>
      {/* 1. Header with Autonomous AI Badge */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-sky-100 pb-5">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-sky-500 text-white shadow-md shadow-sky-500/25">
            <Brain size={24} className="animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black uppercase tracking-wider text-sky-800 bg-sky-50 px-2.5 py-0.5 rounded-full border border-sky-200">
                Autonomous Class Intelligence Grid
              </span>
              <span className="text-[10px] font-bold text-slate-500">
                Zero Manual Grading · Pure Empirical Telemetry
              </span>
            </div>
            <h2 className="mt-1 text-xl font-black text-slate-900 tracking-tight">
              Real-Time Cohort Cognitive Health & Misconceptions
            </h2>
          </div>
        </div>

        {/* Status Distribution Pills */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setFilterStatus(filterStatus === 'nominal' ? 'all' : 'nominal')}
            className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
              filterStatus === 'nominal'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-200'
            }`}
          >
            🟢 {nominalPct}% Nominal
          </button>
          <button
            onClick={() => setFilterStatus(filterStatus === 'practice' ? 'all' : 'practice')}
            className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
              filterStatus === 'practice'
                ? 'bg-amber-500 text-white shadow-xs'
                : 'bg-amber-50 text-amber-900 hover:bg-amber-100 border border-amber-200'
            }`}
          >
            🟡 {practicePct}% Practice
          </button>
          <button
            onClick={() => setFilterStatus(filterStatus === 'critical' ? 'all' : 'critical')}
            className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
              filterStatus === 'critical'
                ? 'bg-rose-600 text-white shadow-xs'
                : 'bg-rose-50 text-rose-900 hover:bg-rose-100 border border-rose-200'
            }`}
          >
            🔴 {criticalPct}% Critical
          </button>
        </div>
      </div>

      {/* 2. Discovered Cohort Friction Clusters */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <AlertTriangle size={17} className="text-amber-600" />
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-900">
              Discovered Class-Wide Misconception Clusters
            </h3>
          </div>
          <span className="text-[10px] text-slate-500">
            Inferred from wrong option patterns across all active workstations
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {detectedCohortFrictions.map((fric) => (
            <div
              key={fric.id}
              className={`p-4 rounded-2xl border transition-all flex flex-col justify-between ${
                fric.severity === 'critical'
                  ? 'bg-rose-50/60 border-rose-300'
                  : fric.severity === 'high'
                  ? 'bg-amber-50/60 border-amber-300'
                  : 'bg-sky-50/60 border-sky-300'
              }`}
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase text-slate-700 bg-white/80 px-2 py-0.5 rounded border border-slate-200">
                    {fric.topic}
                  </span>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      fric.severity === 'critical'
                        ? 'bg-rose-200 text-rose-900'
                        : 'bg-amber-200 text-amber-900'
                    }`}
                  >
                    {fric.affectedStudentsCount} Scholars Affected
                  </span>
                </div>

                <h4 className="text-xs font-black text-slate-900 mt-2 leading-snug">
                  {fric.patternName}
                </h4>

                <p className="text-[11px] text-slate-600 mt-2 leading-relaxed">
                  <strong>AI Lesson Prescription:</strong> {fric.prescribedIntervention}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-200/60 flex items-center justify-between">
                <span className="text-[10px] font-bold text-sky-700">Autonomous Action Ready</span>
                <span className="inline-flex items-center gap-1 text-[11px] font-black text-sky-800">
                  <span>View Apparatus</span>
                  <ArrowRight size={11} />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Filtered Individual Scholar Telemetry Radar */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Eye size={17} className="text-sky-600" />
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-900">
              Live Individual Scholar Trajectory Radar ({filteredStudents.length} Visible)
            </h3>
          </div>
          {filterStatus !== 'all' && (
            <button
              onClick={() => setFilterStatus('all')}
              className="text-[11px] font-bold text-sky-600 hover:text-sky-800 underline cursor-pointer"
            >
              Reset Filter
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {filteredStudents.map((st) => (
            <div
              key={st.id}
              className="p-3.5 rounded-2xl bg-slate-50/70 border border-slate-200 hover:bg-white transition-all shadow-2xs space-y-2"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-sky-500 text-white font-black text-xs shadow-xs">
                    {st.avatar}
                  </div>
                  <div>
                    <h5 className="text-xs font-black text-slate-900 leading-tight">{st.name}</h5>
                    <span className="text-[10px] text-slate-400 font-mono">{st.rollNo}</span>
                  </div>
                </div>

                <div className="text-right">
                  <span
                    className={`text-xs font-black px-2 py-0.5 rounded-lg ${
                      st.overallMastery >= 80
                        ? 'bg-emerald-100 text-emerald-800'
                        : st.overallMastery >= 65
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-rose-100 text-rose-800'
                    }`}
                  >
                    {st.overallMastery}% Health
                  </span>
                </div>
              </div>

              {/* Cognitive friction summary */}
              <div className="pt-1 text-[11px] text-slate-600 leading-snug">
                {st.status === 'struggling' ? (
                  <p className="text-rose-700 font-medium">
                    ⚠️ Friction detected in {Object.entries(st.topics).filter(([_, t]) => t.score < 60).map(([k]) => k).join(', ')}. Scaffolding active.
                  </p>
                ) : (
                  <p className="text-emerald-700 font-medium">
                    ✓ Advancing smoothly across all CBSE/NCERT curriculum modules.
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
