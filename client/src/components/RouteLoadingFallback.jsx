import React from 'react';

export default function RouteLoadingFallback() {
  return (
    <div className="relative w-full min-h-[60vh] flex flex-col gap-4 p-4 animate-in fade-in duration-150">
      {/* Top micro progress bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-sky-400 via-amber-400 to-indigo-500 animate-pulse z-50 shadow-xs" />

      {/* Modern glass skeleton placeholder */}
      <div className="flex items-center justify-between rounded-3xl border border-sky-100 bg-white/70 dark:bg-slate-900/70 p-4 shadow-xs backdrop-blur-xs">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-2xl bg-sky-100 dark:bg-slate-800 animate-pulse" />
          <div className="space-y-1.5">
            <div className="h-4 w-36 rounded-md bg-slate-200 dark:bg-slate-700 animate-pulse" />
            <div className="h-3 w-56 rounded-md bg-slate-100 dark:bg-slate-800 animate-pulse" />
          </div>
        </div>
        <div className="h-8 w-24 rounded-xl bg-slate-100 dark:bg-slate-800 animate-pulse" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
        <div className="h-48 rounded-3xl border border-slate-100 bg-white/50 dark:bg-slate-900/50 p-4 animate-pulse md:col-span-2" />
        <div className="h-48 rounded-3xl border border-slate-100 bg-white/50 dark:bg-slate-900/50 p-4 animate-pulse" />
      </div>
    </div>
  );
}
