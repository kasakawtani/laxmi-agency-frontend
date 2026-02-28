import React, { useState, useEffect } from 'react';
import { colors, spacing, borderRadius, transitions } from '../config/colors';

/**
 * Alert Component
 * @param {string} type - Alert type: 'success', 'error', 'warning', 'info'
 * @param {string} message - Alert message
 * @param {number} duration - Auto-close duration in ms (0 = no auto-close)
 * @param {function} onClose - Close handler
 */
export function Alert({ type = 'info', message, duration = 5000, onClose = () => {} }) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        setIsVisible(false);
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  if (!isVisible) return null;

  const typeStyles = {
    success: {
      backgroundColor: colors.secondary.lighter,
      borderColor: colors.secondary.light,
      color: colors.secondary.dark,
      icon: '✓',
    },
    error: {
      backgroundColor: colors.danger.lighter,
      borderColor: colors.danger.light,
      color: colors.danger.dark,
      icon: '✕',
    },
    warning: {
      backgroundColor: colors.warning.lighter,
      borderColor: colors.warning.light,
      color: colors.warning.dark,
      icon: '⚠',
    },
    info: {
      backgroundColor: colors.primary.lighter,
      borderColor: colors.primary.light,
      color: colors.primary.dark,
      icon: 'ℹ',
    },
  };

  const currentType = typeStyles[type];

  const alertStyles = {
    container: {
      display: 'flex',
      alignItems: 'center',
      gap: spacing.md,
      padding: `${spacing.lg} ${spacing.lg}`,
      backgroundColor: currentType.backgroundColor,
      border: `1px solid ${currentType.borderColor}`,
      borderRadius: borderRadius.md,
      color: currentType.color,
      animation: 'slideInDown 300ms ease-out',
      fontSize: '14px',
      fontWeight: '500',
    },
    icon: {
      fontSize: '18px',
      fontWeight: 'bold',
      flexShrink: 0,
    },
    content: {
      flex: 1,
    },
    closeButton: {
      background: 'none',
      border: 'none',
      color: 'inherit',
      cursor: 'pointer',
      fontSize: '18px',
      padding: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: transitions.fast,
      opacity: 0.7,
      '&:hover': {
        opacity: 1,
      },
    },
  };

  return (
    <div style={alertStyles.container}>
      <div style={alertStyles.icon}>{currentType.icon}</div>
      <div style={alertStyles.content}>{message}</div>
      <button
        onClick={() => {
          setIsVisible(false);
          onClose();
        }}
        style={alertStyles.closeButton}
        aria-label="Close alert"
      >
        ✕
      </button>
    </div>
  );
}
