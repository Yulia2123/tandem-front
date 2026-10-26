'use client';

import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';

import Header from '@/components/layout/Header/Header';
import Footer from '@/components/layout/Footer/Footer';

import { getCurrentUser } from '@/lib/api/users';
import ProfileTabs from '@/components/ProfileTabs/ProfileTabs';
import TravellerInfo from '@/components/travellers/TravellerInfo/TravellerInfo';

import styles from './layout.module.css';

export default function ProfileLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const router = useRouter();
  const pathname = usePathname();

  const {
    data: user,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['current-user'],
    queryFn: getCurrentUser,
    retry: false,
  });

  useEffect(() => {
    if (!isLoading && (isError || !user)) {
      router.replace('/auth/login');
    }
  }, [isLoading, isError, user, router]);

  if (isLoading || isError || !user) {
    return (
      <>
        <Header />
        <main className={styles.loadingPage}>
          <span
            className={styles.loader}
            role="status"
            aria-label="Завантаження профілю"
          />
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className={styles.main}>
        <div className={styles.container}>
          <TravellerInfo user={user} />

          <ProfileTabs />

          <section className={styles.storiesSection} key={pathname}>
            {children}
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}