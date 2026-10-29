'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './ProfileTabs.module.css';

const TABS = [
  {
    href: '/profile/saved',
    label: 'Збережені історії',
  },
  {
    href: '/profile/my-stories',
    label: 'Мої історії',
  },
];

export default function ProfileTabs() {
  const pathname = usePathname();

  return (
    <nav className={styles.tabs} aria-label="Історії профілю">
      {TABS.map(({ href, label }) => {
        const isActive = pathname === href;

        return (
          <Link
            key={href}
            href={href}
            className={isActive ? styles.tabActive : styles.tab}
            aria-current={isActive ? 'page' : undefined}
          >
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
