import Link from 'next/link';
import Image from 'next/image';
import styles from './StoryDetails.module.css';
import { Story } from '@/types/story';

interface StoryDetailsProps {
  story: Story;
  authorName: string;
}

export default function StoryDetails({ story, authorName }: StoryDetailsProps) {
  return (
    <article className={styles.article}>
      {/* Зображення статті */}
      {story.img && (
        <div className={styles.imageContainer}>
          <Image
            src={story.img}
            alt={story.title}
            fill
            sizes="(max-width: 768px) 100vw, 800px"
            priority
            className={styles.image}
          />
        </div>
      )}

      {/* Кнопка назад зі стрілочкою */}
      <Link href="/stories" className={styles.backLink}>
        <span className={styles.backArrow}>‹</span> Всі статті
      </Link>

      <h1 className={styles.title}>{story.title}</h1>

      {/* Блок метаданих */}
      <div className={styles.metaInfo}>
        <p>
          <strong>Автор статті:</strong> {authorName}
        </p>
        <p>
          <strong>Опубліковано:</strong> {story.date}
        </p>

        <div className={styles.categoryWrapper}>
          <span className={styles.categoryTag}>Маршрути</span>
        </div>
      </div>

      {/* Основний текст */}
      <div className={styles.articleText}>{story.article}</div>
    </article>
  );
}
