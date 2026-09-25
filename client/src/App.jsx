import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext.jsx';
import { ProgressProvider } from './context/ProgressContext.jsx';
import { PerformanceProvider } from './context/PerformanceContext.jsx';
import { LanguageProvider } from './context/LanguageContext.jsx';
import Layout from './components/Layout.jsx';
import RoleGuard from './components/Auth/RoleGuard.jsx';
import { ThemeProvider } from './context/ThemeContext.jsx';
import ErrorBoundary from './components/ErrorBoundary.jsx';
import NetworkFallbackToast from './components/NetworkFallbackToast.jsx';
import RouteLoadingFallback from './components/RouteLoadingFallback.jsx';

// High-speed route-level code splitting
const Landing = lazy(() => import('./pages/Landing.jsx'));
const Login = lazy(() => import('./pages/Login.jsx'));
const Signup = lazy(() => import('./pages/Signup.jsx'));
const Home = lazy(() => import('./pages/Home.jsx'));
const PhysicsLab = lazy(() => import('./pages/PhysicsLab.jsx'));
const ChemistryLab = lazy(() => import('./pages/ChemistryLab.jsx'));
const Quizzes = lazy(() => import('./pages/Quizzes.jsx'));
const DailyChallenge = lazy(() => import('./pages/DailyChallenge.jsx'));
const MockTests = lazy(() => import('./pages/MockTests.jsx'));
const Progress = lazy(() => import('./pages/Progress.jsx'));
const Achievements = lazy(() => import('./pages/Achievements.jsx'));
const FunGames = lazy(() => import('./pages/FunGames.jsx'));
const SavedExperiments = lazy(() => import('./pages/SavedExperiments.jsx'));
const Profile = lazy(() => import('./pages/Profile.jsx'));
const Settings = lazy(() => import('./pages/Settings.jsx'));
const SnapAndSolvePage = lazy(() => import('./pages/SnapAndSolvePage.jsx'));
const PomodoroPage = lazy(() => import('./pages/PomodoroPage.jsx'));
const SandboxLabPage = lazy(() => import('./pages/SandboxLabPage.jsx'));
const PeerBattlesPage = lazy(() => import('./pages/PeerBattlesPage.jsx'));
const SpacedRepetitionPage = lazy(() => import('./pages/SpacedRepetitionPage.jsx'));
const ExperimentalBetaPage = lazy(() => import('./pages/ExperimentalBetaPage.jsx'));
const TeacherCockpit = lazy(() => import('./pages/TeacherCockpit.jsx'));
const AdminDashboard = lazy(() => import('./pages/AdminDashboard.jsx'));

import { prefetchAllRoutes } from './utils/prefetchRoute.js';

// Warm up all primary student destinations during browser idle intervals
if (typeof window !== 'undefined') {
  prefetchAllRoutes();
}

// Smart Home: Displays Landing for visitors, redirects authenticated users to their role-based portal
function RootRoute() {
  const { isAuthenticated, loading, profile } = useAuth();
  if (loading) {
    return (
      <div className="min-h-screen bg-[#edf2f8] dark:bg-slate-950 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-sky-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }
  if (isAuthenticated) {
    const role = profile?.role || 'student';
    if (role === 'admin') return <Navigate to="/admin" replace />;
    if (role === 'teacher') return <Navigate to="/teacher" replace />;
    return <Navigate to="/dashboard" replace />;
  }
  return <Landing />;
}

export default function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <LanguageProvider>
          <PerformanceProvider>
            <AuthProvider>
              <ProgressProvider>
                <BrowserRouter>
                  <NetworkFallbackToast />
                  <Suspense fallback={<RouteLoadingFallback />}>
                    <Routes>
              {/* Standalone Public Pages */}
              <Route path="/" element={<RootRoute />} />
              <Route path="/landing" element={<Landing />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />

              {/* Main Application Layout */}
              <Route element={<Layout />}>
                <Route path="/dashboard" element={<Home />} />
                <Route path="/physics" element={<PhysicsLab />} />
                <Route path="/chemistry" element={<ChemistryLab initialTab="drag-and-drop" />} />
                <Route path="/chemistry/drag-and-drop" element={<ChemistryLab initialTab="drag-and-drop" />} />
                <Route path="/chemistry/organic" element={<ChemistryLab initialTab="organic" />} />
                <Route path="/organic" element={<ChemistryLab initialTab="organic" />} />
                <Route path="/organic-chemistry" element={<ChemistryLab initialTab="organic" />} />
                <Route path="/quizzes" element={<Quizzes />} />
                <Route path="/daily-challenge" element={<DailyChallenge />} />
                <Route path="/mock-tests" element={<MockTests />} />
                <Route path="/progress" element={<Progress />} />
                <Route path="/achievements" element={<Achievements />} />
                <Route path="/games" element={<FunGames />} />
                <Route path="/saved" element={<SavedExperiments />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/snap-solve" element={<SnapAndSolvePage />} />
                <Route path="/experimental" element={<ExperimentalBetaPage />} />
                <Route path="/beta" element={<ExperimentalBetaPage />} />
                <Route path="/pomodoro" element={<PomodoroPage />} />
                <Route path="/battles" element={<PeerBattlesPage />} />
                <Route path="/sandbox" element={<SandboxLabPage />} />
                <Route path="/spaced-repetition" element={<SpacedRepetitionPage />} />
                <Route path="/help" element={<Settings />} />

                {/* Institutional Learning Operating System (ILOS) Protected Routes */}
                <Route element={<RoleGuard allowedRoles={['teacher', 'admin']} />}>
                  <Route path="/teacher" element={<TeacherCockpit />} />
                  <Route path="/cockpit" element={<TeacherCockpit />} />
                </Route>
                <Route element={<RoleGuard allowedRoles={['admin']} />}>
                  <Route path="/admin" element={<AdminDashboard />} />
                </Route>
              </Route>

              {/* Fallback route */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </ProgressProvider>
      </AuthProvider>
    </PerformanceProvider>
    </LanguageProvider>
    </ThemeProvider>
    </ErrorBoundary>
  );
}
