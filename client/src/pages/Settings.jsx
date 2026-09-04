import { useState } from 'react';
import {
  Settings as SettingsIcon,
  Volume2,
  Bell,
  Monitor,
  Shield,
  Palette,
  CheckCircle2,
} from 'lucide-react';

export default function Settings() {
  const [soundEffects, setSoundEffects] = useState(true);
  const [soundVolume, setSoundVolume] = useState(80);
  const [notifications, setNotifications] = useState(true);
  const [simQuality, setSimQuality] = useState('high');
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="mx-auto max-w-3xl space-y-6 pb-12">
      <div>
        <h1 className="text-2xl font-black text-slate-900">Settings</h1>
        <p className="mt-1 text-xs text-slate-500">Configure your virtual laboratory environment and preferences.</p>
      </div>

      <div className="clay-card p-6 space-y-6">
        {/* Simulation & Sound */}
        <div>
          <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2 mb-4">
            <Volume2 size={16} className="text-blue-600" /> Audio & Sound Effects
          </h2>
          <div className="flex items-center justify-between py-2 border-b border-slate-100">
            <div>
              <p className="text-xs font-bold text-slate-800">Laboratory Sound Effects</p>
              <p className="text-[11px] text-slate-400">Audio feedback when reactions react, bubbles pop, or apparatus connects</p>
            </div>
            <button
              onClick={() => setSoundEffects(!soundEffects)}
              className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors ${
                soundEffects ? 'bg-indigo-600' : 'bg-slate-200'
              }`}
            >
              <div
                className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                  soundEffects ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between py-3 border-b border-slate-100">
            <div>
              <p className="text-xs font-bold text-slate-800">Volume</p>
              <p className="text-[11px] text-slate-400">Master volume level for laboratory simulations</p>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={soundVolume}
              onChange={(e) => setSoundVolume(Number(e.target.value))}
              className="accent-indigo-600 w-32"
            />
          </div>
        </div>

        {/* Notifications */}
        <div>
          <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2 mb-4">
            <Bell size={16} className="text-amber-500" /> Notifications & Reminders
          </h2>
          <div className="flex items-center justify-between py-2 border-b border-slate-100">
            <div>
              <p className="text-xs font-bold text-slate-800">Daily Challenge Notifications</p>
              <p className="text-[11px] text-slate-400">Receive alerts when a new daily challenge and XP bonus unlocks</p>
            </div>
            <button
              onClick={() => setNotifications(!notifications)}
              className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors ${
                notifications ? 'bg-indigo-600' : 'bg-slate-200'
              }`}
            >
              <div
                className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                  notifications ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>

        {/* Graphics / Quality */}
        <div>
          <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2 mb-4">
            <Monitor size={16} className="text-emerald-500" /> Graphics & Performance
          </h2>
          <div className="flex items-center justify-between py-2">
            <div>
              <p className="text-xs font-bold text-slate-800">Particle Simulation Quality</p>
              <p className="text-[11px] text-slate-400">Rendering fidelity for bubbles, gas effervescence, and sparks</p>
            </div>
            <select
              value={simQuality}
              onChange={(e) => setSimQuality(e.target.value)}
              className="clay-input px-3 py-1.5 text-xs font-bold text-slate-800 outline-none"
            >
              <option value="high">High (60 FPS Smooth)</option>
              <option value="medium">Balanced</option>
              <option value="low">Performance (Battery Saver)</option>
            </select>
          </div>
        </div>

        {saved && (
          <div className="flex items-center gap-2 rounded-xl bg-emerald-50 p-3 text-xs font-bold text-emerald-800 border border-emerald-200">
            <CheckCircle2 size={16} /> Preferences saved successfully!
          </div>
        )}

        <div className="pt-2 flex justify-end">
          <button
            onClick={handleSave}
            className="clay-btn-yellow px-6 py-2.5 text-xs font-bold text-slate-900 shadow-md"
          >
            Save Preferences
          </button>
        </div>
      </div>
    </div>
  );
}
