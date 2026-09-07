import React, { createContext, useContext, useState, useEffect } from 'react';

const PerformanceContext = createContext({
  isLiteMode: false,
  toggleLiteMode: () => {},
  setLiteMode: () => {},
});

export function PerformanceProvider({ children }) {
  const [isLiteMode, setIsLiteMode] = useState(() => {
    try {
      return localStorage.getItem('labxplore_lite_mode') === 'true';
    } catch {
      return false;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('labxplore_lite_mode', isLiteMode ? 'true' : 'false');
    } catch {}

    if (isLiteMode) {
      document.documentElement.classList.add('lite-mode');
    } else {
      document.documentElement.classList.remove('lite-mode');
    }
  }, [isLiteMode]);

  const toggleLiteMode = () => setIsLiteMode((prev) => !prev);
  const setLiteMode = (val) => setIsLiteMode(Boolean(val));

  return (
    <PerformanceContext.Provider value={{ isLiteMode, toggleLiteMode, setLiteMode }}>
      {children}
    </PerformanceContext.Provider>
  );
}

export function usePerformance() {
  return useContext(PerformanceContext);
}
