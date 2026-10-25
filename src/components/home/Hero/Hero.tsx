import Image from 'next/image';
import styles from './Hero.module.css';
import PageTitle from '@/components/common/PageTitle/PageTitle';
import heroImage from '../../../../public/hero.webp';

export default function Hero() {
  return (
    <section className={styles.hero} aria-labelledby="hero-title">
      <div className="container">
        <div className={styles.content}>
          <div className={styles.textContent}>
            <PageTitle>
              Відкрий Україну заново — еко-мандри для натхнення
            </PageTitle>

            <p className={styles.description}>
              Подорожуй екологічно, відкривай заповідні місця, гори та річки
              України. Ми зібрали маршрути, які допоможуть побачити красу
              природи без шкоди для неї.
            </p>

            <a href="#join" className={styles.link}>
              Доєднатись до мандрів
            </a>
          </div>

          <div className={styles.imageWrapper}>
            <Image
              src={heroImage}
              alt="Гірський краєвид українських Карпат"
              fill
              priority
              sizes="(max-width: 767px) 335px, (max-width: 1439px) 704px, 644px"
              className={styles.image}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
