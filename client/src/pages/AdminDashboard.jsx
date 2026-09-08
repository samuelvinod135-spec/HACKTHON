import React, { useState } from 'react';
import {
  Building2,
  Users,
  FlaskConical,
  Clock,
  TrendingUp,
  Download,
  Calendar,
  Layers,
  Atom,
  Sparkles,
  BarChart3,
  PieChart as PieChartIcon,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  BarChart,
  Bar,
  Legend,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { useAuth } from '../context/AuthContext.jsx';

const REACTION_VOLUME_DATA = [
  { date: 'Mon', chemistry: 142, physics: 98, total: 240 },
  { date: 'Tue', chemistry: 198, physics: 125, total: 323 },
  { date: 'Wed', chemistry: 254, physics: 178, total: 432 },
  { date: 'Thu', chemistry: 310, physics: 215, total: 525 },
  { date: 'Fri', chemistry: 280, physics: 190, total: 470 },
  { date: 'Sat', chemistry: 345, physics: 260, total: 605 },
  { date: 'Sun', chemistry: 412, physics: 310, total: 722 },
];

const SUBJECT_INTEREST_DATA = [
  { name: 'Organic & Inorganic Reactions', value: 34, color: '#0ea5e9' },
  { name: 'Ray Optics & Lens Refraction', value: 26, color: '#f59e0b' },
  { name: 'Kinematics & Harmonic Motion', value: 20, color: '#10b981' },
  { name: 'Stoichiometry & Titration', value: 12, color: '#6366f1' },
  { name: 'Thermodynamics & Enthalpy', value: 8, color: '#ec4899' },
];

const COHORTS_OVERVIEW = [
  {
    id: 'DPS-10A',
    name: 'Grade 10 - Section A',
    teacher: 'Dr. Sunita Rao',
    studentsCount: 34,
    reactionsRun: 2840,
    hoursSpent: 182,
    avgMastery: 78,
    flaggedStudents: 3,
  },
  {
    id: 'DPS-10B',
    name: 'Grade 10 - Section B',
    teacher: 'Prof. Arvind Kulkarni',
    studentsCount: 32,
    reactionsRun: 2410,
    hoursSpent: 165,
    avgMastery: 74,
    flaggedStudents: 4,
  },
  {
    id: 'DPS-11CHEM',
    name: 'Grade 11 - Chemistry Lead',
    teacher: 'Dr. Ananya Bose',
    studentsCount: 28,
    reactionsRun: 3620,
    hoursSpent: 210,
    avgMastery: 84,
    flaggedStudents: 1,
  },
  {
    id: 'DPS-11PHYS',
    name: 'Grade 11 - Optics & Mechanics',
    teacher: 'Mr. Rajesh Nair',
    studentsCount: 30,
    reactionsRun: 3150,
    hoursSpent: 195,
    avgMastery: 81,
    flaggedStudents: 2,
  },
];

export default function AdminDashboard() {
  const { profile } = useAuth();
  const [timeRange, setTimeRange] = useState('7d'); // '7d' | '30d' | 'term'
  const [chartMode, setChartMode] = useState('stacked');

  const schoolName = profile?.institution_name || 'Delhi Public School R.K. Puram';
  const schoolCode = profile?.school_code || 'DPS-RKP-2026';

  const totalStudents = COHORTS_OVERVIEW.reduce((acc, c) => acc + c.studentsCount, 0);
  const totalReactions = COHORTS_OVERVIEW.reduce((acc, c) => acc + c.reactionsRun, 0);
  const totalHours = COHORTS_OVERVIEW.reduce((acc, c) => acc + c.hoursSpent, 0);
  const overallSchoolMastery = Math.round(
    COHORTS_OVERVIEW.reduce((acc, c) => acc + c.avgMastery, 0) / COHORTS_OVERVIEW.length
  );

  const handleExportCSV = () => {
    const headers = ['Cohort ID', 'Cohort Name', 'Assigned Teacher', 'Enrolled Students', 'Reactions Run', 'Hours Spent', 'Average Mastery %', 'Flagged Scholars'];
    const rows = COHORTS_OVERVIEW.map((c) => [
      c.id,
      `"${c.name}"`,
      `"${c.teacher}"`,
      c.studentsCount,
      c.reactionsRun,
      c.hoursSpent,
      `${c.avgMastery}%`,
      c.flaggedStudents,
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `${schoolCode}_institutional_analytics_report.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="mx-auto max-w-7xl space-y-8 pb-16">
      {/* 1. Header & School Info */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-black uppercase tracking-widest text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full border border-emerald-300">
              Institutional Admin Operating System
            </span>
            <span className="text-[10px] font-mono font-bold text-slate-500">
              Code: {schoolCode}
            </span>
          </div>
          <h1 className="mt-1 text-2xl sm:text-3xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <span>{schoolName}</span>
            <span className="text-xl">🏛️</span>
          </h1>
          <p className="mt-0.5 text-xs sm:text-sm text-slate-500 font-medium">
            Campus-Wide Telemetry · 4 Assigned Cohorts · Real-Time Institutional Monitoring
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 rounded-2xl bg-white p-1 border border-slate-200 shadow-xs">
            {['7d', '30d', 'term'].map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setTimeRange(t)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                  timeRange === t ? 'bg-sky-500 text-white shadow-2xs' : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                {t === '7d' ? 'Past 7 Days' : t === '30d' ? 'Past Month' : 'Full Academic Term'}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={handleExportCSV}
            className="clay-btn-yellow inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-black text-slate-950 shadow-md hover:scale-105 transition-all cursor-pointer"
          >
            <Download size={14} />
            <span>Export CSV Report</span>
          </button>
        </div>
      </div>

      {/* 2. Top Metric Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="clay-card p-5 bg-white rounded-3xl border border-sky-100 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
              Total Active Scholars
            </span>
            <p className="mt-1 text-2xl sm:text-3xl font-black text-slate-900">{totalStudents}</p>
            <p className="text-[11px] text-emerald-600 font-bold mt-0.5">Across 4 Class Sections</p>
          </div>
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-sky-50 text-sky-700">
            <Users size={20} />
          </div>
        </div>

        <div className="clay-card p-5 bg-white rounded-3xl border border-amber-100 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
              Reactions Simulated
            </span>
            <p className="mt-1 text-2xl sm:text-3xl font-black text-amber-600 font-mono">
              {totalReactions.toLocaleString()}
            </p>
            <p className="text-[11px] text-slate-500 mt-0.5">~320 reactions/day</p>
          </div>
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-amber-50 text-amber-700">
            <FlaskConical size={20} />
          </div>
        </div>

        <div className="clay-card p-5 bg-white rounded-3xl border border-indigo-100 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
              Lab Time Invested
            </span>
            <p className="mt-1 text-2xl sm:text-3xl font-black text-indigo-600 font-mono">{totalHours} hrs</p>
            <p className="text-[11px] text-slate-500 mt-0.5">Virtual benches & canvas</p>
          </div>
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-700">
            <Clock size={20} />
          </div>
        </div>

        <div className="clay-card p-5 bg-white rounded-3xl border border-emerald-100 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
              Mean Institutional Mastery
            </span>
            <p className="mt-1 text-2xl sm:text-3xl font-black text-emerald-600 font-mono">
              {overallSchoolMastery}%
            </p>
            <p className="text-[11px] text-emerald-600 font-bold mt-0.5">+12% over NCERT baseline</p>
          </div>
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700">
            <TrendingUp size={20} />
          </div>
        </div>
      </div>

      {/* 3. Charts Row: Reaction Velocity & Subject Interest Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Reaction Velocity Chart (2 cols) */}
        <div className="lg:col-span-2 clay-card p-5 sm:p-6 bg-white rounded-3xl border border-sky-100 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h3 className="text-base font-black text-slate-900 tracking-tight flex items-center gap-2">
                <span>Reaction Velocity & Simulation Telemetry</span>
                <span className="rounded-full bg-yellow-300 text-slate-950 px-2 py-0.5 text-[9px] font-black">
                  60 FPS Engine
                </span>
              </h3>
              <p className="text-xs text-slate-400">
                Daily volume of chemical reactions and physics apparatus experiments conducted campus-wide.
              </p>
            </div>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={REACTION_VOLUME_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorChem" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0.0} />
                  </linearGradient>
                  <linearGradient id="colorPhys" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#f59e0b" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="date" tick={{ fontSize: 11, fill: '#64748b' }} />
                <YAxis tick={{ fontSize: 11, fill: '#64748b' }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#ffffff',
                    borderRadius: '16px',
                    boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)',
                    border: '1px solid #e0f2fe',
                    fontSize: '12px',
                  }}
                />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                <Area type="monotone" dataKey="chemistry" name="Chemistry Reactions" stroke="#0ea5e9" strokeWidth={2.5} fillOpacity={1} fill="url(#colorChem)" />
                <Area type="monotone" dataKey="physics" name="Physics Ray/Kinematics" stroke="#f59e0b" strokeWidth={2.5} fillOpacity={1} fill="url(#colorPhys)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Subject Interest Distribution (1 col) */}
        <div className="clay-card p-5 sm:p-6 bg-white rounded-3xl border border-sky-100 shadow-sm space-y-4 flex flex-col justify-between">
          <div className="border-b border-slate-100 pb-3">
            <h3 className="text-base font-black text-slate-900 tracking-tight flex items-center gap-2">
              <PieChartIcon size={16} className="text-sky-600" />
              <span>Subject Dwell Share</span>
            </h3>
            <p className="text-xs text-slate-400">Time allocation across science domains.</p>
          </div>

          <div className="h-44 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={SUBJECT_INTEREST_DATA}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={75}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {SUBJECT_INTEREST_DATA.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-1.5 pt-2 border-t border-slate-100 text-xs">
            {SUBJECT_INTEREST_DATA.map((item) => (
              <div key={item.name} className="flex items-center justify-between text-[11px]">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-slate-700 font-medium truncate max-w-[170px]">{item.name}</span>
                </div>
                <span className="font-mono font-bold text-slate-900">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 4. Multi-Cohort Comparison Table */}
      <div className="clay-card p-5 sm:p-6 bg-white rounded-3xl border border-sky-100 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div>
            <h3 className="text-base font-black text-slate-900 tracking-tight flex items-center gap-2">
              <span>Campus Cohort Performance Directory</span>
              <span className="rounded-full bg-sky-100 text-sky-800 px-2 py-0.5 text-[9px] font-black">
                4 Active Sections
              </span>
            </h3>
            <p className="text-xs text-slate-400">Comparative diagnostic breakdown across all school classes.</p>
          </div>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-slate-100">
          <table className="w-full border-collapse text-left text-xs">
            <thead>
              <tr className="bg-slate-100/70 text-slate-700 font-bold border-b border-slate-200">
                <th className="p-3 pl-4">Cohort Name & Code</th>
                <th className="p-3">Assigned Faculty</th>
                <th className="p-3 text-center">Enrolled</th>
                <th className="p-3 text-center">Reactions Run</th>
                <th className="p-3 text-center">Lab Hours</th>
                <th className="p-3 text-center">Avg Mastery</th>
                <th className="p-3 text-center">Stealth AI Interventions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white font-medium text-slate-800">
              {COHORTS_OVERVIEW.map((cohort) => (
                <tr key={cohort.id} className="hover:bg-sky-50/40 transition-colors">
                  <td className="p-3 pl-4">
                    <p className="font-bold text-slate-900">{cohort.name}</p>
                    <p className="text-[10px] text-sky-700 font-mono font-bold">{cohort.id}</p>
                  </td>
                  <td className="p-3 font-semibold text-slate-700">{cohort.teacher}</td>
                  <td className="p-3 text-center font-mono font-bold">{cohort.studentsCount}</td>
                  <td className="p-3 text-center font-mono font-bold text-amber-700">
                    {cohort.reactionsRun.toLocaleString()}
                  </td>
                  <td className="p-3 text-center font-mono font-bold text-indigo-700">
                    {cohort.hoursSpent}h
                  </td>
                  <td className="p-3 text-center">
                    <span
                      className={`inline-block px-2.5 py-1 rounded-xl font-mono font-black text-xs ${
                        cohort.avgMastery >= 80
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-amber-100 text-amber-900'
                      }`}
                    >
                      {cohort.avgMastery}%
                    </span>
                  </td>
                  <td className="p-3 text-center">
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                      <span>{cohort.flaggedStudents} Active</span>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
