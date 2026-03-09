import { createContext, useContext, useState, useEffect } from 'react';
import { validateUser, getUserById } from '../data/mockUsers';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for existing session on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('farmMarketUser');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        // Verify user still exists in our mock data
        const existingUser = getUserById(parsedUser.id);
        if (existingUser) {
          setUser(parsedUser);
        } else {
          localStorage.removeItem('farmMarketUser');
        }
      } catch (error) {
        localStorage.removeItem('farmMarketUser');
      }
    }
    setIsLoading(false);
  }, []);

  const login = (email, password) => {
    const validatedUser = validateUser(email, password);
    if (validatedUser) {
      setUser(validatedUser);
      localStorage.setItem('farmMarketUser', JSON.stringify(validatedUser));
      return { success: true, user: validatedUser };
    }
    return { success: false, error: 'Invalid email or password' };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('farmMarketUser');
  };

  const register = (userData) => {
    // In real app, this would call an API
    // For MVP, we'll simulate registration
    const newUser = {
      id: Date.now(),
      ...userData,
      role: 'buyer',
      createdAt: new Date().toISOString()
    };
    setUser(newUser);
    localStorage.setItem('farmMarketUser', JSON.stringify(newUser));
    return { success: true, user: newUser };
  };

  const updateProfile = (updates) => {
    const updatedUser = { ...user, ...updates };
    setUser(updatedUser);
    localStorage.setItem('farmMarketUser', JSON.stringify(updatedUser));
    return { success: true, user: updatedUser };
  };

  const isAdmin = user?.role === 'admin';
  const isBuyer = user?.role === 'buyer';
  const isAuthenticated = !!user;

  const value = {
    user,
    isLoading,
    isAuthenticated,
    isAdmin,
    isBuyer,
    login,
    logout,
    register,
    updateProfile
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;