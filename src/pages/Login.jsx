import React, { useState } from 'react';
import API from '../api/api';
import { FormInput } from '../components/FormInput';
import { Button } from '../components/Button';
import { colors, spacing, borderRadius, transitions } from '../config/colors';
import { getColors } from '../config/colorsTheme';
import { useTheme } from '../context/ThemeContext';
import { useNavigate, useLocation } from 'react-router-dom';

export default function Login() {
  const { isDarkMode } = useTheme();
  const themeColors = getColors(isDarkMode);
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();
  const location = useLocation();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    try {
      const res = await API.post('/auth/login', { email, password });
      console.log('Login response:', res.data);

      // Only proceed if we have both token and role
      if (!res.data?.token || !res.data?.role) {
        setError('Login failed: Invalid response from server');
        return;
      }

      // Save token and role
      localStorage.setItem('authToken', res.data.token);
      localStorage.setItem('role', res.data.role);
      localStorage.setItem('email', res.data.email);
      console.log('Auth data saved:', { token: res.data.token, role: res.data.role });

      // Navigate based on role
      if (res.data.role === 'admin') {
        console.log('Admin login successful, redirecting to /admin/add-item');
        navigate('/admin/add-item');
      } else {
        console.log('Customer login, redirecting to /customer');
        const from = location.state?.from?.pathname || '/customer';
        navigate(from);
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('Invalid email or password');
    } finally {
      setIsLoading(false);
    }
  };

  const pageStyles = {
    container: {
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: themeColors.background.main,
      animation: 'fadeIn 400ms ease-in',
    },
    card: {
      width: '360px',
      backgroundColor: themeColors.background.card,
      padding: spacing.xxl,
      borderRadius: borderRadius.lg,
      boxShadow: themeColors.shadow.lg,
      animation: 'scaleIn 300ms ease-out',
      border: `2px solid ${themeColors.border.light}`,
    },
    logo: {
      textAlign: 'center',
      fontSize: '20px',
      fontWeight: '700',
      background: themeColors.gradient.brand,
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      marginBottom: spacing.lg,
    },
    subtitle: {
      textAlign: 'center',
      color: themeColors.text.secondary,
      fontSize: '13px',
      marginBottom: spacing.lg,
    },
    error: {
      marginBottom: spacing.md,
      color: themeColors.danger.main,
      fontWeight: '600',
      fontSize: '13px',
      animation: 'slideInDown 300ms ease-out',
    },
  };

  return (
    <div style={pageStyles.container}>
      <form onSubmit={handleLogin} style={pageStyles.card}>
        <div style={pageStyles.logo}>LAXMI AGENCY</div>
        <div style={pageStyles.subtitle}>Sign in to manage inventory</div>

        {error && <div style={pageStyles.error}>{error}</div>}

        <FormInput
          label="Email"
          name="email"
          type="email"
          placeholder="you@company.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <FormInput
          label="Password"
          name="password"
          type="password"
          placeholder="Your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <Button type="submit" variant="primary" size="lg" isLoading={isLoading} fullWidth>
          Sign In
        </Button>

        <div style={{ marginTop: spacing.md, textAlign: 'center', color: colors.text.secondary, fontSize: '13px' }}>
          Forgot password? <a href="#" style={{ color: colors.brand ? colors.brand.main : colors.primary.main, textDecoration: 'none' }}>Reset</a>
        </div>
      </form>
    </div>
  );
}
