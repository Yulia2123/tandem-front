import Image from 'next/image';
import Link from 'next/link';
import { Story } from '@/types/story';
import styles from './StoryDetails.module.css';

interface StoryDetailsProps {
  story: Story;
  authorName: string;
}

const categoryMap: Record<string, string> = {
  '6966a5cdbc1b90f344c2e0bd': 'Карпати',
  '6966a5cdbc1b90f344c2e0c1': 'Полісся',
  '6966a5cdbc1b90f344c2e0be': 'Національні парки',
  '6966a5cdbc1b90f344c2e0c0': 'Озера та річки',
  '6966a5cdbc1b90f344c2e0bf': 'Поділля',
  '6966a5cdbc1b90f344c2e0bb': 'Еко-ферми та гастротури',
  '6966a5cdbc1b90f344c2e0bc': 'Традиції та культура',
};

export default function StoryDetails({ story, authorName }: StoryDetailsProps) {
  return (
    <article className={`${styles.wrapper} container `}>
      <div className={styles.topRow}>
        {/* Картинка як звичайний елемент потоку без абсолютного позиціонування */}
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
              <span className={styles.metaValue}>
                {story.date || '23.07.2025'}
              </span>
            </div>
            <div className={styles.routeBadge}>
              {categoryMap[story.category] || story.category}
            </div>
          </div>
        </div>
      </div>

      <div className={styles.articleContent}>
        <p>{story.article}</p>
      </div>
    </article>
  );
}
