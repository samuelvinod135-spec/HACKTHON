import { useState, useEffect } from 'react';
import { WifiOff, AlertTriangle, X, CheckCircle, Database } from 'lucide-react';

export default function NetworkFallbackToast() {
  const [toast, setToast] = useState(null);

  useEffect(() => {
    const handleFallbackEvent = (event) => {
      const detail = event.detail || {};
      const message = detail.message || 'Network latency detected. Loading locally cached module...';

      setToast({
        id: Date.now(),
        message,
      });
    };

    window.addEventListener('labxplore:network-fallback', handleFallbackEvent);
    return () => {
      window.removeEventListener('labxplore:network-fallback', handleFallbackEvent);
    };
  }, []);

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => {
      setToast(null);
    }, 4500);

    return () => clearTimeout(timer);
  }, [toast]);

  if (!toast) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed top-5 right-5 z-[99999] max-w-md animate-in fade-in slide-in-from-top-4 duration-300 pointer-events-auto"
    >
      <div className="clay-card flex items-start gap-3 rounded-2xl border-2 border-amber-300 bg-amber-50/98 p-3.5 shadow-2xl text-amber-950 backdrop-blur-md">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-amber-400 text-slate-950 font-black shadow-sm">
          <Database size={18} className="animate-pulse" />
        </div>

        <div className="flex-1 min-w-0 pr-1">
          <div className="flex items-center gap-1.5">
            <span className="inline-block h-2 w-2 rounded-full bg-amber-500 animate-ping" />
            <p className="text-xs font-black text-amber-950 tracking-tight">Offline Resilience Active</p>
          </div>
          <p className="mt-0.5 text-xs font-extrabold text-amber-900 leading-snug">
            {toast.message}
          </p>
          <p className="mt-1 text-[11px] font-medium text-amber-700">
            Zero demo downtime: Serving pre-verified local scientific knowledge base.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setToast(null)}
          className="shrink-0 p-1 text-amber-700 hover:text-amber-950 transition rounded-lg hover:bg-amber-100"
          title="Dismiss notification"
        >
          <X size={15} />
        </button>
      </div>
    </div>
  );
}
