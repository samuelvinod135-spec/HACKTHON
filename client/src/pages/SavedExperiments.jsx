import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  FlaskConical,
  Atom,
  Clock,
  ArrowUpRight,
  Flame,
  Sparkles,
  Waves,
  Rocket,
  CheckCircle2,
  Bookmark,
  Trash2,
} from 'lucide-react';
import { useProgress } from '../context/ProgressContext.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import { supabase } from '../supabase.js';
import { api } from '../api.js';

const DISCIPLINE_ICONS = {
  chemistry: FlaskConical,
  physics: Atom,
  optics: Sparkles,
  kinematics: Rocket,
  combustion: Flame,
};

export default function SavedExperiments() {
  const { user } = useAuth();
  const { completions } = useProgress();
  const [savedList, setSavedList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  const fetchSaved = async () => {
    setLoading(true);
    try {
      // 1. Try Supabase first if logged in
      if (user) {
        const { data, error } = await supabase
          .from('saved_experiments')
          .select('*')
          .order('created_at', { ascending: false });

        if (data && !error && data.length > 0) {
          setSavedList(data);
          setLoading(false);
          return;
        }
      }

      // 2. Fall back to local SQLite backend API
      const localData = await api.getSaved();
      setSavedList(localData || []);
    } catch (err) {
      console.warn('Failed to load saved experiments:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSaved();
  }, [user]);

  const handleUnsave = async (item) => {
    const id = item.id || item.experiment_id;
    // Optimistic UI update
    setSavedList((prev) => prev.filter((x) => (x.id || x.experiment_id) !== id));

    try {
      if (user) {
        await supabase.from('saved_experiments').delete().eq('id', id);
      }
      await api.unsaveExperiment(id);
    } catch (err) {
      console.warn('Could not unsave:', err);
    }
  };

  const filtered = savedList.filter((exp) => {
    const disc = (exp.discipline || 'Science').toLowerCase();
    if (filter === 'chemistry') return disc.includes('chem');
    if (filter === 'physics') return disc.includes('phys') || disc.includes('optic') || disc.includes('kinematic');
    return true;
  });

  return (
    <div className="mx-auto max-w-5xl space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
            Saved Experiments
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-slate-500">
            Access your bookmarked simulations, apparatus setups, and chemistry observations.
          </p>
        </div>

        <div className="flex items-center gap-1.5 rounded-xl border border-sky-100 bg-white p-1 shadow-xs">
          {['all', 'chemistry', 'physics'].map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`rounded-lg px-3 py-1 text-xs font-bold capitalize transition ${
                filter === tab
                  ? 'bg-sky-500 text-white shadow-xs'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Experiments Grid or Empty State */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="w-8 h-8 border-4 border-sky-400 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="clay-card p-10 text-center max-w-lg mx-auto">
          <div className="w-14 h-14 rounded-3xl bg-sky-50 text-sky-600 flex items-center justify-center mx-auto mb-4 border border-sky-100 shadow-xs">
            <Bookmark size={24} />
          </div>
          <h3 className="text-base font-bold text-slate-900">No Saved Experiments Yet</h3>
          <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
            You haven't bookmarked any laboratory setups yet. Explore the virtual apparatus in Chemistry or Physics to save simulations to your workstation.
          </p>
          <div className="mt-6 flex items-center justify-center gap-3">
            <Link
              to="/chemistry"
              className="clay-btn-yellow px-4 py-2.5 text-xs font-bold text-slate-900 flex items-center gap-1.5"
            >
              <FlaskConical size={14} /> Chemistry Lab
            </Link>
            <Link
              to="/physics"
              className="px-4 py-2.5 rounded-2xl bg-white border border-slate-200 hover:bg-slate-50 text-xs font-bold text-slate-700 flex items-center gap-1.5 transition shadow-xs"
            >
              <Atom size={14} /> Physics Lab
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((exp) => {
            const discKey = (exp.discipline || 'chemistry').toLowerCase();
            const Icon = DISCIPLINE_ICONS[discKey] || FlaskConical;
            const isCompleted = completions.some(
              (c) => c.ref === exp.title || c.ref === exp.experiment_id
            );

            return (
              <div
                key={exp.id || exp.experiment_id}
                className="lab-card flex flex-col justify-between p-5 transition hover:border-sky-300"
              >
                <div>
                  <div className="flex items-start justify-between">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-50 text-sky-600">
                      <Icon size={20} />
                    </div>
                    <div className="flex items-center gap-1.5">
                      {isCompleted && (
                        <span className="flex items-center gap-0.5 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-700">
                          <CheckCircle2 size={10} /> Completed
                        </span>
                      )}
                      <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-[10px] font-medium text-slate-600">
                        {exp.discipline || 'Science'}
                      </span>
                    </div>
                  </div>

                  <h3 className="mt-3.5 text-sm font-semibold text-slate-900">{exp.title}</h3>
                  <p className="mt-1 text-xs text-slate-500 leading-relaxed line-clamp-2">
                    {exp.desc || exp.description || 'Virtual lab apparatus simulation and kinetic analysis.'}
                  </p>

                  {exp.formula && (
                    <div className="mt-3 rounded-lg bg-slate-50 px-2.5 py-1.5 font-mono text-[11px] text-slate-700 border border-slate-100">
                      {exp.formula}
                    </div>
                  )}
                </div>

                <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
                  <button
                    onClick={() => handleUnsave(exp)}
                    className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-red-500 transition"
                    title="Remove from saved"
                  >
                    <Trash2 size={12} /> Remove
                  </button>

                  <Link
                    to={exp.link || '/chemistry'}
                    className="clay-btn-yellow inline-flex items-center gap-1 px-3 py-1.5 text-xs font-bold text-slate-900"
                  >
                    Open in Lab <ArrowUpRight size={13} />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
