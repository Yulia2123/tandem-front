'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Story } from '@/types/story';
import { getCategories, Category } from '@/lib/api/categories';
import styles from './StoryDetails.module.css';

interface StoryDetailsProps {
  story: Story;
  authorName: string;
}

export default function StoryDetails({ story, authorName }: StoryDetailsProps) {
  const getInitialCategoryName = () => {
    if (typeof story.category === 'object' && story.category !== null) {
      return (story.category as unknown as Category).name || '';
    }
    // Якщо маємо тільки ID, спершу показуємо статус завантаження замість сирого айдішника
    return 'Завантаження...';
  };

  const [categoryName, setCategoryName] = useState<string>(
    getInitialCategoryName(),
  );

  useEffect(() => {
    const fetchCategoryName = async () => {
      if (typeof story.category === 'object' && story.category !== null) return;
      if (!story.category) {
        setCategoryName('');
        return;
      }

      try {
        const response = await getCategories();

        const categoriesList = Array.isArray(response)
          ? response
          : response.categories || response.data || [];

        const found = categoriesList.find(
          (cat: Category) => cat._id === story.category,
        );

        if (found) {
          const realCategoryName = found.name || found.title || found.category;
          if (realCategoryName) {
            setCategoryName(realCategoryName);
            return;
          }
        }

        // Якщо раптом не знайшли в списку, залишаємо ID як запасний варіант
        setCategoryName(story.category as string);
      } catch (error) {
        console.error('Помилка завантаження категорій:', error);
        setCategoryName(story.category as string);
      }
    };

    fetchCategoryName();
  }, [story.category]);

  return (
    <article className={`${styles.wrapper}`}>
      <div className={styles.topRow}>
        <div className={styles.imageWrapper}>
          <Image
            src={story.img}
            alt={story.title}
            fill
            sizes="100vw"
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
