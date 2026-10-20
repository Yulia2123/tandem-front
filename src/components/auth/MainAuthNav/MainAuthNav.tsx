'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import css from './MainAuthNav.module.css';

function MainAuthNav() {
  const pathname = usePathname();

  return (
    <div className={css.navContainer}>
      <nav aria-label="Main Navigation">
        <ul className={css.navigationList}>
          <li
            className={`${css.navigationItems} ${pathname === '/register' ? css.accent : ''}`}
          >
            <Link href="/register" className={css.link}>
              Реєстрація
            </Link>
          </li>
          <li
            className={`${css.navigationItems} ${pathname === '/login' ? css.accent : ''}`}
          >
            <Link href="/login" className={css.link}>
              Вхід
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default MainAuthNav;
