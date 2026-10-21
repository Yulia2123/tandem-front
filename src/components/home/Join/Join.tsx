import Image from 'next/image';
import Link from 'next/link';
import styles from './Join.module.css';
export default function Join() {
  return (
    <section id="join" className={styles.join}>
      <div className={styles.joinContent}>
        <Image
          className={styles.background}
          src="/moonlit-coral-reef.webp"
          alt=""
          sizes="(max-width: 768px) 100vw, 1312px"
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
          <Link className={styles.joinButton} href="/auth/register">
            Зареєструватися
          </Link>
        </div>
      </div>
    </section>
  );
}
