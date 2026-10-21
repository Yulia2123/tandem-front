import Image from 'next/image';
import styles from './About.module.css';
import aboutImage from '../../../public/images/about-forest.jpg';

export default function About() {
  return (
    <section className={`section ${styles.aboutSection}`}>
      <div className="container">
        <div className={styles.desktopLayout}>
          {/* Текстова частина */}
          <div className={styles.contentWrapper}>
            <div className={styles.mainContent}>
              <h2 className={styles.title}>
                Мандруй екологічно та відкривай нові горизонти
              </h2>
              <p className={styles.description}>
                Наш проєкт створений для тих, хто хоче досліджувати Україну
                відповідально. Ми допоможемо знайти унікальні маршрути, які
                поєднують красу природи, локальну культуру та принципи сталого
                туризму.
              </p>
            </div>

            <div className={styles.featuresWrapper}>
              <div className={styles.block}>
                <h3 className={styles.subtitle}>Еко-маршрути по Україні</h3>
                <p className={styles.text}>
                  Від Карпат до Чорного моря — добірка локацій, де можна
                  подорожувати без шкоди для довкілля.
                </p>
              </div>

              <div className={styles.block}>
                <h3 className={styles.subtitle}>Практичні екологічні поради</h3>
                <p className={styles.text}>
                  Дізнайся, як зменшити свій екологічний слід під час мандрів,
                  та зробити подорож комфортною й свідомою.
                </p>
              </div>
            </div>
          </div>

          {/* Права колонка з адаптивною картинкою */}
          <div className={styles.imageWrapper}>
            <Image
              src={aboutImage}
              alt="Екологічні мандрівки та природа України"
              sizes="(max-width: 767px) 335px, (max-width: 1439px) 704px, 644px"
              priority
              className={styles.image}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
