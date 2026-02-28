import React, { useState } from 'react';
import AdminSidebar from '../components/AdminSidebar';
import { FormInput } from '../components/FormInput';
import { Button } from '../components/Button';
import { ThemeToggle } from '../components/ThemeToggle';
import { spacing, borderRadius, transitions } from '../config/colors';
import { getColors } from '../config/colorsTheme';
import { useTheme } from '../context/ThemeContext';
import API from '../api/api';

/**
 * Admin - Add Item Page
 * Modern form with validation, animations, and professional UI
 */
export default function Admin() {
  const { isDarkMode } = useTheme();
  const colors = getColors(isDarkMode);

  const [form, setForm] = useState({
    itemName: '',
    category: '',
    supplierName: '',
    contact: '',
    contactNumber: '',
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  // Category options removed — category will be entered manually by user

  /**
   * Validate form data
   */
  const validateForm = () => {
    const newErrors = {};

    if (!form.itemName.trim()) {
      newErrors.itemName = 'Item name is required';
    }
    if (!form.category.trim()) {
      newErrors.category = 'Category is required';
    }
    // Detail/Description removed from form; no validation required
    if (!form.supplierName.trim()) {
      newErrors.supplierName = 'Supplier name is required';
    }
    if (!form.contact.trim()) {
      newErrors.contact = 'Contact number is required';
    } else if (!/^[0-9\-\+\s()]+$/.test(form.contact)) {
      newErrors.contact = 'Invalid contact number';
    }
    // contactNumber is optional, so no validation required

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSave = async () => {
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    try {
      // Build payload without the removed `detail` field
      const payload = {
        itemName: form.itemName,
        category: form.category,
        supplierName: form.supplierName,
        contact: form.contact,
        contactNumber: form.contactNumber,
      };
      await API.post('/items', payload);
      setSuccessMessage('✅ Item added successfully!');

      // Reset form
      setForm({
        itemName: '',
        category: '',
        supplierName: '',
        contact: '',
        contactNumber: '',
      });

      // Clear success message after 3 seconds
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      console.error(error);
      setErrors({ submit: 'Error saving item. Please try again.' });
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
      maxWidth: '600px',
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
      letterSpacing: '-0.5px',
    },
    subtitle: {
      fontSize: '14px',
      color: colors.text.secondary,
      lineHeight: '1.6',
    },
    formCard: {
      backgroundColor: colors.background.card,
      borderRadius: borderRadius.lg,
      padding: spacing.xxl,
      boxShadow: colors.shadow.md,
      animation: 'slideInUp 500ms ease-out',
    },
    formGrid: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: spacing.lg,
      marginBottom: spacing.lg,
    },
    fullWidth: {
      gridColumn: '1 / -1',
    },
    successMessage: {
      padding: spacing.lg,
      backgroundColor: colors.secondary.lighter,
      border: `1px solid ${colors.secondary.light}`,
      borderRadius: borderRadius.md,
      color: colors.secondary.dark,
      marginBottom: spacing.lg,
      animation: 'slideInDown 300ms ease-out',
      fontSize: '14px',
      fontWeight: '500',
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
    buttonGroup: {
      display: 'flex',
      gap: spacing.md,
      marginTop: spacing.xxl,
    },
  };

  return (
    <div style={pageStyles.container}>
      <AdminSidebar />

      <div style={pageStyles.mainContent}>
        <div style={pageStyles.contentWrapper}>
          {/* Header with Theme Toggle */}
          <div style={{ ...pageStyles.header, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h1 style={pageStyles.title}>Add New Item</h1>
              <p style={pageStyles.subtitle}>
                Fill in the details below to add a new item to your inventory. All fields are required.
              </p>
            </div>
            <ThemeToggle />
          </div>

          {/* Success Message */}
          {successMessage && <div style={pageStyles.successMessage}>{successMessage}</div>}

          {/* Error Message */}
          {errors.submit && <div style={pageStyles.errorMessage}>{errors.submit}</div>}

          {/* Form Card */}
          <div style={pageStyles.formCard}>
            <div style={pageStyles.formGrid}>
              <div>
                <FormInput
                  label="Item Name"
                  name="itemName"
                  placeholder="e.g., Wireless Headphones"
                  value={form.itemName}
                  onChange={handleChange}
                  error={errors.itemName}
                  required
                />
              </div>

              <div>
                <FormInput
                  label="Category"
                  name="category"
                  placeholder="e.g., Electronics or Custom Category"
                  value={form.category}
                  onChange={handleChange}
                  error={errors.category}
                  required
                />
              </div>

              {/* Detail / Description removed per request */}

              <div>
                <FormInput
                  label="Supplier Name"
                  name="supplierName"
                  placeholder="e.g., John Doe"
                  value={form.supplierName}
                  onChange={handleChange}
                  error={errors.supplierName}
                  required
                />
              </div>

              <div>
                <FormInput
                  label="Contact Number"
                  name="contact"
                  placeholder="e.g., +1 (555) 123-4567"
                  value={form.contact}
                  onChange={handleChange}
                  error={errors.contact}
                  required
                  type="tel"
                />
              </div>

              <div style={pageStyles.fullWidth}>
                <FormInput
                  label="Optional Contact Number"
                  name="contactNumber"
                  placeholder="e.g., +1 (555) 987-6543 (optional)"
                  value={form.contactNumber}
                  onChange={handleChange}
                  error={errors.contactNumber}
                  required={false}
                  type="tel"
                />
              </div>
            </div>

            {/* Buttons */}
            <div style={pageStyles.buttonGroup}>
              <Button
                variant="primary"
                size="lg"
                onClick={handleSave}
                isLoading={isLoading}
                fullWidth={true}
                icon="💾"
              >
                {isLoading ? 'Saving...' : 'Save Item'}
              </Button>
              <Button
                variant="ghost"
                size="lg"
                onClick={() =>
                  setForm({
                    itemName: '',
                    category: '',
                    supplierName: '',
                    contact: '',
                    contactNumber: '',
                  })
                }
                icon="🔄"
              >
                Reset
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
