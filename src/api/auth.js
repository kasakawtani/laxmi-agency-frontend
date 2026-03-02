import API from './api';

/**
 * Authenticate user with email/password.
 * @param {{email:string,password:string}} data
 * @returns {Promise<Object>} response data from backend
 * @throws {Error} if request fails
 */
export const loginUser = async (data) => {
  try {
    const res = await API.post('/auth/login', data);
    return res.data;
  } catch (error) {
    console.error('Login error:', error.response?.data || error.message);
    // rethrow so callers can display message
    throw error;
  }
};
