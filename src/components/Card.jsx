import React from 'react';
import { colors, spacing, borderRadius } from '../config/colors';

/**
 * Reusable Card Component
 * @param {React.ReactNode} children - Card content
 * @param {boolean} hoverable - Enable hover effect
 * @param {string} className - Additional CSS class
 */
export function Card({ children, hoverable = false, className = '', style = {} }) {
  const cardStyles = {
    container: {
      backgroundColor: colors.background.card,
      borderRadius: borderRadius.lg,
      padding: spacing.lg,
      boxShadow: colors.shadow.md,
      transition: 'all 250ms cubic-bezier(0.4, 0, 0.2, 1)',
      ...style,
      ...(hoverable && {
        cursor: 'pointer',
        '&:hover': {
          boxShadow: colors.shadow.lg,
          transform: 'translateY(-4px)',
        },
      }),
    },
  };

  return (
    <div style={cardStyles.container} className={className}>
      {children}
    </div>
  );
}
