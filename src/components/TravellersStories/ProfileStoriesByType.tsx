'use client';
import Link from 'next/link';
import { useEffect, useState, useSyncExternalStore } from 'react';
import { useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import StoryCard from '@/components/StoryCard/StoryCard';
import Modal from '@/components/Modal/Modal';
import MessageNoStories from '@/components/MessageNoStories/MessageNoStories';

import { getCurrentUserStories, getSavedStories } from '@/lib/api/users';
import { useAllUsers } from '@/lib/hooks/useAllUsers';
import { useDeleteFavoriteStory } from '@/lib/hooks/useDeleteFavoriteStory';
import { useSaveFavoriteStory } from '@/lib/hooks/useSaveFavoriteStory';
import { useGetSavedStories } from '@/lib/hooks/useGetSavedStories';
import { useAuthStore } from '@/lib/store/authStore';

import type { Story } from '@/types/story';
import styles from './TravellersStories.module.css';

type StoriesType = 'saved' | 'my-stories';

interface TravellersStoriesProps {
  type: StoriesType;
}

function subscribeToDesktop(callback: () => void) {
  const media = window.matchMedia('(min-width: 1440px)');
  media.addEventListener('change', callback);

  return () => media.removeEventListener('change', callback);
}

function getDesktopSnapshot() {
  return window.matchMedia('(min-width: 1440px)').matches;
}

function getServerSnapshot() {
  return false;
}

function useIsDesktop() {
  return useSyncExternalStore(
    subscribeToDesktop,
    getDesktopSnapshot,
    getServerSnapshot,
  );
}

export default function TravellersStories({ type }: TravellersStoriesProps) {
  const isDesktop = useIsDesktop();
  const initialLimit = isDesktop ? 6 : 4;

  const [visibleCount, setVisibleCount] = useState(initialLimit);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loadingStoryId, setLoadingStoryId] = useState<string | null>(null);

  const { isAuthenticated } = useAuthStore();

  const { saveStory } = useSaveFavoriteStory();
  const { removeSavedStory } = useDeleteFavoriteStory();

  const { savedStories } = useGetSavedStories();

  const {
    data: ownersData,
    isLoading: isUsersLoading,
    isError: isUsersError,
  } = useAllUsers();

  const {
    data,
    isLoading: isStoriesLoading,
    isError: isStoriesError,
  } = useQuery({
    queryKey: ['profile-stories', type],
    queryFn: () =>
      type === 'saved' ? getSavedStories() : getCurrentUserStories(),
  });

  useEffect(() => {
    setVisibleCount(initialLimit);
  }, [initialLimit, type]);

  useEffect(() => {
    if (isStoriesError || isUsersError) {
      toast.error('Не вдалося завантажити історії');
    }
  }, [isStoriesError, isUsersError]);

  const savedStoriesIds = isAuthenticated
    ? (savedStories?.data ?? []).map((story: Story) => story._id)
    : [];

  // Працюємо зі структурою відповіді так само, як у PopularStories.
  const stories: Story[] = Array.isArray(data?.stories)
    ? data.stories
    : Array.isArray(data?.data)
      ? data.data
      : Array.isArray(data)
        ? data
        : [];

  const visibleStories = stories.slice(0, visibleCount);
  const hasMoreStories = visibleCount < stories.length;

  const handleSaveStory = async (storyId: string) => {
    if (!isAuthenticated) {
      setIsModalOpen(true);
      return;
    }

    setLoadingStoryId(storyId);

    try {
      if (savedStoriesIds.includes(storyId)) {
        await removeSavedStory(storyId);
        toast.success('Історію видалено успішно');
      } else {
        await saveStory(storyId);
        toast.success('Історію збережено успішно');
      }
    } catch {
      toast.error(
        'Помилка при зміні статусу збереження, спробуйте знову пізніше',
      );
    } finally {
      setLoadingStoryId(null);
    }
  };

  if (isStoriesLoading || isUsersLoading) {
    return <p>Завантаження історій...</p>;
  }

  if (isStoriesError || isUsersError) {
    return (
      <p className={styles.message} role="alert">
        Не вдалося завантажити історії. Спробуй оновити сторінку.
      </p>
    );
  }

  if (stories.length === 0) {
    return (
      <MessageNoStories
        text={
          type === 'saved'
            ? 'У вас ще немає збережених історій, мершій збережіть вашу першу історію!'
            : 'Ви ще нічого не публікували, поділіться своєю першою історією!'
        }
        buttonText={type === 'saved' ? 'До історій' : 'Створити історію'}
        linkTo={type === 'saved' ? '/stories' : '/new-story'}
      />
    );
  }

  return (
    <section className={styles.section}>
      <div className={styles.list}>
        {visibleStories.map((story) => (
          <div className={styles.card} key={story._id}>
            <StoryCard
              stories={[story]}
              owners={ownersData?.users ?? []}
              isSavedStoryIds={savedStoriesIds}
              loadingStoryId={loadingStoryId}
              onSaveStory={handleSaveStory}
            />
          </div>
        ))}
      </div>

      {hasMoreStories && (
        <div className={styles.loadMoreWrapper}>
          <button
            type="button"
            className={styles.loadMoreButton}
            onClick={() => setVisibleCount((count) => count + initialLimit)}
          >
            <span className={styles.loadMoreButtonText}>Показати ще</span>
          </button>
        </div>
      )}

      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      )}
    </section>
  );
}
