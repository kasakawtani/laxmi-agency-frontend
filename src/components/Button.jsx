import React from 'react';
import { spacing, borderRadius, transitions } from '../config/colors';
import { getColors } from '../config/colorsTheme';
import { useTheme } from '../context/ThemeContext';

/**
 * Reusable Button Component
 * @param {string} variant - Button variant: 'primary', 'secondary', 'danger', 'ghost'
 * @param {string} size - Button size: 'sm', 'md', 'lg'
 * @param {function} onClick - Click handler
 * @param {boolean} disabled - Disabled state
 * @param {boolean} isLoading - Loading state
 * @param {React.ReactNode} children - Button content
 * @param {string} type - Button type: 'button', 'submit', 'reset'
 * @param {boolean} fullWidth - Full width button
 * @param {string} icon - Optional icon/emoji prefix
 */
export function Button({
  variant = 'primary',
  size = 'md',
  onClick,
  disabled = false,
  isLoading = false,
  children,
  type = 'button',
  fullWidth = false,
  icon = '',
  className = '',
}) {
  const { isDarkMode } = useTheme();
  const colors = getColors(isDarkMode);

  const variantStyles = {
    primary: {
      backgroundColor: colors.brand.main,
      color: colors.brand.contrastText,
      border: `2px solid ${colors.brand.main}`,
      '&:hover': {
        backgroundColor: colors.secondary.main,
        borderColor: colors.secondary.main,
        boxShadow: colors.shadow.lg,
        transform: 'translateY(-2px)',
      },
    },
    secondary: {
      backgroundColor: colors.secondary.main,
      color: colors.text.white,
      border: `2px solid ${colors.secondary.main}`,
      '&:hover': {
        backgroundColor: colors.secondary.dark,
        borderColor: colors.secondary.dark,
        boxShadow: colors.shadow.lg,
        transform: 'translateY(-2px)',
      },
    },
    danger: {
      backgroundColor: colors.danger.main,
      color: colors.text.white,
      border: `2px solid ${colors.danger.main}`,
      '&:hover': {
        backgroundColor: colors.danger.dark,
        borderColor: colors.danger.dark,
        boxShadow: colors.shadow.lg,
        transform: 'translateY(-2px)',
      },
    },
    ghost: {
      backgroundColor: 'transparent',
      color: colors.brand.main,
      border: `2px solid ${colors.border.light}`,
      '&:hover': {
        backgroundColor: colors.brand.lighter,
        borderColor: colors.brand.main,
        color: colors.brand.main,
      },
    },
  };

  const sizeStyles = {
    sm: {
      padding: `${spacing.sm} ${spacing.md}`,
      fontSize: '13px',
      fontWeight: '500',
    },
    md: {
      padding: `${spacing.md} ${spacing.lg}`,
      fontSize: '14px',
      fontWeight: '600',
    },
    lg: {
      padding: `${spacing.lg} ${spacing.xl}`,
      fontSize: '16px',
      fontWeight: '600',
    },
  };

  const baseStyles = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    borderRadius: borderRadius.md,
    cursor: disabled || isLoading ? 'not-allowed' : 'pointer',
    transition: transitions.fast,
    fontFamily: 'inherit',
    fontWeight: '600',
    border: 'none',
    outline: 'none',
    opacity: disabled || isLoading ? 0.6 : 1,
    width: fullWidth ? '100%' : 'auto',
    position: 'relative',
    whiteSpace: 'nowrap',
    ...variantStyles[variant],
    ...sizeStyles[size],
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || isLoading}
      style={baseStyles}
      className={className}
    >
      {isLoading ? (
        <span style={{ animation: 'spin 1s linear infinite' }}>⏳</span>
      ) : icon ? (
        <span>{icon}</span>
      ) : null}
      {children}
    </button>
  );
}
