import React, { useEffect, useState } from 'react';
import AdminSidebar from '../components/AdminSidebar';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { ThemeToggle } from '../components/ThemeToggle';
import { spacing, borderRadius } from '../config/colors';
import { getColors } from '../config/colorsTheme';
import { useTheme } from '../context/ThemeContext';
import { getInquiries } from '../api/api';

export default function AdminInquiries() {
  const { isDarkMode } = useTheme();
  const colors = getColors(isDarkMode);
  const [inquiries, setInquiries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchInquiries();
  }, []);

  const fetchInquiries = async () => {
    setIsLoading(true);
    setError('');
    try {
      const res = await getInquiries();
      console.log('Inquiries response:', res.data);
      setInquiries(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error('Error fetching inquiries:', err);
      setError('Failed to load inquiries. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const pageStyles = {
    container: {
      display: 'flex',
      height: '100vh',
      backgroundColor: colors.background.main,
    },
    mainContent: {
      marginLeft: '260px',
      flex: 1,
      overflowY: 'auto',
      padding: spacing.xxxl,
      animation: 'fadeIn 400ms ease-in',
    },
    contentWrapper: {
      maxWidth: '1200px',
      margin: '0 auto',
    },
    header: {
      marginBottom: spacing.xxxl,
      animation: 'slideInDown 500ms ease-out',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    title: {
      fontSize: '32px',
      fontWeight: '700',
      color: colors.text.primary,
      margin: 0,
      letterSpacing: '-0.5px',
    },
    subtitle: {
      fontSize: '14px',
      color: colors.text.secondary,
      lineHeight: '1.6',
      marginTop: spacing.md,
    },
    tableCard: {
      backgroundColor: colors.background.card,
      borderRadius: borderRadius.lg,
      overflow: 'hidden',
      boxShadow: colors.shadow.md,
      animation: 'slideInUp 500ms ease-out',
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse',
    },
    th: {
      textAlign: 'left',
      padding: `${spacing.lg}`,
      fontSize: '13px',
      fontWeight: '700',
      color: colors.text.secondary,
      borderBottom: `1px solid ${colors.border.light}`,
      backgroundColor: isDarkMode ? '#1e293b' : colors.neutral[50],
    },
    td: {
      padding: `${spacing.lg}`,
      fontSize: '14px',
      color: colors.text.primary,
      borderBottom: `1px solid ${colors.border.light}`,
    },
    emptyState: {
      textAlign: 'center',
      padding: spacing.xxl,
      color: colors.text.secondary,
    },
    errorMessage: {
      padding: spacing.lg,
      backgroundColor: colors.danger.lighter,
      border: `1px solid ${colors.danger.light}`,
      borderRadius: borderRadius.md,
      color: colors.danger.dark,
      marginBottom: spacing.lg,
      animation: 'slideInDown 300ms ease-out',
      fontSize: '14px',
      fontWeight: '500',
    },
    brandBadge: {
      display: 'inline-block',
      padding: `${spacing.xs} ${spacing.md}`,
      backgroundColor: colors.primary.lighter,
      color: colors.primary.dark,
      borderRadius: borderRadius.full,
      fontSize: '12px',
      fontWeight: '600',
    },
  };

  const formatDate = (dateString) => {
    if (!dateString) return '—';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  return (
    <div style={pageStyles.container}>
      <AdminSidebar />

      <div style={pageStyles.mainContent}>
        <div style={pageStyles.contentWrapper}>
          {/* Header */}
          <div style={pageStyles.header}>
            <div>
              <h1 style={pageStyles.title}>Inquiries</h1>
              <p style={pageStyles.subtitle}>
                View all customer inquiries and contact details.
              </p>
            </div>
            <ThemeToggle />
          </div>

          {/* Error Message */}
          {error && <div style={pageStyles.errorMessage}>{error}</div>}

          {/* Content */}
          {isLoading ? (
            <div style={{ padding: spacing.xxl }}>
              <LoadingSpinner size="md" />
            </div>
          ) : inquiries.length === 0 ? (
            <div style={pageStyles.emptyState}>
              <div style={{ fontSize: '40px', marginBottom: spacing.md }}>📭</div>
              <div>No inquiries yet.</div>
            </div>
          ) : (
            <div style={pageStyles.tableCard}>
              <table style={pageStyles.table}>
                <thead>
                  <tr>
                    <th style={pageStyles.th}>Name</th>
                    <th style={pageStyles.th}>Contact Number</th>
                    <th style={pageStyles.th}>Brand</th>
                    <th style={pageStyles.th}>Message</th>
                    <th style={pageStyles.th}>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {inquiries.map((inquiry) => (
                    <tr key={inquiry._id}>
                      <td style={pageStyles.td}>{inquiry.name}</td>
                      <td style={pageStyles.td}>{inquiry.contactNumber}</td>
                      <td style={pageStyles.td}>
                        {inquiry.brand ? (
                          <span style={pageStyles.brandBadge}>{inquiry.brand}</span>
                        ) : (
                          '—'
                        )}
                      </td>
                      <td style={{ ...pageStyles.td, maxWidth: '300px', wordWrap: 'break-word' }}>
                        {inquiry.message}
                      </td>
                      <td style={pageStyles.td}>{formatDate(inquiry.createdAt)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
