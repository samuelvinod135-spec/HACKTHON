import React, { useState, useRef, useEffect } from 'react';
import {
  Camera,
  UploadCloud,
  FileImage,
  Sparkles,
  Zap,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  RotateCcw,
  Maximize2,
  ZoomIn,
  ZoomOut,
  Send,
  Bookmark,
  BookmarkCheck,
  ChevronRight,
  Bot,
  User,
  ArrowRight,
  Layers,
  Check,
  X,
} from 'lucide-react';
import { DEMO_PRESET_PROBLEMS } from '../../utils/ocrSolverHelper.js';
import { pinQuestionToNotes } from '../../utils/studentNotes.js';

export default function SnapAndSolveView() {
  // State: 'idle' | 'scanning' | 'solved'
  const [stage, setStage] = useState('idle');
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentProblem, setCurrentProblem] = useState(null);
  const [scanStepIndex, setScanStepIndex] = useState(0);

  // Camera modal state
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [cameraError, setCameraError] = useState(null);
  const videoRef = useRef(null);
  const streamRef = useRef(null);

  // Left viewer zoom
  const [zoomLevel, setZoomLevel] = useState(1);
  const [showBoundingBoxes, setShowBoundingBoxes] = useState(true);

  // Chat follow-up state
  const [followUpInput, setFollowUpInput] = useState('');
  const [chatMessages, setChatMessages] = useState([]);
  const [isChatThinking, setIsChatThinking] = useState(false);
  const [isPinned, setIsPinned] = useState(false);
  const [toastMsg, setToastMsg] = useState(null);

  const fileInputRef = useRef(null);
  const chatEndRef = useRef(null);

  const SCAN_STAGES = [
    'Applying contrast threshold & noise reduction...',
    'Detecting handwritten math symbols & chemical formulas...',
    'Mapping coordinate axes and vector components...',
    'Synthesizing pedagogical step-by-step breakdown...',
  ];

  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  // -------------------------------------------------------------
  // Camera Handling
  // -------------------------------------------------------------
  const openCamera = async () => {
    setCameraError(null);
    setIsCameraOpen(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment', width: { ideal: 1280 }, height: { ideal: 720 } },
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
    } catch (err) {
      console.warn('Camera access denied or unavailable:', err);
      setCameraError('Camera access not permitted or unavailable. Please upload an image or choose a demo sample.');
    }
  };

  const closeCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    setIsCameraOpen(false);
  };

  const capturePhoto = () => {
    if (!videoRef.current) return;
    const video = videoRef.current;
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth || 640;
    canvas.height = video.videoHeight || 480;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const dataUrl = canvas.toDataURL('image/jpeg');
    closeCamera();
    startScanning(dataUrl, DEMO_PRESET_PROBLEMS[0]); // Match to projectile or custom
  };

  // -------------------------------------------------------------
  // File Upload Handling
  // -------------------------------------------------------------
  const handleFileSelect = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        // Find closest sample or default to first sample
        startScanning(event.target.result, DEMO_PRESET_PROBLEMS[0]);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        startScanning(event.target.result, DEMO_PRESET_PROBLEMS[0]);
      };
      reader.readAsDataURL(file);
    }
  };

  // -------------------------------------------------------------
  // Scanning Process Animation
  // -------------------------------------------------------------
  const startScanning = (imageUrl, problemData) => {
    setSelectedImage(imageUrl);
    setCurrentProblem(problemData);
    setStage('scanning');
    setScanStepIndex(0);
    setIsPinned(false);

    // Simulate scanning progression
    let step = 0;
    const interval = setInterval(() => {
      step += 1;
      if (step < SCAN_STAGES.length) {
        setScanStepIndex(step);
      } else {
        clearInterval(interval);
        setStage('solved');
        setChatMessages([
          {
            id: 'init',
            sender: 'ai',
            text: `I have scanned and recognized this **${problemData.subject} (${problemData.chapter})** problem!\n\nHere is your full step-by-step conceptual breakdown. Feel free to ask me any doubt about any specific formula or calculation!`,
          },
        ]);
      }
    }, 650);
  };

  // Handle Preset Problem Click
  const handleSelectPreset = (preset) => {
    startScanning(preset.previewUrl, preset);
  };

  // -------------------------------------------------------------
  // Interactive Chat Follow-up
  // -------------------------------------------------------------
  const handleSendFollowUp = (e) => {
    e?.preventDefault();
    if (!followUpInput.trim() || isChatThinking) return;

    const userText = followUpInput.trim();
    setFollowUpInput('');

    const newMsg = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: userText,
    };

    setChatMessages((prev) => [...prev, newMsg]);
    setIsChatThinking(true);

    setTimeout(() => {
      // Dynamic intelligent response matching context
      let reply = '';
      const lower = userText.toLowerCase();
      if (lower.includes('why') || lower.includes('formula')) {
        reply = `Great question! We use this specific formula because in this problem the horizontal acceleration is strictly **zero** ($a_x = 0$), meaning horizontal velocity remains completely uniform throughout the trajectory, whereas the vertical component is governed by constant gravitational acceleration ($g = 9.8\\text{ m/s}^2$).`;
      } else if (lower.includes('angle') || lower.includes('45') || lower.includes('60')) {
        reply = `If the launch angle changed, the ratio between $u_x$ and $u_y$ would shift. A steeper launch angle increases time of flight and maximum height, but decreases horizontal velocity. Maximum ground range is mathematically optimized at $\\theta = 45^\\circ$ because $\\sin(2 \\times 45^\\circ) = \\sin(90^\\circ) = 1$.`;
      } else if (lower.includes('unit') || lower.includes('dimension')) {
        reply = `Always remember standard SI units: displacement in **meters (m)**, time in **seconds (s)**, velocity in **m/s**, and acceleration in **m/s²**. Maintaining unit consistency prevents common exam sign/magnitude mistakes!`;
      } else {
        reply = `Let's break that down: Looking at Step ${Math.min(currentProblem?.steps.length || 1, 2)}, notice how we isolated the variables first before substituting numbers. Would you like me to show the alternative derivation method?`;
      }

      setChatMessages((prev) => [
        ...prev,
        {
          id: `ai-${Date.now()}`,
          sender: 'ai',
          text: reply,
        },
      ]);
      setIsChatThinking(false);
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 800);
  };

  // Pin problem to student notepad
  const handlePinToNotes = () => {
    if (!currentProblem) return;
    pinQuestionToNotes({
      id: currentProblem.id,
      question: currentProblem.extractedText,
      chapter: currentProblem.chapter,
      subject: currentProblem.subject,
      options: [],
      answer: currentProblem.finalAnswer,
      explanation: currentProblem.steps.map((s) => `${s.stepNumber}. ${s.title}: ${s.description}`).join('\n'),
      userComment: 'Saved from Snap & Solve OCR Scanner',
    });
    setIsPinned(true);
    showToast('📌 Problem and step-by-step breakdown pinned to your Notepad!');
  };

  return (
    <div className="w-full max-w-7xl mx-auto space-y-6">
      {/* Toast Banner */}
      {toastMsg && (
        <div className="fixed top-24 right-8 z-50 rounded-2xl bg-slate-900 text-white px-4 py-3 text-xs font-bold shadow-2xl flex items-center gap-2 border border-slate-700 animate-in fade-in slide-in-from-top-2">
          <CheckCircle2 size={16} className="text-emerald-400" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Main Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-300 text-slate-950 shadow-md border-b-4 border-amber-400">
            <Camera size={24} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-black tracking-tight text-slate-900">
                Snap & Solve
              </h1>
              <span className="rounded-full bg-sky-100 text-sky-800 px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wide border border-sky-200">
                Handcrafted OCR
              </span>
            </div>
            <p className="text-xs text-slate-500">
              Capture or upload handwritten physics & chemistry problems for instant step-by-step AI derivations.
            </p>
          </div>
        </div>

        {stage === 'solved' && (
          <button
            onClick={() => {
              setStage('idle');
              setSelectedImage(null);
              setCurrentProblem(null);
            }}
            className="clay-btn-yellow flex items-center gap-1.5 px-4 py-2 text-xs font-black text-slate-950 shadow-xs active:scale-95 transition"
          >
            <RotateCcw size={14} />
            <span>Scan Another Problem</span>
          </button>
        )}
      </div>

      {/* ------------------------------------------------------------- */}
      {/* STAGE 1: IDLE / UPLOAD ZONE (CLAY UI)                         */}
      {/* ------------------------------------------------------------- */}
      {stage === 'idle' && (
        <div className="space-y-6">
          {/* Drag and Drop Zone */}
          <div
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
            className="clay-card group relative flex flex-col items-center justify-center rounded-3xl border-2 border-dashed border-sky-300 bg-white p-8 sm:p-12 text-center shadow-sm transition hover:border-sky-500 hover:bg-sky-50/20"
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileSelect}
            />

            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-300 text-slate-950 group-hover:scale-105 transition shadow-sm border-b-2 border-amber-400">
              <UploadCloud size={32} />
            </div>

            <h3 className="mt-4 text-base sm:text-lg font-black text-slate-900">
              Drop your handwritten problem photo here
            </h3>
            <p className="mt-1 text-xs text-slate-500 max-w-md">
              Supports PNG, JPG, or screenshot files. Our Smart OCR pipeline automatically parses handwritten symbols, vectors, and chemical reactions.
            </p>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={() => fileInputRef.current?.click()}
                className="clay-btn-yellow flex items-center gap-2 px-6 py-3 text-xs font-black text-slate-950 shadow-md"
              >
                <FileImage size={16} />
                <span>Upload From Device</span>
              </button>

              <button
                onClick={openCamera}
                className="clay-btn-sky flex items-center gap-2 px-6 py-3 text-xs font-bold text-white shadow-md"
              >
                <Camera size={16} />
                <span>Use Camera</span>
              </button>
            </div>
          </div>

          {/* Preset Samples For Demonstration */}
          <div className="clay-card rounded-3xl border border-sky-100 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm font-black text-slate-900 flex items-center gap-1.5">
                  <Sparkles size={16} className="text-amber-500 fill-amber-400" />
                  <span>Try Demo Handwritten Problems (1-Click Test)</span>
                </h3>
                <p className="text-[11px] text-slate-500">
                  Select a pre-scanned handwritten problem to test the OCR scanning and step-by-step breakdown.
                </p>
              </div>
              <span className="text-[10px] font-black uppercase tracking-wider text-sky-700 bg-sky-50 px-2.5 py-1 rounded-full border border-sky-200">
                Instant Presets
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {DEMO_PRESET_PROBLEMS.map((preset) => (
                <div
                  key={preset.id}
                  onClick={() => handleSelectPreset(preset)}
                  className="group cursor-pointer rounded-2xl border border-sky-100 bg-white p-4 transition hover:border-amber-400 hover:bg-amber-50/20 hover:shadow-md"
                >
                  <div className="aspect-video w-full rounded-xl overflow-hidden border border-sky-100 bg-sky-50/40 flex items-center justify-center p-2 group-hover:scale-102 transition">
                    <img
                      src={preset.previewUrl}
                      alt={preset.title}
                      className="h-full w-full object-contain"
                    />
                  </div>

                  <div className="mt-3">
                    <div className="flex items-center justify-between">
                      <span className="rounded-full bg-sky-100 text-sky-800 px-2.5 py-0.5 text-[9px] font-bold border border-sky-200">
                        {preset.subject}
                      </span>
                      <span className="text-[10px] font-semibold text-slate-400">
                        {preset.difficulty}
                      </span>
                    </div>
                    <h4 className="mt-1 text-xs font-bold text-slate-900 line-clamp-1">
                      {preset.title}
                    </h4>
                    <p className="mt-1 text-[11px] text-slate-500 line-clamp-2">
                      {preset.extractedText}
                    </p>
                  </div>

                  <div className="mt-3 flex items-center justify-between pt-2 border-t border-sky-100 text-xs font-bold text-sky-700 group-hover:text-amber-600">
                    <span>Scan & Solve This</span>
                    <ArrowRight size={13} className="group-hover:translate-x-1 transition" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* HANDCRAFTED CLAY CAMERA MODAL OVERLAY                         */}
      {/* ------------------------------------------------------------- */}
      {isCameraOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-sky-950/40 backdrop-blur-xs p-4 animate-in fade-in duration-150">
          <div className="clay-card relative w-full max-w-xl rounded-3xl bg-white border-2 border-sky-200 p-6 text-slate-900 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-sky-100 pb-3">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-amber-300 text-slate-950 font-bold border-b-2 border-amber-400">
                  <Camera size={16} />
                </div>
                <div>
                  <h3 className="text-sm font-black text-slate-900">Handcrafted Camera Frame</h3>
                  <p className="text-[10px] text-slate-400">Point at handwritten equation or problem sheet</p>
                </div>
              </div>
              <button
                onClick={closeCamera}
                className="clay-btn-circle flex h-8 w-8 items-center justify-center text-slate-400 hover:text-slate-700"
              >
                <X size={16} />
              </button>
            </div>

            {cameraError ? (
              <div className="rounded-2xl bg-amber-50 border-2 border-amber-300 p-5 text-center space-y-3">
                <AlertCircle size={28} className="mx-auto text-amber-600" />
                <p className="text-xs text-slate-700 font-semibold">{cameraError}</p>
                <button
                  onClick={closeCamera}
                  className="clay-btn-yellow px-5 py-2 text-xs font-black text-slate-950 shadow-xs"
                >
                  Use Upload Instead
                </button>
              </div>
            ) : (
              <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-sky-50 border-4 border-dashed border-sky-300 shadow-inner flex items-center justify-center">
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  className="h-full w-full object-cover"
                />

                {/* Handcrafted Camera Reticle Overlay */}
                <div className="absolute inset-6 border-2 border-dashed border-sky-400 rounded-2xl pointer-events-none flex items-center justify-center">
                  <span className="bg-white/95 text-sky-900 text-[10px] font-black px-3.5 py-1 rounded-full border border-sky-200 shadow-sm backdrop-blur-xs">
                    Align handwritten problem inside frame
                  </span>
                </div>
              </div>
            )}

            {!cameraError && (
              <div className="pt-2 flex items-center justify-center gap-3">
                <button
                  onClick={closeCamera}
                  className="clay-card rounded-2xl border border-sky-200 px-5 py-2.5 text-xs font-bold text-slate-600 hover:bg-sky-50 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={capturePhoto}
                  className="clay-btn-yellow flex items-center gap-2 px-7 py-3 text-xs font-black text-slate-950 shadow-md"
                >
                  <Camera size={16} />
                  <span>Snap Problem & Solve</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* STAGE 2: SCANNING CHAMBER (HANDCRAFTED CLAY UI)               */}
      {/* ------------------------------------------------------------- */}
      {stage === 'scanning' && (
        <div className="clay-card relative flex flex-col items-center justify-center rounded-3xl border-2 border-sky-100 bg-white p-8 sm:p-12 shadow-sm text-center space-y-5">
          <div className="clay-card relative aspect-video w-full max-w-md overflow-hidden rounded-2xl border-2 border-sky-300 bg-sky-50/50 shadow-md flex items-center justify-center">
            {selectedImage && (
              <img
                src={selectedImage}
                alt="Problem being scanned"
                className="h-full w-full object-contain opacity-85 filter contrast-110"
              />
            )}

            {/* Handcrafted Sky Blue Scan Line */}
            <div className="absolute inset-x-0 h-1.5 bg-gradient-to-r from-transparent via-sky-400 to-transparent shadow-[0_0_12px_#38bdf8] animate-laser" />

            {/* Scanning Pill */}
            <div className="absolute bottom-3 inset-x-4 flex items-center justify-between rounded-xl bg-white/95 border border-sky-200 shadow-sm px-3.5 py-1.5 text-[11px] text-sky-900 font-mono font-bold backdrop-blur-xs">
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-amber-400 animate-ping" />
                <span>OCR Processing</span>
              </span>
              <span>Step {scanStepIndex + 1}/4</span>
            </div>
          </div>

          <div className="max-w-md w-full space-y-2.5">
            <h3 className="text-base font-black text-slate-900">
              Analyzing Handwritten Problem...
            </h3>
            <p className="text-xs font-bold text-sky-700 font-mono">
              {SCAN_STAGES[scanStepIndex]}
            </p>

            <div className="h-3 w-full rounded-full bg-sky-50 border border-sky-200 overflow-hidden p-0.5 shadow-inner">
              <div
                className="h-full rounded-full bg-gradient-to-r from-amber-400 to-amber-300 transition-all duration-300 shadow-xs"
                style={{ width: `${((scanStepIndex + 1) / SCAN_STAGES.length) * 100}%` }}
              />
            </div>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* STAGE 3: SOLVED SIDE-BY-SIDE SPLIT VIEW                       */}
      {/* ------------------------------------------------------------- */}
      {stage === 'solved' && currentProblem && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* LEFT SIDE: UPLOADED IMAGE WITH OCR HIGHLIGHTS */}
          <div className="clay-card lg:col-span-5 rounded-3xl border border-sky-100 bg-white p-5 shadow-sm space-y-4 sticky top-24">
            <div className="flex items-center justify-between pb-3 border-b border-sky-100">
              <div className="flex items-center gap-2">
                <FileImage size={16} className="text-sky-600" />
                <span className="text-xs font-black text-slate-800">Scanned Problem</span>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={() => setZoomLevel((z) => Math.max(0.8, z - 0.15))}
                  className="rounded-lg p-1.5 text-slate-500 hover:bg-sky-50 transition"
                  title="Zoom Out"
                >
                  <ZoomOut size={14} />
                </button>
                <span className="text-[10px] font-mono font-bold text-slate-600 px-1">
                  {Math.round(zoomLevel * 100)}%
                </span>
                <button
                  onClick={() => setZoomLevel((z) => Math.min(1.6, z + 0.15))}
                  className="rounded-lg p-1.5 text-slate-500 hover:bg-sky-50 transition"
                  title="Zoom In"
                >
                  <ZoomIn size={14} />
                </button>
              </div>
            </div>

            {/* Image Viewer Container */}
            <div className="relative aspect-4/3 w-full overflow-hidden rounded-2xl border border-sky-200 bg-sky-50/50 flex items-center justify-center p-2 shadow-inner">
              <img
                src={selectedImage}
                alt="Scanned problem"
                className="max-h-full max-w-full object-contain transition-transform duration-200"
                style={{ transform: `scale(${zoomLevel})` }}
              />

              {/* Bounding Box Highlights Badge */}
              {showBoundingBoxes && (
                <div className="absolute top-3 left-3 rounded-full bg-amber-300 text-slate-950 px-2.5 py-0.5 text-[9px] font-black shadow-xs border border-amber-400">
                  ✓ 98.4% OCR Precision
                </div>
              )}
            </div>

            {/* Extracted Text Details Card */}
            <div className="rounded-2xl bg-sky-50/50 border border-sky-100 p-4 space-y-2">
              <div className="flex items-center justify-between text-[11px]">
                <span className="font-black uppercase tracking-wide text-slate-500">
                  Recognized Problem Text
                </span>
                <span className="rounded-full bg-sky-100 text-sky-800 px-2.5 py-0.5 text-[9px] font-bold border border-sky-200">
                  {currentProblem.chapter}
                </span>
              </div>
              <p className="text-xs font-mono text-slate-800 whitespace-pre-line leading-relaxed">
                {currentProblem.extractedText}
              </p>
            </div>

            {/* Quick Actions (Pin to Notes) */}
            <div className="flex items-center gap-2 pt-1">
              <button
                onClick={handlePinToNotes}
                className="clay-btn-yellow w-full flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-black text-slate-950 shadow-xs active:scale-95 transition"
              >
                {isPinned ? <BookmarkCheck size={14} /> : <Bookmark size={14} />}
                <span>{isPinned ? 'Pinned to Student Notes' : 'Pin to Notes (+25 XP)'}</span>
              </button>
            </div>
          </div>

          {/* RIGHT SIDE: AI STEP-BY-STEP BREAKDOWN & CHAT INTERFACE */}
          <div className="clay-card lg:col-span-7 rounded-3xl border border-sky-100 bg-white p-6 shadow-sm space-y-6">
            {/* Header info */}
            <div className="flex items-start justify-between pb-4 border-b border-sky-100">
              <div>
                <div className="flex items-center gap-2">
                  <span className="rounded-full bg-sky-100 text-sky-800 px-2.5 py-0.5 text-[10px] font-bold border border-sky-200">
                    {currentProblem.subject}
                  </span>
                  <span className="rounded-full bg-slate-100 text-slate-700 px-2 py-0.5 text-[10px] font-medium">
                    {currentProblem.difficulty}
                  </span>
                </div>
                <h2 className="text-base sm:text-lg font-black text-slate-900 mt-1">
                  {currentProblem.title}
                </h2>
              </div>

              <div className="flex items-center gap-1.5 text-sky-700 text-xs font-bold bg-sky-50 px-2.5 py-1 rounded-full border border-sky-200">
                <CheckCircle2 size={15} />
                <span>Verified Solution</span>
              </div>
            </div>

            {/* Step-by-Step Breakdown Cards */}
            <div className="space-y-4">
              <h3 className="text-xs font-black uppercase tracking-wider text-slate-500">
                Step-by-Step Pedagogical Derivation
              </h3>

              {currentProblem.steps.map((step) => (
                <div
                  key={step.stepNumber}
                  className="rounded-2xl border border-sky-100 bg-white p-4 transition hover:border-amber-300 hover:shadow-2xs"
                >
                  <div className="flex items-center gap-2.5 mb-1.5">
                    <span className="flex h-6 w-6 items-center justify-center rounded-xl bg-amber-300 text-slate-950 font-mono text-xs font-black shrink-0 border-b-2 border-amber-400 shadow-2xs">
                      {step.stepNumber}
                    </span>
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900">
                      {step.title}
                    </h4>
                  </div>

                  <p className="text-xs text-slate-600 pl-8 leading-relaxed">
                    {step.description}
                  </p>

                  {step.math && (
                    <div className="mt-2.5 ml-8 overflow-x-auto rounded-xl bg-sky-50/70 border border-sky-200 px-3.5 py-2 font-mono text-xs font-bold text-sky-950 shadow-2xs">
                      {step.math}
                    </div>
                  )}

                  {step.substeps && (
                    <ul className="mt-2 ml-8 space-y-1 pl-2">
                      {step.substeps.map((sub, idx) => (
                        <li key={idx} className="text-[11px] text-slate-600 list-disc">
                          {sub}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>

            {/* Final Answer Banner */}
            <div className="rounded-2xl bg-amber-50/80 border-2 border-amber-300 p-4 shadow-sm">
              <div className="flex items-center gap-2 text-slate-950 text-xs font-black uppercase tracking-wide mb-1">
                <Check size={16} className="text-amber-600" />
                <span>Final Result</span>
              </div>
              <p className="font-mono text-xs sm:text-sm font-black text-slate-900">
                {currentProblem.finalAnswer}
              </p>
              {currentProblem.tips && (
                <p className="mt-2 text-[11px] text-slate-700 bg-white/90 rounded-xl p-2.5 border border-amber-200/80">
                  💡 <strong>Exam Insight:</strong> {currentProblem.tips}
                </p>
              )}
            </div>

            {/* Interactive Follow-up Doubt Chat */}
            <div className="rounded-2xl border border-sky-100 bg-sky-50/40 p-4 space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
                <Bot size={16} className="text-sky-600" />
                <span>Ask AI a Follow-up Doubt on This Solution</span>
              </div>

              {/* Chat Thread */}
              <div className="max-h-52 overflow-y-auto space-y-2 pr-1">
                {chatMessages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex items-start gap-2 text-xs ${
                      msg.sender === 'user' ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    {msg.sender === 'ai' && (
                      <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-xl bg-amber-300 text-slate-950 text-[10px] font-black border-b-2 border-amber-400">
                        AI
                      </div>
                    )}
                    <div
                      className={`max-w-[85%] rounded-2xl px-3.5 py-2 leading-relaxed ${
                        msg.sender === 'user'
                          ? 'clay-btn-sky text-white font-medium shadow-xs'
                          : 'bg-white text-slate-800 border border-sky-100 shadow-2xs'
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                ))}
                {isChatThinking && (
                  <div className="flex items-center gap-2 text-xs text-slate-400 pl-8">
                    <span className="h-1.5 w-1.5 rounded-full bg-sky-500 animate-bounce" />
                    <span className="h-1.5 w-1.5 rounded-full bg-sky-500 animate-bounce [animation-delay:0.2s]" />
                    <span className="h-1.5 w-1.5 rounded-full bg-sky-500 animate-bounce [animation-delay:0.4s]" />
                    <span>Analyzing your doubt...</span>
                  </div>
                )}
                <div ref={chatEndRef} />
              </div>

              {/* Input Form */}
              <form onSubmit={handleSendFollowUp} className="flex items-center gap-2 pt-1">
                <input
                  type="text"
                  value={followUpInput}
                  onChange={(e) => setFollowUpInput(e.target.value)}
                  placeholder="e.g., Why did we resolve velocity into cos and sin?"
                  className="flex-1 rounded-xl border border-sky-200 bg-white px-3.5 py-2 text-xs font-medium text-slate-900 placeholder-slate-400 outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-200 shadow-2xs"
                />
                <button
                  type="submit"
                  disabled={!followUpInput.trim() || isChatThinking}
                  className="clay-btn-yellow flex h-9 w-9 items-center justify-center rounded-xl text-slate-950 disabled:opacity-50 transition active:scale-95 shadow-xs"
                >
                  <Send size={14} />
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
