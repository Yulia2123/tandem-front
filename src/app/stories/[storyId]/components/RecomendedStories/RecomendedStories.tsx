'use client';

import { useEffect, useState } from 'react';
import StoryCard from '@/components/StoryCard/StoryCard';
import { Story } from '@/types/story';
import { User } from '@/types/user';
import { getUserById } from '@/lib/api/api';
import styles from './RecomendedStories.module.css';

interface RecommendedStoriesProps {
  storyId: string;
}

export default function RecommendedStories({
  storyId,
}: RecommendedStoriesProps) {
  const [recommended, setRecommended] = useState<Story[]>([]);
  const [owners, setOwners] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchRecommendedData = async () => {
      try {
        setIsLoading(true);

        // 1. Отримуємо рекомендовані історії
        const res = await fetch(`/api/stories/${storyId}/recommended`);
        const data = await res.json();

        const storiesList = Array.isArray(data)
          ? data
          : data.stories || data.data || [];

        // 2. Збираємо унікальні ownerId
        const ownerIds = Array.from(
          new Set(
            storiesList.map((story: Story) => story.ownerId).filter(Boolean),
          ),
        );

        // 3. Завантажуємо всіх авторів паралельно
        const ownersPromises = ownerIds.map(async (id) => {
          try {
            const userData = await getUserById(id as string);
            return userData.user || userData;
          } catch {
            return null;
          }
        });

        const ownersResults = await Promise.all(ownersPromises);
        const validOwners = ownersResults.filter(
          (owner): owner is User => owner !== null,
        );

        // 4. Оновлюємо обидва стейти
        setRecommended(storiesList);
        setOwners(validOwners);
      } catch {
        // Тихо обробляємо помилку без виведення в консоль
      } finally {
        setIsLoading(false);
      }
    };

    if (storyId) {
      fetchRecommendedData();
    }
  }, [storyId]);

  if (!isLoading && recommended.length === 0) {
    return null;
  }

  return (
    <section className="section">
      <div className="container">
        <h2 className={styles.title}>Вам також сподобається</h2>
        <div className={styles.cardContainer}>
          <StoryCard
            owners={owners}
            stories={recommended}
            isLoading={isLoading}
            onSaveStory={() => {}}
          />
        </div>
      </div>
    </section>
  );
}
