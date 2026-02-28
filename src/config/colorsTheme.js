// Professional E-commerce Color Palette - Light and Dark Mode
// Laxmi Agency Brand Colors
const lightColors = {
  // Primary Colors (Deep Pink from Laxmi Agency logo)
  primary: {
    main: '#C2185B',
    dark: '#A01849',
    light: '#F8BBD0',
    lighter: '#FCE4EC',
  },

  // Brand (Laxmi Agency logo) - Pink & Green theme
  brand: {
    main: '#C2185B',
    dark: '#A01849',
    lighter: '#FCE4EC',
    contrastText: '#FFFFFF',
  },

  // Secondary Colors (Dark Green from logo)
  secondary: {
    main: '#1B5E20',
    dark: '#145A2B',
    light: '#C8E6C9',
    lighter: '#E8F5E9',
  },

  // Accent Color (Gold for details)
  accent: {
    main: '#C9A646',
    dark: '#A89439',
    light: '#E8DCC4',
    lighter: '#F5EFE5',
  },

  // Danger/Error Colors
  danger: {
    main: '#EF4444',
    dark: '#DC2626',
    light: '#FEE2E2',
    lighter: '#FEF2F2',
  },

  // Warning Colors
  warning: {
    main: '#F59E0B',
    dark: '#D97706',
    light: '#FEF3C7',
    lighter: '#FFFBEB',
  },

  // Neutral Colors
  neutral: {
    white: '#FFFFFF',
    black: '#000000',
    50: '#FAFAF9',
    100: '#F5F5F4',
    200: '#E7E5E4',
    300: '#D6D3D1',
    400: '#A8A29E',
    500: '#78716B',
    600: '#57534E',
    700: '#44403C',
    800: '#292524',
    900: '#1C1917',
  },

  // Text Colors
  text: {
    primary: '#1A1A1A',
    secondary: '#666666',
    light: '#999999',
    white: '#FFFFFF',
  },

  // Background Colors (Soft cream/beige gradient)
  background: {
    main: '#FDF6F0',
    card: '#FFFFFF',
    hover: '#FBF5F0',
    active: '#F9F3EC',
  },

  // Border Colors (Subtle gold accents)
  border: {
    light: '#E7D5BF',
    default: '#D9C9B3',
    dark: '#C9A646',
  },

  // Gradient (Pink to Green brand gradient)
  gradient: {
    primary: 'linear-gradient(135deg, #C2185B 0%, #A01849 100%)',
    brand: 'linear-gradient(90deg, #C2185B 0%, #1B5E20 100%)',
    secondary: 'linear-gradient(135deg, #1B5E20 0%, #145A2B 100%)',
    danger: 'linear-gradient(135deg, #EF4444 0%, #DC2626 100%)',
  },

  // Shadows (for elevation with warm tone)
  shadow: {
    xs: '0 1px 2px 0 rgba(194, 24, 91, 0.05)',
    sm: '0 1px 3px 0 rgba(194, 24, 91, 0.1), 0 1px 2px 0 rgba(194, 24, 91, 0.06)',
    md: '0 4px 6px -1px rgba(194, 24, 91, 0.1), 0 2px 4px -1px rgba(194, 24, 91, 0.06)',
    lg: '0 10px 15px -3px rgba(194, 24, 91, 0.1), 0 4px 6px -2px rgba(194, 24, 91, 0.05)',
    xl: '0 20px 25px -5px rgba(194, 24, 91, 0.1), 0 10px 10px -5px rgba(194, 24, 91, 0.04)',
  },
};

const darkColors = {
  // Primary Colors (Pink for dark mode with adjusted tones)
  primary: {
    main: '#E91E63',
    dark: '#C2185B',
    light: '#F48FB1',
    lighter: '#FCE4EC',
  },

  // Brand (Laxmi Agency logo) - Pink & Green
  brand: {
    main: '#E91E63',
    dark: '#C2185B',
    lighter: '#1F2937',
    contrastText: '#FFFFFF',
  },

  // Secondary Colors (Dark Green)
  secondary: {
    main: '#4CAF50',
    dark: '#1B5E20',
    light: '#81C784',
    lighter: '#1B5E20',
  },

  // Accent Color (Gold)
  accent: {
    main: '#FFC107',
    dark: '#C9A646',
    light: '#FFD54F',
    lighter: '#FFF9C4',
  },

  // Danger/Error Colors
  danger: {
    main: '#EF4444',
    dark: '#991B1B',
    light: '#7F1D1D',
    lighter: '#450A0A',
  },

  // Warning Colors
  warning: {
    main: '#F59E0B',
    dark: '#92400E',
    light: '#78350F',
    lighter: '#451A03',
  },

  // Neutral Colors
  neutral: {
    white: '#FFFFFF',
    black: '#000000',
    50: '#1A1A1A',
    100: '#2D2D2D',
    200: '#3F3F3F',
    300: '#525252',
    400: '#666666',
    500: '#808080',
    600: '#999999',
    700: '#B3B3B3',
    800: '#CCCCCC',
    900: '#E6E6E6',
  },

  // Text Colors
  text: {
    primary: '#F5F5F5',
    secondary: '#B3B3B3',
    light: '#808080',
    white: '#FFFFFF',
  },

  // Background Colors (Dark with pink/green accents)
  background: {
    main: '#1A1A1A',
    card: '#2D2D2D',
    hover: '#3F3F3F',
    active: '#525252',
  },

  // Border Colors (Gold accents)
  border: {
    light: '#4D4D4D',
    default: '#666666',
    dark: '#C9A646',
  },

  // Gradient (Pink to Green)
  gradient: {
    primary: 'linear-gradient(135deg, #E91E63 0%, #C2185B 100%)',
    brand: 'linear-gradient(90deg, #E91E63 0%, #1B5E20 100%)',
    secondary: 'linear-gradient(135deg, #4CAF50 0%, #1B5E20 100%)',
    danger: 'linear-gradient(135deg, #EF4444 0%, #DC2626 100%)',
  },

  // Shadows (for elevation)
  shadow: {
    xs: '0 1px 2px 0 rgba(194, 24, 91, 0.15)',
    sm: '0 1px 3px 0 rgba(194, 24, 91, 0.2), 0 1px 2px 0 rgba(194, 24, 91, 0.15)',
    md: '0 4px 6px -1px rgba(194, 24, 91, 0.2), 0 2px 4px -1px rgba(194, 24, 91, 0.15)',
    lg: '0 10px 15px -3px rgba(194, 24, 91, 0.25), 0 4px 6px -2px rgba(194, 24, 91, 0.15)',
    xl: '0 20px 25px -5px rgba(194, 24, 91, 0.25), 0 10px 10px -5px rgba(194, 24, 91, 0.15)',
  },
};

export const getColors = (isDarkMode) => (isDarkMode ? darkColors : lightColors);

// Spacings (same for both themes)
export const spacing = {
  xs: '4px',
  sm: '8px',
  md: '12px',
  lg: '16px',
  xl: '24px',
  xxl: '32px',
  xxxl: '48px',
};

// Border Radius (same for both themes)
export const borderRadius = {
  none: '0',
  sm: '4px',
  md: '8px',
  lg: '12px',
  xl: '16px',
  full: '9999px',
};

// Transitions (same for both themes)
export const transitions = {
  fast: '150ms cubic-bezier(0.4, 0, 0.2, 1)',
  base: '250ms cubic-bezier(0.4, 0, 0.2, 1)',
  slow: '350ms cubic-bezier(0.4, 0, 0.2, 1)',
};

// Z-index (same for both themes)
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

// Default export for backward compatibility
export const colors = lightColors;
