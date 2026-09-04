import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Sparkles,
  ArrowRight,
  Play,
  Flame,
  Atom,
  ChevronRight,
  Activity,
  Sliders,
  Maximize2,
  Check,
  Compass,
  Layers,
  RotateCcw,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext.jsx';

export default function Landing() {
  const navigate = useNavigate();
  const { isAuthenticated, demoLogin } = useAuth();

  // Workbench Mode: 'reaction' | 'pendulum' | 'optics'
  const [activeTab, setActiveTab] = useState('reaction');

  // Reaction parameters
  const [temperature, setTemperature] = useState(650); // Kelvin
  const [concentration, setConcentration] = useState(1.5); // Molar
  const [reagent, setReagent] = useState('Mg + HCl');

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
      // Amplitude: 35 degrees damping down gently
      const angle = 32 * Math.cos(omega * elapsed) * Math.exp(-0.02 * elapsed);
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

  const handleInstantDemo = () => {
    demoLogin();
    navigate('/dashboard');
  };

  // Calculations for Reaction Simulation
  const reactionRate = Math.round((concentration * Math.exp((temperature - 300) / 400)) * 10) / 10;
  const deltaH = reagent.includes('Mg') ? -462 : -112; // kJ/mol

  // Calculations for Optics (Snell's Law: n1 * sin(theta1) = n2 * sin(theta2))
  const radIncident = (incidentAngle * Math.PI) / 180;
  const sinRefracted = Math.sin(radIncident) / prismMaterial.n;
  const refractedAngle = Math.round((Math.asin(Math.min(1, sinRefracted)) * 180) / Math.PI);

  return (
    <div className="min-h-screen bg-[#f5f5f7] text-[#1d1d1f] font-sans antialiased selection:bg-neutral-900 selection:text-white">
      {/* 1. MINIMALIST CUPERTINO NAVIGATION BAR */}
      <header className="sticky top-0 z-50 bg-[#f5f5f7]/80 backdrop-blur-2xl border-b border-black/[0.06] transition-all">
        <div className="max-w-6xl mx-auto px-6 h-12 flex items-center justify-between text-xs tracking-tight">
          {/* Brand Mark */}
          <Link to="/" className="flex items-center gap-2 font-semibold text-neutral-900 group">
            <span className="w-5 h-5 rounded-full bg-neutral-900 text-white flex items-center justify-center text-[10px] font-black group-hover:scale-105 transition-transform">
              ✦
            </span>
            <span className="text-sm font-bold tracking-tight">LabXplore</span>
            <span className="text-[10px] uppercase font-semibold text-neutral-400 border border-neutral-200 px-1.5 py-0.2 rounded-md">
              Studio
            </span>
          </Link>

          {/* Links */}
          <nav className="hidden md:flex items-center gap-7 text-neutral-500 font-medium text-[13px]">
            <a href="#overview" className="hover:text-neutral-900 transition-colors">Overview</a>
            <a href="#precision-rig" className="hover:text-neutral-900 transition-colors">Apparatus Rig</a>
            <a href="#mechanics" className="hover:text-neutral-900 transition-colors">Mechanics</a>
            <a href="#architecture" className="hover:text-neutral-900 transition-colors">Architecture</a>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            {isAuthenticated ? (
              <Link
                to="/dashboard"
                className="apple-btn-black py-1.5 px-4 text-xs font-medium"
              >
                Go to Lab →
              </Link>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-neutral-600 hover:text-neutral-900 font-medium px-2 py-1 text-xs transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  className="apple-btn-black py-1.5 px-4 text-xs font-medium"
                >
                  Start Free
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      {/* 2. EDITORIAL KEYNOTE HERO */}
      <section id="overview" className="pt-16 pb-20 sm:pt-24 sm:pb-28 text-center px-6">
        <div className="max-w-4xl mx-auto">
          {/* Subtle Eyebrow */}
          <p className="text-xs sm:text-sm font-semibold tracking-wide uppercase text-neutral-400 mb-3">
            LabXplore 3D Physical Computing
          </p>

          {/* High-Impact Headline */}
          <h1 className="text-4xl sm:text-7xl font-bold tracking-[-0.035em] text-[#1d1d1f] leading-[1.06] mb-6">
            Science at your fingertips.
            <br />
            <span className="text-neutral-400 font-medium">Down to the atom.</span>
          </h1>

          <p className="text-base sm:text-xl text-neutral-500 font-normal leading-relaxed max-w-2xl mx-auto mb-10 tracking-tight">
            A high-fidelity virtual laboratory engineered with empirical stoichiometry, fluid physical mechanics, and tactile instruments.
          </p>

          {/* Apple Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 mb-16">
            <button
              onClick={handleLaunch}
              className="w-full sm:w-auto apple-btn-black py-3.5 px-7 text-sm font-semibold flex items-center justify-center gap-2"
            >
              <span>Launch Free Student Studio</span>
              <ArrowRight className="w-4 h-4 text-neutral-400" />
            </button>

            <button
              onClick={handleInstantDemo}
              className="w-full sm:w-auto apple-btn-glass py-3.5 px-6 text-sm font-semibold flex items-center justify-center gap-2"
            >
              <Play className="w-3.5 h-3.5 fill-current text-neutral-800" />
              <span>Interactive Guest Demo</span>
            </button>
          </div>

          {/* Quick Stat Strips */}
          <div className="inline-flex flex-wrap items-center justify-center gap-6 sm:gap-12 py-3 px-6 rounded-full bg-white/60 backdrop-blur-xl border border-black/[0.05] text-xs font-medium text-neutral-500">
            <span className="flex items-center gap-1.5 text-neutral-800 font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> 60 FPS Numerical Engine
            </span>
            <span>50+ Empirical Reactions</span>
            <span>Snell & Harmonic Mechanics</span>
            <span>Zero Safety Hazards</span>
          </div>
        </div>
      </section>

      {/* 3. THE HANDCRAFTED HARDWARE RIG (INTERACTIVE APPARATUS STUDIO) */}
      <section id="precision-rig" className="py-12 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          {/* Card Frame */}
          <div className="apple-card p-6 sm:p-10 rounded-[2rem] relative overflow-hidden border border-white/80 shadow-2xl">
            {/* Workbench Header & Segmented Tab Switcher */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-8 border-b border-black/[0.06]">
              <div>
                <span className="text-[11px] uppercase tracking-widest font-semibold text-neutral-400">
                  Interactive Precision Workbench
                </span>
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-900 mt-0.5">
                  The Apparatus Studio
                </h2>
              </div>

              {/* Cupertino Segmented Control */}
              <div className="apple-segmented flex self-stretch sm:self-auto">
                {[
                  { id: 'reaction', label: 'Reaction Crucible', icon: Flame },
                  { id: 'pendulum', label: 'Kinematic Pendulum', icon: Atom },
                  { id: 'optics', label: 'Refraction Prism', icon: Sliders },
                ].map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center gap-2 py-2 px-4 text-xs transition-all ${
                        isActive
                          ? 'apple-segmented-item-active'
                          : 'text-neutral-500 hover:text-neutral-900'
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* TAB 1: REACTION CRUCIBLE */}
            {activeTab === 'reaction' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-8 items-center">
                {/* Visual Chamber (Col 7) */}
                <div className="lg:col-span-7 bg-[#161617] rounded-3xl p-6 text-white relative min-h-[380px] flex flex-col justify-between overflow-hidden shadow-inner border border-white/10">
                  {/* Top telemetry bar */}
                  <div className="flex items-center justify-between text-xs font-mono text-neutral-400">
                    <span className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                      CALORIMETRY CHAMBER #01
                    </span>
                    <span>ΔH = {deltaH} kJ/mol</span>
                  </div>

                  {/* Chamber Canvas Display */}
                  <div className="relative my-auto py-10 flex flex-col items-center justify-center">
                    {/* Glowing crucible rig */}
                    <div
                      className="w-44 h-44 rounded-full border border-white/20 flex items-center justify-center relative transition-all duration-300"
                      style={{
                        boxShadow: `0 0 ${Math.min(80, temperature / 10)}px ${
                          temperature > 800 ? 'rgba(255, 120, 50, 0.7)' : 'rgba(255, 200, 80, 0.4)'
                        }`,
                        background: `radial-gradient(circle, ${
                          temperature > 800 ? 'rgba(255,100,50,0.35)' : 'rgba(255,200,80,0.18)'
                        } 0%, transparent 70%)`,
                      }}
                    >
                      {/* Central Reaction Core */}
                      <div className="text-center relative z-10">
                        <Flame
                          className={`mx-auto transition-all ${
                            temperature > 800
                              ? 'w-16 h-16 text-amber-400 animate-flicker drop-shadow-[0_0_20px_#ff8800]'
                              : 'w-12 h-12 text-amber-200 animate-pulse'
                          }`}
                        />
                        <p className="font-mono text-xs text-white font-bold mt-2">
                          {reagent}
                        </p>
                        <p className="text-[10px] text-neutral-400 font-mono">
                          Rate: {reactionRate} mol·L⁻¹s⁻¹
                        </p>
                      </div>

                      {/* Molecular collision particles */}
                      {[...Array(6)].map((_, i) => (
                        <div
                          key={i}
                          className="absolute w-2 h-2 rounded-full bg-white/70 animate-ping"
                          style={{
                            top: `${20 + (i * 12)}%`,
                            left: `${25 + (i * 10)}%`,
                            animationDuration: `${1.2 - (temperature / 1500)}s`,
                          }}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Telemetry bottom bar */}
                  <div className="grid grid-cols-3 gap-2 pt-4 border-t border-white/10 text-center font-mono text-[11px]">
                    <div>
                      <span className="text-neutral-500 block">TEMPERATURE</span>
                      <span className="text-amber-400 font-bold">{temperature} K</span>
                    </div>
                    <div>
                      <span className="text-neutral-500 block">CONCENTRATION</span>
                      <span className="text-blue-400 font-bold">{concentration} M</span>
                    </div>
                    <div>
                      <span className="text-neutral-500 block">STATUS</span>
                      <span className="text-emerald-400 font-bold">Exothermic</span>
                    </div>
                  </div>
                </div>

                {/* Control Panel (Col 5) */}
                <div className="lg:col-span-5 space-y-6">
                  <div>
                    <h3 className="text-lg font-bold text-neutral-900 tracking-tight">
                      Thermodynamic & Reagent Calibration
                    </h3>
                    <p className="text-xs text-neutral-500 mt-1 leading-relaxed">
                      Slide parameters to inspect Arrhenius reaction kinetics, rate constants, and temperature-dependent enthalpy release.
                    </p>
                  </div>

                  {/* Sliders */}
                  <div className="space-y-4 bg-white/60 p-5 rounded-2xl border border-black/[0.05]">
                    <div>
                      <div className="flex justify-between text-xs font-semibold text-neutral-700 mb-2">
                        <span>Chamber Temperature</span>
                        <span className="font-mono text-neutral-900">{temperature} K</span>
                      </div>
                      <input
                        type="range"
                        min="298"
                        max="1400"
                        step="10"
                        value={temperature}
                        onChange={(e) => setTemperature(Number(e.target.value))}
                        className="apple-slider"
                      />
                      <div className="flex justify-between text-[10px] text-neutral-400 font-mono mt-1">
                        <span>298 K (Room Temp)</span>
                        <span>1400 K (Furnace)</span>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs font-semibold text-neutral-700 mb-2">
                        <span>Solute Concentration</span>
                        <span className="font-mono text-neutral-900">{concentration} M</span>
                      </div>
                      <input
                        type="range"
                        min="0.1"
                        max="3.0"
                        step="0.1"
                        value={concentration}
                        onChange={(e) => setConcentration(Number(e.target.value))}
                        className="apple-slider"
                      />
                      <div className="flex justify-between text-[10px] text-neutral-400 font-mono mt-1">
                        <span>0.1 M (Dilute)</span>
                        <span>3.0 M (Saturated)</span>
                      </div>
                    </div>
                  </div>

                  {/* Reagent Preset Selector */}
                  <div>
                    <span className="text-xs font-semibold text-neutral-600 block mb-2">
                      Target Reagent Pair
                    </span>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        { name: 'Mg + 2HCl', desc: 'Magnesium Oxidation' },
                        { name: 'CuSO₄ + Fe', desc: 'Single Displacement' },
                        { name: 'NaOH + HCl', desc: 'Neutralization' },
                        { name: 'CaCO₃ + Heat', desc: 'Thermal Decomposition' },
                      ].map((item) => (
                        <button
                          key={item.name}
                          onClick={() => setReagent(item.name)}
                          className={`p-2.5 rounded-xl text-left transition-all border ${
                            reagent === item.name
                              ? 'bg-neutral-900 text-white border-neutral-900 shadow-sm'
                              : 'bg-white/80 text-neutral-700 border-black/[0.06] hover:bg-white'
                          }`}
                        >
                          <p className="text-xs font-bold font-mono">{item.name}</p>
                          <p className={`text-[10px] truncate ${reagent === item.name ? 'text-neutral-300' : 'text-neutral-400'}`}>
                            {item.desc}
                          </p>
                        </button>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={handleInstantDemo}
                    className="w-full apple-btn-black py-3 text-xs font-semibold flex items-center justify-center gap-2"
                  >
                    <span>Inspect In Full Chemistry Lab →</span>
                  </button>
                </div>
              </div>
            )}

            {/* TAB 2: KINEMATIC PENDULUM */}
            {activeTab === 'pendulum' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-8 items-center">
                {/* Visual Sandbox (Col 7) */}
                <div className="lg:col-span-7 bg-[#161617] rounded-3xl p-6 text-white relative min-h-[380px] flex flex-col justify-between overflow-hidden shadow-inner border border-white/10">
                  <div className="flex items-center justify-between text-xs font-mono text-neutral-400">
                    <span className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
                      KINEMATICS RIG #02
                    </span>
                    <span>g = {gravity.g} m/s² ({gravity.name})</span>
                  </div>

                  {/* Dynamic SVG Pendulum */}
                  <div className="relative my-auto flex items-center justify-center h-64">
                    <svg className="w-full h-full" viewBox="-150 -20 300 240">
                      {/* Ceiling anchor */}
                      <line x1="-40" y1="0" x2="40" y2="0" stroke="#666" strokeWidth="4" />
                      <circle cx="0" cy="0" r="5" fill="#fff" />

                      {/* Pendulum rod */}
                      {(() => {
                        const len = pendulumLength * 80;
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
                              stroke="rgba(255,255,255,0.7)"
                              strokeWidth="2"
                              strokeDasharray="4 2"
                            />
                            {/* Pendulum Bob */}
                            <circle
                              cx={bx}
                              cy={by}
                              r="16"
                              fill="#60a5fa"
                              className="filter drop-shadow-[0_0_12px_#3b82f6]"
                            />
                            {/* Center pip */}
                            <circle cx={bx} cy={by} r="4" fill="#ffffff" />
                          </g>
                        );
                      })()}
                    </svg>
                  </div>

                  {/* Telemetry bottom bar */}
                  <div className="grid grid-cols-3 gap-2 pt-4 border-t border-white/10 text-center font-mono text-[11px]">
                    <div>
                      <span className="text-neutral-500 block">ROD LENGTH</span>
                      <span className="text-blue-400 font-bold">{pendulumLength} m</span>
                    </div>
                    <div>
                      <span className="text-neutral-500 block">PERIOD (T)</span>
                      <span className="text-amber-400 font-bold">
                        {(2 * Math.PI * Math.sqrt(pendulumLength / gravity.g)).toFixed(2)} s
                      </span>
                    </div>
                    <div>
                      <span className="text-neutral-500 block">CURRENT ANGLE</span>
                      <span className="text-emerald-400 font-bold">{pendulumAngle.toFixed(1)}°</span>
                    </div>
                  </div>
                </div>

                {/* Control Panel (Col 5) */}
                <div className="lg:col-span-5 space-y-6">
                  <div>
                    <h3 className="text-lg font-bold text-neutral-900 tracking-tight">
                      Harmonic Motion & Gravitation
                    </h3>
                    <p className="text-xs text-neutral-500 mt-1 leading-relaxed">
                      Observe how gravitational field strength alters oscillation period $T = 2\pi\sqrt{'{L/g}'}$ across celestial bodies.
                    </p>
                  </div>

                  {/* Rod Length Slider */}
                  <div className="space-y-4 bg-white/60 p-5 rounded-2xl border border-black/[0.05]">
                    <div>
                      <div className="flex justify-between text-xs font-semibold text-neutral-700 mb-2">
                        <span>Pendulum Rod Length</span>
                        <span className="font-mono text-neutral-900">{pendulumLength} m</span>
                      </div>
                      <input
                        type="range"
                        min="0.5"
                        max="2.5"
                        step="0.1"
                        value={pendulumLength}
                        onChange={(e) => setPendulumLength(Number(e.target.value))}
                        className="apple-slider"
                      />
                      <div className="flex justify-between text-[10px] text-neutral-400 font-mono mt-1">
                        <span>0.5 m (Rapid)</span>
                        <span>2.5 m (Slow)</span>
                      </div>
                    </div>
                  </div>

                  {/* Celestial Gravity Selector */}
                  <div>
                    <span className="text-xs font-semibold text-neutral-600 block mb-2">
                      Celestial Gravitational Field
                    </span>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        { name: 'Moon', g: 1.62, desc: 'Low gravity (slow motion)' },
                        { name: 'Earth', g: 9.81, desc: 'Standard 1.0 G' },
                        { name: 'Mars', g: 3.72, desc: 'Martian surface' },
                        { name: 'Jupiter', g: 24.79, desc: 'Extreme high G' },
                      ].map((planet) => (
                        <button
                          key={planet.name}
                          onClick={() => setGravity({ name: planet.name, g: planet.g })}
                          className={`p-2.5 rounded-xl text-left transition-all border ${
                            gravity.name === planet.name
                              ? 'bg-neutral-900 text-white border-neutral-900 shadow-sm'
                              : 'bg-white/80 text-neutral-700 border-black/[0.06] hover:bg-white'
                          }`}
                        >
                          <p className="text-xs font-bold font-mono">
                            {planet.name} ({planet.g} m/s²)
                          </p>
                          <p className={`text-[10px] truncate ${gravity.name === planet.name ? 'text-neutral-300' : 'text-neutral-400'}`}>
                            {planet.desc}
                          </p>
                        </button>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => navigate('/physics')}
                    className="w-full apple-btn-black py-3 text-xs font-semibold flex items-center justify-center gap-2"
                  >
                    <span>Explore In Physics Sandbox →</span>
                  </button>
                </div>
              </div>
            )}

            {/* TAB 3: OPTICS & SPECTRAL DISPERSION */}
            {activeTab === 'optics' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-8 items-center">
                {/* Visual Sandbox (Col 7) */}
                <div className="lg:col-span-7 bg-[#161617] rounded-3xl p-6 text-white relative min-h-[380px] flex flex-col justify-between overflow-hidden shadow-inner border border-white/10">
                  <div className="flex items-center justify-between text-xs font-mono text-neutral-400">
                    <span className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
                      SPECTRAL OPTICS RIG #03
                    </span>
                    <span>Refractive Index n = {prismMaterial.n}</span>
                  </div>

                  {/* Dynamic Prism Ray Tracer */}
                  <div className="relative my-auto flex items-center justify-center h-64">
                    <svg className="w-full h-full" viewBox="0 0 320 220">
                      {/* Triangular Prism */}
                      <polygon
                        points="160,35 250,185 70,185"
                        fill="rgba(255,255,255,0.08)"
                        stroke="rgba(255,255,255,0.4)"
                        strokeWidth="2"
                      />

                      {/* Incident White Ray */}
                      <line
                        x1="20"
                        y1={130 - (incidentAngle * 0.8)}
                        x2="115"
                        y2="120"
                        stroke="#ffffff"
                        strokeWidth="3"
                        strokeLinecap="round"
                      />

                      {/* Internal Refracted Ray */}
                      <line
                        x1="115"
                        y1="120"
                        x2="190"
                        y2="135"
                        stroke="rgba(255,255,255,0.7)"
                        strokeWidth="2"
                      />

                      {/* Dispersed Rainbow Spectrum */}
                      <line x1="190" y1="135" x2="300" y2="120" stroke="#ff4d4f" strokeWidth="2.5" />
                      <line x1="190" y1="135" x2="300" y2="135" stroke="#faad14" strokeWidth="2.5" />
                      <line x1="190" y1="135" x2="300" y2="150" stroke="#52c41a" strokeWidth="2.5" />
                      <line x1="190" y1="135" x2="300" y2="165" stroke="#1890ff" strokeWidth="2.5" />
                      <line x1="190" y1="135" x2="300" y2="180" stroke="#722ed1" strokeWidth="2.5" />
                    </svg>
                  </div>

                  {/* Telemetry bottom bar */}
                  <div className="grid grid-cols-3 gap-2 pt-4 border-t border-white/10 text-center font-mono text-[11px]">
                    <div>
                      <span className="text-neutral-500 block">INCIDENT ANGLE (θ₁)</span>
                      <span className="text-white font-bold">{incidentAngle}°</span>
                    </div>
                    <div>
                      <span className="text-neutral-500 block">REFRACTED (θ₂)</span>
                      <span className="text-purple-400 font-bold">{refractedAngle}°</span>
                    </div>
                    <div>
                      <span className="text-neutral-500 block">DISPERSION</span>
                      <span className="text-emerald-400 font-bold">Rainbow Spectrum</span>
                    </div>
                  </div>
                </div>

                {/* Control Panel (Col 5) */}
                <div className="lg:col-span-5 space-y-6">
                  <div>
                    <h3 className="text-lg font-bold text-neutral-900 tracking-tight">
                      Snell's Law & Chromatic Dispersion
                    </h3>
                    <p className="text-xs text-neutral-500 mt-1 leading-relaxed">
                      Tune incident beam angle to observe critical internal reflection and spectral separation of visible light.
                    </p>
                  </div>

                  {/* Incident Angle Slider */}
                  <div className="space-y-4 bg-white/60 p-5 rounded-2xl border border-black/[0.05]">
                    <div>
                      <div className="flex justify-between text-xs font-semibold text-neutral-700 mb-2">
                        <span>Incident Ray Angle</span>
                        <span className="font-mono text-neutral-900">{incidentAngle}°</span>
                      </div>
                      <input
                        type="range"
                        min="15"
                        max="75"
                        step="1"
                        value={incidentAngle}
                        onChange={(e) => setIncidentAngle(Number(e.target.value))}
                        className="apple-slider"
                      />
                      <div className="flex justify-between text-[10px] text-neutral-400 font-mono mt-1">
                        <span>15° (Shallow)</span>
                        <span>75° (Steep)</span>
                      </div>
                    </div>
                  </div>

                  {/* Prism Material Selector */}
                  <div>
                    <span className="text-xs font-semibold text-neutral-600 block mb-2">
                      Prism Optical Medium
                    </span>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        { name: 'Crown Glass', n: 1.52, desc: 'Standard optical lens' },
                        { name: 'Flint Glass', n: 1.66, desc: 'High dispersion' },
                        { name: 'Sapphire', n: 1.77, desc: 'Crystalline purity' },
                        { name: 'Diamond', n: 2.42, desc: 'Maximum brilliance' },
                      ].map((item) => (
                        <button
                          key={item.name}
                          onClick={() => setPrismMaterial({ name: item.name, n: item.n })}
                          className={`p-2.5 rounded-xl text-left transition-all border ${
                            prismMaterial.name === item.name
                              ? 'bg-neutral-900 text-white border-neutral-900 shadow-sm'
                              : 'bg-white/80 text-neutral-700 border-black/[0.06] hover:bg-white'
                          }`}
                        >
                          <p className="text-xs font-bold font-mono">{item.name} (n={item.n})</p>
                          <p className={`text-[10px] truncate ${prismMaterial.name === item.name ? 'text-neutral-300' : 'text-neutral-400'}`}>
                            {item.desc}
                          </p>
                        </button>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={handleLaunch}
                    className="w-full apple-btn-black py-3 text-xs font-semibold flex items-center justify-center gap-2"
                  >
                    <span>Start Experimenting with Optics →</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 4. ASYMMETRIC APPLE HARDWARE BENTO GRID */}
      <section id="mechanics" className="py-20 px-6 max-w-6xl mx-auto">
        <div className="mb-14 text-center max-w-2xl mx-auto">
          <p className="text-xs uppercase tracking-widest font-semibold text-neutral-400 mb-2">
            Engineered Capabilities
          </p>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-neutral-900">
            Form follows physics.
          </h2>
          <p className="text-neutral-500 text-sm sm:text-base mt-3 font-normal">
            Every module is handcrafted around empirical physical data, genuine laboratory procedures, and clean Cupertino aesthetics.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
          {/* Card 1: Reaction Engine (Span 7) */}
          <div className="md:col-span-7 apple-card p-8 rounded-3xl flex flex-col justify-between group">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider">
                  Engine #01 · Chemistry
                </span>
                <span className="text-xs font-bold text-neutral-900 px-2.5 py-0.5 rounded-full bg-black/5">
                  Stoichiometric Precision
                </span>
              </div>
              <h3 className="text-2xl font-bold text-neutral-900 tracking-tight mb-2">
                Empirical Chemical Reactions
              </h3>
              <p className="text-neutral-600 text-sm leading-relaxed max-w-lg mb-6">
                Calculate real precipitate mass, track exothermic and endothermic energy waveforms, and witness gas evolutions with true molecular balancing.
              </p>
            </div>

            <div className="bg-[#f0f2f5] rounded-2xl p-4 flex items-center justify-between border border-black/[0.04]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white shadow-xs flex items-center justify-center">
                  <img src="/clay/flask.jpg" alt="Beaker" className="w-8 h-8 object-contain rounded-lg" />
                </div>
                <div>
                  <p className="text-xs font-bold text-neutral-900">2Mg + O₂ → 2MgO</p>
                  <p className="text-[11px] text-neutral-500 font-mono">ΔH = -601.6 kJ/mol</p>
                </div>
              </div>
              <Link
                to="/chemistry"
                className="text-xs font-semibold text-neutral-900 hover:underline flex items-center gap-1"
              >
                Launch <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Card 2: Kinematics (Span 5) */}
          <div className="md:col-span-5 apple-card p-8 rounded-3xl flex flex-col justify-between group">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider">
                  Engine #02 · Physics
                </span>
                <span className="text-xs font-bold text-neutral-900 px-2.5 py-0.5 rounded-full bg-black/5">
                  60 FPS Kinematics
                </span>
              </div>
              <h3 className="text-2xl font-bold text-neutral-900 tracking-tight mb-2">
                Harmonic Motion
              </h3>
              <p className="text-neutral-600 text-sm leading-relaxed mb-6">
                Oscillate pendulums, simulate gravity shifts across moons and planets, and measure phase space vectors in real time.
              </p>
            </div>

            <div className="bg-[#f0f2f5] rounded-2xl p-4 flex items-center justify-between border border-black/[0.04]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white shadow-xs flex items-center justify-center">
                  <img src="/clay/cradle.jpg" alt="Cradle" className="w-8 h-8 object-contain rounded-lg" />
                </div>
                <div>
                  <p className="text-xs font-bold text-neutral-900">Newton's Cradle Sandbox</p>
                  <p className="text-[11px] text-neutral-500 font-mono">Conservation of Momentum</p>
                </div>
              </div>
              <Link
                to="/physics"
                className="text-xs font-semibold text-neutral-900 hover:underline flex items-center gap-1"
              >
                Launch <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Card 3: Apparatus Rig (Span 4) */}
          <div className="md:col-span-4 apple-card p-6 rounded-3xl flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider block mb-2">
                Instrument #03
              </span>
              <h4 className="text-lg font-bold text-neutral-900 mb-1">
                Authentic Apparatus
              </h4>
              <p className="text-xs text-neutral-500 leading-relaxed mb-4">
                Step-by-step crucible setups, Bunsen burner collar adjustments, and safety protocols.
              </p>
            </div>
            <div className="h-28 rounded-2xl overflow-hidden bg-white/80 border border-black/[0.04] flex items-center justify-center p-2">
              <img src="/clay/apparatus.jpg" alt="Apparatus" className="h-full object-contain" />
            </div>
          </div>

          {/* Card 4: Daily Challenges & Gamification (Span 4) */}
          <div className="md:col-span-4 apple-card p-6 rounded-3xl flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider block mb-2">
                Mastery #04
              </span>
              <h4 className="text-lg font-bold text-neutral-900 mb-1">
                Research Telemetry
              </h4>
              <p className="text-xs text-neutral-500 leading-relaxed mb-4">
                Climb levels from Student Novice to Lab Master with XP tracked in Supabase cloud database.
              </p>
            </div>
            <div className="bg-[#f0f2f5] p-3 rounded-2xl border border-black/[0.04] text-xs font-mono">
              <div className="flex justify-between font-bold text-neutral-900 mb-1">
                <span>Student Level 13</span>
                <span>4,250 / 6,000 XP</span>
              </div>
              <div className="h-2 bg-neutral-200 rounded-full overflow-hidden">
                <div className="h-full bg-neutral-900 rounded-full w-[70%]" />
              </div>
            </div>
          </div>

          {/* Card 5: Safe Learning (Span 4) */}
          <div className="md:col-span-4 apple-card p-6 rounded-3xl flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider block mb-2">
                Curriculum #05
              </span>
              <h4 className="text-lg font-bold text-neutral-900 mb-1">
                NGSS & STEM Mapped
              </h4>
              <p className="text-xs text-neutral-500 leading-relaxed mb-4">
                Zero hazardous vapor, zero shattered glass. Pure tactile scientific exploration for classrooms.
              </p>
            </div>
            <div className="flex items-center justify-between text-xs font-semibold text-neutral-700 bg-white/80 p-3 rounded-2xl border border-black/[0.04]">
              <span>Grade 6–12 & AP Ready</span>
              <Check className="w-4 h-4 text-emerald-600" />
            </div>
          </div>
        </div>
      </section>

      {/* 5. ARCHITECTURAL DEEP DIVE SPECS */}
      <section id="architecture" className="py-20 px-6 bg-white border-t border-black/[0.06]">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
            <div>
              <p className="text-3xl sm:text-4xl font-black tracking-tight text-neutral-900">
                0.0 ms
              </p>
              <h4 className="text-sm font-bold text-neutral-800 mt-2 mb-1">Zero Latency Feedback</h4>
              <p className="text-xs text-neutral-500 leading-relaxed">
                Client-side reactive simulation loop running at full 60 frames per second without cloud round-trip delay.
              </p>
            </div>

            <div>
              <p className="text-3xl sm:text-4xl font-black tracking-tight text-neutral-900">
                100%
              </p>
              <h4 className="text-sm font-bold text-neutral-800 mt-2 mb-1">Mass Conservation</h4>
              <p className="text-xs text-neutral-500 leading-relaxed">
                Empirical stoichiometry engine guarantees every chemical element balances before and after reaction.
              </p>
            </div>

            <div>
              <p className="text-3xl sm:text-4xl font-black tracking-tight text-neutral-900">
                Cloud
              </p>
              <h4 className="text-sm font-bold text-neutral-800 mt-2 mb-1">Supabase Realtime</h4>
              <p className="text-xs text-neutral-500 leading-relaxed">
                Encrypted student profiles, laboratory notebook synchronizations, and research achievements.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. CALL TO ACTION */}
      <section className="py-24 px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-neutral-900 mb-4">
            Step into the studio.
          </h2>
          <p className="text-neutral-500 text-sm sm:text-base font-normal max-w-xl mx-auto mb-8">
            Create a free student account in under 30 seconds, or dive in immediately with our instant guest demo.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5">
            <Link
              to="/signup"
              className="w-full sm:w-auto apple-btn-black py-4 px-8 text-sm font-semibold shadow-lg"
            >
              Create Free Student ID
            </Link>
            <button
              onClick={handleInstantDemo}
              className="w-full sm:w-auto apple-btn-glass py-4 px-7 text-sm font-semibold"
            >
              Explore as Guest (Alex Chen)
            </button>
          </div>
        </div>
      </section>

      {/* 7. MINIMALIST CUPERTINO FOOTER */}
      <footer className="bg-[#f5f5f7] border-t border-black/[0.08] py-12 px-6 text-xs text-neutral-500">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2 font-semibold text-neutral-900">
            <span className="text-sm">LabXplore Studio</span>
            <span className="text-neutral-300">|</span>
            <span className="text-neutral-500 font-normal">Next-Generation 3D Physical Computing</span>
          </div>

          <div className="flex flex-wrap gap-6 text-[11px]">
            <Link to="/chemistry" className="hover:text-neutral-900 transition-colors">Chemistry Studio</Link>
            <Link to="/physics" className="hover:text-neutral-900 transition-colors">Physics Sandbox</Link>
            <Link to="/login" className="hover:text-neutral-900 transition-colors">Sign In</Link>
            <Link to="/signup" className="hover:text-neutral-900 transition-colors">Register</Link>
            <span className="hover:text-neutral-900 cursor-pointer">Educational Privacy</span>
          </div>

          <p className="text-[11px] text-neutral-400">
            © {new Date().getFullYear()} LabXplore Systems. Engineered for inquiry.
          </p>
        </div>
      </footer>
    </div>
  );
}
