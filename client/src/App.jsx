import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ProgressProvider } from './context/ProgressContext.jsx';
import Layout from './components/Layout.jsx';
import Home from './pages/Home.jsx';
import PhysicsLab from './pages/PhysicsLab.jsx';
import ChemistryLab from './pages/ChemistryLab.jsx';
import Quizzes from './pages/Quizzes.jsx';
import DailyChallenge from './pages/DailyChallenge.jsx';
import Progress from './pages/Progress.jsx';
import Achievements from './pages/Achievements.jsx';
import FunGames from './pages/FunGames.jsx';
import SavedExperiments from './pages/SavedExperiments.jsx';
import Auth from './pages/Auth.jsx';
import Profile from './pages/Profile.jsx';
import Settings from './pages/Settings.jsx';

export default function App() {
  return (
    <ProgressProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/physics" element={<PhysicsLab />} />
            <Route path="/chemistry" element={<ChemistryLab />} />
            <Route path="/quizzes" element={<Quizzes />} />
            <Route path="/daily-challenge" element={<DailyChallenge />} />
            <Route path="/progress" element={<Progress />} />
            <Route path="/achievements" element={<Achievements />} />
            <Route path="/games" element={<FunGames />} />
            <Route path="/saved" element={<SavedExperiments />} />
            <Route path="/login" element={<Auth />} />
            <Route path="/signup" element={<Auth />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/help" element={<Settings />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ProgressProvider>
  );
}
