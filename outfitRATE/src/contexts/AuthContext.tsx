import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from '../types';

interface AuthContextData {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (name: string, email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  updateUser: (user: Partial<User>) => Promise<void>;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStoredUser();
  }, []);

  const loadStoredUser = async () => {
    try {
      const storedUser = await AsyncStorage.getItem('@outfitRATE:user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error('Error loading user:', error);
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      // In production, this would call your authentication API
      // For demo, we'll create a mock user
      const mockUser: User = {
        id: '1',
        name: 'Demo User',
        email: email,
        avatar: 'https://i.pravatar.cc/150?img=1',
        preferences: {
          styles: ['streetwear', 'casual'],
          colors: ['#000000', '#FFFFFF', '#FF6B6B'],
          brands: ['Nike', 'Adidas', 'Supreme'],
        },
      };

      await AsyncStorage.setItem('@outfitRATE:user', JSON.stringify(mockUser));
      setUser(mockUser);
    } catch (error) {
      console.error('Error signing in:', error);
      throw new Error('Erro ao fazer login');
    }
  };

  const signUp = async (name: string, email: string, password: string) => {
    try {
      // In production, this would call your authentication API
      const mockUser: User = {
        id: Date.now().toString(),
        name,
        email,
        preferences: {
          styles: [],
          colors: [],
          brands: [],
        },
      };

      await AsyncStorage.setItem('@outfitRATE:user', JSON.stringify(mockUser));
      setUser(mockUser);
    } catch (error) {
      console.error('Error signing up:', error);
      throw new Error('Erro ao criar conta');
    }
  };

  const signOut = async () => {
    try {
      await AsyncStorage.removeItem('@outfitRATE:user');
      setUser(null);
    } catch (error) {
      console.error('Error signing out:', error);
      throw new Error('Erro ao fazer logout');
    }
  };

  const updateUser = async (userData: Partial<User>) => {
    try {
      if (!user) return;

      const updatedUser = { ...user, ...userData };
      await AsyncStorage.setItem('@outfitRATE:user', JSON.stringify(updatedUser));
      setUser(updatedUser);
    } catch (error) {
      console.error('Error updating user:', error);
      throw new Error('Erro ao atualizar usuário');
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        signIn,
        signUp,
        signOut,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
