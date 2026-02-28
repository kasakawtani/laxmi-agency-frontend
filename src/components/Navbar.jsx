import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { spacing } from '../config/colors';
import { useTheme } from '../context/ThemeContext';
import { getColors } from '../config/colorsTheme';

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('authToken');
    setIsAuthenticated(!!token);
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('role');
    localStorage.removeItem('email');
    setIsAuthenticated(false);
    navigate('/');
  };

  const { isDarkMode } = useTheme();
  const themeColors = getColors(isDarkMode);
  const [hovered, setHovered] = React.useState(null);

  const styles = {
    container: {
      width: '100%',
      background: themeColors.gradient.brand,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: `${spacing.md} ${spacing.lg}`,
      boxSizing: 'border-box',
      position: 'sticky',
      top: 0,
      zIndex: 900,
      boxShadow: themeColors.shadow.md,
      backdropFilter: 'blur(10px)',
    },
    logoLink: {
      display: 'flex',
      alignItems: 'center',
      textDecoration: 'none',
      color: themeColors.brand.contrastText,
      transition: 'transform 300ms ease-out',
    },
    logoImg: {
      width: 50,
      height: 50,
      objectFit: 'contain',
      animation: 'logoFadeScale 600ms ease-out',
    },
    nav: {
      display: 'flex',
      gap: spacing.lg,
      alignItems: 'center'
    },
    link: (active) => ({
      textDecoration: 'none',
      color: themeColors.brand.contrastText,
      padding: '8px 12px',
      borderRadius: '8px',
      fontWeight: 600,
      cursor: 'pointer',
      background: active ? 'rgba(255, 255, 255, 0.2)' : 'transparent',
      transition: 'all 250ms ease-out',
      borderBottom: active ? `2px solid ${themeColors.brand.contrastText}` : '2px solid transparent',
    }),
    logoutBtn: {
      background: themeColors.brand.contrastText,
      color: themeColors.brand.main,
      border: 'none',
      padding: '8px 16px',
      borderRadius: '8px',
      fontWeight: 600,
      cursor: 'pointer',
      fontSize: '14px',
      transition: 'all 250ms ease-out',
    }
  };

  return (
    <header style={styles.container}>
      <Link to="/" style={styles.logoLink}>
        <img 
          src="/Modern_LAXMI_AGENCY_Logo_in_Pink_and_Green-removebg-preview.png" 
          alt="Laxmi Agency" 
          style={styles.logoImg}
        />
      </Link>

      <nav style={styles.nav}>
        <Link
          to="/"
          onMouseEnter={() => setHovered('/')}
          onMouseLeave={() => setHovered(null)}
          style={{
            ...styles.link(location.pathname === '/'),
            ...(hovered === '/' && { background: themeColors.brand.dark }),
          }}
        >
          Home
        </Link>
        <Link
          to="/customer"
          onMouseEnter={() => setHovered('/customer')}
          onMouseLeave={() => setHovered(null)}
          style={{
            ...styles.link(location.pathname === '/customer'),
            ...(hovered === '/customer' && { background: themeColors.brand.dark }),
          }}
        >
          Customer
        </Link>
        <Link
          to="/admin/add-item"
          onMouseEnter={() => setHovered('/admin')}
          onMouseLeave={() => setHovered(null)}
          style={{
            ...styles.link(location.pathname.startsWith('/admin')),
            ...(hovered === '/admin' && { background: themeColors.brand.dark }),
          }}
        >
          Admin
        </Link>
        <a
          href="#contact"
          onClick={(e) => {
            e.preventDefault();
            navigate('/', { state: { scrollTo: 'contact' } });
          }}
          onMouseEnter={() => setHovered('contact')}
          onMouseLeave={() => setHovered(null)}
          style={{
            ...styles.link(false),
            ...(hovered === 'contact' && { background: themeColors.brand.dark }),
          }}
        >
          Contact Us
        </a>
        {isAuthenticated && (
          <button
            onClick={handleLogout}
            style={styles.logoutBtn}
          >
            Logout
          </button>
        )}
      </nav>
    </header>
  );
}
