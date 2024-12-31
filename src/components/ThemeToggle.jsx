import React from 'react';
import { Sun, Moon } from 'lucide-react';

const ThemeToggle = ({ isDark = false, className = '', position = 'fixed', onToggle }) => {
  // Styles de base pour les différentes positions
  const positionStyles = {
    fixed: 'fixed top-6 right-6',
    absolute: 'absolute top-6 right-6',
    relative: 'relative',
    none: ''
  };

  // Classes de base du bouton
  const baseStyles = `
    p-2 
    rounded-full 
    z-30 
    transition-all 
    duration-200 
    hover:scale-110 
    active:scale-95
  `;

  // Classes spécifiques au thème
  const themeStyles = isDark
    ? 'bg-slate-700 text-yellow-400 hover:bg-slate-600 hover:text-yellow-300'
    : 'bg-slate-200 text-slate-700 hover:bg-slate-300';

  return (
    <button
      onClick={onToggle}
      aria-label={isDark ? 'Activer le mode clair' : 'Activer le mode sombre'}
      className={`
        ${baseStyles}
        ${themeStyles}
        ${positionStyles[position]} 
        ${className}
      `}
    >
      {isDark ? (
        <Sun className="w-5 h-5" />
      ) : (
        <Moon className="w-5 h-5" />
      )}
    </button>
  );
};

export default ThemeToggle;