import Link from 'next/link';
import styles from './layout.module.css';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
      <div className={`${styles.container} container`}>
        <header className={styles.header}>
          <Link href="/" className={styles.logo}>
            <span>Природні мандри</span>
            <svg></svg>
          </Link>
        </header>
        <main className={styles.content}>{children}</main>
        <footer className={styles.footer}>
          <p className={styles.copyright}>
            {'\u00A9'} {new Date().getFullYear()} Подорожники
          </p>
        </footer>
      </div>
  );
}
