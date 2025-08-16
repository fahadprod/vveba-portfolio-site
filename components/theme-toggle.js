"use client";
import { useEffect, useState } from 'react';
import { FaSun, FaMoon } from 'react-icons/fa';

export default function ThemeToggle() {
  const [theme, setTheme] = useState('dark');
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  return (
    <div className="theme-toggle-container">
      <button 
        onClick={toggleTheme} 
        className="theme-toggle"
        aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        onFocus={() => setShowTooltip(true)}
        onBlur={() => setShowTooltip(false)}
      >
        {theme === 'dark' ? (
          <FaSun className="theme-icon" />
        ) : (
          <FaMoon className="theme-icon" />
        )}
      </button>
      {showTooltip && (
        <div className="theme-tooltip">
          Switch to {theme === 'dark' ? 'light' : 'dark'} mode
        </div>
      )}
    </div>
  );
}