import React, { createContext, useContext, useMemo, useState } from 'react';
import type { AuthUser } from '@dlocal/types';

export interface AuthContextValue {
  user: AuthUser | null;
  signIn: (user: AuthUser) => void;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>({
    id: 'user-001',
    name: 'Maria Alvarez',
    email: 'maria.alvarez@dlocal.com',
    role: 'admin'
  });

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      signIn: setUser,
      signOut: () => setUser(null)
    }),
    [user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
