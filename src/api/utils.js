/**
 * API Utilities & Helpers
 * Common utilities for API calls and error handling
 */

import API from './api';

/**
 * Handle API errors consistently across the app
 * @param {Error} error - Error object from API call
 * @returns {string} - User-friendly error message
 */
export const handleApiError = (error) => {
  if (error.response) {
    // Server responded with error status
    const status = error.response.status;
    const message = error.response.data?.message || 'An error occurred';

    if (status === 400) return `Invalid data: ${message}`;
    if (status === 401) return 'Please log in to continue';
    if (status === 403) return 'You do not have permission to do this';
    if (status === 404) return 'Resource not found';
    if (status === 500) return 'Server error. Please try again later';
    return message;
  } else if (error.request) {
    // Request made but no response
    return 'No response from server. Check your internet connection';
  } else {
    // Error in request setup
    return error.message || 'An unexpected error occurred';
  }
};

/**
 * Fetch items with error handling
 * @returns {Promise<Array>} - Array of items
 */
export const fetchItems = async () => {
  try {
    const response = await API.get('/items');
    return response.data;
  } catch (error) {
    throw new Error(handleApiError(error));
  }
};

/**
 * Create new item with error handling
 * @param {Object} itemData - Item data to create
 * @returns {Promise<Object>} - Created item
 */
export const createItem = async (itemData) => {
  try {
    const response = await API.post('/items', itemData);
    return response.data;
  } catch (error) {
    throw new Error(handleApiError(error));
  }
};

/**
 * Update item with error handling
 * @param {string} itemId - Item ID
 * @param {Object} updates - Item data to update
 * @returns {Promise<Object>} - Updated item
 */
export const updateItem = async (itemId, updates) => {
  try {
    const response = await API.put(`/items/${itemId}`, updates);
    return response.data;
  } catch (error) {
    throw new Error(handleApiError(error));
  }
};

/**
 * Delete item with error handling
 * @param {string} itemId - Item ID
 * @returns {Promise<void>}
 */
export const deleteItem = async (itemId) => {
  try {
    await API.delete(`/items/${itemId}`);
  } catch (error) {
    throw new Error(handleApiError(error));
  }
};

/**
 * Validate item form data
 * @param {Object} formData - Form data to validate
 * @returns {Object} - Validation errors (empty if valid)
 */
export const validateItemForm = (formData) => {
  const errors = {};

  if (!formData.itemName?.trim()) {
    errors.itemName = 'Item name is required';
  }

  if (!formData.category?.trim()) {
    errors.category = 'Category is required';
  }

  if (!formData.detail?.trim()) {
    errors.detail = 'Detail/Description is required';
  }

  if (!formData.sellerName?.trim()) {
    errors.sellerName = 'Supplier name is required';
  }

  if (!formData.contact?.trim()) {
    errors.contact = 'Contact number is required';
  } else if (!/^[0-9\-\+\s()]+$/.test(formData.contact)) {
    errors.contact = 'Invalid contact number format';
  }

  return errors;
};

/**
 * Format currency
 * @param {number} amount - Amount to format
 * @param {string} currency - Currency code (default: USD)
 * @returns {string} - Formatted currency string
 */
export const formatCurrency = (amount, currency = 'USD') => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
  }).format(amount);
};

/**
 * Format date
 * @param {Date | string} date - Date to format
 * @returns {string} - Formatted date string
 */
export const formatDate = (date) => {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(new Date(date));
};

/**
 * Debounce function
 * @param {Function} func - Function to debounce
 * @param {number} delay - Delay in ms
 * @returns {Function} - Debounced function
 */
export const debounce = (func, delay = 500) => {
  let timeoutId;
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};
