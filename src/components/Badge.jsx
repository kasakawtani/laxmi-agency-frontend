import React from 'react';
import { colors, spacing, borderRadius } from '../config/colors';

/**
 * Badge Component
 * @param {React.ReactNode} children - Badge content
 * @param {string} variant - Badge variant: 'primary', 'secondary', 'danger', 'warning', 'success'
 * @param {string} size - Badge size: 'sm', 'md'
 */
export function Badge({ children, variant = 'primary', size = 'md' }) {
  const variantStyles = {
    primary: {
      backgroundColor: colors.primary.lighter,
      color: colors.primary.dark,
    },
    secondary: {
      backgroundColor: colors.secondary.lighter,
      color: colors.secondary.dark,
    },
    danger: {
      backgroundColor: colors.danger.lighter,
      color: colors.danger.dark,
    },
    warning: {
      backgroundColor: colors.warning.lighter,
      color: colors.warning.dark,
    },
    success: {
      backgroundColor: colors.secondary.lighter,
      color: colors.secondary.dark,
    },
  };

  const sizeStyles = {
    sm: {
      padding: `${spacing.xs} ${spacing.md}`,
      fontSize: '12px',
    },
    md: {
      padding: `${spacing.sm} ${spacing.lg}`,
      fontSize: '13px',
    },
  };

  const badgeStyles = {
    display: 'inline-block',
    borderRadius: borderRadius.full,
    fontWeight: '600',
    whiteSpace: 'nowrap',
    ...variantStyles[variant],
    ...sizeStyles[size],
  };

  return <span style={badgeStyles}>{children}</span>;
}
