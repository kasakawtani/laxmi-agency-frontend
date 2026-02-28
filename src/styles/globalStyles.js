import { colors, spacing, borderRadius, transitions } from '../config/colors';

// Create and inject global styles
const globalStyles = `
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html, body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background: linear-gradient(135deg, #FDF6F0 0%, #FCE4EC 100%);
    color: ${colors.text.primary};
    scroll-behavior: smooth;
    min-height: 100vh;
  }

  body {
    line-height: 1.6;
    letter-spacing: -0.5px;
    position: relative;
  }

  /* Soft fabric-inspired background effect */
  body::before {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle at 20% 50%, rgba(194, 24, 91, 0.02) 0%, transparent 50%),
                radial-gradient(circle at 80% 80%, rgba(27, 94, 32, 0.02) 0%, transparent 50%);
    pointer-events: none;
    z-index: 0;
  }

  /* ============== ANIMATIONS ============== */

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes slideInLeft {
    from {
      opacity: 0;
      transform: translateX(-20px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  @keyframes slideInRight {
    from {
      opacity: 0;
      transform: translateX(20px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  @keyframes slideInUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes slideInDown {
    from {
      opacity: 0;
      transform: translateY(-20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes scaleIn {
    from {
      opacity: 0;
      transform: scale(0.95);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }

  @keyframes pulse {
    0%, 100% {
      opacity: 1;
    }
    50% {
      opacity: 0.5;
    }
  }

  @keyframes shimmer {
    0% {
      background-position: -1000px 0;
    }
    100% {
      background-position: 1000px 0;
    }
  }

  @keyframes bounce {
    0%, 100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-5px);
    }
  }

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  /* ============== BRAND ANIMATIONS ============== */

  @keyframes logoFadeScale {
    from {
      opacity: 0;
      transform: scale(0.95);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }

  @keyframes softGlow {
    0%, 100% {
      box-shadow: 0 0 20px rgba(194, 24, 91, 0.1);
    }
    50% {
      box-shadow: 0 0 30px rgba(194, 24, 91, 0.15);
    }
  }

  @keyframes slideInUpSmooth {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes floatUp {
    0%, 100% {
      transform: translateY(0px);
    }
    50% {
      transform: translateY(-10px);
    }
  }

  @keyframes hoverLift {
    from {
      transform: translateY(0);
    }
    to {
      transform: translateY(-4px);
    }
  }

  /* ============== UTILITY CLASSES ============== */

  .fadeIn {
    animation: fadeIn ${transitions.base} ease-in;
  }

  .slideInLeft {
    animation: slideInLeft ${transitions.base} ease-out;
  }

  .slideInRight {
    animation: slideInRight ${transitions.base} ease-out;
  }

  .slideInUp {
    animation: slideInUp ${transitions.base} ease-out;
  }

  .slideInDown {
    animation: slideInDown ${transitions.base} ease-out;
  }

  .scaleIn {
    animation: scaleIn ${transitions.base} ease-out;
  }

  .pulse {
    animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  }

  .spin {
    animation: spin 1s linear infinite;
  }

  .bounce {
    animation: bounce 2s infinite;
  }

  /* ============== SCROLLBAR STYLING ============== */

  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  ::-webkit-scrollbar-track {
    background: ${colors.neutral[100]};
  }

  ::-webkit-scrollbar-thumb {
    background: ${colors.neutral[300]};
    border-radius: 4px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: ${colors.neutral[400]};
  }

  /* ============== TRANSITIONS ============== */

  a, button, input, select, textarea {
    transition: all ${transitions.fast};
  }

  /* ============== FOCUS STYLES ============== */

  :focus-visible {
    outline: 2px solid ${colors.primary.main};
    outline-offset: 2px;
  }
`;

export const injectGlobalStyles = () => {
  const style = document.createElement('style');
  style.textContent = globalStyles;
  document.head.appendChild(style);
};

export default globalStyles;
