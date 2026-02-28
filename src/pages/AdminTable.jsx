import React, { useEffect, useState } from 'react';
import AdminSidebar from '../components/AdminSidebar';
import { Button } from '../components/Button';
import { Modal } from '../components/Modal';
import { FormInput } from '../components/FormInput';
import { ThemeToggle } from '../components/ThemeToggle';
import { spacing, borderRadius, transitions } from '../config/colors';
import { getColors } from '../config/colorsTheme';
import { useTheme } from '../context/ThemeContext';
import API from '../api/api';

/**
 * AdminTable - Manage Items Page
 * Features: Search, sorting, animations, modern table design
 */
export default function AdminTable() {
  const { isDarkMode } = useTheme();
  const colors = getColors(isDarkMode);
  
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [search, setSearch] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [sortConfig, setSortConfig] = useState({ key: 'itemName', direction: 'asc' });
  const [deleteId, setDeleteId] = useState(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [editLoading, setEditLoading] = useState(false);
  const [editErrors, setEditErrors] = useState({});

  /**
   * Fetch all items
   */
  useEffect(() => {
    fetchItems();
  }, []);

  /**
   * Filter and sort items when search or items change
   */
  useEffect(() => {
    let result = items.filter((item) =>
      item.itemName.toLowerCase().includes(search.toLowerCase())
    );

    // Sort items
    result = result.sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];

      if (typeof aValue === 'string') {
        return sortConfig.direction === 'asc'
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }
      return sortConfig.direction === 'asc' ? aValue - bValue : bValue - aValue;
    });

    setFilteredItems(result);
  }, [items, search, sortConfig]);

  const fetchItems = async () => {
    setIsLoading(true);
    try {
      const response = await API.get('/items');
      setItems(response.data);
    } catch (error) {
      console.error('Error fetching items:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this item?')) {
      return;
    }

    try {
      await API.delete(`/items/${id}`);
      setItems(items.filter((item) => item._id !== id));
      setDeleteId(null);
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  const handleEditClick = (item) => {
    setEditingItem(item);
    setEditForm({
      itemName: item.itemName || '',
      category: item.category || '',
      supplierName: item.supplierName || item.sellerName || '',
      contact: item.contact || '',
    });
    setEditErrors({});
    setIsEditOpen(true);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm((s) => ({ ...s, [name]: value }));
  };

  const handleSave = async () => {
    if (!editingItem) return;
    setEditLoading(true);
    try {
      const response = await API.put(`/items/${editingItem._id}`, editForm);
      const updated = response.data;
      setItems((prev) => prev.map((it) => (it._id === updated._id ? updated : it)));
      setIsEditOpen(false);
      setEditingItem(null);
    } catch (error) {
      console.error('Error updating item:', error);
      setEditErrors({ submit: 'Error saving item. Please try again.' });
    } finally {
      setEditLoading(false);
    }
  };

  const handleSort = (key) => {
    setSortConfig({
      key,
      direction: sortConfig.key === key && sortConfig.direction === 'asc' ? 'desc' : 'asc',
    });
  };

  // Build a professional WhatsApp message and return wa.me URL with encoded text
  const buildWhatsAppUrl = (item) => {
    if (!item) return 'https://wa.me/';
    const name = item.itemName || '—';
    const category = item.category || '—';
    const supplier = item.supplierName || item.sellerName || '—';
    const contact = item.contact || '—';

    const lines = [
      `*Product Details*`,
      `Item Name: ${name}`,
      `Category: ${category}`,
      `Supplier: ${supplier}`,
      `Contact: ${contact}`,
      '',
      `Shared via Laxmi Agency`,
    ];

    const message = lines.join('\n');
    const encoded = encodeURIComponent(message);
    return `https://wa.me/?text=${encoded}`;
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
    },
    title: {
      fontSize: '32px',
      fontWeight: '700',
      color: colors.text.primary,
      marginBottom: spacing.md,
    },
    subtitle: {
      fontSize: '14px',
      color: colors.text.secondary,
    },
    searchBar: {
      marginBottom: spacing.xxl,
      animation: 'slideInUp 500ms ease-out',
    },
    searchInput: {
      width: '100%',
      maxWidth: '400px',
      padding: `${spacing.md} ${spacing.lg}`,
      fontSize: '14px',
      border: `1px solid ${colors.border.light}`,
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
      animation: 'slideInUp 500ms ease-out',
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse',
      tableLayout: 'auto',
    },
    thead: {
      backgroundColor: colors.neutral[50],
      borderBottom: `2px solid ${colors.border.light}`,
    },
    th: {
      padding: `${spacing.lg} ${spacing.lg}`,
      textAlign: 'left',
      fontSize: '13px',
      fontWeight: '600',
      color: colors.text.secondary,
      cursor: 'pointer',
      userSelect: 'none',
      transition: transitions.fast,
      whiteSpace: 'nowrap',
    },
    thHover: {
      backgroundColor: colors.neutral[100],
      color: colors.text.primary,
    },
    tbody: {
      backgroundColor: colors.background.card,
    },
    tr: {
      borderBottom: `1px solid ${colors.border.light}`,
      transition: transitions.fast,
      animation: 'slideInUp 300ms ease-out',
    },
    trHover: {
      backgroundColor: colors.neutral[50],
    },
    td: {
      padding: `${spacing.lg}`,
      fontSize: '14px',
      color: colors.text.primary,
    },
    tdSecondary: {
      color: colors.text.secondary,
      fontSize: '13px',
    },
    badge: {
      display: 'inline-block',
      padding: `${spacing.xs} ${spacing.md}`,
      backgroundColor: colors.brand.lighter,
      color: colors.brand.dark,
      borderRadius: borderRadius.full,
      fontSize: '12px',
      fontWeight: '600',
      border: `1px solid ${colors.brand.main}`,
    },
    actionButtons: {
      display: 'flex',
      gap: spacing.sm,
      width: '100%',
    },
    emptyState: {
      textAlign: 'center',
      padding: spacing.xxxl,
      color: colors.text.secondary,
      animation: 'fadeIn 400ms ease-in',
    },
    emptyStateIcon: {
      fontSize: '48px',
      marginBottom: spacing.lg,
    },
    loadingState: {
      textAlign: 'center',
      padding: spacing.xxxl,
      animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
    },
  };

  const TableHeader = ({ label, dataKey, sortable = true }) => {
    const [isHovered, setIsHovered] = useState(false);
    const isSorted = sortConfig.key === dataKey;

    return (
      <th
        style={{
          ...pageStyles.th,
          ...(isHovered && pageStyles.thHover),
        }}
        onClick={() => sortable && handleSort(dataKey)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: spacing.sm }}>
          {label}
          {sortable && (
            <span style={{ opacity: isSorted ? 1 : 0.3, fontSize: '12px' }}>
              {isSorted && (sortConfig.direction === 'asc' ? '↑' : '↓')}
            </span>
          )}
        </div>
      </th>
    );
  };

  const TableRow = ({ item, index }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
      <tr
        key={item._id}
        style={{
          ...pageStyles.tr,
          ...(isHovered && pageStyles.trHover),
          animation: `slideInUp 300ms ease-out ${50 * index}ms both`,
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <td style={pageStyles.td}>{item.itemName}</td>
        <td style={pageStyles.td}>
          <span style={pageStyles.badge}>{item.category}</span>
        </td>
        <td style={pageStyles.td}>{item.supplierName || item.sellerName}</td>
        <td style={pageStyles.td}>{item.contact}</td>
        <td style={{ ...pageStyles.td, textAlign: 'center' }}>
          <div style={pageStyles.actionButtons}>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => {
                try {
                  const url = buildWhatsAppUrl(item);
                  window.open(url, '_blank', 'noopener,noreferrer');
                } catch (err) {
                  console.error('Error opening WhatsApp:', err);
                }
              }}
              icon="💬"
            >
              WhatsApp
            </Button>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => handleEditClick(item)}
              icon="✏️"
              // fullWidth
            >
              Edit
            </Button>
            <Button
              variant="danger"
              size="sm"
              onClick={() => handleDelete(item._id)}
              icon="🗑️"
              // fullWidth
            >
              Delete
            </Button>
          </div>
        </td>
      </tr>
    );
  };

  return (
    <div style={pageStyles.container}>
      <AdminSidebar />

      <div style={pageStyles.mainContent}>
        <div style={pageStyles.contentWrapper}>
          {/* Header with Theme Toggle */}
          <div style={{ ...pageStyles.header, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h1 style={pageStyles.title}>Manage Items</h1>
              <p style={pageStyles.subtitle}>
                View, search, and manage all items in your inventory. Click column headers to sort.
              </p>
            </div>
            <ThemeToggle />
          </div>

          {/* Search Bar */}
          <div style={pageStyles.searchBar}>
            <input
              type="text"
              placeholder="🔍 Search by item name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={pageStyles.searchInput}
            />
          </div>

          {/* Table */}
          {isLoading ? (
            <div style={pageStyles.loadingState}>
              <div style={{ fontSize: '24px', marginBottom: spacing.lg }}>⏳ Loading items...</div>
            </div>
          ) : filteredItems.length === 0 ? (
            <div style={pageStyles.emptyState}>
              <div style={pageStyles.emptyStateIcon}>📭</div>
              <h3 style={{ marginBottom: spacing.sm }}>No items found</h3>
              <p style={{ fontSize: '14px', color: colors.text.secondary }}>
                {search ? 'Try adjusting your search terms.' : 'Start by adding a new item.'}
              </p>
            </div>
          ) : (
            <div style={pageStyles.tableCard}>
              <table style={pageStyles.table}>
                <thead style={pageStyles.thead}>
                  <tr>
                        <TableHeader label="Item Name" dataKey="itemName" />
                        <TableHeader label="Category" dataKey="category" />
                        <TableHeader label="Supplier Name" dataKey="supplierName" />
                        <TableHeader label="Contact" dataKey="contact" sortable={false} />
                        <TableHeader label="Actions" dataKey="actions" sortable={false} />
                  </tr>
                </thead>
                <tbody style={pageStyles.tbody}>
                  {filteredItems.map((item, index) => (
                    <TableRow key={item._id} item={item} index={index} />
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Edit Modal */}
          <Modal
            isOpen={isEditOpen}
            onClose={() => { setIsEditOpen(false); setEditingItem(null); }}
            title="Edit Item"
            size="lg"
            actions={
              <>
                <Button variant="ghost" size="md" onClick={() => { setIsEditOpen(false); setEditingItem(null); }} fullWidth>
                  Cancel
                </Button>
                <Button variant="primary" size="md" onClick={handleSave} isLoading={editLoading} fullWidth>
                  Save
                </Button>
              </>
            }
          >
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: spacing.lg }}>
              <FormInput label="Item Name" name="itemName" value={editForm.itemName || ''} onChange={handleEditChange} required />
              <FormInput label="Category" name="category" value={editForm.category || ''} onChange={handleEditChange} required />
              <FormInput label="Supplier Name" name="supplierName" value={editForm.supplierName || ''} onChange={handleEditChange} />
              <div style={{ gridColumn: '1 / -1' }}>
                <FormInput label="Contact" name="contact" value={editForm.contact || ''} onChange={handleEditChange} />
              </div>
              {editErrors.submit && <div style={{ color: colors.danger.main, gridColumn: '1 / -1' }}>{editErrors.submit}</div>}
            </div>
          </Modal>

          {/* Summary */}
          {!isLoading && filteredItems.length > 0 && (
            <div
              style={{
                marginTop: spacing.lg,
                textAlign: 'center',
                color: colors.text.secondary,
                fontSize: '13px',
              }}
            >
              Showing {filteredItems.length} of {items.length} items
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
