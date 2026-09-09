import React, { useState, useEffect } from 'react';
import {
  Bookmark,
  X,
  Trash2,
  Download,
  Upload,
  FlaskConical,
  Check,
  FolderOpen
} from 'lucide-react';

export default function SavedProjectsModal({ isOpen, onClose, onLoadProject }) {
  const [savedProjects, setSavedProjects] = useState([]);
  const [copiedStatus, setCopiedStatus] = useState(false);

  useEffect(() => {
    if (isOpen) {
      try {
        const stored = JSON.parse(localStorage.getItem('labxplore_saved_chemistry_projects') || '[]');
        setSavedProjects(stored);
      } catch (e) {
        console.error(e);
      }
    }
  }, [isOpen]);

  const handleDelete = (id) => {
    const updated = savedProjects.filter((p) => p.id !== id);
    setSavedProjects(updated);
    try {
      localStorage.setItem('labxplore_saved_chemistry_projects', JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
  };

  const handleExportJSON = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(savedProjects, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', 'labxplore_chemistry_projects.json');
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-xs">
      <div className="flex max-h-[85vh] w-full max-w-xl flex-col rounded-3xl border border-slate-200 bg-white shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50/80 p-5">
          <div className="flex items-center gap-2.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-sky-500 text-white shadow-xs">
              <FolderOpen size={20} />
            </div>
            <div>
              <h3 className="text-base font-black text-slate-900 tracking-tight">
                Saved Projects & Lab Benches
              </h3>
              <p className="text-xs text-slate-500">
                {savedProjects.length} projects stored in browser local storage
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="rounded-xl p-1.5 text-slate-400 hover:bg-slate-200 hover:text-slate-700 transition cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        {/* Body List */}
        <div className="flex flex-col gap-2.5 overflow-y-auto p-5 text-xs">
          {savedProjects.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-8 text-center text-slate-400">
              <Bookmark size={36} className="text-slate-300 mb-2" />
              <p className="text-sm font-bold text-slate-700">No saved projects yet</p>
              <p className="text-xs text-slate-400 mt-0.5">
                Click "Save Project" while working on the Virtual Lab Bench to preserve your experiment setups.
              </p>
            </div>
          ) : (
            savedProjects.map((proj) => (
              <div
                key={proj.id}
                className="flex items-center justify-between rounded-2xl border border-slate-200 p-3.5 hover:border-sky-300 transition"
              >
                <div>
                  <h4 className="font-black text-slate-900 text-sm">{proj.title || 'Untitled Lab Setup'}</h4>
                  <span className="text-[11px] text-slate-400">
                    Saved on {new Date(proj.timestamp || Date.now()).toLocaleDateString()} • {proj.chemicals?.length || 0} chemicals
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      onLoadProject && onLoadProject(proj);
                      onClose();
                    }}
                    className="flex items-center gap-1 rounded-xl bg-sky-500 text-white px-3 py-1.5 font-bold shadow-xs hover:bg-sky-600 transition cursor-pointer"
                  >
                    <FlaskConical size={13} />
                    <span>Load</span>
                  </button>

                  <button
                    onClick={() => handleDelete(proj.id)}
                    className="flex h-8 w-8 items-center justify-center rounded-xl text-slate-400 hover:bg-rose-50 hover:text-rose-600 transition cursor-pointer"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between border-t border-slate-100 bg-slate-50/80 p-4">
          {savedProjects.length > 0 && (
            <button
              onClick={handleExportJSON}
              className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-bold text-slate-700 hover:bg-slate-100 transition cursor-pointer"
            >
              <Download size={14} />
              <span>Export JSON Backup</span>
            </button>
          )}

          <button
            onClick={onClose}
            className="ml-auto rounded-xl bg-slate-900 px-4 py-1.5 text-xs font-black text-white hover:bg-slate-800 transition cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
