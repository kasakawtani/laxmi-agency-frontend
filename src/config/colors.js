// Professional E-commerce Color Palette
export const colors = {
  // Primary Colors
  primary: {
    main: '#2563EB',      // Professional Blue
    dark: '#1E40AF',      // Darker Blue
    light: '#DBEAFE',     // Light Blue
    lighter: '#EFF6FF',   // Very Light Blue
  },

  // Secondary Colors
  secondary: {
    main: '#10B981',      // Success Green
    dark: '#047857',
    light: '#D1FAE5',
    lighter: '#F0FDF4',
  },

  // Danger/Error Colors
  danger: {
    main: '#EF4444',      // Red
    dark: '#DC2626',
    light: '#FEE2E2',
    lighter: '#FEF2F2',
  },

  // Warning Colors
  warning: {
    main: '#F59E0B',      // Amber
    dark: '#D97706',
    light: '#FEF3C7',
    lighter: '#FFFBEB',
  },

  // Neutral Colors
  neutral: {
    white: '#FFFFFF',
    black: '#000000',
    50: '#F9FAFB',
    100: '#F3F4F6',
    200: '#E5E7EB',
    300: '#D1D5DB',
    400: '#9CA3AF',
    500: '#6B7280',
    600: '#4B5563',
    700: '#374151',
    800: '#1F2937',
    900: '#111827',
  },

  // Text Colors
  text: {
    primary: '#111827',   // Dark for primary text
    secondary: '#6B7280', // Gray for secondary text
    light: '#9CA3AF',     // Light gray for disabled/hint text
    white: '#FFFFFF',
  },

  // Background Colors
  background: {
    main: '#F9FAFB',      // Off-white
    card: '#FFFFFF',
    hover: '#F3F4F6',
    active: '#E5E7EB',
  },

  // Border Colors
  border: {
    light: '#E5E7EB',
    default: '#D1D5DB',
    dark: '#9CA3AF',
  },

  // Gradient
  gradient: {
    primary: 'linear-gradient(135deg, #2563EB 0%, #1E40AF 100%)',
    success: 'linear-gradient(135deg, #10B981 0%, #047857 100%)',
    danger: 'linear-gradient(135deg, #EF4444 0%, #DC2626 100%)',
  },

  // Shadows (for elevation)
  shadow: {
    xs: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    sm: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  },
};

// Spacings
export const spacing = {
  xs: '4px',
  sm: '8px',
  md: '12px',
  lg: '16px',
  xl: '24px',
  xxl: '32px',
  xxxl: '48px',
};

// Border Radius
export const borderRadius = {
  none: '0',
  sm: '4px',
  md: '8px',
  lg: '12px',
  xl: '16px',
  full: '9999px',
};

// Transitions
export const transitions = {
  fast: '150ms cubic-bezier(0.4, 0, 0.2, 1)',
  base: '250ms cubic-bezier(0.4, 0, 0.2, 1)',
  slow: '350ms cubic-bezier(0.4, 0, 0.2, 1)',
};

// Z-index
export const zIndex = {
  dropdown: 1000,
  sticky: 1020,
  fixed: 1030,
  backdrop: 1040,
  offcanvas: 1050,
  modal: 1060,
  popover: 1070,
  tooltip: 1080,
};
