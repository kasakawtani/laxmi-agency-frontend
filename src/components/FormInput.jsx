import React from 'react';
import { spacing, borderRadius, transitions } from '../config/colors';
import { getColors } from '../config/colorsTheme';
import { useTheme } from '../context/ThemeContext';

/**
 * Reusable FormInput Component
 * @param {string} label - Input label
 * @param {string} name - Input name attribute
 * @param {string} placeholder - Input placeholder
 * @param {string} value - Input value
 * @param {function} onChange - Change handler
 * @param {string} type - Input type (text, email, password, etc.)
 * @param {string} error - Error message
 * @param {boolean} required - Required field indicator
 * @param {string} disabled - Disabled state
 */
export function FormInput({
  label,
  name,
  placeholder,
  value,
  onChange,
  type = 'text',
  error = '',
  required = false,
  disabled = false,
}) {
  const { isDarkMode } = useTheme();
  const colors = getColors(isDarkMode);

  const inputStyles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      marginBottom: spacing.lg,
      width: '100%',
    },
    label: {
      fontSize: '14px',
      fontWeight: '600',
      color: isDarkMode ? '#E2E8F0' : colors.text.primary,
      marginBottom: spacing.sm,
      display: 'flex',
      alignItems: 'center',
      gap: spacing.xs,
    },
    required: {
      color: colors.danger.main,
      fontWeight: 'bold',
    },
    input: {
      width: '100%',
      padding: `${spacing.md} ${spacing.lg}`,
      fontSize: '14px',
      border: `2px solid ${error ? colors.danger.main : colors.border.light}`,
      borderRadius: borderRadius.md,
      backgroundColor: disabled ? colors.neutral[100] : colors.background.card,
      color: colors.text.primary,
      transition: transitions.fast,
      fontFamily: 'inherit',
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.6 : 1,
    },
    inputFocus: {
      borderColor: error ? colors.danger.main : colors.brand.main,
      boxShadow: `0 0 0 3px ${
        error ? colors.danger.lighter : colors.brand.lighter
      }`,
    },
    errorMessage: {
      fontSize: '13px',
      color: colors.danger.main,
      marginTop: spacing.xs,
      fontWeight: '500',
    },
  };

  const [isFocused, setIsFocused] = React.useState(false);

  return (
    <div style={inputStyles.container}>
      {label && (
        <label style={inputStyles.label}>
          {label}
          {required && <span style={inputStyles.required}>*</span>}
        </label>
      )}
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        style={{
          ...inputStyles.input,
          ...(isFocused && !disabled && inputStyles.inputFocus),
        }}
      />
      {error && <div style={inputStyles.errorMessage}>{error}</div>}
    </div>
  );
}

