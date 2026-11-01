'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { authClient, signIn, signUp, signOut } from '@/lib/auth-client';

export interface User {
  email: string;
  name: string;
  photoURL?: string;
  id?: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  loading: boolean;
  login: (email: string, password?: string) => Promise<boolean>;
  register: (name: string, email: string, password: string, photoURL?: string) => Promise<boolean>;
  loginWithGoogle: (callbackURL?: string) => Promise<boolean>;
  loginWithGithub: (callbackURL?: string) => Promise<boolean>;
  logout: () => Promise<void>;
  updateUserProfile: (name: string, photoURL?: string) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function checkSession() {
      try {
        const sessionRes = await authClient.getSession();
        if (sessionRes?.data?.user) {
          const betterUser = sessionRes.data.user;
          const uData: User = {
            email: betterUser.email,
            name: betterUser.name,
            photoURL: betterUser.image || undefined,
            id: betterUser.id,
          };
          setUser(uData);

          let storedToken = localStorage.getItem('unity_token');
          if (!storedToken) {
            try {
              const jwtRes = await fetch(`${API_BASE_URL}/auth/jwt`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: uData.email, name: uData.name, photoURL: uData.photoURL }),
              });
              const jwtData = await jwtRes.json();
              if (jwtData.success && jwtData.token) {
                storedToken = jwtData.token;
                localStorage.setItem('unity_token', jwtData.token);
              }
            } catch {
            }
          }
          setToken(storedToken);
          localStorage.setItem('unity_user', JSON.stringify(uData));
          setLoading(false);
          return;
        }

        const storedUser = localStorage.getItem('unity_user');
        const storedToken = localStorage.getItem('unity_token');
        if (storedUser && storedToken) {
          setUser(JSON.parse(storedUser));
          setToken(storedToken);
        }
      } catch {
      } finally {
        setLoading(false);
      }
    }

    checkSession();
  }, []);

  const setAuthSession = (userData: User, authToken?: string | null) => {
    setUser(userData);
    setToken(authToken || null);
    localStorage.setItem('unity_user', JSON.stringify(userData));
    if (authToken) {
      localStorage.setItem('unity_token', authToken);
    }
  };

  const login = async (email: string, password?: string): Promise<boolean> => {
    try {
      const res = await signIn.email({
        email,
        password: password || '',
      });

      if (res.error) {
        toast.error(res.error.message || 'Login failed. Please check credentials.');
        return false;
      }

      let authToken: string | null = null;
      try {
        const jwtResponse = await fetch(`${API_BASE_URL}/auth/jwt`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email }),
        });
        const jwtData = await jwtResponse.json();
        if (jwtData.success && jwtData.token) {
          authToken = jwtData.token;
        }
      } catch (err) {
        console.error('Express auth/jwt sync error:', err);
      }

      const uData: User = {
        email: res.data?.user?.email || email,
        name: res.data?.user?.name || email.split('@')[0],
        photoURL: res.data?.user?.image || undefined,
        id: res.data?.user?.id,
      };

      setAuthSession(uData, authToken);
      toast.success(`Welcome back, ${uData.name}!`);
      return true;
    } catch {
      toast.error('Unable to sign in. Please try again.');
      return false;
    }
  };

  const register = async (
    name: string,
    email: string,
    password: string,
    photoURL?: string
  ): Promise<boolean> => {
    try {
      const avatarUrl =
        photoURL || `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(name)}`;

      const res = await signUp.email({
        name,
        email,
        password,
        image: avatarUrl,
      });

      if (res.error) {
        toast.error(res.error.message || 'Registration failed.');
        return false;
      }

      let authToken: string | null = null;
      try {
        const jwtResponse = await fetch(`${API_BASE_URL}/auth/jwt`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, name, photoURL: avatarUrl }),
        });
        const jwtData = await jwtResponse.json();
        if (jwtData.success && jwtData.token) {
          authToken = jwtData.token;
        }
      } catch (err) {
        console.error('Express auth/jwt sync error:', err);
      }

      const uData: User = {
        email: res.data?.user?.email || email,
        name: res.data?.user?.name || name,
        photoURL: res.data?.user?.image || avatarUrl,
        id: res.data?.user?.id,
      };

      setAuthSession(uData, authToken);
      toast.success('Registration successful! Welcome to UnityServe.');
      return true;
    } catch {
      toast.error('Network error during registration. Please try again.');
      return false;
    }
  };

  const loginWithGoogle = async (callbackURL: string = '/events'): Promise<boolean> => {
    try {
      const res = await authClient.signIn.social({
        provider: 'google',
        callbackURL,
      });
      if (res?.error) {
        toast.error(res.error.message || 'Google Sign-In failed.');
        return false;
      }
      return true;
    } catch (err: any) {
      toast.error(err?.message || 'Google Sign-In error.');
      return false;
    }
  };

  const loginWithGithub = async (callbackURL: string = '/events'): Promise<boolean> => {
    try {
      const res = await authClient.signIn.social({
        provider: 'github',
        callbackURL,
      });
      if (res?.error) {
        toast.error(res.error.message || 'GitHub Sign-In failed.');
        return false;
      }
      return true;
    } catch (err: any) {
      toast.error(err?.message || 'GitHub Sign-In error.');
      return false;
    }
  };

  const logout = async () => {
    try {
      await signOut();
      await fetch(`${API_BASE_URL}/auth/logout`, { method: 'POST' });
    } catch {
    } finally {
      setUser(null);
      setToken(null);
      localStorage.removeItem('unity_user');
      localStorage.removeItem('unity_token');
      toast.success('Logged out successfully. See you soon!');
    }
  };

  const updateUserProfile = async (name: string, photoURL?: string): Promise<boolean> => {
    if (!token) return false;
    try {
      const response = await fetch(`${API_BASE_URL}/auth/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name, photoURL }),
      });

      const data = await response.json();

      if (data.success && data.user) {
        setUser(data.user);
        localStorage.setItem('unity_user', JSON.stringify(data.user));
        if (data.token) {
          setToken(data.token);
          localStorage.setItem('unity_token', data.token);
        }
        toast.success('Profile updated successfully!');
        return true;
      } else {
        toast.error(data.message || 'Failed to update profile.');
        return false;
      }
    } catch {
      toast.error('Profile update failed.');
      return false;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        login,
        register,
        loginWithGoogle,
        loginWithGithub,
        logout,
        updateUserProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
