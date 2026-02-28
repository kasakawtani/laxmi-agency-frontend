import React, { useEffect, useState } from 'react';
import { Badge } from '../components/Badge';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { spacing, borderRadius, transitions } from '../config/colors';
import { getColors } from '../config/colorsTheme';
import { useTheme } from '../context/ThemeContext';
import API from '../api/api';

export default function Customer() {
  const { isDarkMode } = useTheme();
  const colors = getColors(isDarkMode);
  const [items, setItems] = useState([]);
  const [uniqueItems, setUniqueItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchItems();
  }, []);

  // Extract unique, sorted categories from items
  useEffect(() => {
    // First, deduplicate items
    const seen = new Set();
    const deduped = items.filter((item) => {
      const key = `${item.itemName}__${item.category}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });

    setUniqueItems(deduped);

    const uniqueCategories = [...new Set(deduped.map((item) => item.category).filter(Boolean))];
    const sortedCategories = uniqueCategories.sort((a, b) => a.localeCompare(b));
    setCategories(sortedCategories);
  }, [items]);

  // Filter items by category and search, removing duplicates
  useEffect(() => {
    // Start from deduplicated list
    let result = uniqueItems.slice();

    // Filter by category
    if (selectedCategory !== 'all') {
      result = result.filter((item) => item.category === selectedCategory);
    }

    // Filter by search
    if (search && search.trim()) {
      result = result.filter((item) => item.itemName.toLowerCase().includes(search.toLowerCase()));
    }

    setFilteredItems(result);
  }, [uniqueItems, search, selectedCategory]);

  const fetchItems = async () => {
    setIsLoading(true);
    try {
          const res = await API.get('/items');
      setItems(res.data || []);
    } catch (err) {
      console.error('Error fetching items:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const pageStyles = {
    pageContainer: {
      minHeight: '100vh',
      backgroundColor: colors.background.main,
      animation: 'fadeIn 400ms ease-in',
      display: 'flex',
    },
    sidebar: {
      width: '260px',
      backgroundColor: colors.background.card,
      padding: spacing.lg,
      borderRight: `1px solid ${colors.border.light}`,
      boxShadow: colors.shadow.sm,
      overflowY: 'auto',
      maxHeight: '100vh',
    },
    sidebarTitle: {
      fontSize: '14px',
      fontWeight: '700',
      color: colors.text.primary,
      marginBottom: spacing.lg,
      textTransform: 'uppercase',
      letterSpacing: '0.5px',
    },
    categoryButton: (isActive) => ({
      width: '100%',
      padding: `${spacing.md} ${spacing.lg}`,
      marginBottom: spacing.sm,
      border: isActive ? `2px solid ${colors.brand.main}` : `2px solid transparent`,
      borderRadius: borderRadius.md,
      fontSize: '14px',
      fontWeight: 600,
      cursor: 'pointer',
      transition: transitions.fast,
      backgroundColor: isActive ? colors.brand.lighter : 'transparent',
      color: isActive ? colors.brand.main : colors.text.primary,
      textAlign: 'left',
      '&:hover': {
        backgroundColor: isActive ? colors.brand.lighter : colors.background.hover,
        borderColor: colors.brand.main,
      },
    }),
    mainContent: {
      flex: 1,
      padding: spacing.xxxl,
      overflowY: 'auto',
    },
    contentWrapper: {
      maxWidth: '1000px',
      margin: '0 auto',
    },
    header: {
      marginBottom: spacing.xxl,
    },
    title: {
      fontSize: '28px',
      fontWeight: '700',
      color: colors.text.primary,
      marginBottom: spacing.md,
    },
    searchInput: {
      width: '100%',
      maxWidth: '420px',
      padding: `${spacing.md} ${spacing.lg}`,
      fontSize: '14px',
      border: `2px solid ${colors.border.light}`,
      borderRadius: borderRadius.md,
      backgroundColor: colors.background.card,
      color: colors.text.primary,
      transition: transitions.fast,
      boxShadow: colors.shadow.sm,
    },
    tableCard: {
      backgroundColor: colors.background.card,
      borderRadius: borderRadius.lg,
      overflow: 'hidden',
      boxShadow: colors.shadow.md,
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse',
    },
    th: {
      textAlign: 'left',
      padding: `${spacing.lg}`,
      fontSize: '13px',
      color: colors.text.secondary,
      borderBottom: `1px solid ${colors.border.light}`,
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
  };

  return (
    <div style={pageStyles.pageContainer}>
      {/* Category Sidebar */}
      <aside style={pageStyles.sidebar}>
        <div style={pageStyles.sidebarTitle}>Categories</div>

        {/* "All" button */}
        <button
          onClick={() => setSelectedCategory('all')}
          style={{
            ...pageStyles.categoryButton(selectedCategory === 'all'),
            backgroundColor: selectedCategory === 'all' ? colors.brand.main : 'transparent',
            color: selectedCategory === 'all' ? '#fff' : colors.text.primary,
            fontWeight: selectedCategory === 'all' ? 700 : 600,
            animation: 'slideInRight 300ms ease-out 50ms both',
          }}
        >
          All Items ({uniqueItems.length})
        </button>

        {/* Category buttons */}
        {isLoading ? (
          <div style={{ padding: spacing.lg }}>
            <LoadingSpinner size="sm" />
          </div>
        ) : categories.length === 0 ? (
          <div style={{ fontSize: '13px', color: colors.text.secondary, padding: spacing.md }}>
            No categories
          </div>
          ) : (
          categories.map((category, index) => {
            // Count unique items in this category from deduplicated list
            const categoryCount = uniqueItems.filter((item) => item.category === category).length;
            return (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                style={{
                  ...pageStyles.categoryButton(selectedCategory === category),
                  backgroundColor: selectedCategory === category ? colors.brand.main : 'transparent',
                  color: selectedCategory === category ? '#fff' : colors.text.primary,
                  fontWeight: selectedCategory === category ? 700 : 600,
                  animation: `slideInRight 300ms ease-out ${50 * (index + 1)}ms both`,
                }}
              >
                {category} ({categoryCount})
              </button>
            );
          })
        )}
      </aside>

      {/* Main Content */}
      <div style={pageStyles.mainContent}>
        <div style={pageStyles.contentWrapper}>
          <div style={pageStyles.header}>
            <h1 style={pageStyles.title}>Customer Portal</h1>
            <p style={{ color: colors.text.secondary }}>
              {selectedCategory === 'all'
                ? 'Browse all available items'
                : `Items in category: ${selectedCategory}`}
            </p>
          </div>

          <div style={{ marginBottom: spacing.xl }}>
            <input
              placeholder="Search item name"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={pageStyles.searchInput}
            />
          </div>

          {isLoading ? (
            <div style={{ padding: spacing.xxl }}>
              <LoadingSpinner size="md" />
            </div>
          ) : filteredItems.length === 0 ? (
            <div style={pageStyles.emptyState}>
              <div style={{ fontSize: '40px', marginBottom: spacing.md }}>📭</div>
              <div>No items found{search ? ' for your search' : ''}.</div>
            </div>
          ) : (
            <div style={pageStyles.tableCard}>
              <table style={pageStyles.table}>
                <thead>
                  <tr>
                    <th style={pageStyles.th}>Item Name</th>
                    <th style={pageStyles.th}>Category</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredItems.map((item) => (
                    <tr key={item._id}>
                      <td style={pageStyles.td}>{item.itemName}</td>
                      <td style={pageStyles.td}>
                        <Badge variant="primary">{item.category || '—'}</Badge>
                      </td>
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
