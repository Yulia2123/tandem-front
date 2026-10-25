import Image from 'next/image';
import Link from 'next/link';
import { Story } from '@/types/story';
import styles from './StoryDetails.module.css';

interface StoryDetailsProps {
  story: Story;
  authorName: string;
}

export default function StoryDetails({ story, authorName }: StoryDetailsProps) {
  return (
    <article className={styles.wrapper}>
      <div className={styles.topRow}>
        {/* Картинка (на мобільному зверху завдяки порядку, на десктопі стає праворуч) */}
        <div className={styles.imageWrapper}>
          <Image
            src={story.img}
            alt={story.title}
            fill
            className={styles.image}
            priority
          />
        </div>

        {/* Текстовий блок (на мобільному знизу, на десктопі стає ліворуч) */}
        <div className={styles.textContent}>
          <Link href="/stories" className={styles.backLink}>
            &lt; Всі статті
          </Link>

          <h2 className={styles.title}>{story.title}</h2>

          <div className={styles.metaContainer}>
            <div className={styles.metaItem}>
              <span className={styles.metaLabel}>Автор статті</span>{' '}
              <span className={styles.metaValue}>{authorName}</span>
            </div>
            <div className={styles.metaItem}>
              <span className={styles.metaLabel}>Опубліковано</span>{' '}
              <span className={styles.metaValue}>
                {story.date || '23.07.2025'}
              </span>
            </div>
            <div className={styles.routeBadge}>Маршрути</div>
          </div>
        </div>
      </div>

      <div className={styles.articleContent}>
        <p>{story.article}</p>
      </div>
    </article>
  );
}
