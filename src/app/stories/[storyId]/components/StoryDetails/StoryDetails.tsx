import Image from 'next/image';
import Link from 'next/link';
import { Story } from '@/types/story';
import styles from './StoryDetails.module.css';

interface StoryDetailsProps {
  story: Story;
  authorName: string;
}

export default function StoryDetails({ story, authorName }: StoryDetailsProps) {
  // 1-й Варіант: Динамічно отримуємо назву з об'єкта категорії або використовуємо рядок
  const categoryName =
    typeof story.category === 'object' && story.category !== null
      ? story.category.name
      : story.category;

  return (
    <article className={`${styles.wrapper} container `}>
      <div className={styles.topRow}>
        <div className={styles.imageWrapper}>
          <Image
            src={story.img}
            alt={story.title}
            fill
            className={styles.image}
            priority
          />
        </div>

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
              <span className={styles.metaValue}>{story.date}</span>
            </div>
            <div className={styles.routeBadge}>{categoryName}</div>
          </div>
        </div>
      </div>

      <div className={styles.articleContent}>
        <p>{story.article}</p>
      </div>
    </article>
  );
}
