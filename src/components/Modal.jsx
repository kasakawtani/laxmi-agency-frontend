import React from 'react';
import { spacing, borderRadius, transitions } from '../config/colors';
import { getColors } from '../config/colorsTheme';
import { useTheme } from '../context/ThemeContext';

/**
 * Modal/Dialog Component
 * @param {boolean} isOpen - Is modal open
 * @param {function} onClose - Close handler
 * @param {string} title - Modal title
 * @param {React.ReactNode} children - Modal content
 * @param {string} size - Modal size: 'sm', 'md', 'lg'
 */
export function Modal({ isOpen, onClose, title, children, size = 'md', actions = null }) {
  if (!isOpen) return null;

  const { isDarkMode } = useTheme();
  const colors = getColors(isDarkMode);

  const sizeMap = {
    sm: { maxWidth: '400px' },
    md: { maxWidth: '600px' },
    lg: { maxWidth: '800px' },
  };

  const modalStyles = {
    overlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: isDarkMode ? 'rgba(0, 0, 0, 0.7)' : 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1060,
      animation: 'fadeIn 200ms ease-in',
    },
    modal: {
      backgroundColor: colors.background.card,
      borderRadius: borderRadius.lg,
      boxShadow: colors.shadow.xl,
      maxHeight: '90vh',
      overflow: 'auto',
      ...sizeMap[size],
      animation: 'scaleIn 250ms ease-out',
    },
    header: {
      padding: spacing.xl,
      borderBottom: `1px solid ${colors.border.light}`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    title: {
      fontSize: '18px',
      fontWeight: '700',
      color: colors.text.primary,
      margin: 0,
    },
    closeButton: {
      background: 'none',
      border: 'none',
      fontSize: '24px',
      color: colors.text.secondary,
      cursor: 'pointer',
      padding: 0,
      width: '32px',
      height: '32px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: borderRadius.md,
      transition: transitions.fast,
      '&:hover': {
        backgroundColor: colors.neutral[100],
        color: colors.text.primary,
      },
    },
    content: {
      padding: spacing.xl,
    },
    footer: {
      padding: spacing.xl,
      borderTop: `1px solid ${colors.border.light}`,
      display: 'flex',
      gap: spacing.md,
      justifyContent: 'flex-end',
    },
  };

  return (
    <div style={modalStyles.overlay} onClick={onClose}>
      <div style={modalStyles.modal} onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        {title && (
          <div style={modalStyles.header}>
            <h2 style={modalStyles.title}>{title}</h2>
            <button
              onClick={onClose}
              style={modalStyles.closeButton}
              aria-label="Close modal"
            >
              ✕
            </button>
          </div>
        )}

        {/* Content */}
        <div style={modalStyles.content}>{children}</div>

        {/* Footer Actions */}
        {actions && <div style={modalStyles.footer}>{actions}</div>}
      </div>
    </div>
  );
}
