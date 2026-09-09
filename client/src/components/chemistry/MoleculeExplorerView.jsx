import React, { useState, useMemo } from 'react';
import {
  Atom,
  Search,
  Filter,
  Info,
  X,
  Sparkles,
  Layers,
  Check
} from 'lucide-react';
import { getMoleculesCatalog } from '../../data/chemistry/chemistryDatabase.js';

export default function MoleculeExplorerView() {
  const molecules = getMoleculesCatalog();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [selectedMolecule, setSelectedMolecule] = useState(null);

  const categories = useMemo(() => {
    const set = new Set(molecules.map((m) => m.category).filter(Boolean));
    return ['All Categories', ...Array.from(set)];
  }, [molecules]);

  const filtered = useMemo(() => {
    return molecules.filter((m) => {
      const matchQuery =
        !searchQuery ||
        m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.formula.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (m.iupacName && m.iupacName.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (m.smiles && m.smiles.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchCat =
        selectedCategory === 'All Categories' || m.category === selectedCategory;

      return matchQuery && matchCat;
    });
  }, [molecules, searchQuery, selectedCategory]);

  return (
    <div className="flex flex-col gap-6 max-w-6xl mx-auto">
      {/* Header Banner */}
      <div className="rounded-3xl border border-blue-100 bg-gradient-to-r from-blue-50 via-cyan-50/50 to-white p-6 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-md shadow-blue-500/20">
            <Atom size={24} />
          </div>
          <div>
            <h2 className="text-lg font-black text-slate-900 tracking-tight flex items-center gap-2">
              <span>Molecule Explorer (65+ Compounds)</span>
              <span className="rounded-full bg-blue-100 text-blue-800 px-2.5 py-0.5 text-[10px] font-black">
                2D Structures & Geometries
              </span>
            </h2>
            <p className="text-xs text-slate-500">
              Inspect formulas, IUPAC names, molecular masses, hybridization states, and SMILES notation across organic and inorganic chemistry.
            </p>
          </div>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row items-center gap-3 rounded-2xl border border-slate-200 bg-white p-3.5 shadow-xs">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search molecule by name, formula (e.g. H2SO4, C6H6), or IUPAC..."
            className="w-full rounded-xl border border-slate-200 bg-slate-50 pl-9 pr-4 py-2 text-xs font-medium text-slate-800 placeholder:text-slate-400 focus:border-blue-400 focus:bg-white focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <span className="text-xs font-bold text-slate-400 whitespace-nowrap">Category:</span>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full sm:w-auto rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-700 focus:border-blue-400 focus:outline-none cursor-pointer"
          >
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Molecules Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filtered.map((mol) => (
          <div
            key={mol.id}
            onClick={() => setSelectedMolecule(mol)}
            className="group flex flex-col justify-between rounded-2xl border border-slate-200/90 bg-white p-4 shadow-xs transition hover:border-blue-400 hover:shadow-md cursor-pointer"
          >
            <div>
              {/* Top Category Badge & Formula */}
              <div className="flex items-center justify-between gap-1.5 mb-2">
                <span className="rounded-lg bg-blue-100 text-blue-800 px-2 py-0.5 text-[10px] font-black truncate max-w-[130px]">
                  {mol.category}
                </span>
                <span className="font-mono text-xs font-black text-slate-900 bg-slate-100 px-2 py-0.5 rounded-md">
                  {mol.formula}
                </span>
              </div>

              {/* 2D Chemical Card Visual */}
              <div className="my-2 flex h-24 items-center justify-center rounded-xl bg-gradient-to-br from-slate-900 to-slate-950 p-2 text-center text-white shadow-inner relative overflow-hidden">
                <div className="relative z-10 flex flex-col items-center">
                  <span className="font-mono text-lg font-black tracking-tight" style={{ color: mol.color || '#38bdf8' }}>
                    {mol.formula}
                  </span>
                  <span className="font-mono text-[9px] text-slate-400 mt-1 truncate max-w-[160px]">
                    SMILES: {mol.smiles}
                  </span>
                </div>
                {/* Visual atomic backdrop glow */}
                <div
                  className="absolute inset-0 opacity-20 blur-xl pointer-events-none"
                  style={{ backgroundColor: mol.color || '#38bdf8' }}
                />
              </div>

              {/* Molecule Name & IUPAC */}
              <h3 className="text-sm font-black text-slate-900 group-hover:text-blue-600 transition truncate">
                {mol.name}
              </h3>
              <p className="text-[11px] text-slate-500 font-medium truncate mt-0.5">
                IUPAC: {mol.iupacName || mol.name}
              </p>
            </div>

            {/* Bottom Specs */}
            <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] font-bold text-slate-600">
              <span>MW: {mol.molecularWeight} g/mol</span>
              <span className="text-blue-600 font-black">{mol.hybridization || 'sp³'}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Detail Modal */}
      {selectedMolecule && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-xs">
          <div className="flex max-h-[90vh] w-full max-w-lg flex-col rounded-3xl border border-slate-200 bg-white shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-slate-100 bg-slate-50/80 p-5">
              <div>
                <span className="rounded-lg bg-blue-500 text-white px-2 py-0.5 text-[10px] font-black">
                  {selectedMolecule.category}
                </span>
                <h3 className="text-lg font-black text-slate-900 tracking-tight mt-1">
                  {selectedMolecule.name}
                </h3>
                <span className="text-xs text-slate-500">IUPAC: {selectedMolecule.iupacName}</span>
              </div>

              <button
                onClick={() => setSelectedMolecule(null)}
                className="rounded-xl p-1.5 text-slate-400 hover:bg-slate-200 hover:text-slate-700 transition cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="flex flex-col gap-4 overflow-y-auto p-5 text-xs text-slate-700">
              {/* Formula Display Box */}
              <div className="rounded-2xl bg-slate-950 p-4 text-center text-white shadow-inner">
                <span className="font-mono text-2xl font-black text-sky-400">
                  {selectedMolecule.formula}
                </span>
                <div className="font-mono text-xs text-slate-400 mt-1">
                  SMILES: {selectedMolecule.smiles}
                </div>
              </div>

              {/* Specs Grid */}
              <div className="grid grid-cols-2 gap-2.5">
                <div className="rounded-xl border border-slate-100 bg-slate-50 p-2.5">
                  <span className="font-bold text-slate-400 text-[10px] uppercase">Molecular Weight:</span>
                  <p className="mt-0.5 font-bold text-slate-800">{selectedMolecule.molecularWeight} g/mol</p>
                </div>

                <div className="rounded-xl border border-slate-100 bg-slate-50 p-2.5">
                  <span className="font-bold text-slate-400 text-[10px] uppercase">Hybridization:</span>
                  <p className="mt-0.5 font-bold text-blue-700">{selectedMolecule.hybridization || 'sp³'}</p>
                </div>

                <div className="rounded-xl border border-slate-100 bg-slate-50 p-2.5">
                  <span className="font-bold text-slate-400 text-[10px] uppercase">Geometry / Angle:</span>
                  <p className="mt-0.5 font-bold text-slate-800">{selectedMolecule.geometry || 'Tetrahedral'}</p>
                </div>

                <div className="rounded-xl border border-slate-100 bg-slate-50 p-2.5">
                  <span className="font-bold text-slate-400 text-[10px] uppercase">Functional Groups:</span>
                  <p className="mt-0.5 font-bold text-purple-700">
                    {selectedMolecule.functionalGroups ? selectedMolecule.functionalGroups.join(', ') : 'Hydrocarbon'}
                  </p>
                </div>
              </div>

              {/* Description */}
              {selectedMolecule.desc && (
                <div>
                  <span className="font-black text-[10px] uppercase text-slate-400">Description & Significance:</span>
                  <p className="mt-1 rounded-2xl border border-slate-100 bg-slate-50 p-3 leading-relaxed text-slate-700 font-medium">
                    {selectedMolecule.desc}
                  </p>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="flex justify-end border-t border-slate-100 bg-slate-50/80 p-4">
              <button
                onClick={() => setSelectedMolecule(null)}
                className="rounded-xl bg-slate-900 px-4 py-2 text-xs font-black text-white hover:bg-slate-800 transition cursor-pointer"
              >
                Close Explorer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
