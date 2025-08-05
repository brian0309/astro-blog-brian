import React, { useState, useEffect } from 'react';

const ThemeToggle = ({ onClick }) => {
  // null = unknown until mounted; 'light' | 'dark' once known
  const [theme, setTheme] = useState(null);

  const applyTheme = (newTheme) => {
    const root = document.documentElement;
    if (newTheme === 'dark') {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
    setTheme(newTheme);
  };

  useEffect(() => {
    // Determine initial theme from existing html class (set by BaseLayout pre-hydration script)
    const rootIsDark = document.documentElement.classList.contains('dark');
    applyTheme(rootIsDark ? 'dark' : 'light');

    const handleStorage = (e) => {
      if (e.key === 'theme' && (e.newValue === 'light' || e.newValue === 'dark')) {
        applyTheme(e.newValue);
      }
    };

    const handleThemeChangeEvent = (e) => {
      const newTheme = e?.detail?.theme;
      if (newTheme === 'light' || newTheme === 'dark') {
        applyTheme(newTheme);
      }
    };

    window.addEventListener('storage', handleStorage);
    window.addEventListener('theme-change', handleThemeChangeEvent);

    return () => {
      window.removeEventListener('storage', handleStorage);
      window.removeEventListener('theme-change', handleThemeChangeEvent);
    };
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    applyTheme(newTheme);
    window.dispatchEvent(new CustomEvent('theme-change', { detail: { theme: newTheme } }));
    onClick?.();
  };

  // Render a minimal, non-flashing placeholder until mounted to avoid incorrect initial icon.
  if (theme === null) {
    return (
      <button
        id="theme-toggle"
        className="p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        aria-label="Toggle dark mode"
        disabled
      >
        <span className="block w-6 h-6" />
      </button>
    );
  }

  return (
    <button
      id="theme-toggle"
      className="p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      onClick={toggleTheme}
      aria-label="Toggle dark mode"
    >
      <svg
        id="sun-icon"
        className={`w-6 h-6 text-gray-800 dark:text-gray-200 ${theme === 'dark' ? 'hidden' : ''}`}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M12 3v1m0 16v1m9-9h1M3 12h1m15.325-7.757l-.707.707M5.382 5.382l-.707-.707m12.728 12.728l-.707-.707M6.092 17.908l-.707.707M18 12a6 6 0 11-12 0 6 6 0 0112 0z"
        ></path>
      </svg>
      <svg
        id="moon-icon"
        className={`w-6 h-6 text-gray-800 dark:text-gray-200 ${theme === 'light' ? 'hidden' : ''}`}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
        ></path>
      </svg>
    </button>
  );
};

export default ThemeToggle;
