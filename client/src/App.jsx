import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext.jsx';
import { ProgressProvider } from './context/ProgressContext.jsx';
import Layout from './components/Layout.jsx';
import Landing from './pages/Landing.jsx';
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';
import Home from './pages/Home.jsx';
import PhysicsLab from './pages/PhysicsLab.jsx';
import ChemistryLab from './pages/ChemistryLab.jsx';
import Quizzes from './pages/Quizzes.jsx';
import DailyChallenge from './pages/DailyChallenge.jsx';
import Progress from './pages/Progress.jsx';
import Achievements from './pages/Achievements.jsx';
import FunGames from './pages/FunGames.jsx';
import SavedExperiments from './pages/SavedExperiments.jsx';
import Profile from './pages/Profile.jsx';
import Settings from './pages/Settings.jsx';

// Smart Home: Displays Landing for visitors, redirects or displays Dashboard
function RootRoute() {
  const { isAuthenticated, loading } = useAuth();
  if (loading) {
    return (
      <div className="min-h-screen bg-[#edf2f8] flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }
  return <Landing />;
}

export default function App() {
  return (
    <AuthProvider>
      <ProgressProvider>
        <BrowserRouter>
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
              <Route path="/chemistry" element={<ChemistryLab />} />
              <Route path="/quizzes" element={<Quizzes />} />
              <Route path="/daily-challenge" element={<DailyChallenge />} />
              <Route path="/progress" element={<Progress />} />
              <Route path="/achievements" element={<Achievements />} />
              <Route path="/games" element={<FunGames />} />
              <Route path="/saved" element={<SavedExperiments />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/help" element={<Settings />} />
            </Route>

            {/* Fallback route */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </ProgressProvider>
    </AuthProvider>
  );
}
