'use client';

import { useEffect } from 'react';
import { useAuthStore } from '@/lib/store/authStore';
import { getCurrentUser } from '@/lib/api/users';
import { refreshUserSession } from '@/lib/api/auth';

export default function AuthInitializer() {
  const setUser = useAuthStore((state) => state.setUser);
  const clearAuth = useAuthStore((state) => state.clearAuth);

  useEffect(() => {
    let cancelled = false;

    const initializeAuth = async () => {
      try {
        // Спочатку перевіряємо поточну сесію.
        const user = await getCurrentUser();

        if (!cancelled) {
          setUser(user);
        }
      } catch {
        try {
          // Якщо сесія застаріла, пробуємо оновити її.
          await refreshUserSession();

          const user = await getCurrentUser();

          if (!cancelled) {
            setUser(user);
          }
        } catch {
          if (!cancelled) {
            clearAuth();
          }
        }
      }
    };

    initializeAuth();

    return () => {
      cancelled = true;
    };
  }, [setUser, clearAuth]);

  return null;
}
