import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, UserRole } from '../types';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: () => Promise<void>;
  signInAsRole: (role: UserRole) => void;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for saved mock user
    try {
      const savedUser = localStorage.getItem('mock_user');
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
    } catch (e) {
      console.warn("localStorage not available", e);
    }
    setLoading(false);
  }, []);

  const signInAsRole = (role: UserRole) => {
    const mockUser: User = {
      id: `mock_${role}`,
      name: role === 'admin' ? 'المدير العام' : role === 'teacher' ? 'الأستاذ أحمد' : 'سارة (الاستقبال)',
      email: `${role}@example.com`,
      role: role,
      createdAt: Date.now()
    };
    setUser(mockUser);
    try {
      localStorage.setItem('mock_user', JSON.stringify(mockUser));
    } catch (e) {
      console.warn("localStorage sync error", e);
    }
  };

  const signIn = async () => {
    signInAsRole('receptionist');
  };

  const logout = async () => {
    setUser(null);
    try {
      localStorage.removeItem('mock_user');
    } catch (e) {}
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signInAsRole, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
