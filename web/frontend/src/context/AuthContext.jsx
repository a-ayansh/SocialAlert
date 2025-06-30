import React, { createContext, useState, useEffect } from 'react';
import authService from '../services/api/auth'; // <--- Import your authService

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // Effect to load user/token from localStorage and potentially validate with backend
  useEffect(() => {
    const initializeAuth = async () => {
      const storedUser = localStorage.getItem('user');
      const storedToken = localStorage.getItem('token');

      if (storedUser && storedToken) {
        try {
          const parsedUser = JSON.parse(storedUser);
          setUser(parsedUser);
          setToken(storedToken);

          // Optional: Verify token with backend (e.g., by calling /auth/me)
          // This ensures the token is still valid and not just present in localStorage
          // const validatedUser = await authService.getMe(); // Uncomment if you have a /me endpoint
          // setUser(validatedUser.user); // Assuming /me returns {user: {}}
          // console.log("Token validated successfully with backend.");

        } catch (e) {
          console.error("Auth initialization failed:", e);
          // If parsing fails or token is invalid, clear storage
          logout();
        }
      }
      setLoading(false);
    };

    initializeAuth();
  }, []);

  // Login Function (now uses real API)
  const login = async (email, password) => {
    setLoading(true);
    try {
      const data = await authService.login(email, password); // Call your authService login
      const receivedUser = data.user; // Adjust based on your backend response structure
      const receivedToken = data.token; // Adjust based on your backend response structure

      setUser(receivedUser);
      setToken(receivedToken);
      localStorage.setItem('user', JSON.stringify(receivedUser));
      localStorage.setItem('token', receivedToken);
      setLoading(false);
      return { success: true, user: receivedUser };
    } catch (error) {
      setLoading(false);
      // Backend error messages should be propagated from authService
      throw error || 'Login failed. Check your credentials.';
    }
  };

  // Register Function (now uses real API)
  const register = async (email, password, confirmPassword) => {
    setLoading(true);
    try {
      const data = await authService.register(email, password, confirmPassword); // Call your authService register
      const receivedUser = data.user; // Adjust based on your backend response structure
      const receivedToken = data.token; // Adjust based on your backend response structure

      setUser(receivedUser);
      setToken(receivedToken);
      localStorage.setItem('user', JSON.stringify(receivedUser));
      localStorage.setItem('token', receivedToken);
      setLoading(false);
      return { success: true, user: receivedUser };
    } catch (error) {
      setLoading(false);
      // Backend error messages should be propagated from authService
      throw error || 'Registration failed. Please try again.';
    }
  };

  // Logout Function (remains mostly the same, clears local storage)
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    // Optional: Redirect to login page after logout
    // window.location.href = '/login'; // Or use navigate from react-router-dom if accessible here
  };

  const isAuthenticated = !!user && !!token;

  return (
    <AuthContext.Provider value={{ user, token, isAuthenticated, loading, login, register, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};