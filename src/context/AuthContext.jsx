/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useEffect } from 'react';
import api from '../api/axios';

export const AuthContext = createContext();

// Pre-seeded demo accounts for client fallback
const CLIENT_DEMO_USERS = [
  { id: 'demo_1', name: 'Demo Student', email: 'student@test.com', password: '123456', role: 'student' },
  { id: 'demo_2', name: 'Demo Company', email: 'company@test.com', password: '123456', role: 'company' },
  { id: 'demo_3', name: 'Demo Admin', email: 'admin@test.com', password: '123456', role: 'admin' },
];

const getLocalRegisteredUsers = () => {
  try {
    const data = localStorage.getItem('placetrack_registered_users');
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

const saveLocalRegisteredUser = (newUser) => {
  try {
    const users = getLocalRegisteredUsers();
    users.push(newUser);
    localStorage.setItem('placetrack_registered_users', JSON.stringify(users));
  } catch (e) {
    console.error("Local storage save error:", e);
  }
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (token) {
      const storedUser = localStorage.getItem('user');
      if (storedUser) setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, [token]);

  const login = async (email, password, role) => {
    const cleanEmail = email.trim().toLowerCase();
    const cleanRole = role.trim().toLowerCase();

    // 1. Try Backend API first
    try {
      const { data } = await api.post('/auth/login', { email: cleanEmail, password });
      
      if (data && data.token) {
        if (data.role?.toLowerCase() !== cleanRole) {
          return { success: false, message: `Access Denied: Attempting to enter as ${role.toUpperCase()} using a ${data.role.toUpperCase()} account.` };
        }
        setToken(data.token);
        setUser(data);
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data));
        return { success: true };
      }
    } catch (apiErr) {
      console.warn("Backend API login failed/unavailable, using client fallback auth:", apiErr.message);
    }

    // 2. Client-side Fallback check
    const allUsers = [...CLIENT_DEMO_USERS, ...getLocalRegisteredUsers()];
    const foundUser = allUsers.find(u => u.email.toLowerCase() === cleanEmail);

    if (!foundUser) {
      return { success: false, message: 'Invalid email or password' };
    }

    if (foundUser.password !== password) {
      return { success: false, message: 'Invalid email or password' };
    }

    if (foundUser.role.toLowerCase() !== cleanRole) {
      return { success: false, message: `Access Denied: Attempting to enter as ${role.toUpperCase()} using a ${foundUser.role.toUpperCase()} account.` };
    }

    // Success via Client Fallback
    const mockToken = 'mock_jwt_token_' + Date.now();
    const userData = { _id: foundUser.id || 'usr_' + Date.now(), name: foundUser.name, email: foundUser.email, role: foundUser.role, token: mockToken };
    
    setToken(mockToken);
    setUser(userData);
    localStorage.setItem('token', mockToken);
    localStorage.setItem('user', JSON.stringify(userData));
    return { success: true };
  };

  const register = async (name, email, password, role) => {
    const cleanEmail = email.trim().toLowerCase();
    const cleanRole = role.trim().toLowerCase();

    // 1. Try Backend API first
    try {
      const res = await api.post('/auth/register', { name, email: cleanEmail, password, role: cleanRole });
      if (res.data) {
        saveLocalRegisteredUser({ id: res.data._id || 'usr_' + Date.now(), name, email: cleanEmail, password, role: cleanRole });
        return { success: true };
      }
    } catch (apiErr) {
      console.warn("Backend API register failed/unavailable, saving to client fallback:", apiErr.message);
    }

    // 2. Client-side Fallback Registration
    const allUsers = [...CLIENT_DEMO_USERS, ...getLocalRegisteredUsers()];
    const existing = allUsers.find(u => u.email.toLowerCase() === cleanEmail);
    if (existing) {
      return { success: false, message: 'Email already registered' };
    }

    saveLocalRegisteredUser({ id: 'usr_' + Date.now(), name, email: cleanEmail, password, role: cleanRole });
    return { success: true };
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
