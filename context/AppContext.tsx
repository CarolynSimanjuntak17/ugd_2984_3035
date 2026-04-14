'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { users } from '@/lib/mock-data';

export interface AuthUser {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'operator' | 'supervisor';
  airport: string;
  initials: string;
}

interface AppContextType {
  hydrated: boolean;
  isDark: boolean;
  toggleDark: () => void;
  sidebarCollapsed: boolean;
  toggleSidebar: () => void;
  isAuthenticated: boolean;
  currentUser: AuthUser;
  login: (email: string, password: string) => { ok: boolean; error?: string };
  logout: () => void;
}

const AppContext = createContext<AppContextType | null>(null);

// Demo password for all mock users
const DEMO_PASSWORD = 'petir2026';

function makeInitials(name: string) {
  return name
    .split(' ')
    .map((w) => w[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();
}

const GUEST_USER: AuthUser = {
  id: 0,
  name: 'Tamu',
  email: '',
  role: 'operator',
  airport: '-',
  initials: 'TM',
};

export function AppProvider({ children }: { children: ReactNode }) {
  const [hydrated, setHydrated] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState<AuthUser>(GUEST_USER);

  useEffect(() => {
    let cancelled = false;

    queueMicrotask(() => {
      if (cancelled) return;

      const saved = sessionStorage.getItem('ep_user');
      if (saved) {
        try {
          const parsed = JSON.parse(saved) as AuthUser;
          setCurrentUser(parsed);
          setIsAuthenticated(true);
        } catch {
          // ignore
        }
      }
      setHydrated(true);
    });

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
  }, [isDark]);

  function login(email: string, password: string): { ok: boolean; error?: string } {
    if (!email.trim()) return { ok: false, error: 'Email tidak boleh kosong.' };
    if (!password.trim()) return { ok: false, error: 'Password tidak boleh kosong.' };

    const found = users.find((u) => u.email.toLowerCase() === email.toLowerCase().trim());
    if (!found) return { ok: false, error: 'Email tidak ditemukan dalam sistem.' };
    if (found.status === 'inactive') return { ok: false, error: 'Akun ini tidak aktif. Hubungi administrator.' };
    if (password !== DEMO_PASSWORD) return { ok: false, error: 'Password salah. Gunakan: petir2026' };

    const authUser: AuthUser = {
      id: found.id,
      name: found.name,
      email: found.email,
      role: found.role,
      airport: found.airport,
      initials: makeInitials(found.name),
    };

    sessionStorage.setItem('ep_user', JSON.stringify(authUser));
    setCurrentUser(authUser);
    setIsAuthenticated(true);
    return { ok: true };
  }

  function logout() {
    sessionStorage.removeItem('ep_user');
    setCurrentUser(GUEST_USER);
    setIsAuthenticated(false);
  }

  return (
    <AppContext.Provider
      value={{
        hydrated,
        isDark,
        toggleDark: () => setIsDark((p) => !p),
        sidebarCollapsed,
        toggleSidebar: () => setSidebarCollapsed((p) => !p),
        isAuthenticated,
        currentUser,
        login,
        logout,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
