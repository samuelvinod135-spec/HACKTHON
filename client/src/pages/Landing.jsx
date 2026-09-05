import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Sparkles,
  ArrowRight,
  Play,
  Flame,
  Atom,
  ChevronRight,
  Sliders,
  Check,
  Zap,
  RotateCcw,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext.jsx';

export default function Landing() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  // Mode: 'reaction' | 'pendulum' | 'optics'
  const [activeTab, setActiveTab] = useState('reaction');

  // Reaction parameters
  const [temperature, setTemperature] = useState(650); // Kelvin
  const [concentration, setConcentration] = useState(1.5); // Molar
  const [reagent, setReagent] = useState('Mg + 2HCl');

  // Pendulum parameters
  const [pendulumLength, setPendulumLength] = useState(1.4); // meters
  const [gravity, setGravity] = useState({ name: 'Earth', g: 9.8 });
  const [pendulumAngle, setPendulumAngle] = useState(0);

  // Optics parameters
  const [incidentAngle, setIncidentAngle] = useState(42); // degrees
  const [prismMaterial, setPrismMaterial] = useState({ name: 'Crown Glass', n: 1.52 });

  // Physics animation loop for pendulum
  useEffect(() => {
    let animId;
    let t0 = performance.now();
    const omega = Math.sqrt(gravity.g / pendulumLength);

    const animate = (now) => {
      const elapsed = (now - t0) / 1000;
      const angle = 30 * Math.cos(omega * elapsed) * Math.exp(-0.02 * elapsed);
      setPendulumAngle(angle);
      animId = requestAnimationFrame(animate);
    };

    animId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animId);
  }, [gravity.g, pendulumLength]);

  const handleLaunch = () => {
    if (isAuthenticated) {
      navigate('/dashboard');
    } else {
      navigate('/signup');
    }
  };

  const handleExploreLab = () => {
    navigate('/dashboard');
  };

  // Calculations
  const reactionRate = Math.round((concentration * Math.exp((temperature - 300) / 400)) * 10) / 10;
  const deltaH = reagent.includes('Mg') ? -462 : -112;

  const radIncident = (incidentAngle * Math.PI) / 180;
  const sinRefracted = Math.sin(radIncident) / prismMaterial.n;
  const refractedAngle = Math.round((Math.asin(Math.min(1, sinRefracted)) * 180) / Math.PI);

  return (
    <div className="min-h-screen bg-[#f8fbff] text-slate-800 font-sans antialiased selection:bg-yellow-200 selection:text-slate-900 overflow-x-hidden">
      {/* Radiant Background Ambience (Sky Blue & Banana Yellow Orbs) */}
      <div className="fixed top-[-15%] left-[-10%] w-[350px] sm:w-[600px] h-[350px] sm:h-[600px] bg-sky-200/40 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="fixed top-[20%] right-[-10%] w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-yellow-200/40 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="fixed bottom-[-10%] left-[20%] w-[350px] sm:w-[550px] h-[350px] sm:h-[550px] bg-sky-100/50 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* 1. TOUCH-FRIENDLY RESPONSIVE NAVBAR */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-sky-100 transition-all">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between">
          {/* Brand */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-tr from-sky-500 to-sky-400 text-white flex items-center justify-center font-black shadow-md shadow-sky-500/20 group-hover:scale-105 transition-transform">
              <span className="text-base sm:text-lg">🧪</span>
            </div>
            <div>
              <span className="text-base sm:text-lg font-black tracking-tight text-slate-900 flex items-center gap-1">
                Lab<span className="text-sky-500">Xplore</span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded-full bg-yellow-100 text-yellow-950 border border-yellow-300 ml-1">
                  3D Lab
                </span>
              </span>
              <p className="text-[10px] text-slate-400 font-medium hidden sm:block">Virtual Science Studio</p>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-8 text-slate-600 font-semibold text-sm">
            <a href="#overview" className="hover:text-sky-600 transition-colors">Overview</a>
            <a href="#precision-rig" className="hover:text-sky-600 transition-colors">Apparatus Rig</a>
            <a href="#mechanics" className="hover:text-sky-600 transition-colors">Mechanics</a>
            <a href="#architecture" className="hover:text-sky-600 transition-colors">Architecture</a>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            {isAuthenticated ? (
              <Link
                to="/dashboard"
                className="btn-yellow-primary py-2 px-4 sm:px-5 text-xs sm:text-sm"
              >
                <span>Go to Lab</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-slate-600 hover:text-sky-600 font-bold px-3 py-2 text-xs sm:text-sm transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  className="btn-yellow-primary py-2 sm:py-2.5 px-4 sm:px-6 text-xs sm:text-sm"
                >
                  <span>Start Free</span>
                  <ArrowRight className="w-3.5 h-3.5 hidden sm:inline" />
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      {/* 2. HERO SECTION */}
      <section id="overview" className="pt-10 pb-14 sm:pt-20 sm:pb-24 px-4 sm:px-6 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Eyebrow Tag */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white shadow-xs border border-sky-200 text-sky-700 font-bold text-xs uppercase tracking-wider mb-5">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            <span>Interactive 3D Physical Computing</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-3xl sm:text-6xl md:text-7xl font-black tracking-tight text-slate-900 leading-[1.12] mb-5">
            Science at your fingertips.
            <br />
            <span className="text-sky-500 font-black">Down to the atom.</span>
          </h1>

          <p className="text-sm sm:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto mb-8 sm:mb-10 font-normal px-2">
            A high-fidelity virtual laboratory engineered with empirical stoichiometry, fluid kinematics, and tactile instruments. No broken glassware. Infinite discovery.
          </p>

          {/* Responsive CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 max-w-md mx-auto sm:max-w-none mb-12 sm:mb-16">
            <button
              onClick={handleLaunch}
              className="btn-yellow-primary w-full sm:w-auto py-3.5 sm:py-4 px-6 sm:px-8 text-sm sm:text-base font-bold shadow-lg"
            >
              <span>Launch Free Student Studio</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={handleExploreLab}
              className="btn-white-glass w-full sm:w-auto py-3.5 sm:py-4 px-6 sm:px-7 text-sm sm:text-base font-bold"
            >
              <Play className="w-4 h-4 fill-sky-500 text-sky-500" />
              <span>Explore Interactive Lab</span>
            </button>
          </div>

          {/* Quick Stat Pills */}
          <div className="inline-flex flex-wrap items-center justify-center gap-3 sm:gap-6 py-2.5 px-4 sm:px-6 rounded-2xl sm:rounded-full bg-white/90 backdrop-blur-md border border-sky-100 shadow-xs text-xs font-semibold text-slate-600">
            <span className="flex items-center gap-1.5 text-sky-700 font-bold">
              <span className="w-2 h-2 rounded-full bg-sky-500 animate-ping" /> 60 FPS Numerical Engine
            </span>
            <span className="text-amber-700 font-bold bg-amber-100/80 px-2 py-0.5 rounded-full">
              50+ Empirical Reactions
            </span>
            <span className="hidden sm:inline">Snell & Harmonic Mechanics</span>
            <span className="text-emerald-700 font-bold">100% Free for Students</span>
          </div>
        </div>
      </section>

      {/* 3. THE INTERACTIVE APPARATUS STUDIO (MOBILE-FIRST PRECISION RIG) */}
      <section id="precision-rig" className="py-6 sm:py-12 px-3 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <div className="card-sky-glass p-4 sm:p-8 rounded-3xl relative overflow-hidden shadow-xl">
            {/* Header & Mode Switcher */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-sky-100">
              <div>
                <span className="text-[10px] sm:text-xs uppercase tracking-widest font-bold text-sky-600">
                  Tactile Hardware Sandbox
                </span>
                <h2 className="text-lg sm:text-2xl font-black tracking-tight text-slate-900 mt-0.5">
                  The Apparatus Studio
                </h2>
              </div>

              {/* Segmented Mode Toggle (Touch Friendly) */}
              <div className="segmented-sky-yellow grid grid-cols-3 gap-1 w-full sm:w-auto p-1">
                {[
                  { id: 'reaction', label: 'Reaction', icon: Flame },
                  { id: 'pendulum', label: 'Kinematics', icon: Atom },
                  { id: 'optics', label: 'Optics', icon: Sliders },
                ].map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center justify-center gap-1.5 py-2 px-3 text-xs transition-all min-h-[36px] ${
                        isActive
                          ? 'segmented-item-yellow-active'
                          : 'text-slate-600 hover:text-sky-700'
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                      <span className="truncate">{tab.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* TAB 1: REACTION CRUCIBLE */}
            {activeTab === 'reaction' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-6 items-center">
                {/* Visual Canvas (Col 7) */}
                <div className="lg:col-span-7 bg-[#0b192e] rounded-2xl p-4 sm:p-6 text-white relative min-h-[300px] sm:min-h-[360px] flex flex-col justify-between overflow-hidden shadow-inner border border-sky-400/20">
                  <div className="flex items-center justify-between text-[11px] font-mono text-sky-300">
                    <span className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                      CALORIMETRY #01
                    </span>
                    <span className="text-amber-300 font-bold">ΔH = {deltaH} kJ/mol</span>
                  </div>

                  {/* Reaction Core */}
                  <div className="relative my-auto py-6 sm:py-8 flex flex-col items-center justify-center">
                    <div
                      className="w-36 h-36 sm:w-44 sm:h-44 rounded-full border border-sky-400/30 flex items-center justify-center relative transition-all duration-300"
                      style={{
                        boxShadow: `0 0 ${Math.min(70, temperature / 12)}px ${
                          temperature > 800 ? 'rgba(250, 204, 21, 0.6)' : 'rgba(56, 189, 248, 0.4)'
                        }`,
                        background: `radial-gradient(circle, ${
                          temperature > 800 ? 'rgba(245, 158, 11, 0.35)' : 'rgba(14, 165, 233, 0.2)'
                        } 0%, transparent 70%)`,
                      }}
                    >
                      <div className="text-center relative z-10 px-2">
                        <Flame
                          className={`mx-auto transition-all ${
                            temperature > 800
                              ? 'w-14 h-14 sm:w-16 sm:h-16 text-amber-400 animate-flicker drop-shadow-[0_0_16px_#f59e0b]'
                              : 'w-10 h-10 sm:w-12 sm:h-12 text-sky-300 animate-pulse'
                          }`}
                        />
                        <p className="font-mono text-xs text-white font-bold mt-1.5">
                          {reagent}
                        </p>
                        <p className="text-[10px] text-sky-300 font-mono">
                          Rate: {reactionRate} mol·L⁻¹s⁻¹
                        </p>
                      </div>

                      {[...Array(6)].map((_, i) => (
                        <div
                          key={i}
                          className="absolute w-1.5 h-1.5 rounded-full bg-amber-300/80 animate-ping"
                          style={{
                            top: `${20 + (i * 12)}%`,
                            left: `${25 + (i * 10)}%`,
                            animationDuration: `${1.2 - (temperature / 1600)}s`,
                          }}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Telemetry Footer */}
                  <div className="grid grid-cols-3 gap-1 sm:gap-2 pt-3 border-t border-sky-400/20 text-center font-mono text-[10px] sm:text-[11px]">
                    <div>
                      <span className="text-sky-300 block">TEMPERATURE</span>
                      <span className="text-amber-300 font-bold">{temperature} K</span>
                    </div>
                    <div>
                      <span className="text-sky-300 block">CONCENTRATION</span>
                      <span className="text-white font-bold">{concentration} M</span>
                    </div>
                    <div>
                      <span className="text-sky-300 block">STATUS</span>
                      <span className="text-emerald-400 font-bold">Exothermic</span>
                    </div>
                  </div>
                </div>

                {/* Control Panel (Col 5) */}
                <div className="lg:col-span-5 space-y-4 sm:space-y-5">
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
                      Thermodynamics & Kinetics
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                      Drag sliders to inspect Arrhenius reaction rates and temperature-dependent energy release.
                    </p>
                  </div>

                  {/* Touch Sliders */}
                  <div className="space-y-4 bg-sky-50/70 p-4 sm:p-5 rounded-2xl border border-sky-100">
                    <div>
                      <div className="flex justify-between text-xs font-bold text-slate-700 mb-2">
                        <span>Chamber Temperature</span>
                        <span className="font-mono text-sky-600 bg-white px-2 py-0.5 rounded-md border border-sky-200">
                          {temperature} K
                        </span>
                      </div>
                      <input
                        type="range"
                        min="298"
                        max="1400"
                        step="10"
                        value={temperature}
                        onChange={(e) => setTemperature(Number(e.target.value))}
                        className="slider-sky-yellow"
                      />
                      <div className="flex justify-between text-[10px] text-slate-400 font-mono mt-1">
                        <span>298 K (Room Temp)</span>
                        <span>1400 K (Furnace)</span>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs font-bold text-slate-700 mb-2">
                        <span>Solute Concentration</span>
                        <span className="font-mono text-sky-600 bg-white px-2 py-0.5 rounded-md border border-sky-200">
                          {concentration} M
                        </span>
                      </div>
                      <input
                        type="range"
                        min="0.1"
                        max="3.0"
                        step="0.1"
                        value={concentration}
                        onChange={(e) => setConcentration(Number(e.target.value))}
                        className="slider-sky-yellow"
                      />
                      <div className="flex justify-between text-[10px] text-slate-400 font-mono mt-1">
                        <span>0.1 M (Dilute)</span>
                        <span>3.0 M (Saturated)</span>
                      </div>
                    </div>
                  </div>

                  {/* Reagent Selector */}
                  <div>
                    <span className="text-xs font-bold text-slate-700 block mb-2">
                      Chemical Reagent Preset
                    </span>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        { name: 'Mg + 2HCl', desc: 'Magnesium Oxidation' },
                        { name: 'CuSO₄ + Fe', desc: 'Single Displacement' },
                        { name: 'NaOH + HCl', desc: 'Neutralization' },
                        { name: 'CaCO₃ + Heat', desc: 'Decomposition' },
                      ].map((item) => (
                        <button
                          key={item.name}
                          onClick={() => setReagent(item.name)}
                          className={`p-2 sm:p-2.5 rounded-xl text-left transition-all border ${
                            reagent === item.name
                              ? 'bg-sky-500 text-white border-sky-500 shadow-sm'
                              : 'bg-white text-slate-700 border-sky-100 hover:border-sky-300'
                          }`}
                        >
                          <p className="text-xs font-bold font-mono truncate">{item.name}</p>
                          <p className={`text-[10px] truncate ${reagent === item.name ? 'text-sky-100' : 'text-slate-400'}`}>
                            {item.desc}
                          </p>
                        </button>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => navigate('/chemistry')}
                    className="w-full btn-yellow-primary py-3 text-xs font-bold flex items-center justify-center gap-2"
                  >
                    <span>Launch Full Chemistry Simulation →</span>
                  </button>
                </div>
              </div>
            )}

            {/* TAB 2: KINEMATIC PENDULUM */}
            {activeTab === 'pendulum' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-6 items-center">
                <div className="lg:col-span-7 bg-[#0b192e] rounded-2xl p-4 sm:p-6 text-white relative min-h-[300px] sm:min-h-[360px] flex flex-col justify-between overflow-hidden shadow-inner border border-sky-400/20">
                  <div className="flex items-center justify-between text-[11px] font-mono text-sky-300">
                    <span className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
                      KINEMATICS RIG #02
                    </span>
                    <span className="text-amber-300 font-bold">g = {gravity.g} m/s² ({gravity.name})</span>
                  </div>

                  <div className="relative my-auto flex items-center justify-center h-52 sm:h-64">
                    <svg className="w-full h-full" viewBox="-150 -20 300 240">
                      <line x1="-40" y1="0" x2="40" y2="0" stroke="#94a3b8" strokeWidth="4" />
                      <circle cx="0" cy="0" r="5" fill="#facc15" />

                      {(() => {
                        const len = pendulumLength * 75;
                        const rad = (pendulumAngle * Math.PI) / 180;
                        const bx = len * Math.sin(rad);
                        const by = len * Math.cos(rad);
                        return (
                          <g>
                            <line
                              x1="0"
                              y1="0"
                              x2={bx}
                              y2={by}
                              stroke="rgba(255,255,255,0.75)"
                              strokeWidth="2.5"
                            />
                            <circle
                              cx={bx}
                              cy={by}
                              r="16"
                              fill="#38bdf8"
                              className="filter drop-shadow-[0_0_12px_#0ea5e9]"
                            />
                            <circle cx={bx} cy={by} r="4" fill="#ffffff" />
                          </g>
                        );
                      })()}
                    </svg>
                  </div>

                  <div className="grid grid-cols-3 gap-1 sm:gap-2 pt-3 border-t border-sky-400/20 text-center font-mono text-[10px] sm:text-[11px]">
                    <div>
                      <span className="text-sky-300 block">ROD LENGTH</span>
                      <span className="text-white font-bold">{pendulumLength} m</span>
                    </div>
                    <div>
                      <span className="text-sky-300 block">PERIOD (T)</span>
                      <span className="text-amber-300 font-bold">
                        {(2 * Math.PI * Math.sqrt(pendulumLength / gravity.g)).toFixed(2)} s
                      </span>
                    </div>
                    <div>
                      <span className="text-sky-300 block">ANGLE</span>
                      <span className="text-emerald-400 font-bold">{pendulumAngle.toFixed(1)}°</span>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-5 space-y-4 sm:space-y-5">
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
                      Harmonic Motion & Gravitation
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                      Observe how gravitational field strength alters oscillation period $T = 2\pi\sqrt{'{L/g}'}$.
                    </p>
                  </div>

                  <div className="space-y-4 bg-sky-50/70 p-4 sm:p-5 rounded-2xl border border-sky-100">
                    <div>
                      <div className="flex justify-between text-xs font-bold text-slate-700 mb-2">
                        <span>Rod Length</span>
                        <span className="font-mono text-sky-600 bg-white px-2 py-0.5 rounded-md border border-sky-200">
                          {pendulumLength} m
                        </span>
                      </div>
                      <input
                        type="range"
                        min="0.5"
                        max="2.5"
                        step="0.1"
                        value={pendulumLength}
                        onChange={(e) => setPendulumLength(Number(e.target.value))}
                        className="slider-sky-yellow"
                      />
                      <div className="flex justify-between text-[10px] text-slate-400 font-mono mt-1">
                        <span>0.5 m (Rapid)</span>
                        <span>2.5 m (Slow)</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <span className="text-xs font-bold text-slate-700 block mb-2">
                      Celestial Gravitational Field
                    </span>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        { name: 'Moon', g: 1.62, desc: 'Low G' },
                        { name: 'Earth', g: 9.81, desc: 'Standard 1.0 G' },
                        { name: 'Mars', g: 3.72, desc: 'Martian G' },
                        { name: 'Jupiter', g: 24.79, desc: 'Extreme High G' },
                      ].map((planet) => (
                        <button
                          key={planet.name}
                          onClick={() => setGravity({ name: planet.name, g: planet.g })}
                          className={`p-2 sm:p-2.5 rounded-xl text-left transition-all border ${
                            gravity.name === planet.name
                              ? 'bg-sky-500 text-white border-sky-500 shadow-sm'
                              : 'bg-white text-slate-700 border-sky-100 hover:border-sky-300'
                          }`}
                        >
                          <p className="text-xs font-bold font-mono">{planet.name} ({planet.g})</p>
                          <p className={`text-[10px] truncate ${gravity.name === planet.name ? 'text-sky-100' : 'text-slate-400'}`}>
                            {planet.desc}
                          </p>
                        </button>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => navigate('/physics')}
                    className="w-full btn-yellow-primary py-3 text-xs font-bold flex items-center justify-center gap-2"
                  >
                    <span>Launch Physics Sandbox →</span>
                  </button>
                </div>
              </div>
            )}

            {/* TAB 3: OPTICS */}
            {activeTab === 'optics' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-6 items-center">
                <div className="lg:col-span-7 bg-[#0b192e] rounded-2xl p-4 sm:p-6 text-white relative min-h-[300px] sm:min-h-[360px] flex flex-col justify-between overflow-hidden shadow-inner border border-sky-400/20">
                  <div className="flex items-center justify-between text-[11px] font-mono text-sky-300">
                    <span className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                      SPECTRAL OPTICS #03
                    </span>
                    <span className="text-amber-300 font-bold">n = {prismMaterial.n} ({prismMaterial.name})</span>
                  </div>

                  <div className="relative my-auto flex items-center justify-center h-52 sm:h-64">
                    <svg className="w-full h-full" viewBox="0 0 320 220">
                      <polygon
                        points="160,35 250,185 70,185"
                        fill="rgba(56,189,248,0.12)"
                        stroke="#38bdf8"
                        strokeWidth="2"
                      />
                      <line
                        x1="20"
                        y1={130 - (incidentAngle * 0.8)}
                        x2="115"
                        y2="120"
                        stroke="#ffffff"
                        strokeWidth="3.5"
                        strokeLinecap="round"
                      />
                      <line x1="115" y1="120" x2="190" y2="135" stroke="rgba(255,255,255,0.8)" strokeWidth="2" />
                      <line x1="190" y1="135" x2="300" y2="120" stroke="#ef4444" strokeWidth="2.5" />
                      <line x1="190" y1="135" x2="300" y2="135" stroke="#f59e0b" strokeWidth="2.5" />
                      <line x1="190" y1="135" x2="300" y2="150" stroke="#10b981" strokeWidth="2.5" />
                      <line x1="190" y1="135" x2="300" y2="165" stroke="#0ea5e9" strokeWidth="2.5" />
                      <line x1="190" y1="135" x2="300" y2="180" stroke="#8b5cf6" strokeWidth="2.5" />
                    </svg>
                  </div>

                  <div className="grid grid-cols-3 gap-1 sm:gap-2 pt-3 border-t border-sky-400/20 text-center font-mono text-[10px] sm:text-[11px]">
                    <div>
                      <span className="text-sky-300 block">INCIDENT (θ₁)</span>
                      <span className="text-white font-bold">{incidentAngle}°</span>
                    </div>
                    <div>
                      <span className="text-sky-300 block">REFRACTED (θ₂)</span>
                      <span className="text-amber-300 font-bold">{refractedAngle}°</span>
                    </div>
                    <div>
                      <span className="text-sky-300 block">DISPERSION</span>
                      <span className="text-emerald-400 font-bold">Rainbow Spectrum</span>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-5 space-y-4 sm:space-y-5">
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
                      Snell's Law & Rainbow Dispersion
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                      Tune incident beam angle to observe critical internal reflection and spectral separation of visible light.
                    </p>
                  </div>

                  <div className="space-y-4 bg-sky-50/70 p-4 sm:p-5 rounded-2xl border border-sky-100">
                    <div>
                      <div className="flex justify-between text-xs font-bold text-slate-700 mb-2">
                        <span>Incident Ray Angle</span>
                        <span className="font-mono text-sky-600 bg-white px-2 py-0.5 rounded-md border border-sky-200">
                          {incidentAngle}°
                        </span>
                      </div>
                      <input
                        type="range"
                        min="15"
                        max="75"
                        step="1"
                        value={incidentAngle}
                        onChange={(e) => setIncidentAngle(Number(e.target.value))}
                        className="slider-sky-yellow"
                      />
                      <div className="flex justify-between text-[10px] text-slate-400 font-mono mt-1">
                        <span>15° (Shallow)</span>
                        <span>75° (Steep)</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <span className="text-xs font-bold text-slate-700 block mb-2">
                      Prism Optical Medium
                    </span>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        { name: 'Crown Glass', n: 1.52, desc: 'Optical lens' },
                        { name: 'Flint Glass', n: 1.66, desc: 'High dispersion' },
                        { name: 'Sapphire', n: 1.77, desc: 'Crystalline' },
                        { name: 'Diamond', n: 2.42, desc: 'Max brilliance' },
                      ].map((item) => (
                        <button
                          key={item.name}
                          onClick={() => setPrismMaterial({ name: item.name, n: item.n })}
                          className={`p-2 sm:p-2.5 rounded-xl text-left transition-all border ${
                            prismMaterial.name === item.name
                              ? 'bg-sky-500 text-white border-sky-500 shadow-sm'
                              : 'bg-white text-slate-700 border-sky-100 hover:border-sky-300'
                          }`}
                        >
                          <p className="text-xs font-bold font-mono">{item.name} (n={item.n})</p>
                          <p className={`text-[10px] truncate ${prismMaterial.name === item.name ? 'text-sky-100' : 'text-slate-400'}`}>
                            {item.desc}
                          </p>
                        </button>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={handleLaunch}
                    className="w-full btn-yellow-primary py-3 text-xs font-bold flex items-center justify-center gap-2"
                  >
                    <span>Start Experimenting with Optics →</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 4. ASYMMETRIC BENTO GRID (WHITE + SKY BLUE + YELLOW) */}
      <section id="mechanics" className="py-12 sm:py-20 px-4 sm:px-6 max-w-6xl mx-auto">
        <div className="mb-10 sm:mb-14 text-center max-w-2xl mx-auto">
          <span className="text-xs uppercase tracking-widest font-bold text-sky-600 bg-sky-50 border border-sky-200 px-3 py-1 rounded-full">
            Scientific Capabilities
          </span>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-black tracking-tight text-slate-900 mt-3">
            Form follows physics.
          </h2>
          <p className="text-slate-500 text-xs sm:text-base mt-2 font-normal">
            Precision simulations built on genuine empirical chemistry, 60 FPS physics integration, and tactile 3D assets.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-6">
          {/* Card 1: Reaction Engine (Span 7) */}
          <div className="md:col-span-7 card-sky-glass p-6 sm:p-8 rounded-3xl flex flex-col justify-between group">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] font-mono text-sky-600 uppercase font-bold tracking-wider">
                  Engine #01 · Chemistry
                </span>
                <span className="text-xs font-bold text-amber-900 px-2.5 py-0.5 rounded-full bg-amber-100 border border-amber-300">
                  Stoichiometric Precision
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight mb-2">
                Empirical Chemical Reactions
              </h3>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-6">
                Calculate real precipitate mass, track thermal waveforms, and witness gas evolutions with true molecular balancing.
              </p>
            </div>

            <div className="bg-sky-50/80 rounded-2xl p-4 flex items-center justify-between border border-sky-100">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-white shadow-xs border border-sky-100 flex items-center justify-center">
                  <img src="/clay/flask.jpg" alt="Beaker" className="w-8 h-8 object-contain rounded-lg" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900 font-mono">2Mg + O₂ → 2MgO</p>
                  <p className="text-[11px] text-sky-600 font-mono font-semibold">ΔH = -601.6 kJ/mol</p>
                </div>
              </div>
              <Link
                to="/chemistry"
                className="btn-yellow-primary py-1.5 px-3.5 text-xs font-bold"
              >
                Launch <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Card 2: Kinematics (Span 5) */}
          <div className="md:col-span-5 card-sky-glass p-6 sm:p-8 rounded-3xl flex flex-col justify-between group">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] font-mono text-sky-600 uppercase font-bold tracking-wider">
                  Engine #02 · Physics
                </span>
                <span className="text-xs font-bold text-sky-700 px-2.5 py-0.5 rounded-full bg-sky-100 border border-sky-200">
                  60 FPS Kinematics
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight mb-2">
                Harmonic Motion
              </h3>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-6">
                Oscillate pendulums, simulate gravity shifts across moons and planets, and measure phase space vectors.
              </p>
            </div>

            <div className="bg-sky-50/80 rounded-2xl p-4 flex items-center justify-between border border-sky-100">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-white shadow-xs border border-sky-100 flex items-center justify-center">
                  <img src="/clay/cradle.jpg" alt="Cradle" className="w-8 h-8 object-contain rounded-lg" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900">Newton's Cradle</p>
                  <p className="text-[11px] text-slate-500 font-mono">Momentum Transfer</p>
                </div>
              </div>
              <Link
                to="/physics"
                className="btn-yellow-primary py-1.5 px-3.5 text-xs font-bold"
              >
                Launch <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Card 3: Apparatus Rig (Span 4) */}
          <div className="md:col-span-4 card-sky-glass p-5 sm:p-6 rounded-3xl flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-mono text-sky-600 uppercase tracking-wider font-bold block mb-1">
                Instrument #03
              </span>
              <h4 className="text-base sm:text-lg font-bold text-slate-900 mb-1">
                Authentic Apparatus
              </h4>
              <p className="text-xs text-slate-500 leading-relaxed mb-4">
                Step-by-step crucible setups, Bunsen burner collar adjustments, and safe procedures.
              </p>
            </div>
            <div className="h-28 rounded-2xl overflow-hidden bg-sky-50/50 border border-sky-100 flex items-center justify-center p-2">
              <img src="/clay/apparatus.jpg" alt="Apparatus" className="h-full object-contain" />
            </div>
          </div>

          {/* Card 4: Daily Challenges & XP (Span 4) */}
          <div className="md:col-span-4 card-sky-glass p-5 sm:p-6 rounded-3xl flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-mono text-sky-600 uppercase tracking-wider font-bold block mb-1">
                Mastery #04
              </span>
              <h4 className="text-base sm:text-lg font-bold text-slate-900 mb-1">
                Research Telemetry
              </h4>
              <p className="text-xs text-slate-500 leading-relaxed mb-4">
                Climb levels from Student Novice to Lab Master with XP synced directly to Supabase cloud.
              </p>
            </div>
            <div className="bg-sky-50/80 p-3.5 rounded-2xl border border-sky-100 text-xs font-mono">
              <div className="flex justify-between font-bold text-slate-900 mb-1.5">
                <span>Student Level 13</span>
                <span className="text-amber-600 font-bold">4,250 / 6,000 XP</span>
              </div>
              <div className="h-2.5 bg-sky-100 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-sky-500 to-amber-400 rounded-full w-[70%]" />
              </div>
            </div>
          </div>

          {/* Card 5: Safe Learning (Span 4) */}
          <div className="md:col-span-4 card-sky-glass p-5 sm:p-6 rounded-3xl flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-mono text-sky-600 uppercase tracking-wider font-bold block mb-1">
                Curriculum #05
              </span>
              <h4 className="text-base sm:text-lg font-bold text-slate-900 mb-1">
                NGSS & STEM Aligned
              </h4>
              <p className="text-xs text-slate-500 leading-relaxed mb-4">
                Zero hazardous vapor, zero shattered glass. Pure tactile scientific exploration for classrooms.
              </p>
            </div>
            <div className="flex items-center justify-between text-xs font-bold text-sky-800 bg-sky-100/70 p-3 rounded-2xl border border-sky-200">
              <span>Grade 6–12 & AP Ready</span>
              <Check className="w-4 h-4 text-emerald-600" />
            </div>
          </div>
        </div>
      </section>

      {/* 5. CALL TO ACTION */}
      <section className="py-14 sm:py-20 px-4 sm:px-6 text-center">
        <div className="max-w-3xl mx-auto card-sky-glass p-8 sm:p-14 rounded-3xl border-2 border-sky-200 shadow-xl bg-gradient-to-b from-white to-sky-50/60">
          <span className="w-10 h-10 rounded-full bg-[#ffe135] text-slate-950 flex items-center justify-center font-black mx-auto mb-3 shadow-md shadow-yellow-400/40 text-lg">
            ✦
          </span>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-black tracking-tight text-slate-900 mb-3">
            Step into the studio today.
          </h2>
          <p className="text-slate-600 text-xs sm:text-base font-normal max-w-lg mx-auto mb-8 leading-relaxed">
            Create your verified student ID in under 30 seconds, or dive directly into the interactive laboratory.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 max-w-sm sm:max-w-none mx-auto">
            <Link
              to="/signup"
              className="btn-yellow-primary w-full sm:w-auto py-3.5 sm:py-4 px-8 text-sm font-bold shadow-lg"
            >
              Create Free Student ID
            </Link>
            <button
              onClick={handleExploreLab}
              className="btn-white-glass w-full sm:w-auto py-3.5 sm:py-4 px-7 text-sm font-bold"
            >
              Explore Interactive Lab
            </button>
          </div>
        </div>
      </section>

      {/* 6. MINIMALIST FOOTER */}
      <footer className="bg-white border-t border-sky-100 py-10 px-4 sm:px-6 text-xs text-slate-500">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-5 text-center md:text-left">
          <div className="flex items-center gap-2 font-bold text-slate-800">
            <span className="text-sm text-sky-600">LabXplore Studio</span>
            <span className="text-slate-300">|</span>
            <span className="text-slate-500 font-normal">Tactile 3D Physical Computing</span>
          </div>

          <div className="flex flex-wrap justify-center gap-4 sm:gap-6 text-[11px] font-semibold text-slate-600">
            <Link to="/chemistry" className="hover:text-sky-600 transition-colors">Chemistry Studio</Link>
            <Link to="/physics" className="hover:text-sky-600 transition-colors">Physics Sandbox</Link>
            <Link to="/login" className="hover:text-sky-600 transition-colors">Sign In</Link>
            <Link to="/signup" className="hover:text-sky-600 transition-colors">Register</Link>
          </div>

          <p className="text-[11px] text-slate-400">
            © {new Date().getFullYear()} LabXplore Systems. White, Sky Blue & Banana Yellow Edition.
          </p>
        </div>
      </footer>
    </div>
  );
}
