import Link from 'next/link';
import styles from './MessageNoStories.module.css';

export default function MessageNoStories() {
  return (
    <div className={styles.wrapper}>
      <p className={styles.message}>Цей користувач ще не публікував історій</p>

      <Link href="/stories" className={styles.link}>
        Назад до історій
      </Link>
    </div>
  );
}
