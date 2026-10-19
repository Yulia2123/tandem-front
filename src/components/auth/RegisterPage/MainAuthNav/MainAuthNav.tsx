import css from '@/components/auth/RegisterPage/MainAuthNav/MainAuthNav.module.css';
import Link from 'next/link';

function MainAuthNav() {
  return (
    <div className={css.navContainer}>
      <nav aria-label="Main Navigation">
        <ul className={css.navigationList}>
          <li className={css.navigationItems}>
            <Link href="/register" className={css.link}>
              Реєстрація
            </Link>
          </li>
          <li className={css.navigationItems}>
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
