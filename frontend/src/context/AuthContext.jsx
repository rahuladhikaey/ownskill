import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/apiService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (token) {
      // Verify token and get user profile
      fetchUserProfile();
    }
    setLoading(false);
  }, [token]);

  const fetchUserProfile = async () => {
    try {
      const response = await authService.getProfile();
      setUser(response.data);
    } catch (error) {
      console.error('Failed to fetch profile:', error);
      logout();
    }
  };

  const signup = async (name, email, password, class_level) => {
    try {
      const response = await authService.signup({
        name,
        email,
        password,
        class_level
      });
      setToken(response.data.token);
      setUser(response.data.user);
      localStorage.setItem('token', response.data.token);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  };

  const login = async (email, password) => {
    try {
      const response = await authService.login(email, password);
      setToken(response.data.token);
      setUser(response.data.user);
      localStorage.setItem('token', response.data.token);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  };

  const adminLogin = async (email, password, passkey) => {
    try {
      const response = await authService.adminLogin(email, password, passkey);
      setToken(response.data.token);
      setUser(response.data.user);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('isAdmin', 'true');
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  };

  const adminSignup = async (name, email, password, confirmPassword, adminPasskey, masterPasskey) => {
    try {
      const response = await authService.adminSignup({
        name,
        email,
        password,
        confirmPassword,
        adminPasskey,
        masterPasskey
      });
      setToken(response.data.token);
      setUser(response.data.user);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('isAdmin', 'true');
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
    localStorage.removeItem('isAdmin');
  };

  return (
    <AuthContext.Provider value={{
      user,
      token,
      loading,
      signup,
      login,
      adminLogin,
      adminSignup,
      logout,
      isAuthenticated: !!token,
      isAdmin: user?.role === 'admin' || user?.role === 'super_admin'
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
