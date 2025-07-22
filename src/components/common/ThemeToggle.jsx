import React, { useState, useEffect } from 'react';

const ThemeToggle = ({ onClick }) => {
  const [theme, setThemeState] = useState('light'); // 'light' or 'dark'

  useEffect(() => {
    // Function to set the theme
    const applyTheme = (newTheme) => {
      if (newTheme === 'dark') {
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
      }
    setThemeState(newTheme);
    };

    // Check for saved theme in localStorage or system preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      applyTheme(savedTheme);
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      applyTheme('dark');
    } else {
      applyTheme('light');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
    setThemeState(newTheme);
    onClick?.();
  };

  return (
    <button
      id="theme-toggle"
      className="p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      onClick={toggleTheme}
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
