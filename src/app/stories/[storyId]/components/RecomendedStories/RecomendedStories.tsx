'use client';

import { useEffect, useState } from 'react';
import StoryCard from '@/components/StoryCard/StoryCard';
import Modal from '@/components/Modal/Modal'; // Імпортуємо нашу модалку
import { Story } from '@/types/story';
import { User } from '@/types/user';
import { getUserById } from '@/lib/api/api';
import { useAuthStore } from '@/lib/store/authStore'; // Перевірка авторизації
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

  // Стейт для модалки та статус авторизації
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  useEffect(() => {
    const fetchRecommendedData = async () => {
      try {
        setIsLoading(true);

        const res = await fetch(`/api/stories/${storyId}/recommended`);
        const data = await res.json();

        const storiesList = Array.isArray(data)
          ? data
          : data.stories || data.data || [];

        const ownerIds = Array.from(
          new Set(
            storiesList.map((story: Story) => story.ownerId).filter(Boolean),
          ),
        );

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

        setRecommended(storiesList);
        setOwners(validOwners);
      } catch {
        // Тихо обробляємо помилку
      } finally {
        setIsLoading(false);
      }
    };

    if (storyId) {
      fetchRecommendedData();
    }
  }, [storyId]);

  // Обробник кліку на збереження на будь-якій картці
  const handleSaveClick = (clickedStoryId: string) => {
    if (!isAuthenticated) {
      setIsModalOpen(true); // Якщо не залогінений — показуємо нашу модалку!
      return;
    }
    // Тут можна додати логіку збереження для авторизованого користувача, якщо вона потрібна
    console.log('Зберігаємо історію:', clickedStoryId);
  };

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
            onSaveStory={handleSaveClick} // Передаємо нашу перевірку замість пустої функції
          />
        </div>
      </div>

      {/* Наша автономна модалка, яка вискакує при кліку неавторизованого користувача */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section>
  );
}
