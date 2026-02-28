import React from 'react';
import { colors } from '../config/colors';

/**
 * Loading Spinner Component
 * Used for displaying loading states
 */
export function LoadingSpinner({ size = 'md' }) {
  const sizeMap = {
    sm: { width: '24px', height: '24px' },
    md: { width: '40px', height: '40px' },
    lg: { width: '56px', height: '56px' },
  };

  const spinnerStyles = {
    container: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      height: '100%',
    },
    spinner: {
      ...sizeMap[size],
      border: `4px solid ${colors.neutral[200]}`,
      borderTop: `4px solid ${colors.primary.main}`,
      borderRadius: '50%',
      animation: 'spin 1s linear infinite',
    },
  };

  return (
    <div style={spinnerStyles.container}>
      <div style={spinnerStyles.spinner} />
    </div>
  );
}
