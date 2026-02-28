import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { spacing, borderRadius, transitions } from '../config/colors';
import { getColors } from '../config/colorsTheme';
import { useTheme } from '../context/ThemeContext';

/**
 * Modern AdminSidebar Component
 * Features: Smooth animations, active link highlighting, responsive design
 */
export default function AdminSidebar() {
  const { isDarkMode } = useTheme();
  const colors = getColors(isDarkMode);
  const location = useLocation();
  const [isHovered, setIsHovered] = useState(null);

  const sidebarStyles = {
    container: {
      width: '260px',
      height: '100vh',
      backgroundColor: isDarkMode ? '#0F172A' : colors.background.card,
      position: 'fixed',
      left: 0,
      top: 0,
      padding: spacing.lg,
      overflow: 'hidden',
      overflowY: 'auto',
      boxShadow: colors.shadow.xl,
      zIndex: 1000,
      display: 'flex',
      flexDirection: 'column',
      animation: 'slideInLeft 300ms ease-out',
    },
    header: {
      marginBottom: spacing.xxl,
      paddingBottom: spacing.lg,
      borderBottom: `1px solid ${isDarkMode ? '#1E293B' : colors.neutral[700]}`,
      animation: 'slideInDown 400ms ease-out',
    },
    logo: {
      display: 'flex',
      alignItems: 'center',
      gap: spacing.md,
      textDecoration: 'none',
      color: isDarkMode ? colors.text.white : colors.text.primary,
      fontSize: '18px',
      fontWeight: '700',
      letterSpacing: '-0.5px',
      transition: transitions.fast,
      cursor: 'pointer',
    },
    logoIcon: {
      fontSize: '24px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '40px',
      height: '40px',
      borderRadius: borderRadius.md,
      backgroundColor: colors.brand ? colors.brand.main : colors.primary.main,
      animation: 'scaleIn 400ms ease-out 100ms both',
    },
    nav: {
      display: 'flex',
      flexDirection: 'column',
      gap: spacing.sm,
      listStyle: 'none',
      padding: 0,
      margin: 0,
      flex: 1,
    },
    navItem: {
      position: 'relative',
    },
    navLink: {
      display: 'flex',
      alignItems: 'center',
      gap: spacing.md,
      padding: `${spacing.md} ${spacing.lg}`,
      color: isDarkMode ? colors.neutral[400] : colors.text.primary,
      textDecoration: 'none',
      borderRadius: borderRadius.md,
      transition: transitions.fast,
      fontSize: '14px',
      fontWeight: '500',
      cursor: 'pointer',
      position: 'relative',
    },
    navLinkActive: {
      backgroundColor: colors.brand ? colors.brand.main : colors.primary.main,
      color: colors.text.white,
      boxShadow: `0 0 0 3px ${colors.brand ? colors.brand.lighter : colors.primary.lighter}`,
    },
    navLinkHover: {
      backgroundColor: colors.brand ? colors.brand.dark : colors.neutral[800],
      color: colors.text.white,
      paddingLeft: `calc(${spacing.lg} + 4px)`,
    },
    navIcon: {
      fontSize: '18px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minWidth: '24px',
    },
    footer: {
      marginTop: 'auto',
      paddingTop: spacing.lg,
      borderTop: `1px solid ${isDarkMode ? '#1E293B' : colors.neutral[700]}`,
      textAlign: 'center',
      fontSize: '12px',
      color: isDarkMode ? colors.neutral[400] : colors.neutral[500],
      animation: 'slideInUp 300ms ease-out 200ms both',
    },
  };

  const menuItems = [
    {
      path: '/admin/add-item',
      label: 'Add Item',
      icon: '➕',
    },
    {
      path: '/admin/manage-items',
      label: 'Manage Items',
      icon: '📋',
    },
    {
      path: '/admin/inquiries',
      label: 'Inquiries',
      icon: '💬',
    },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <aside style={sidebarStyles.container}>
      {/* Header */}
      <div style={sidebarStyles.header}>
        <div
          style={sidebarStyles.logo}
          onMouseEnter={() => setIsHovered('logo')}
          onMouseLeave={() => setIsHovered(null)}
        >
          <div style={sidebarStyles.logoIcon}>📦</div>
          <span>Admin Hub</span>
        </div>
      </div>

      {/* Navigation */}
      <nav>
        <ul style={sidebarStyles.nav}>
          {menuItems.map((item, index) => (
            <li key={item.path} style={sidebarStyles.navItem}>
              <Link
                to={item.path}
                style={{
                  ...sidebarStyles.navLink,
                  ...(isActive(item.path) && sidebarStyles.navLinkActive),
                  ...(isHovered === item.path && !isActive(item.path) && sidebarStyles.navLinkHover),
                  animation: `slideInRight 300ms ease-out ${50 * (index + 1)}ms both`,
                }}
                onMouseEnter={() => setIsHovered(item.path)}
                onMouseLeave={() => setIsHovered(null)}
              >
                <span style={sidebarStyles.navIcon}>{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Footer */}
      <div style={sidebarStyles.footer}>
        <div>© 2025 Admin Portal</div>
        <div style={{ marginTop: spacing.sm }}>v1.0.0</div>
      </div>
    </aside>
  );
}
