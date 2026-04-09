/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      const storedUser = localStorage.getItem('user');
      if (storedUser) setUser(JSON.parse(storedUser));
    } else {
      delete axios.defaults.headers.common['Authorization'];
    }
    setLoading(false);
  }, [token]);

  const login = async (email, password, role) => {
    try {
      const { data } = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      
      // Strict Role Validation Check
      if (data.role !== role) {
         return { success: false, message: `Access Denied: Attempting to enter as ${role.toUpperCase()} using a ${data.role.toUpperCase()} account.` };
      }

      setToken(data.token);
      setUser(data);
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data));
      return { success: true };
    } catch (error) {
      return { success: false, message: error.response?.data?.message || 'Login failed' };
    }
  };

  const register = async (name, email, password, role) => {
    try {
      // Create user but DO NOT auto-authenticate via token saving
      await axios.post('http://localhost:5000/api/auth/register', { name, email, password, role });
      return { success: true };
    } catch (error) {
      return { success: false, message: error.response?.data?.message || 'Registration failed' };
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
