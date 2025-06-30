import apiClient from '../utils/apiClient';

const authService = {
  login: async (email, password) => {
    try {
      const response = await apiClient.post('/auth/login', { email, password });
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Login failed.';
    }
  },

  register: async (email, password, confirmPassword) => {
    try {
      const payload = { email, password };
      if (confirmPassword) {
        payload.confirmPassword = confirmPassword;
      }
      const response = await apiClient.post('/auth/register', payload);
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Registration failed.';
    }
  },

  getMe: async () => {
    try {
      const response = await apiClient.get('/auth/me');
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Failed to fetch user data.';
    }
  },
};

export default authService;
