import React, { useEffect, useState } from 'react';
import { MdLightMode } from "react-icons/md";
import { MdNightlight } from "react-icons/md";
import './ThemeToggle.css'; // Import your CSS for styling

function ThemeToggle() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-theme');
      localStorage.setItem('theme', 'dark');
    } else {
      document.body.classList.remove('dark-theme');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setDarkMode(true);
    }
  }, []);

  return (
    <button 
      onClick={() => setDarkMode(!darkMode)}
      className="theme-toggle"
    >
      {darkMode ? <MdNightlight /> : <MdLightMode />}
    </button>
  );
}

export default ThemeToggle;