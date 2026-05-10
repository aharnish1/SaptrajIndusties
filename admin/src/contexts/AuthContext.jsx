import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const authData = localStorage.getItem('adminAuth');
    if (authData) {
      const { isAuthenticated, loginTime } = JSON.parse(authData);
      // Check if session is still valid (24 hours)
      const sessionAge = Date.now() - loginTime;
      const maxAge = 24 * 60 * 60 * 1000; // 24 hours
      
      if (sessionAge < maxAge) {
        setIsAuthenticated(isAuthenticated);
        setUser({ username: 'admin' });
      } else {
        localStorage.removeItem('adminAuth');
        setIsAuthenticated(false);
        setUser(null);
      }
    }
    setLoading(false);
  }, []);

  const login = async (userData) => {
    return new Promise((resolve) => {
      setIsAuthenticated(true);
      setUser(userData);
      const authData = {
        isAuthenticated: true,
        loginTime: Date.now(),
        ...userData
      };
      localStorage.setItem('adminAuth', JSON.stringify(authData));
      resolve();
    });
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem('adminAuth');
    localStorage.removeItem('adminLockout');
  };

  const value = {
    isAuthenticated,
    user,
    loading,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
