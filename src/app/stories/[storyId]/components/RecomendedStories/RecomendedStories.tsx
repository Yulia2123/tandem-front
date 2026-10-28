'use client';

import { useState } from 'react';
import Link from 'next/link';
import toast from 'react-hot-toast';
import StoryCard from '@/components/StoryCard/StoryCard';
import Loader from '@/components/common/Loader/Loader';
import Modal from '@/components/Modal/Modal';
import { useGetRecommendedStories } from '@/lib/hooks/useRecommendedStories';
import { useGetSavedStories } from '@/lib/hooks/useGetSavedStories';
import { useSaveFavoriteStory } from '@/lib/hooks/useSaveFavoriteStory';
import { useDeleteFavoriteStory } from '@/lib/hooks/useDeleteFavoriteStory';
import { useAuthStore } from '@/lib/store/authStore';
// Modal styles are shared with PopularStories
import modalStyles from '@/components/PopularStories/PopularStories.module.css';
import styles from './RecomendedStories.module.css';
import { Story } from '@/types/story';

interface RecommendedStoriesProps {
  storyId: string;
}

export default function RecommendedStories({
  storyId,
}: RecommendedStoriesProps) {
  const { isAuthenticated } = useAuthStore();
  const [loadingStoryId, setLoadingStoryId] = useState<string | null>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const { savedStories } = useGetSavedStories();
  const { saveStory } = useSaveFavoriteStory();
  const { removeSavedStory } = useDeleteFavoriteStory();

  // Рекомендовані історії за id поточної історії
  const { data, isLoading, isError } = useGetRecommendedStories(storyId);

  const savedStoriesIds = isAuthenticated
    ? (savedStories?.data ?? []).map((story: Story) => story._id)
    : [];

  const handleSaveStory = async (currentStoryId: string) => {
    if (!isAuthenticated) {
      openModal();
      return;
    }
    setLoadingStoryId(currentStoryId);
    try {
      const isSaved = savedStoriesIds.includes(currentStoryId);
      if (isSaved) {
        await removeSavedStory(currentStoryId);
        toast.success('Історію видалено успішно');
      } else {
        await saveStory(currentStoryId);
        toast.success('Історію збережено успішно');
      }
    } catch (error) {
      toast.error(
        'Помилка при зміні статусу збереження, спробуйте знову пізніше',
      );
    } finally {
      setLoadingStoryId(null);
    }
  };

  if (isLoading) {
    return <Loader size="large" />;
  }

  if (isError) {
    return null;
  }

  const recommended = Array.isArray(data)
    ? (data as Story[])
    : (data?.stories ?? []);

  if (recommended.length === 0) {
    return null;
  }

  return (
    <section className={`${styles.containerRecomended} section`}>
      <div className="container">
        <h2 className={styles.title}>Вам також сподобається</h2>
        <div className={styles.cardContainer}>
          <StoryCard
            stories={recommended}
            isSavedStoryIds={savedStoriesIds}
            loadingStoryId={loadingStoryId}
            onSaveStory={handleSaveStory}
          />
        </div>

        {isModalOpen && (
          <Modal isOpen={isModalOpen} onClose={closeModal}>
            <div className={modalStyles.modalContainerWrapper}>
              <div className={modalStyles.modalTextWrapper}>
                <h2 className={modalStyles.modalTitle}>
                  Помилка під час збереження
                </h2>
                <p className={modalStyles.modalText}>
                  Щоб зберегти статтю вам треба увійти, якщо ще немає облікового
                  запису зареєструйтесь
                </p>
              </div>
              <div className={modalStyles.modalNavWrapper}>
                <Link
                  className={`${modalStyles.modalLink} ${modalStyles.Login}`}
                  href="/auth/login"
                >
                  Увійти
                </Link>
                <Link
                  className={`${modalStyles.modalLink} ${modalStyles.Register}`}
                  href="/auth/register"
                >
                  Зареєструватись
                </Link>
              </div>
            </div>
          </Modal>
        )}
      </div>
    </section>
  );
}
