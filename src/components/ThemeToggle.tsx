import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className="relative w-14 h-8 rounded-full bg-gray-300 dark:bg-gray-700 transition-colors duration-300 focus:outline-none"
    >
      <span
        className={`
          absolute top-1 left-1 w-6 h-6 rounded-full bg-white dark:bg-black flex items-center justify-center
          transition-all duration-300 transform
          ${isDark ? 'translate-x-6' : 'translate-x-0'}
        `}
      >
        {isDark ? (
          <Moon className="w-4 h-4 text-yellow-300" />
        ) : (
          <Sun className="w-4 h-4 text-yellow-500" />
        )}
      </span>
    </button>
  );
};
