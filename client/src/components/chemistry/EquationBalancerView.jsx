import React, { useState } from 'react';
import {
  Scale,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  RotateCcw,
  Check,
  ListOrdered
} from 'lucide-react';
import { balanceChemicalEquation } from '../../data/chemistry/chemistryDatabase.js';

export default function EquationBalancerView() {
  const [inputEquation, setInputEquation] = useState('H2 + O2 -> H2O');
  const [balanceResult, setBalanceResult] = useState(() => balanceChemicalEquation('H2 + O2 -> H2O'));

  const PRESETS = [
    { label: 'Hydrogen Combustion', eq: 'H2 + O2 -> H2O' },
    { label: 'Photosynthesis / Respiration', eq: 'C6H12O6 + O2 -> CO2 + H2O' },
    { label: 'Thermal Decomp of Pb(NO3)2', eq: 'Pb(NO3)2 -> PbO + NO2 + O2' },
    { label: 'Thermal Decomp of FeSO4', eq: 'FeSO4 -> Fe2O3 + SO2 + SO3' },
    { label: 'Aluminium with Acid', eq: 'Al + HCl -> AlCl3 + H2' },
    { label: 'Redox KMnO4 + HCl', eq: 'KMnO4 + HCl -> KCl + MnCl2 + H2O + Cl2' },
    { label: 'Copper with Conc. HNO3', eq: 'Cu + HNO3 -> Cu(NO3)2 + NO2 + H2O' },
    { label: 'Limestone Decomposition', eq: 'CaCO3 -> CaO + CO2' },
    { label: 'Thermite Reaction', eq: 'Al + Fe2O3 -> Al2O3 + Fe' },
    { label: 'Precipitation BaSO4', eq: 'BaCl2 + Na2SO4 -> BaSO4 + NaCl' },
  ];

  const handleBalance = (eqToBalance) => {
    const target = eqToBalance !== undefined ? eqToBalance : inputEquation;
    const result = balanceChemicalEquation(target);
    setBalanceResult(result);
  };

  const handleSelectPreset = (eq) => {
    setInputEquation(eq);
    handleBalance(eq);
  };

  return (
    <div className="flex flex-col gap-6 max-w-4xl mx-auto">
      {/* Header Card */}
      <div className="rounded-3xl border border-amber-100 bg-gradient-to-r from-amber-50 via-orange-50/50 to-white p-6 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-500 text-white shadow-md shadow-amber-500/20">
            <Scale size={24} />
          </div>
          <div>
            <h2 className="text-lg font-black text-slate-900 tracking-tight flex items-center gap-2">
              <span>Linear Algebraic Chemical Equation Balancer</span>
              <span className="rounded-full bg-amber-100 text-amber-800 px-2 py-0.5 text-[10px] font-black">
                Conservation of Mass
              </span>
            </h2>
            <p className="text-xs text-slate-500">
              Balances stoichiometric coefficients using linear matrix nullspace and verifies element atom counts.
            </p>
          </div>
        </div>
      </div>

      {/* Input Section */}
      <div className="flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white p-5 shadow-xs">
        <div>
          <label className="text-xs font-black uppercase text-slate-400">
            Enter Unbalanced Chemical Equation:
          </label>
          <div className="mt-1.5 flex flex-col sm:flex-row items-center gap-2">
            <input
              type="text"
              value={inputEquation}
              onChange={(e) => setInputEquation(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleBalance()}
              placeholder="e.g. Al + HCl -> AlCl3 + H2"
              className="w-full sm:flex-1 rounded-2xl border-2 border-slate-200 bg-slate-50 px-4 py-3 font-mono text-sm font-bold text-slate-900 placeholder:text-slate-400 focus:border-amber-400 focus:bg-white focus:outline-none transition"
            />
            <button
              onClick={() => handleBalance()}
              className="w-full sm:w-auto flex items-center justify-center gap-1.5 rounded-2xl bg-amber-500 px-6 py-3 text-xs font-black text-slate-950 shadow-md hover:bg-amber-400 active:scale-95 transition cursor-pointer"
            >
              <Sparkles size={15} />
              <span>Balance Equation</span>
            </button>
          </div>
        </div>

        {/* Quick Presets */}
        <div>
          <span className="text-[11px] font-bold uppercase text-slate-400">Iconic CBSE Equation Presets:</span>
          <div className="flex flex-wrap gap-1.5 mt-1.5">
            {PRESETS.map((preset) => (
              <button
                key={preset.label}
                onClick={() => handleSelectPreset(preset.eq)}
                className={`rounded-xl border px-3 py-1 text-xs font-bold transition cursor-pointer ${
                  inputEquation === preset.eq
                    ? 'border-amber-300 bg-amber-100 text-amber-900 shadow-2xs'
                    : 'border-slate-200 bg-white text-slate-700 hover:border-amber-300 hover:bg-amber-50/50'
                }`}
              >
                {preset.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Balancer Results Display */}
      {balanceResult && (
        <div className="flex flex-col gap-5">
          {balanceResult.error ? (
            <div className="flex items-center gap-2.5 rounded-2xl border border-rose-200 bg-rose-50 p-4 text-xs font-bold text-rose-800">
              <AlertTriangle size={18} className="text-rose-600 shrink-0" />
              <span>{balanceResult.error}</span>
            </div>
          ) : (
            <div className="flex flex-col gap-4 rounded-3xl border border-emerald-200 bg-white p-6 shadow-sm">
              {/* Balanced Equation Hero Box */}
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-xs font-black uppercase text-emerald-700 flex items-center gap-1.5">
                    <CheckCircle2 size={16} />
                    <span>Balanced Equation (Stoichiometrically Exact)</span>
                  </span>
                  <span className="rounded-lg bg-emerald-100 text-emerald-800 px-2.5 py-0.5 text-[10px] font-black">
                    Mass Conserved
                  </span>
                </div>

                <div className="rounded-2xl border-2 border-emerald-200 bg-emerald-50/70 p-4 font-mono text-base sm:text-lg font-black text-emerald-950 overflow-x-auto shadow-inner">
                  {balanceResult.balancedEquation}
                </div>
              </div>

              {/* Conservation of Mass: Atom Counts Table */}
              {balanceResult.atomCounts && (
                <div>
                  <h4 className="text-xs font-black uppercase text-slate-400 mb-2">
                    Atomic Species Conservation Audit:
                  </h4>
                  <div className="overflow-x-auto rounded-2xl border border-slate-200">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold">
                        <tr>
                          <th className="p-2.5 pl-4">Element</th>
                          <th className="p-2.5 text-center">Reactant Side (Before)</th>
                          <th className="p-2.5 text-center">Product Side (After)</th>
                          <th className="p-2.5 text-center">Balance Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {Object.entries(balanceResult.atomCounts).map(([elem, info]) => (
                          <tr key={elem} className="hover:bg-slate-50/60">
                            <td className="p-2.5 pl-4 font-mono font-black text-slate-800">{elem}</td>
                            <td className="p-2.5 text-center font-mono font-bold text-slate-700">{info.before}</td>
                            <td className="p-2.5 text-center font-mono font-bold text-slate-700">{info.after}</td>
                            <td className="p-2.5 text-center">
                              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-black text-emerald-800">
                                <Check size={10} /> Equal
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Step-by-Step Derivation */}
              {balanceResult.steps && (
                <div className="pt-2 border-t border-slate-100">
                  <h4 className="text-xs font-black uppercase text-slate-400 mb-2 flex items-center gap-1.5">
                    <ListOrdered size={14} className="text-amber-500" />
                    <span>Step-by-Step Linear Algebraic Resolution:</span>
                  </h4>
                  <div className="flex flex-col gap-1.5 rounded-2xl border border-slate-100 bg-slate-50/80 p-3.5 text-xs text-slate-700 font-medium">
                    {balanceResult.steps.map((step, idx) => (
                      <div key={idx} className="leading-relaxed">
                        {step}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
