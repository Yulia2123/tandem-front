'use client';

// import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useAuthStore } from '@/lib/store/authStore';
import { logoutUser } from '@/lib/api/auth';
import ActionModal from '@/components/Modal/ActionModal';

import css from './AuthNavigation.module.css';

export default function AuthNavigation() {
  const pathname = usePathname();
  const router = useRouter();
  const clearAuth = useAuthStore((state) => state.clearAuth);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  type NavigationUser = {
    name: string;
    avatarUrl?: string;
  };

  const userData = useAuthStore((state) => state.user);

  const user: NavigationUser | null = userData
    ? 'data' in userData
      ? (userData.data as NavigationUser)
      : (userData as NavigationUser)
    : null;

  // const user = userData && 'data' in userData ? userData.data : userData;

  const profileHref = '/profile';

  const isLocationsCatalog =
    pathname === '/cataloges' || /^\/stories\/[^/]+$/.test(pathname);

  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = async () => {
    if (isLoggingOut) return;

    setIsLoggingOut(true);

    try {
      await logoutUser();
    } catch {
      return;
    } finally {
      setIsLoggingOut(false);
    }

    clearAuth();
    setIsLogoutModalOpen(false);
    setIsOpen(false);
    router.replace('/');
    router.refresh();
  };

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!isOpen) return;

    const root = document.documentElement;
    const previousOverflow = root.style.overflow;

    root.style.overflow = 'hidden';

    return () => {
      root.style.overflow = previousOverflow;
    };
  }, [isOpen]);
  return (
    <div className={css.side}>
      <div className={css.container}>
        {/*Burger*/}
        <button
          type="button"
          className={css.menuButton}
          aria-expanded={isOpen}
          aria-controls="header-nav"
          aria-label={isOpen ? 'Закрити меню' : 'Відкрити меню'}
          onClick={() => setIsOpen((open) => !open)}
        >
          <svg width="24" height="24" aria-hidden="true">
            <use href={isOpen ? '/sprite.svg#close' : '/sprite.svg#menu'} />
          </svg>
        </button>
        <nav
          id="header-nav"
          className={isOpen ? `${css.nav} ${css.navOpen}` : css.nav}
        >
          {/*nav*/}
          <div className={css.menuLinks}>
            <Link
              className={pathname === '/' ? css.active : css.link}
              href="/"
              onClick={() => setIsOpen(false)}
            >
              Головна
            </Link>
            <Link
              className={isLocationsCatalog ? css.active : css.link}
              href="/stories"
              onClick={() => setIsOpen(false)}
            >
              Статті
            </Link>
            <Link
              className={pathname.startsWith('/users') ? css.active : css.link}
              href="/travellers"
              onClick={() => setIsOpen(false)}
            >
              Еко-Мандрівники
            </Link>
            {/*auth-user*/}
            {isAuthenticated && (
              <>
                <Link
                  className={
                    pathname.startsWith('/profile') ? css.active : css.link
                  }
                  href={profileHref}
                  onClick={() => setIsOpen(false)}
                >
                  Мій Профіль
                </Link>
              </>
            )}
          </div>
          {/*btnAuth-publstory*/}
          <div className={css.menuActions}>
            {isAuthenticated ? (
              <Link
                className={`${css.button} ${css.buttonSecondary} ${css.publishButton}`}
                href="/new-story"
                onClick={() => setIsOpen(false)}
              >
                Опублікувати статтю
              </Link>
            ) : (
              <>
                <Link
                  className={`${css.button} ${css.buttonPrimary}`}
                  href="/auth/login"
                  onClick={() => setIsOpen(false)}
                >
                  Вхід
                </Link>
                <Link
                  className={`${css.button} ${css.buttonSecondary}`}
                  href="/auth/register"
                  onClick={() => setIsOpen(false)}
                >
                  Реєстрація
                </Link>
              </>
            )}
          </div>
          {/*Block for un-authuser*/}
          {isAuthenticated && (
            <div className={css.profile}>
              <button
                type="button"
                className={css.profileButton}
                aria-label="Профіль користувача"
              >
                {user?.avatarUrl ? (
                  <img
                    className={css.avatar}
                    src={user.avatarUrl}
                    alt=""
                    width={32}
                    height={32}
                  />
                ) : (
                  <span className={css.avatarFallback}>
                    {user?.name?.trim()?.charAt(0)?.toUpperCase() || 'U'}
                  </span>
                )}
                <span className={css.name}>{user?.name}</span>
              </button>
              <span className={css.divider} aria-hidden="true" />
              <button
                type="button"
                className={css.iconButton}
                aria-label="Вийти"
                onClick={() => setIsLogoutModalOpen(true)}
                disabled={isLoggingOut}
              >
                <svg width="24" height="24" aria-hidden="true">
                  <use href="/sprite.svg#logout" />
                </svg>
              </button>
            </div>
          )}
        </nav>
      </div>
      {isLogoutModalOpen && (
        <ActionModal
          onClose={() => setIsLogoutModalOpen(false)}
          onConfirm={handleLogout}
          isSubmitting={isLoggingOut}
        />
      )}
    </div>
  );
}
