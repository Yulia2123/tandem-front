
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import PageTitle from '@/components/common/PageTitle/PageTitle';
import AddStoryForm from '@/components/AddStoryForm/AddStoryForm';
import { getCurrentUser } from '@/lib/api/users';
import { useAuthStore } from '@/lib/store/authStore';

import styles from './page.module.css';

export default function NewStoryPage() {
  const router = useRouter();
  const setUser = useAuthStore((state) => state.setUser);

  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const checkAuth = async () => {
      try {
        const user = await getCurrentUser();

        if (cancelled) return;

        setUser(user);
        setIsAuthorized(true);
      } catch {
        if (cancelled) return;

        router.replace('/auth/login');
      } finally {
        if (!cancelled) {
          setIsCheckingAuth(false);
        }
      }
    };

    void checkAuth();

    return () => {
      cancelled = true;
    };
  }, [router, setUser]);

  if (isCheckingAuth) {
    return (
      <main className={styles.page}>
        <div className={styles.content}>
          <p>Перевіряємо авторизацію...</p>
        </div>
      </main>
    );
  }

  if (!isAuthorized) {
    return null;
  }

  return (
    <main className={styles.page}>
      <div className={styles.content}>
        <div className={styles.title}>
          <PageTitle>Створити нову історію</PageTitle>
        </div>

        <AddStoryForm />
      </div>
    </main>
  );
}
