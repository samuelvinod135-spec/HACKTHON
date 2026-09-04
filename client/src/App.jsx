import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ProgressProvider } from './context/ProgressContext.jsx';
import Layout from './components/Layout.jsx';
import Home from './pages/Home.jsx';
import PhysicsLab from './pages/PhysicsLab.jsx';
import ChemistryLab from './pages/ChemistryLab.jsx';
import Quizzes from './pages/Quizzes.jsx';

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
          </Route>
        </Routes>
      </BrowserRouter>
    </ProgressProvider>
  );
}
