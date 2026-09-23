/**
 * High-speed route prefetch utility.
 * Fetches page chunks into browser cache when hovered or during idle time.
 */

const prefetched = new Set();

export function prefetchRoute(rawPath) {
  if (!rawPath || typeof rawPath !== 'string') return;
  const path = rawPath.split('?')[0];
  if (prefetched.has(path)) return;
  prefetched.add(path);

  try {
    switch (path) {
      case '/dashboard':
      case '/':
        import('../pages/Home.jsx');
        break;
      case '/physics':
        import('../pages/PhysicsLab.jsx');
        break;
      case '/chemistry':
      case '/chemistry/drag-and-drop':
      case '/chemistry/organic':
      case '/organic':
        import('../pages/ChemistryLab.jsx');
        break;
      case '/quizzes':
        import('../pages/Quizzes.jsx');
        break;
      case '/daily-challenge':
        import('../pages/DailyChallenge.jsx');
        break;
      case '/mock-tests':
        import('../pages/MockTests.jsx');
        break;
      case '/progress':
        import('../pages/Progress.jsx');
        break;
      case '/achievements':
        import('../pages/Achievements.jsx');
        break;
      case '/games':
        import('../pages/FunGames.jsx');
        break;
      case '/saved':
        import('../pages/SavedExperiments.jsx');
        break;
      case '/profile':
        import('../pages/Profile.jsx');
        break;
      case '/settings':
      case '/help':
        import('../pages/Settings.jsx');
        break;
      case '/snap-solve':
        import('../pages/SnapAndSolvePage.jsx');
        break;
      case '/pomodoro':
        import('../pages/PomodoroPage.jsx');
        break;
      case '/sandbox':
        import('../pages/SandboxLabPage.jsx');
        break;
      case '/battles':
        import('../pages/PeerBattlesPage.jsx');
        break;
      case '/spaced-repetition':
        import('../pages/SpacedRepetitionPage.jsx');
        break;
      case '/experimental':
      case '/beta':
        import('../pages/ExperimentalBetaPage.jsx');
        break;
      case '/teacher':
      case '/cockpit':
        import('../pages/TeacherCockpit.jsx');
        break;
      case '/admin':
        import('../pages/AdminDashboard.jsx');
        break;
      default:
        break;
    }
  } catch (err) {
    // Ignore prefetch failures in background
  }
}
