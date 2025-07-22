// src/services/auth.js
import api from './api';

const AUTH_STORAGE_KEY = 'najahi-auth';

// Store auth data in localStorage
const storeAuthData = (data) => {
  localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(data));
};

// Load auth data from localStorage
const loadAuthData = () => {
  const data = localStorage.getItem(AUTH_STORAGE_KEY);
  return data ? JSON.parse(data) : null;
};

// Clear auth data from localStorage
const clearAuthData = () => {
  localStorage.removeItem(AUTH_STORAGE_KEY);
};

// Register new user
export const register = async (userData) => {
  try {
    const response = await api.post('/auth/register', userData);
    storeAuthData(response.data);
    return response.data;
  } catch (error) {
    console.error('Registration error:', error);
    throw error;
  }
};

// Verify phone number
export const verifyPhone = async (code, phone) => {
  try {
    const response = await api.post('/auth/verify', { code, phone });
    const currentAuth = loadAuthData();
    const updatedAuth = { ...currentAuth, ...response.data };
    storeAuthData(updatedAuth);
    return updatedAuth;
  } catch (error) {
    console.error('Verification error:', error);
    throw error;
  }
};

// Update user profile
export const updateProfile = async (profileData) => {
  try {
    const response = await api.put('/auth/profile', profileData);
    const currentAuth = loadAuthData();
    const updatedAuth = { ...currentAuth, user: response.data };
    storeAuthData(updatedAuth);
    return updatedAuth;
  } catch (error) {
    console.error('Profile update error:', error);
    throw error;
  }
};

// Login user
export const login = async (credentials) => {
  try {
    const response = await api.post('/auth/login', credentials);
    storeAuthData(response.data);
    return response.data;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

// Logout user
export const logout = async () => {
  try {
    await api.post('/auth/logout');
    clearAuthData();
  } catch (error) {
    console.error('Logout error:', error);
    clearAuthData(); // Clear local data even if API call fails
    throw error;
  }
};

// Check if user is authenticated
export const isAuthenticated = () => {
  const authData = loadAuthData();
  return !!authData && !!authData.token;
};

// Get current user data
export const getCurrentUser = () => {
  const authData = loadAuthData();
  return authData?.user || null;
};

// Get auth token
export const getToken = () => {
  const authData = loadAuthData();
  return authData?.token || null;
};

// Refresh auth token
export const refreshToken = async () => {
  try {
    const response = await api.post('/auth/refresh');
    const currentAuth = loadAuthData();
    const updatedAuth = { ...currentAuth, token: response.data.token };
    storeAuthData(updatedAuth);
    return updatedAuth;
  } catch (error) {
    console.error('Token refresh error:', error);
    // If refresh fails, clear auth data
    clearAuthData();
    throw error;
  }
};

// Send password reset email
export const forgotPassword = async (email) => {
  try {
    const response = await api.post('/auth/forgot-password', { email });
    return response.data;
  } catch (error) {
    console.error('Forgot password error:', error);
    throw error;
  }
};

// Reset password with token
export const resetPassword = async (token, password) => {
  try {
    const response = await api.post('/auth/reset-password', { token, password });
    return response.data;
  } catch (error) {
    console.error('Password reset error:', error);
    throw error;
  }
};

// Send SMS verification code
export const sendVerificationCode = async (phoneNumber) => {
  try {
    const response = await api.post('/auth/send-verification', { phone: phoneNumber });
    return response.data;
  } catch (error) {
    console.error('Send verification code error:', error);
    throw error;
  }
};

// Default export with all functions
export default {
  register,
  verifyPhone,
  updateProfile,
  login,
  logout,
  isAuthenticated,
  getCurrentUser,
  getToken,
  refreshToken,
  forgotPassword,
  resetPassword,
  sendVerificationCode,
  loadAuthData,
  clearAuthData
};