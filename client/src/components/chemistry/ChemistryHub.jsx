import React, { useState, useEffect } from 'react';
import {
  FlaskConical,
  Search,
  BookOpen,
  Sparkles,
  Scale,
  Cpu,
  Atom,
  Network,
  Award,
  HelpCircle,
  FolderOpen,
  Bot,
  LayoutDashboard,
  GripVertical
} from 'lucide-react';

import ChemistryDashboard from './ChemistryDashboard.jsx';
import ReactionLibraryView from './ReactionLibraryView.jsx';
import VirtualLabWorkspace from './VirtualLabWorkspace.jsx';
import ReactionSimulatorView from './ReactionSimulatorView.jsx';
import EquationBalancerView from './EquationBalancerView.jsx';
import NamedReactionsView from './NamedReactionsView.jsx';
import ReactionGraphView from './ReactionGraphView.jsx';
import MoleculeExplorerView from './MoleculeExplorerView.jsx';
import ExperimentLibraryView from './ExperimentLibraryView.jsx';
import ReactionQuizView from './ReactionQuizView.jsx';
import ReactionFlashcardView from './ReactionFlashcardView.jsx';
import SavedProjectsModal from './SavedProjectsModal.jsx';
import AiChemistryAssistantDrawer from './AiChemistryAssistantDrawer.jsx';
import DragDropChemistryWorkspace from '../DragDropChemistryWorkspace.jsx';

import {
  getChemistryReactionCount,
  getAllNamedReactions,
  getExperimentsCatalog,
  getMoleculesCatalog
} from '../../data/chemistry/chemistryDatabase.js';

export default function ChemistryHub({ initialTab = 'dashboard' }) {
  const [activeTab, setActiveTab] = useState(initialTab || 'dashboard');
  const [activePreset, setActivePreset] = useState(null);
  const [libraryFilters, setLibraryFilters] = useState({});
  const [isAiDrawerOpen, setIsAiDrawerOpen] = useState(false);
  const [isSavedModalOpen, setIsSavedModalOpen] = useState(false);

  // Sync tab from props if provided
  useEffect(() => {
    if (initialTab && initialTab !== 'drag-and-drop' && initialTab !== 'canvas') {
      setActiveTab(initialTab);
    }
  }, [initialTab]);

  const reactionCount = getChemistryReactionCount();
  const experimentsCount = getExperimentsCatalog().length;
  const namedCount = getAllNamedReactions().length;
  const moleculesCount = getMoleculesCatalog().length;

  const handleNavigate = (tab, filters = {}) => {
    if (filters && Object.keys(filters).length > 0) {
      setLibraryFilters(filters);
    }
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRunInLab = (reactionOrExperiment) => {
    setActivePreset(reactionOrExperiment);
    setActiveTab('lab');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAddToWorkspace = (reaction) => {
    setActivePreset(reaction);
    setActiveTab('workspace');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLoadSavedProject = (project) => {
    setActivePreset(project);
    setActiveTab('lab');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const TABS = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'lab', label: 'Virtual Lab Bench', icon: FlaskConical },
    { id: 'library', label: '10,000+ Reactions', icon: Search },
    { id: 'workspace', label: 'Visual Canvas', icon: GripVertical },
    { id: 'simulator', label: 'Simulator', icon: Cpu },
    { id: 'balancer', label: 'Equation Balancer', icon: Scale },
    { id: 'named', label: 'Named Reactions', icon: Sparkles },
    { id: 'synthesis', label: 'Synthesis Graph', icon: Network },
    { id: 'molecules', label: 'Molecules', icon: Atom },
    { id: 'experiments', label: '107 Practicals', icon: BookOpen },
    { id: 'quiz', label: 'Reaction Quiz', icon: Award },
    { id: 'flashcards', label: 'Flashcards', icon: HelpCircle },
  ];

  return (
    <div className="flex flex-col gap-5 w-full">
      {/* Top Primary Navigation Bar */}
      <div className="flex flex-col gap-2 rounded-3xl border border-sky-100 bg-white p-3.5 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-2.5">
          {/* Brand & Stats */}
          <div className="flex items-center gap-2.5">
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-tr from-sky-500 to-blue-600 text-white shadow-md shadow-sky-500/20">
              <FlaskConical size={20} />
            </span>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-black text-slate-900 tracking-tight">
                  Virtual Chemistry Studio
                </span>
                <span className="rounded-full bg-emerald-100 text-emerald-800 px-2 py-0.5 text-[10px] font-black shadow-2xs">
                  {reactionCount.toLocaleString()} Reactions
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium">
                Complete CBSE & NCERT Classes 10, 11 & 12 Syllabus
              </p>
            </div>
          </div>

          {/* Assistant & Saved Projects Modals Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsSavedModalOpen(true)}
              className="flex items-center gap-1.5 rounded-2xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-bold text-slate-700 hover:bg-slate-50 transition cursor-pointer shadow-2xs"
            >
              <FolderOpen size={14} className="text-sky-600" />
              <span className="hidden sm:inline">Saved Projects</span>
            </button>

            <button
              onClick={() => setIsAiDrawerOpen(true)}
              className="flex items-center gap-1.5 rounded-2xl bg-gradient-to-r from-sky-500 to-indigo-600 px-3.5 py-1.5 text-xs font-black text-white shadow-md shadow-sky-500/20 hover:brightness-110 active:scale-95 transition cursor-pointer"
            >
              <Bot size={15} />
              <span>AI Chemistry Tutor</span>
            </button>
          </div>
        </div>

        {/* Scrollable Main Tabs Strip */}
        <div className="flex items-center gap-1.5 overflow-x-auto py-1 no-scrollbar">
          {TABS.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => handleNavigate(tab.id)}
                className={`flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-black transition whitespace-nowrap cursor-pointer shrink-0 ${
                  isActive
                    ? 'bg-sky-500 text-white shadow-sm shadow-sky-500/30 scale-[1.02]'
                    : 'bg-slate-50/80 text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <Icon size={14} className={isActive ? 'text-white' : 'text-slate-500'} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main View Router */}
      <div className="w-full">
        {activeTab === 'dashboard' && (
          <ChemistryDashboard
            onNavigate={handleNavigate}
            stats={{
              reactions: reactionCount,
              experiments: experimentsCount,
              named: namedCount,
              molecules: moleculesCount
            }}
          />
        )}

        {activeTab === 'lab' && (
          <VirtualLabWorkspace initialPreset={activePreset} />
        )}

        {activeTab === 'library' && (
          <ReactionLibraryView
            onRunInLab={handleRunInLab}
            onAddToWorkspace={handleAddToWorkspace}
            initialFilters={libraryFilters}
          />
        )}

        {activeTab === 'workspace' && (
          <DragDropChemistryWorkspace initialReaction={activePreset} />
        )}

        {activeTab === 'simulator' && (
          <ReactionSimulatorView onTransferToLab={handleRunInLab} />
        )}

        {activeTab === 'balancer' && (
          <EquationBalancerView />
        )}

        {activeTab === 'named' && (
          <NamedReactionsView onRunInLab={handleRunInLab} />
        )}

        {activeTab === 'synthesis' && (
          <ReactionGraphView onRunInLab={handleRunInLab} />
        )}

        {activeTab === 'molecules' && (
          <MoleculeExplorerView />
        )}

        {activeTab === 'experiments' && (
          <ExperimentLibraryView onLaunchInLab={handleRunInLab} />
        )}

        {activeTab === 'quiz' && (
          <ReactionQuizView />
        )}

        {activeTab === 'flashcards' && (
          <ReactionFlashcardView />
        )}
      </div>

      {/* Persistent AI Chemistry Tutor Drawer */}
      <AiChemistryAssistantDrawer
        isOpen={isAiDrawerOpen}
        onClose={() => setIsAiDrawerOpen(false)}
      />

      {/* Saved Projects Modal */}
      <SavedProjectsModal
        isOpen={isSavedModalOpen}
        onClose={() => setIsSavedModalOpen(false)}
        onLoadProject={handleLoadSavedProject}
      />
    </div>
  );
}
