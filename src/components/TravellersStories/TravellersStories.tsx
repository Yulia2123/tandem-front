import css from './TravellersStories.module.css';
import Link from 'next/link';
import Image from 'next/image';
import { Story } from '@/lib/api/stories';
import { useProfileStore } from '@/lib/store/historyPageStore';

interface TravellersStoriesProps {
  stories?: Story[];
}

export default function TravellersStories({ stories }: TravellersStoriesProps) {
  const { currentTab } = useProfileStore();

  const isSavedTab = currentTab === 'saved-history';

  return (
    <div className={css.profileHistoryWrapper}>
      {stories && stories.length > 0 ? (
        <ul className={css.ProfileHistoryList}>
          {stories.map((story) => (
            <li className={css.ProfileHistoryItems} key={story._id as string}>
              <div className={css.ProfileHistoryImgWrapper}>
                <Image
                  src={story.img as string}
                  alt="Photo of travel."
                  fill
                  className={css.ProfileHistoryImg}
                />
              </div>

              <div className={css.ProfileHistoryItemInfo}>
                <p className={css.ProfileHistoryAutor}>
                  <span>{story.ownerId as string}</span>
                  <span>•</span>
                  <span>{story.rate}</span>
                  <svg
                    width="9.54"
                    height="11.76"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <use href="/save.svg#icon-save" />
                  </svg>
                </p>
                <p className={css.ProfileHistoryDescription}>{story.title}</p>
                <div className={css.ProfileHistoryBtnWrapper}>
                  <Link
                    href={`/stories/${story._id}`}
                    className={css.ProfileHistoryOpenTheHistory}
                  >
                    Переглянути статтю
                  </Link>
                  <button
                    type="button"
                    className={css.ProfileHistorySaveHistory}
                  >
                    <svg width="24" height="24" viewBox="0 0 27 32">
                      <use href="/save.svg#icon-save" />
                    </svg>
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div className={css.emptyStateWrapper}>
          <p className={css.profileHistoryText}>
            {isSavedTab
              ? 'У вас ще немає збережених історій, мершій збережіть вашу першу історію!'
              : 'Ви ще нічого не публікували, поділіться своєю першою історією!'}
          </p>
          <Link
            href={isSavedTab ? '/stories' : '/new/story'}
            className={css.profileToHistory}
          >
            {isSavedTab ? 'До історій' : 'Опублікувати історію'}
          </Link>
        </div>
      )}
    </div>
{/* 
'use client';

import { useEffect, useState, useSyncExternalStore } from 'react';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
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

import type { Article } from '@/types/article';
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

  const { isAuthenticated } = useAuthStore();

  const { saveStory, isLoading: isSaveStoryLoading } = useSaveFavoriteStory();

  const { removeSavedStory, isLoading: isRemoveStoryLoading } =
    useDeleteFavoriteStory();

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
    ? (savedStories?.data ?? []).map((story: Article) => story._id)
    : [];

  // Працюємо зі структурою відповіді так само, як у PopularStories.
  const stories: Article[] = Array.isArray(data?.stories)
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
            ? 'У тебе ще немає збережених історій. Знайди цікаві мандрівки та збережи їх!'
            : 'Ти ще не опублікував(-ла) жодної історії. Поділися своєю першою мандрівкою!'
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
              isLoading={isSaveStoryLoading || isRemoveStoryLoading}
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
        <Modal onClose={() => setIsModalOpen(false)}>
          <div className={styles.containerWrapper}>
            <div className={styles.modalTextWrapper}>
              <h2 className={styles.modalTitle}>Помилка під час збереження</h2>

              <p className={styles.modalText}>
                Щоб зберегти статтю, вам треба увійти. Якщо ще немає облікового
                запису, зареєструйтесь.
              </p>
            </div>

            <div className={styles.modalNavWrapper}>
              <Link
                className={`${styles.modalLink} ${styles.Login}`}
                href="/auth/login"
              >
                Увійти
              </Link>

              <Link
                className={`${styles.modalLink} ${styles.Register}`}
                href="/auth/register"
              >
                Зареєструватись
              </Link>
            </div>
          </div>
        </Modal>
      )}
    </section>

  );
} */}
