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
  Camera,
  BookOpen,
  Clock,
  Brain,
  Volume2,
  VolumeX,
  Database,
  HelpCircle,
  CheckCircle2,
  XCircle,
  FlaskConical,
  Compass,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext.jsx';
import { audioEngine } from '../utils/ambientAudioEngine.js';

export default function Landing() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  // Active Rig Mode: 'reaction' | 'pendulum' | 'optics'
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

  // Ambient Audio Preview state
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [activeSoundtrack, setActiveSoundtrack] = useState('spaceship');

  // Interactive Mini-Quiz State on Landing Page
  const [quizAnswered, setQuizAnswered] = useState(null); // 'A' | 'B' | 'C' | 'D'
  const [showAiModal, setShowAiModal] = useState(false);

  // Physics animation loop for pendulum
  useEffect(() => {
    let animId;
    let t0 = performance.now();
    const omega = Math.sqrt(gravity.g / pendulumLength);

    const animate = (now) => {
      const elapsed = (now - t0) / 1000;
      const angle = 28 * Math.cos(omega * elapsed) * Math.exp(-0.02 * elapsed);
      setPendulumAngle(angle);
      animId = requestAnimationFrame(animate);
    };

    animId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animId);
  }, [gravity.g, pendulumLength]);

  // Clean up audio on unmount
  useEffect(() => {
    return () => {
      try {
        audioEngine?.stop?.();
      } catch {}
    };
  }, []);

  const toggleAmbientAudio = (soundId = 'spaceship') => {
    try {
      if (isPlayingAudio && activeSoundtrack === soundId) {
        audioEngine?.stop?.();
        setIsPlayingAudio(false);
      } else {
        audioEngine?.stop?.();
        setActiveSoundtrack(soundId);
        if (soundId === 'spaceship') {
          audioEngine?.startSpaceship?.();
        } else if (soundId === 'bubbling') {
          audioEngine?.startBubblingLab?.();
        } else {
          audioEngine?.startCosmicRain?.();
        }
        setIsPlayingAudio(true);
      }
    } catch (e) {
      console.warn('Audio play toggle error:', e);
    }
  };

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
      {/* Radiant Background Ambience (Sky Blue & Banana Yellow Glow) */}
      <div className="fixed top-[-10%] left-[-8%] w-[400px] sm:w-[650px] h-[400px] sm:h-[650px] bg-sky-200/45 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="fixed top-[22%] right-[-10%] w-[350px] sm:w-[550px] h-[350px] sm:h-[550px] bg-yellow-200/45 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="fixed bottom-[-10%] left-[25%] w-[400px] sm:w-[600px] h-[400px] sm:h-[600px] bg-sky-100/55 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* 1. TACTILE CLAY NAVBAR */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-xl border-b border-sky-100 shadow-xs transition-all">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between">
          {/* Brand */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-tr from-sky-500 to-sky-400 text-white flex items-center justify-center font-black shadow-md shadow-sky-500/25 group-hover:scale-105 transition-transform">
              <span className="text-lg">🧪</span>
            </div>
            <div>
              <span className="text-base sm:text-lg font-black tracking-tight text-slate-900 flex items-center gap-1">
                Lab<span className="text-sky-500">Xplore</span>
                <span className="text-[10px] uppercase font-black tracking-wider px-2 py-0.5 rounded-full bg-yellow-100 text-yellow-950 border border-yellow-300 ml-1 shadow-2xs">
                  Clay UI
                </span>
              </span>
              <p className="text-[10px] text-slate-400 font-semibold hidden sm:block">3D Virtual Science Studio</p>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-8 text-slate-600 font-bold text-xs sm:text-sm">
            <a href="#overview" className="hover:text-sky-600 transition-colors">Overview</a>
            <a href="#precision-rig" className="hover:text-sky-600 transition-colors">Apparatus Rig</a>
            <a href="#quiz-preview" className="hover:text-sky-600 transition-colors">Quizzes (0 Repeats)</a>
            <a href="#features" className="hover:text-sky-600 transition-colors">6 Core Engines</a>
          </nav>

          {/* Actions & Ambient Sound Toggle */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Quick Audio Test Button */}
            <button
              onClick={() => toggleAmbientAudio('spaceship')}
              className={`hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all shadow-2xs border ${
                isPlayingAudio
                  ? 'bg-amber-400 text-slate-950 border-amber-300 animate-pulse'
                  : 'bg-white text-slate-600 border-sky-200 hover:bg-sky-50 hover:text-sky-700'
              }`}
              title="Preview procedural Web Audio synthesizer"
            >
              {isPlayingAudio ? <Volume2 size={13} /> : <VolumeX size={13} />}
              <span>{isPlayingAudio ? 'Sound Playing' : 'Ambient Audio'}</span>
            </button>

            {isAuthenticated ? (
              <Link
                to="/dashboard"
                className="clay-btn-yellow py-2 px-4 sm:px-5 text-xs sm:text-sm shadow-sm"
              >
                <span>Go to Lab</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-slate-700 hover:text-sky-600 font-extrabold px-3 py-2 text-xs sm:text-sm transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  className="clay-btn-yellow py-2 sm:py-2.5 px-4 sm:px-6 text-xs sm:text-sm shadow-sm"
                >
                  <span>Start Free</span>
                  <ArrowRight className="w-3.5 h-3.5 hidden sm:inline" />
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      {/* 2. HERO SECTION (TACTILE 3D CLAY AESTHETICS) */}
      <section id="overview" className="pt-10 pb-12 sm:pt-16 sm:pb-20 px-4 sm:px-6 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Eyebrow Clay Tag */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white shadow-xs border border-sky-200 text-sky-700 font-extrabold text-xs uppercase tracking-wider mb-5">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping" />
            <span>Tactile 3D Clay UI · White, Sky Blue & Banana Yellow</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-3xl sm:text-6xl md:text-7xl font-black tracking-tight text-slate-900 leading-[1.12] mb-5">
            Science at your fingertips.
            <br />
            <span className="text-sky-500 font-black drop-shadow-xs">Down to the atom.</span>
          </h1>

          <p className="text-sm sm:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto mb-8 sm:mb-10 font-normal px-2">
            A tactile 3D virtual laboratory engineered with empirical stoichiometry, harmonic kinematics, 
            <strong> 25,000 non-repeating quiz questions</strong>, and Snap & Solve OCR. Zero broken glassware. Infinite discovery.
          </p>

          {/* Responsive CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 max-w-md mx-auto sm:max-w-none mb-10 sm:mb-14">
            <button
              onClick={handleLaunch}
              className="clay-btn-yellow w-full sm:w-auto py-3.5 sm:py-4 px-7 sm:px-9 text-sm sm:text-base font-black shadow-lg"
            >
              <span>Launch Student Studio</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={handleExploreLab}
              className="w-full sm:w-auto py-3.5 sm:py-4 px-6 sm:px-8 text-sm sm:text-base font-extrabold rounded-full bg-white text-slate-800 border border-sky-200 shadow-sm hover:bg-sky-50 hover:border-sky-300 transition-all flex items-center justify-center gap-2"
            >
              <Play className="w-4 h-4 fill-sky-500 text-sky-500" />
              <span>Explore Interactive Labs</span>
            </button>
          </div>

          {/* Quick Clay Stat Pills */}
          <div className="inline-flex flex-wrap items-center justify-center gap-3 sm:gap-5 py-3 px-5 sm:px-7 rounded-3xl bg-white/95 backdrop-blur-md border border-sky-100 shadow-md text-xs font-bold text-slate-700">
            <span className="flex items-center gap-1.5 text-sky-600">
              <Zap size={14} className="text-amber-500" /> 60 FPS Physics Engine
            </span>
            <span className="text-amber-900 bg-yellow-100/90 px-2.5 py-0.5 rounded-full border border-yellow-300 font-extrabold">
              25,000 Questions (0 Repeats)
            </span>
            <span className="flex items-center gap-1 text-slate-700">
              <Camera size={13} className="text-sky-500" /> Snap & Solve OCR
            </span>
            <span className="text-emerald-700 font-black">100% Free For Students</span>
          </div>
        </div>
      </section>

      {/* 3. THE INTERACTIVE APPARATUS STUDIO (CLAY HARDWARE SANDBOX) */}
      <section id="precision-rig" className="py-6 sm:py-12 px-3 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <div className="clay-card p-4 sm:p-8 rounded-3xl relative overflow-hidden shadow-xl border border-sky-100">
            {/* Header & Mode Switcher */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-sky-100">
              <div>
                <span className="text-[10px] sm:text-xs uppercase tracking-widest font-black text-sky-600">
                  Interactive 3D Hardware Sandbox
                </span>
                <h2 className="text-lg sm:text-2xl font-black tracking-tight text-slate-900 mt-0.5">
                  The Apparatus Studio
                </h2>
              </div>

              {/* Clay Mode Toggle */}
              <div className="grid grid-cols-3 gap-1.5 w-full sm:w-auto p-1.5 rounded-2xl bg-sky-50 border border-sky-200">
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
                      className={`flex items-center justify-center gap-1.5 py-2 px-3.5 text-xs font-bold rounded-xl transition-all min-h-[36px] ${
                        isActive
                          ? 'clay-btn-yellow text-slate-950 shadow-xs'
                          : 'text-slate-600 hover:text-sky-700 hover:bg-white/60'
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
                <div className="lg:col-span-7 bg-[#0b192e] rounded-3xl p-4 sm:p-6 text-white relative min-h-[300px] sm:min-h-[360px] flex flex-col justify-between overflow-hidden shadow-inner border border-sky-400/20">
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
                              ? 'w-14 h-14 sm:w-16 sm:h-16 text-amber-400 drop-shadow-[0_0_16px_#f59e0b]'
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
                      Drag tactile sliders to inspect Arrhenius reaction rates and temperature-dependent energy release.
                    </p>
                  </div>

                  {/* Sliders */}
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
                        className="w-full accent-sky-500 h-2 bg-slate-200 rounded-lg cursor-pointer"
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
                        className="w-full accent-sky-500 h-2 bg-slate-200 rounded-lg cursor-pointer"
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
                          className={`p-2.5 rounded-2xl text-left transition-all border ${
                            reagent === item.name
                              ? 'bg-sky-500 text-white border-sky-500 shadow-xs font-bold'
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
                    className="clay-btn-yellow w-full py-3.5 text-xs font-black flex items-center justify-center gap-2 shadow-sm"
                  >
                    <span>Launch Full Chemistry Simulation →</span>
                  </button>
                </div>
              </div>
            )}

            {/* TAB 2: KINEMATIC PENDULUM */}
            {activeTab === 'pendulum' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-6 items-center">
                <div className="lg:col-span-7 bg-[#0b192e] rounded-3xl p-4 sm:p-6 text-white relative min-h-[300px] sm:min-h-[360px] flex flex-col justify-between overflow-hidden shadow-inner border border-sky-400/20">
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
                      <circle cx="0" cy="0" r="5" fill="#ffe135" />

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
                      Observe how gravitational field strength alters oscillation period T = 2π√(L/g).
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
                        className="w-full accent-sky-500 h-2 bg-slate-200 rounded-lg cursor-pointer"
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
                          className={`p-2.5 rounded-2xl text-left transition-all border ${
                            gravity.name === planet.name
                              ? 'bg-sky-500 text-white border-sky-500 shadow-xs font-bold'
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
                    className="clay-btn-yellow w-full py-3.5 text-xs font-black flex items-center justify-center gap-2 shadow-sm"
                  >
                    <span>Launch Physics Sandbox →</span>
                  </button>
                </div>
              </div>
            )}

            {/* TAB 3: OPTICS (ZERO VIOLET / PURPLE RAYS) */}
            {activeTab === 'optics' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-6 items-center">
                <div className="lg:col-span-7 bg-[#0b192e] rounded-3xl p-4 sm:p-6 text-white relative min-h-[300px] sm:min-h-[360px] flex flex-col justify-between overflow-hidden shadow-inner border border-sky-400/20">
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
                      {/* Spectral rays: Red, Amber, Emerald, Sky, Deep Blue (NO VIOLET/PURPLE) */}
                      <line x1="190" y1="135" x2="300" y2="120" stroke="#ef4444" strokeWidth="2.5" />
                      <line x1="190" y1="135" x2="300" y2="135" stroke="#f59e0b" strokeWidth="2.5" />
                      <line x1="190" y1="135" x2="300" y2="150" stroke="#10b981" strokeWidth="2.5" />
                      <line x1="190" y1="135" x2="300" y2="165" stroke="#0ea5e9" strokeWidth="2.5" />
                      <line x1="190" y1="135" x2="300" y2="180" stroke="#0369a1" strokeWidth="2.5" />
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
                      Snell's Law & Refraction
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
                        className="w-full accent-sky-500 h-2 bg-slate-200 rounded-lg cursor-pointer"
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
                          className={`p-2.5 rounded-2xl text-left transition-all border ${
                            prismMaterial.name === item.name
                              ? 'bg-sky-500 text-white border-sky-500 shadow-xs font-bold'
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
                    className="clay-btn-yellow w-full py-3.5 text-xs font-black flex items-center justify-center gap-2 shadow-sm"
                  >
                    <span>Start Experimenting with Optics →</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 4. LIVE MINI-QUIZ TEASER (PROVE 0 REPETITIONS FEATURE) */}
      <section id="quiz-preview" className="py-12 sm:py-16 px-4 sm:px-6 max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-yellow-100 border border-yellow-300 text-yellow-950 font-black text-xs uppercase tracking-wider mb-2 shadow-2xs">
            <Sparkles size={13} className="text-amber-600" />
            <span>Problem Solved: 0 Duplicate Questions</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Try a Live Chapter Quiz Problem
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto mt-2">
            Every round picks from our 25,000 Supabase Question Bank using concept clustering. 
            Out of 10 questions, exactly 0 repeat. Try answering below:
          </p>
        </div>

        <div className="clay-card p-6 sm:p-8 rounded-3xl bg-white border border-sky-100 shadow-xl space-y-5">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-sky-50 px-2.5 py-0.5 text-xs font-bold text-sky-700 border border-sky-200">
                Physics · Kinematics
              </span>
              <span className="rounded-full bg-amber-50 px-2.5 py-0.5 text-xs font-bold text-amber-800 border border-amber-200">
                +10 XP Available
              </span>
            </div>
            <span className="text-xs font-mono font-bold text-slate-400">Question 1 of 10</span>
          </div>

          <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
            A body moving with an initial velocity of 10 m/s accelerates uniformly at 2 m/s² for 5 seconds. What is the total distance traveled?
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { key: 'A', text: '50 m', correct: false },
              { key: 'B', text: '75 m', correct: true },
              { key: 'C', text: '65 m', correct: false },
              { key: 'D', text: '100 m', correct: false },
            ].map((opt) => {
              const isSelected = quizAnswered === opt.key;
              let btnCls = 'bg-slate-50/70 border-slate-200 text-slate-800 hover:bg-sky-50 hover:border-sky-300';
              if (quizAnswered !== null) {
                if (opt.correct) {
                  btnCls = 'bg-emerald-50 border-emerald-400 text-emerald-950 font-bold ring-2 ring-emerald-200';
                } else if (isSelected) {
                  btnCls = 'bg-rose-50 border-rose-400 text-rose-950 ring-2 ring-rose-200';
                } else {
                  btnCls = 'bg-slate-50 border-slate-100 text-slate-400 opacity-60';
                }
              }

              return (
                <button
                  key={opt.key}
                  onClick={() => setQuizAnswered(opt.key)}
                  disabled={quizAnswered !== null}
                  className={`p-3.5 rounded-2xl border text-left flex items-center justify-between transition-all ${btnCls}`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="flex h-7 w-7 items-center justify-center rounded-xl bg-white border border-slate-200 text-xs font-extrabold text-slate-700 shadow-2xs">
                      {opt.key}
                    </span>
                    <span className="text-sm font-semibold">{opt.text}</span>
                  </div>
                  {quizAnswered !== null && opt.correct && (
                    <CheckCircle2 size={18} className="text-emerald-600 shrink-0" />
                  )}
                  {quizAnswered !== null && isSelected && !opt.correct && (
                    <XCircle size={18} className="text-rose-500 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          {quizAnswered !== null && (
            <div className="rounded-2xl bg-sky-50 p-4 border border-sky-200 space-y-2 animate-in fade-in duration-200">
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold text-sky-800 flex items-center gap-1.5">
                  <CheckCircle2 size={14} className="text-emerald-600" />
                  Correct Answer: Option B (75 m)
                </span>
                <button
                  onClick={() => setShowAiModal(true)}
                  className="flex items-center gap-1 text-[11px] font-bold text-sky-700 hover:underline"
                >
                  <Sparkles size={12} className="text-amber-500" />
                  Ask AI for step-by-step breakdown
                </button>
              </div>
              <p className="text-xs text-slate-600">
                Formula: <code>s = ut + ½at²</code> = (10 × 5) + ½(2 × 25) = 50 + 25 = <strong>75 meters</strong>.
              </p>
            </div>
          )}

          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
            <button
              onClick={() => setQuizAnswered(null)}
              className="text-xs font-bold text-slate-500 hover:text-slate-800 flex items-center gap-1"
            >
              <RotateCcw size={13} /> Reset Question
            </button>
            <Link
              to="/quizzes"
              className="clay-btn-yellow py-2.5 px-6 text-xs font-black shadow-sm flex items-center gap-1.5"
            >
              <span>Take Full 10-Question Quiz (0 Repeats)</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* 5. THE 6 CORE ENGINES MATRIX (CLAY BENTO GRID) */}
      <section id="features" className="py-12 sm:py-20 px-4 sm:px-6 max-w-6xl mx-auto">
        <div className="mb-10 sm:mb-14 text-center max-w-2xl mx-auto">
          <span className="text-xs uppercase tracking-widest font-black text-sky-600 bg-sky-50 border border-sky-200 px-3.5 py-1 rounded-full">
            The Complete Science Suite
          </span>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-black tracking-tight text-slate-900 mt-3">
            Built for Hackathon Victory.
          </h2>
          <p className="text-slate-500 text-xs sm:text-base mt-2 font-normal">
            Every feature engineered with tactile 3D Clay UI, zero violet, and 100% white, sky blue, and banana yellow.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-6">
          {/* Card 1: Snap & Solve OCR (Span 7) */}
          <div className="md:col-span-7 clay-card p-6 sm:p-8 rounded-3xl flex flex-col justify-between group border border-sky-100">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] font-mono text-sky-600 uppercase font-bold tracking-wider">
                  Engine #01 · OCR AI Solver
                </span>
                <span className="text-xs font-black text-slate-900 px-2.5 py-0.5 rounded-full bg-yellow-300 border border-yellow-400">
                  Smart Vision
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight mb-2">
                Snap & Solve Smart OCR
              </h3>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-6">
                Drag-and-drop handwritten physics/chemistry equations or use your device camera. Our laser scan extracts variables, balances formulas, and generates step-by-step derivations.
              </p>
            </div>

            <div className="bg-sky-50/80 rounded-2xl p-4 flex items-center justify-between border border-sky-100">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-white shadow-xs border border-sky-100 flex items-center justify-center text-sky-600">
                  <Camera size={22} />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900 font-mono">Camera & Preset OCR</p>
                  <p className="text-[11px] text-sky-600 font-semibold">Gemini Multi-Modal Vision</p>
                </div>
              </div>
              <Link
                to="/snap-solve"
                className="clay-btn-yellow py-2 px-4 text-xs font-black shadow-xs"
              >
                Try OCR →
              </Link>
            </div>
          </div>

          {/* Card 2: 25,000 Questions (Span 5) */}
          <div className="md:col-span-5 clay-card p-6 sm:p-8 rounded-3xl flex flex-col justify-between group border border-sky-100">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] font-mono text-sky-600 uppercase font-bold tracking-wider">
                  Engine #02 · Assessment
                </span>
                <span className="text-xs font-bold text-sky-800 px-2.5 py-0.5 rounded-full bg-sky-100 border border-sky-200">
                  0 Duplicate Qs
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight mb-2">
                25,000 Question Bank
              </h3>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-6">
                Direct Supabase database queries across 61 JEE & NEET chapters with automatic concept clustering and session tracking.
              </p>
            </div>

            <div className="bg-sky-50/80 rounded-2xl p-4 flex items-center justify-between border border-sky-100">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-white shadow-xs border border-sky-100 flex items-center justify-center text-amber-500">
                  <Database size={22} />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900">Kinematics & Bonding</p>
                  <p className="text-[11px] text-slate-500 font-mono">10 Questions / Round</p>
                </div>
              </div>
              <Link
                to="/quizzes"
                className="clay-btn-yellow py-2 px-4 text-xs font-black shadow-xs"
              >
                Quizzes →
              </Link>
            </div>
          </div>

          {/* Card 3: Chemistry Studio (Span 4) */}
          <div className="md:col-span-4 clay-card p-5 sm:p-6 rounded-3xl flex flex-col justify-between border border-sky-100">
            <div>
              <span className="text-[10px] font-mono text-sky-600 uppercase tracking-wider font-bold block mb-1">
                Engine #03 · Chemistry
              </span>
              <h4 className="text-base sm:text-lg font-black text-slate-900 mb-1">
                Empirical Stoichiometry
              </h4>
              <p className="text-xs text-slate-500 leading-relaxed mb-4">
                Calculate real precipitate mass, gas volume release, and enthalpy with 50+ balanced chemical reactions.
              </p>
            </div>
            <Link
              to="/chemistry"
              className="clay-card-sky p-3 rounded-2xl flex items-center justify-between font-bold text-xs"
            >
              <span>Explore Chemistry Lab</span>
              <ChevronRight size={15} />
            </Link>
          </div>

          {/* Card 4: Physics & Optics Sandbox (Span 4) */}
          <div className="md:col-span-4 clay-card p-5 sm:p-6 rounded-3xl flex flex-col justify-between border border-sky-100">
            <div>
              <span className="text-[10px] font-mono text-sky-600 uppercase tracking-wider font-bold block mb-1">
                Engine #04 · Physics
              </span>
              <h4 className="text-base sm:text-lg font-black text-slate-900 mb-1">
                60 FPS Ray Optics
              </h4>
              <p className="text-xs text-slate-500 leading-relaxed mb-4">
                Biconcave/convex lenses, Snell's law prism dispersion, Newton's cradle, and harmonic gravity oscillations.
              </p>
            </div>
            <Link
              to="/physics"
              className="clay-card-sky p-3 rounded-2xl flex items-center justify-between font-bold text-xs"
            >
              <span>Explore Physics Lab</span>
              <ChevronRight size={15} />
            </Link>
          </div>

          {/* Card 5: Pomodoro Lounge (Span 4) */}
          <div className="md:col-span-4 clay-card p-5 sm:p-6 rounded-3xl flex flex-col justify-between border border-sky-100">
            <div>
              <span className="text-[10px] font-mono text-sky-600 uppercase tracking-wider font-bold block mb-1">
                Engine #05 · Ambient Audio
              </span>
              <h4 className="text-base sm:text-lg font-black text-slate-900 mb-1">
                Pomodoro Study Lounge
              </h4>
              <p className="text-xs text-slate-500 leading-relaxed mb-4">
                Zero external MP3 dependencies. Real-time synthesized spaceship sub-drone, bubbling lab, and pink noise.
              </p>
            </div>
            <Link
              to="/pomodoro"
              className="clay-card-yellow p-3 rounded-2xl flex items-center justify-between font-bold text-xs"
            >
              <span>Launch Audio Lounge</span>
              <ChevronRight size={15} />
            </Link>
          </div>
        </div>
      </section>

      {/* 6. CALL TO ACTION (CLAY EMBOSSED) */}
      <section className="py-14 sm:py-20 px-4 sm:px-6 text-center">
        <div className="max-w-3xl mx-auto clay-card p-8 sm:p-14 rounded-3xl border-2 border-sky-200 shadow-2xl bg-gradient-to-b from-white to-sky-50/70">
          <span className="w-12 h-12 rounded-2xl bg-yellow-400 text-slate-950 flex items-center justify-center font-black mx-auto mb-4 shadow-md shadow-yellow-400/30 text-xl">
            ✦
          </span>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-black tracking-tight text-slate-900 mb-3">
            Start Discovering Today.
          </h2>
          <p className="text-slate-600 text-xs sm:text-base font-normal max-w-lg mx-auto mb-8 leading-relaxed">
            Create your free verified student ID in under 30 seconds, or dive straight into the interactive laboratory.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 max-w-sm sm:max-w-none mx-auto">
            <Link
              to="/signup"
              className="clay-btn-yellow w-full sm:w-auto py-3.5 sm:py-4 px-8 text-sm font-black shadow-lg"
            >
              Create Free Student Account
            </Link>
            <button
              onClick={handleExploreLab}
              className="w-full sm:w-auto py-3.5 sm:py-4 px-7 text-sm font-bold rounded-full bg-white text-slate-800 border border-sky-200 shadow-xs hover:bg-sky-50 transition-all"
            >
              Explore Interactive Lab
            </button>
          </div>
        </div>
      </section>

      {/* 7. FOOTER (WHITE, SKY BLUE & YELLOW PALETTE) */}
      <footer className="bg-white border-t border-sky-100 py-10 px-4 sm:px-6 text-xs text-slate-500">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-5 text-center md:text-left">
          <div className="flex items-center gap-2 font-bold text-slate-800">
            <span className="text-sm text-sky-600 font-black">LabXplore Studio</span>
            <span className="text-slate-300">|</span>
            <span className="text-slate-500 font-semibold">White, Sky Blue & Banana Yellow Clay Edition</span>
          </div>

          <div className="flex flex-wrap justify-center gap-4 sm:gap-6 text-[11px] font-bold text-slate-600">
            <Link to="/chemistry" className="hover:text-sky-600 transition-colors">Chemistry Lab</Link>
            <Link to="/physics" className="hover:text-sky-600 transition-colors">Physics Lab</Link>
            <Link to="/quizzes" className="hover:text-sky-600 transition-colors">Chapter Quizzes</Link>
            <Link to="/snap-solve" className="hover:text-sky-600 transition-colors">Snap & Solve OCR</Link>
            <Link to="/pomodoro" className="hover:text-sky-600 transition-colors">Pomodoro Lounge</Link>
          </div>

          <p className="text-[11px] text-slate-400">
            © {new Date().getFullYear()} LabXplore Systems · Pure Clay UI/UX.
          </p>
        </div>
      </footer>
    </div>
  );
}
