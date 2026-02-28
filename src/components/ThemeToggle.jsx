import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { spacing, borderRadius, transitions } from '../config/colors';
import { getColors } from '../config/colorsTheme';

/**
 * ThemeToggle Button Component
 * Renders a sun/moon icon button to toggle between light and dark modes
 */
export function ThemeToggle() {
  const { isDarkMode, toggleTheme } = useTheme();
  const themeColors = getColors(isDarkMode);

  const buttonStyles = {
    button: {
      background: themeColors.brand ? themeColors.brand.main : 'none',
      border: 'none',
      color: themeColors.brand ? themeColors.brand.contrastText : undefined,
      fontSize: '20px',
      cursor: 'pointer',
      padding: spacing.md,
      borderRadius: borderRadius.md,
      transition: transitions.fast,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '44px',
      height: '44px',
    },
  };

  return (
    <button
      onClick={toggleTheme}
      style={buttonStyles.button}
      title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      aria-label="Toggle theme"
    >
      {isDarkMode ? '☀️' : '🌙'}
    </button>
  );
}
