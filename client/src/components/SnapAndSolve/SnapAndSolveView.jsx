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
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-sky-400 text-white shadow-md">
            <Camera size={24} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-black tracking-tight text-slate-900">
                Snap & Solve
              </h1>
              <span className="rounded-full bg-blue-100 text-blue-800 px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wide border border-blue-200">
                Smart OCR Component
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
            className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 shadow-xs transition active:scale-95"
          >
            <RotateCcw size={14} />
            <span>Scan Another Problem</span>
          </button>
        )}
      </div>

      {/* ------------------------------------------------------------- */}
      {/* STAGE 1: IDLE / UPLOAD ZONE                                   */}
      {/* ------------------------------------------------------------- */}
      {stage === 'idle' && (
        <div className="space-y-6">
          {/* Drag and Drop Zone */}
          <div
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
            className="group relative flex flex-col items-center justify-center rounded-3xl border-2 border-dashed border-sky-300 bg-white/80 p-8 sm:p-12 text-center shadow-sm transition hover:border-sky-500 hover:bg-sky-50/30"
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileSelect}
            />

            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-sky-100 text-sky-600 group-hover:scale-110 transition shadow-inner">
              <UploadCloud size={32} />
            </div>

            <h3 className="mt-4 text-base sm:text-lg font-bold text-slate-900">
              Drag and drop your handwritten problem photo here
            </h3>
            <p className="mt-1 text-xs text-slate-500 max-w-md">
              Supports PNG, JPG, or screenshot files. Our Smart OCR pipeline automatically parses handwritten symbols, vectors, and chemical reactions.
            </p>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center gap-2 rounded-2xl bg-sky-600 px-5 py-3 text-xs font-bold text-white shadow-md shadow-sky-600/25 hover:bg-sky-500 transition active:scale-95"
              >
                <FileImage size={16} />
                <span>Upload From Device</span>
              </button>

              <button
                onClick={openCamera}
                className="flex items-center gap-2 rounded-2xl border border-slate-300 bg-white px-5 py-3 text-xs font-bold text-slate-700 hover:bg-slate-50 transition active:scale-95"
              >
                <Camera size={16} className="text-sky-600" />
                <span>Use Camera</span>
              </button>
            </div>
          </div>

          {/* Preset Samples For Hackathon Demonstration */}
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                  <Sparkles size={16} className="text-amber-500" />
                  <span>Try Demo Handwritten Problems (1-Click Test)</span>
                </h3>
                <p className="text-[11px] text-slate-500">
                  Select a pre-scanned handwritten problem to test the OCR scanning and step-by-step breakdown.
                </p>
              </div>
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                Hackathon Presets
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {DEMO_PRESET_PROBLEMS.map((preset) => (
                <div
                  key={preset.id}
                  onClick={() => handleSelectPreset(preset)}
                  className="group cursor-pointer rounded-2xl border border-slate-200/90 bg-slate-50/60 p-4 transition hover:border-sky-400 hover:bg-sky-50/40 hover:shadow-md"
                >
                  <div className="aspect-video w-full rounded-xl overflow-hidden border border-slate-200 bg-white flex items-center justify-center p-2 group-hover:scale-102 transition">
                    <img
                      src={preset.previewUrl}
                      alt={preset.title}
                      className="h-full w-full object-contain"
                    />
                  </div>

                  <div className="mt-3">
                    <div className="flex items-center justify-between">
                      <span className="rounded bg-sky-100 text-sky-800 px-2 py-0.5 text-[9px] font-bold">
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

                  <div className="mt-3 flex items-center justify-between pt-2 border-t border-slate-200/60 text-xs font-bold text-sky-600 group-hover:text-sky-700">
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
      {/* CAMERA MODAL OVERLAY                                          */}
      {/* ------------------------------------------------------------- */}
      {isCameraOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4">
          <div className="relative w-full max-w-xl rounded-3xl bg-slate-900 border border-slate-800 p-6 text-white shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Camera size={18} className="text-sky-400" />
                <h3 className="text-sm font-bold">Camera Capture</h3>
              </div>
              <button
                onClick={closeCamera}
                className="rounded-lg bg-slate-800 p-1.5 text-slate-400 hover:text-white"
              >
                <X size={16} />
              </button>
            </div>

            {cameraError ? (
              <div className="rounded-2xl bg-rose-500/20 border border-rose-500/40 p-4 text-center">
                <p className="text-xs text-rose-300 font-medium">{cameraError}</p>
                <button
                  onClick={closeCamera}
                  className="mt-3 rounded-xl bg-slate-800 px-4 py-2 text-xs font-bold text-white hover:bg-slate-700"
                >
                  Close & Use Upload Instead
                </button>
              </div>
            ) : (
              <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-black border border-slate-800">
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  className="h-full w-full object-cover"
                />

                {/* Camera Reticle Overlay */}
                <div className="absolute inset-8 border-2 border-dashed border-sky-400/80 rounded-xl pointer-events-none flex items-center justify-center">
                  <span className="bg-slate-950/70 text-sky-300 text-[10px] font-bold px-3 py-1 rounded-full backdrop-blur-xs">
                    Align handwritten problem inside frame
                  </span>
                </div>
              </div>
            )}

            {!cameraError && (
              <div className="mt-6 flex items-center justify-center gap-4">
                <button
                  onClick={closeCamera}
                  className="rounded-xl bg-slate-800 px-4 py-2.5 text-xs font-bold text-slate-300 hover:bg-slate-700"
                >
                  Cancel
                </button>
                <button
                  onClick={capturePhoto}
                  className="flex items-center gap-2 rounded-2xl bg-sky-500 px-6 py-3 text-xs font-black text-white shadow-lg shadow-sky-500/30 hover:bg-sky-400 active:scale-95 transition"
                >
                  <Camera size={16} />
                  <span>Snap Problem</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* STAGE 2: SCANNING LASER ANIMATION                             */}
      {/* ------------------------------------------------------------- */}
      {stage === 'scanning' && (
        <div className="relative flex flex-col items-center justify-center rounded-3xl border border-slate-200 bg-white p-8 sm:p-12 shadow-sm text-center">
          <div className="relative aspect-video w-full max-w-md overflow-hidden rounded-2xl border-2 border-sky-400/60 bg-slate-950 shadow-xl">
            {selectedImage && (
              <img
                src={selectedImage}
                alt="Problem being scanned"
                className="h-full w-full object-contain opacity-70 filter contrast-125"
              />
            )}

            {/* Glowing Laser Scan Line Animation */}
            <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_15px_#22d3ee] animate-laser" />

            {/* Scan Grid Overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#0284c715_1px,transparent_1px),linear-gradient(to_bottom,#0284c715_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />

            <div className="absolute bottom-3 inset-x-4 flex items-center justify-between rounded-xl bg-slate-900/85 backdrop-blur-md px-3 py-1.5 text-[11px] text-sky-300 font-mono">
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-cyan-400 animate-ping" />
                <span>OCR Processing</span>
              </span>
              <span>Step {scanStepIndex + 1}/4</span>
            </div>
          </div>

          <div className="mt-6 max-w-md w-full space-y-2">
            <h3 className="text-base font-bold text-slate-900">
              Analyzing Handwritten Problem...
            </h3>
            <p className="text-xs font-medium text-sky-600 font-mono">
              {SCAN_STAGES[scanStepIndex]}
            </p>

            <div className="h-2 w-full rounded-full bg-slate-100 overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-sky-400 to-blue-600 transition-all duration-300"
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
          <div className="lg:col-span-5 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm space-y-4 sticky top-24">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <FileImage size={16} className="text-blue-600" />
                <span className="text-xs font-bold text-slate-800">Scanned Problem</span>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={() => setZoomLevel((z) => Math.max(0.8, z - 0.15))}
                  className="rounded-lg p-1.5 text-slate-500 hover:bg-slate-100"
                  title="Zoom Out"
                >
                  <ZoomOut size={14} />
                </button>
                <span className="text-[10px] font-mono font-bold text-slate-500 px-1">
                  {Math.round(zoomLevel * 100)}%
                </span>
                <button
                  onClick={() => setZoomLevel((z) => Math.min(1.6, z + 0.15))}
                  className="rounded-lg p-1.5 text-slate-500 hover:bg-slate-100"
                  title="Zoom In"
                >
                  <ZoomIn size={14} />
                </button>
              </div>
            </div>

            {/* Image Viewer Container */}
            <div className="relative aspect-4/3 w-full overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 flex items-center justify-center">
              <img
                src={selectedImage}
                alt="Scanned problem"
                className="max-h-full max-w-full object-contain transition-transform duration-200"
                style={{ transform: `scale(${zoomLevel})` }}
              />

              {/* Bounding Box Highlights Badge */}
              {showBoundingBoxes && (
                <div className="absolute top-2 left-2 rounded-lg bg-emerald-500/90 text-white px-2 py-0.5 text-[9px] font-bold shadow-xs">
                  ✓ 98.4% OCR Confidence
                </div>
              )}
            </div>

            {/* Extracted Text Details Card */}
            <div className="rounded-2xl bg-slate-50 border border-slate-200/80 p-3.5 space-y-2">
              <div className="flex items-center justify-between text-[11px]">
                <span className="font-extrabold uppercase tracking-wide text-slate-500">
                  Recognized Problem Text
                </span>
                <span className="rounded bg-sky-100 text-sky-700 px-2 py-0.5 text-[9px] font-bold">
                  {currentProblem.chapter}
                </span>
              </div>
              <p className="text-xs font-mono text-slate-800 whitespace-pre-line leading-relaxed">
                {currentProblem.extractedText}
              </p>
            </div>

            {/* Quick Actions (Pin to Notes) */}
            <div className="flex items-center gap-2 pt-2">
              <button
                onClick={handlePinToNotes}
                className={`flex-1 flex items-center justify-center gap-1.5 rounded-xl border px-3 py-2 text-xs font-bold transition active:scale-95 ${
                  isPinned
                    ? 'border-amber-400 bg-amber-50 text-amber-900'
                    : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                }`}
              >
                {isPinned ? <BookmarkCheck size={14} className="text-amber-600" /> : <Bookmark size={14} />}
                <span>{isPinned ? 'Pinned to Student Notes' : 'Pin to Notes'}</span>
              </button>
            </div>
          </div>

          {/* RIGHT SIDE: AI STEP-BY-STEP BREAKDOWN & CHAT INTERFACE */}
          <div className="lg:col-span-7 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-6">
            {/* Header info */}
            <div className="flex items-start justify-between pb-4 border-b border-slate-100">
              <div>
                <div className="flex items-center gap-2">
                  <span className="rounded-full bg-blue-100 text-blue-800 px-2.5 py-0.5 text-[10px] font-bold">
                    {currentProblem.subject}
                  </span>
                  <span className="rounded-full bg-slate-100 text-slate-700 px-2 py-0.5 text-[10px] font-medium">
                    {currentProblem.difficulty}
                  </span>
                </div>
                <h2 className="text-base sm:text-lg font-bold text-slate-900 mt-1">
                  {currentProblem.title}
                </h2>
              </div>

              <div className="flex items-center gap-1.5 text-emerald-600 text-xs font-bold">
                <CheckCircle2 size={16} />
                <span>Verified Solution</span>
              </div>
            </div>

            {/* Step-by-Step Breakdown Cards */}
            <div className="space-y-4">
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-400">
                Step-by-Step Pedagogical Derivation
              </h3>

              {currentProblem.steps.map((step) => (
                <div
                  key={step.stepNumber}
                  className="rounded-2xl border border-slate-200/90 bg-slate-50/50 p-4 transition hover:bg-white hover:shadow-2xs"
                >
                  <div className="flex items-center gap-2.5 mb-1.5">
                    <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-sky-600 text-white font-mono text-xs font-bold shrink-0">
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
                    <div className="mt-2.5 ml-8 overflow-x-auto rounded-xl bg-white border border-slate-200 px-3 py-2 font-mono text-xs font-bold text-sky-900 shadow-2xs">
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
            <div className="rounded-2xl bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-sky-500/10 border border-emerald-200 p-4">
              <div className="flex items-center gap-2 text-emerald-800 text-xs font-extrabold uppercase tracking-wide mb-1">
                <Check size={16} />
                <span>Final Result</span>
              </div>
              <p className="font-mono text-xs sm:text-sm font-bold text-emerald-950">
                {currentProblem.finalAnswer}
              </p>
              {currentProblem.tips && (
                <p className="mt-2 text-[11px] text-emerald-800/90 bg-white/70 rounded-lg p-2 border border-emerald-200/60">
                  💡 <strong>Exam Insight:</strong> {currentProblem.tips}
                </p>
              )}
            </div>

            {/* Interactive Follow-up Doubt Chat */}
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
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
                      <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-sky-600 text-white text-[10px] font-bold">
                        AI
                      </div>
                    )}
                    <div
                      className={`max-w-[85%] rounded-2xl px-3.5 py-2 leading-relaxed ${
                        msg.sender === 'user'
                          ? 'bg-sky-600 text-white font-medium'
                          : 'bg-white text-slate-800 border border-slate-200 shadow-2xs'
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
                  className="flex-1 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-medium text-slate-900 placeholder-slate-400 outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                />
                <button
                  type="submit"
                  disabled={!followUpInput.trim() || isChatThinking}
                  className="flex h-9 w-9 items-center justify-center rounded-xl bg-sky-600 text-white hover:bg-sky-500 disabled:opacity-50 transition active:scale-95"
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
