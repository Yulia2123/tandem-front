'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useAuthStore } from '@/lib/store/authStore';
import styles from './Join.module.css';
export default function Join() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  return (
    <section id="join" className={styles.join}>
      <div className={styles.joinContent}>
        <Image
          className={styles.background}
          src="/moonlit-coral-reef.webp"
          alt=""
          sizes="(max-width: 767px) 335px, (max-width: 1439px) 704px, 1312px"
          fill
        />
        <div className={styles.content}>
          <h2 className={styles.title}>
            Приєднуйся до спільноти свідомих мандрівників
          </h2>
          <p className={styles.description}>
            Стань частиною ком’юніті, де подорожі стають не лише пригодою, а й
            внеском у збереження природи. Тут ти знайдеш однодумців, поради для
            сталих мандрів та натхнення для нових маршрутів Україною.
          </p>
          {isAuthenticated ? (
            <Link className={styles.joinButton} href="/profile">
              Збережені статті
            </Link>
          ) : (
            <Link className={styles.joinButton} href="/auth/register">
              Зареєструватися
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
