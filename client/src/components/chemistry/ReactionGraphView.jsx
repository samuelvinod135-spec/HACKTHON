import React, { useState } from 'react';
import {
  Network,
  ArrowRight,
  Sparkles,
  FlaskConical,
  CheckCircle2,
  HelpCircle,
  Flame,
  Layers
} from 'lucide-react';

export default function ReactionGraphView({ onRunInLab }) {
  const [activePathway, setActivePathway] = useState('aliphatic');
  const [selectedStep, setSelectedStep] = useState(null);

  const PATHWAYS = {
    aliphatic: {
      title: 'Aliphatic Synthesis Chain: Alkane to Esters & Soaps',
      description: 'The canonical aliphatic conversion sequence widely tested in CBSE Class 11 and 12 organic chemistry.',
      nodes: [
        { id: 'alkane', title: 'Alkane (e.g. Ethane)', formula: 'CH3-CH3', color: 'from-slate-700 to-slate-800' },
        { id: 'haloalkane', title: 'Haloalkane (Chloroethane)', formula: 'CH3-CH2-Cl', color: 'from-sky-600 to-blue-700' },
        { id: 'alcohol', title: 'Alcohol (Ethanol)', formula: 'CH3-CH2-OH', color: 'from-emerald-600 to-teal-700' },
        { id: 'aldehyde', title: 'Aldehyde (Ethanal)', formula: 'CH3-CH=O', color: 'from-amber-600 to-orange-700' },
        { id: 'acid', title: 'Carboxylic Acid (Ethanoic)', formula: 'CH3-COOH', color: 'from-rose-600 to-pink-700' },
        { id: 'ester', title: 'Ester (Ethyl Ethanoate)', formula: 'CH3-COO-C2H5', color: 'from-purple-600 to-indigo-700' },
      ],
      steps: [
        {
          from: 'Alkane (CH3-CH3)',
          to: 'Haloalkane (CH3-CH2-Cl)',
          reagent: 'Cl₂ / Diffused Sunlight (hν)',
          reactionType: 'Free Radical Substitution',
          equation: 'CH₃-CH₃ + Cl₂ ──(hν)──► CH₃-CH₂-Cl + HCl',
          notes: 'Requires diffused sunlight to prevent explosive poly-chlorination; homolytic cleavage creates chlorine radicals.'
        },
        {
          from: 'Haloalkane (CH3-CH2-Cl)',
          to: 'Alcohol (CH3-CH2-OH)',
          reagent: 'Aqueous KOH (Δ)',
          reactionType: 'Nucleophilic Substitution (SN2)',
          equation: 'CH₃-CH₂-Cl + aq. KOH ──(Δ)──► CH₃-CH₂-OH + KCl',
          notes: 'Aqueous KOH provides OH⁻ nucleophile; alcoholic KOH would instead trigger dehydrohalogenation elimination to ethene!'
        },
        {
          from: 'Alcohol (CH3-CH2-OH)',
          to: 'Aldehyde (CH3-CH=O)',
          reagent: 'Pyridinium Chlorochromate (PCC)',
          reactionType: 'Controlled Oxidation',
          equation: 'CH₃-CH₂-OH ──(PCC in CH₂Cl₂)──► CH₃-CHO + H₂O',
          notes: 'PCC halts oxidation cleanly at the aldehyde stage. Acidified KMnO₄ or K₂Cr₂O₇ would over-oxidize directly to acetic acid.'
        },
        {
          from: 'Aldehyde (CH3-CHO)',
          to: 'Carboxylic Acid (CH3-COOH)',
          reagent: 'Tollen\'s Reagent / Jones Reagent / dil. HNO3',
          reactionType: 'Oxidation',
          equation: 'CH₃-CHO + [O] ──(K₂Cr₂O₇ / H₂SO₄)──► CH₃-COOH',
          notes: 'Aldehydes are easily oxidized even by mild reagents like Ammoniacal AgNO₃ (Tollen\'s test silver mirror).'
        },
        {
          from: 'Carboxylic Acid (CH3-COOH)',
          to: 'Ester (CH3-COO-C2H5)',
          reagent: 'C₂H₅OH + conc. H₂SO₄ (Δ)',
          reactionType: 'Fischer Esterification',
          equation: 'CH₃-COOH + C₂H₅OH ──(conc. H₂SO₄, Δ)──► CH₃-COOC₂H₅ + H₂O',
          notes: 'Reversible condensation; concentrated H₂SO₄ acts as catalyst and absorbs water, driving equilibrium forward.'
        },
      ]
    },
    aromatic: {
      title: 'Aromatic Conversion Roadmap: Benzene to Azo Dyes',
      description: 'High-yield multistep conversions starting from Benzene to Nitrobenzene, Aniline, Diazonium salts, and dyes.',
      nodes: [
        { id: 'benzene', title: 'Benzene', formula: 'C6H6', color: 'from-slate-700 to-slate-800' },
        { id: 'nitrobenzene', title: 'Nitrobenzene', formula: 'C6H5-NO2', color: 'from-amber-600 to-yellow-700' },
        { id: 'aniline', title: 'Aniline', formula: 'C6H5-NH2', color: 'from-indigo-600 to-blue-700' },
        { id: 'diazonium', title: 'Diazonium Chloride', formula: 'C6H5-N2⁺Cl⁻', color: 'from-rose-600 to-pink-700' },
        { id: 'azodye', title: 'Azo Dye (p-Hydroxyazobenzene)', formula: 'C6H5-N=N-C6H4-OH', color: 'from-red-600 to-rose-700' },
      ],
      steps: [
        {
          from: 'Benzene',
          to: 'Nitrobenzene',
          reagent: 'conc. HNO₃ + conc. H₂SO₄ (323-333 K)',
          reactionType: 'Electrophilic Aromatic Substitution (Nitration)',
          equation: 'C₆H₆ + HNO₃ ──(conc. H₂SO₄, 330 K)──► C₆H₅-NO₂ + H₂O',
          notes: 'H₂SO₄ protonates HNO₃ generating the active electrophile nitronium ion (NO₂⁺).'
        },
        {
          from: 'Nitrobenzene',
          to: 'Aniline',
          reagent: 'Fe + conc. HCl (followed by NaOH)',
          reactionType: 'Reduction of Nitro Group',
          equation: 'C₆H₅-NO₂ + 6 [H] ──(Fe/HCl)──► C₆H₅-NH₂ + 2 H₂O',
          notes: 'Preferred industrially over Sn/HCl because FeCl₂ produced hydrolyzes to regenerate HCl, requiring only scrap iron.'
        },
        {
          from: 'Aniline',
          to: 'Diazonium Chloride',
          reagent: 'NaNO₂ + 2 HCl (0 - 5 °C / 273 - 278 K)',
          reactionType: 'Diazotization',
          equation: 'C₆H₅-NH₂ + NaNO₂ + 2 HCl ──(0-5 °C)──► C₆H₅-N₂⁺Cl⁻ + NaCl + 2 H₂O',
          notes: 'Must be maintained strictly below 5 °C; above 5 °C, diazonium hydrolyzes violently with water to phenol releasing N₂.'
        },
        {
          from: 'Diazonium Chloride',
          to: 'Azo Dye (p-Hydroxyazobenzene)',
          reagent: 'Phenol in alkaline NaOH (pH 9-10)',
          reactionType: 'Electrophilic Azo Coupling',
          equation: 'C₆H₅-N₂⁺Cl⁻ + C₆H₅-OH ──(OH⁻, 273 K)──► C₆H₅-N=N-C₆H₄-OH (Orange Dye) + Cl⁻',
          notes: 'Phenoxide ion is strongly activating; electrophilic diazonium cation attacks exclusively at the para position.'
        }
      ]
    },
    alkene: {
      title: 'Alkene to Carbonyls: Addition, Hydration & Ozonolysis',
      description: 'Crucial electrophilic additions obeying Markownikoff and anti-Markownikoff rules.',
      nodes: [
        { id: 'propene', title: 'Propene', formula: 'CH3-CH=CH2', color: 'from-emerald-700 to-green-800' },
        { id: 'halopropane', title: '2-Bromopropane', formula: 'CH3-CH(Br)-CH3', color: 'from-blue-600 to-indigo-700' },
        { id: 'isopropanol', title: 'Propan-2-ol', formula: 'CH3-CH(OH)-CH3', color: 'from-teal-600 to-emerald-700' },
        { id: 'acetone', title: 'Acetone (Propan-2-one)', formula: 'CH3-CO-CH3', color: 'from-purple-600 to-pink-700' },
      ],
      steps: [
        {
          from: 'Propene',
          to: '2-Bromopropane',
          reagent: 'HBr gas (without peroxide)',
          reactionType: 'Electrophilic Addition (Markownikoff)',
          equation: 'CH₃-CH=CH₂ + HBr ──► CH₃-CH(Br)-CH₃',
          notes: 'Proton adds to terminal carbon forming more stable 2° secondary carbocation (Markownikoff rule).'
        },
        {
          from: '2-Bromopropane',
          to: 'Propan-2-ol',
          reagent: 'Aqueous KOH (Δ)',
          reactionType: 'Nucleophilic Substitution',
          equation: 'CH₃-CH(Br)-CH₃ + aq. KOH ──► CH₃-CH(OH)-CH₃ + KBr',
          notes: 'Hydroxide ion displaces bromide leaving group yielding secondary alcohol.'
        },
        {
          from: 'Propan-2-ol',
          to: 'Acetone (Propan-2-one)',
          reagent: 'Acidified K₂Cr₂O₇ or Cu at 573 K',
          reactionType: 'Dehydrogenation / Oxidation',
          equation: 'CH₃-CH(OH)-CH₃ ──(Cu, 573 K)──► CH₃-CO-CH₃ + H₂↑',
          notes: 'Hot copper dehydrogenates 2° alcohol smoothly to ketone without risk of C-C bond cleavage.'
        }
      ]
    }
  };

  const currentRoadmap = PATHWAYS[activePathway];

  return (
    <div className="flex flex-col gap-6 max-w-5xl mx-auto">
      {/* Header Banner */}
      <div className="rounded-3xl border border-violet-100 bg-gradient-to-r from-violet-50 via-purple-50/50 to-white p-6 shadow-xs">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-600 text-white shadow-md shadow-violet-500/20">
              <Network size={24} />
            </div>
            <div>
              <h2 className="text-lg font-black text-slate-900 tracking-tight flex items-center gap-2">
                <span>Reaction Graph & Synthesis Pathways</span>
                <span className="rounded-full bg-violet-100 text-violet-800 px-2.5 py-0.5 text-[10px] font-black">
                  Multistep Conversions
                </span>
              </h2>
              <p className="text-xs text-slate-500">
                Interactive roadmaps for organic conversion pathways and board exam synthesis questions.
              </p>
            </div>
          </div>

          {/* Pathway Selector Tabs */}
          <div className="flex items-center gap-1.5 rounded-2xl border border-violet-200 bg-white p-1 shadow-2xs">
            <button
              onClick={() => {
                setActivePathway('aliphatic');
                setSelectedStep(null);
              }}
              className={`rounded-xl px-3 py-1.5 text-xs font-black transition cursor-pointer ${
                activePathway === 'aliphatic'
                  ? 'bg-violet-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Aliphatic Chain
            </button>
            <button
              onClick={() => {
                setActivePathway('aromatic');
                setSelectedStep(null);
              }}
              className={`rounded-xl px-3 py-1.5 text-xs font-black transition cursor-pointer ${
                activePathway === 'aromatic'
                  ? 'bg-violet-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Aromatic Roadmap
            </button>
            <button
              onClick={() => {
                setActivePathway('alkene');
                setSelectedStep(null);
              }}
              className={`rounded-xl px-3 py-1.5 text-xs font-black transition cursor-pointer ${
                activePathway === 'alkene'
                  ? 'bg-violet-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Alkene Additions
            </button>
          </div>
        </div>
      </div>

      {/* Pathway Overview Card */}
      <div className="flex flex-col gap-5 rounded-3xl border border-slate-200 bg-white p-6 shadow-xs">
        <div>
          <h3 className="text-base font-black text-slate-900 tracking-tight">
            {currentRoadmap.title}
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            {currentRoadmap.description}
          </p>
        </div>

        {/* Visual Graph Nodes Flow */}
        <div className="flex flex-wrap items-center justify-start gap-2 sm:gap-3 p-4 rounded-2xl border border-slate-100 bg-slate-50/70 overflow-x-auto">
          {currentRoadmap.nodes.map((node, idx) => (
            <React.Fragment key={node.id}>
              <div
                className={`flex flex-col items-center justify-center rounded-2xl bg-gradient-to-br ${node.color} p-3 sm:p-4 text-white shadow-md min-w-[130px] text-center`}
              >
                <span className="text-[11px] font-black">{node.title}</span>
                <span className="mt-1 font-mono text-[10px] text-white/80 bg-white/10 px-2 py-0.5 rounded-md">
                  {node.formula}
                </span>
              </div>

              {idx < currentRoadmap.nodes.length - 1 && (
                <div className="flex flex-col items-center text-slate-400 shrink-0">
                  <ArrowRight size={18} className="text-violet-500" />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Step-by-Step Conversion Reactions Table */}
        <div className="flex flex-col gap-3">
          <h4 className="text-xs font-black uppercase text-slate-400">
            Conversion Steps & Reagent Selectivity ({currentRoadmap.steps.length} Steps)
          </h4>

          <div className="grid grid-cols-1 gap-3">
            {currentRoadmap.steps.map((step, idx) => (
              <div
                key={idx}
                className="flex flex-col gap-2 rounded-2xl border border-slate-200/80 bg-white p-4 shadow-xs hover:border-violet-300 transition"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-violet-600 text-xs font-black text-white">
                      {idx + 1}
                    </span>
                    <span className="text-xs font-black text-slate-900">
                      {step.from} ➔ {step.to}
                    </span>
                  </div>

                  <span className="rounded-lg bg-violet-100 text-violet-800 px-2.5 py-0.5 text-[10px] font-bold">
                    {step.reactionType}
                  </span>
                </div>

                {/* Equation Box */}
                <div className="rounded-xl border border-violet-100 bg-violet-50/50 p-2.5 font-mono text-xs font-bold text-violet-950 overflow-x-auto">
                  {step.equation}
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-slate-600 pt-1">
                  <div>
                    <strong className="text-slate-800">Reagents:</strong> {step.reagent}
                  </div>
                  <div className="text-[11px] text-slate-500 italic max-w-md">
                    {step.notes}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
