'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import toast from 'react-hot-toast';

import CategoriesFilter from '@/components/CategoriesFilter/CategoriesFilter';
import StoryCard from '@/components/StoryCard/StoryCard';
import Modal from '@/components/Modal/Modal';
import Loader from '@/components/common/Loader/Loader';

import Header from '@/components/layout/Header/Header';
import Footer from '@/components/layout/Footer/Footer';

import { useCategories } from '@/lib/hooks/useCategories';
import { useStories } from '@/lib/hooks/useStories';
import { useSaveFavoriteStory } from '@/lib/hooks/useSaveFavoriteStory';
import { useDeleteFavoriteStory } from '@/lib/hooks/useDeleteFavoriteStory';
import { useGetSavedStories } from '@/lib/hooks/useGetSavedStories';
import { useAuthStore } from '@/lib/store/authStore';

import type { Story } from '@/types/story';
import css from './page.module.css';

export default function StoriesPage() {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [loadingStoryId, setLoadingStoryId] = useState<string | null>(null);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 1440px)');

    const updateScreenSize = () => {
      setIsDesktop(mediaQuery.matches);
    };

    updateScreenSize();
    mediaQuery.addEventListener('change', updateScreenSize);

    return () => {
      mediaQuery.removeEventListener('change', updateScreenSize);
    };
  }, []);

  const { isAuthenticated } = useAuthStore();

  const {
    data: categoriesData,
    isLoading: isCategoriesLoading,
    isError: isCategoriesError,
  } = useCategories();

  const {
    data: storiesData,
    isLoading: isStoriesLoading,
    isFetching: isStoriesFetching,
    isError: isStoriesError,
  } = useStories({
    page: 1,
    perPage: isDesktop ? 9 : 8,
    category: selectedCategory || undefined,
    popular: 'desc',
  });

  // const {
  //   data: ownersData,
  //   isLoading: isUsersLoading,
  //   isError: isUsersError,
  // } = useAllUsers();

  const { saveStory } = useSaveFavoriteStory();

  const { removeSavedStory } = useDeleteFavoriteStory();

  const { savedStories } = useGetSavedStories();

  const categories = categoriesData?.categories ?? [];
  const stories = storiesData?.stories ?? [];
  // const owners = ownersData?.users ?? [];

  const savedStoriesIds = isAuthenticated
    ? (savedStories?.data ?? []).map((story: Story) => story._id)
    : [];

  const handleSaveStory = async (storyId: string) => {
    if (!isAuthenticated) {
      openModal();
      return;
    }

    setLoadingStoryId(storyId);

    try {
      const isSaved = savedStoriesIds.includes(storyId);

      if (isSaved) {
        await removeSavedStory(storyId);
        toast.success('Статтю видалено з обраного');
      } else {
        await saveStory(storyId);
        toast.success('Статтю додано до обраного');
      }
    } catch {
      toast.error('Не вдалося змінити статус збереження. Спробуйте ще раз.');
    } finally {
      setLoadingStoryId(null);
    }
  };

  const isFavoriteLoading = loadingStoryId !== null;

  const isInitialLoading = isCategoriesLoading || isStoriesLoading;

  return (
    <>
      <Header />

      <div className="section">
        <main className={css.page}>
          <div className={`container ${css.container}`}>
            <h1 className={css.title}>Статті</h1>

            {isInitialLoading ? (
              <Loader size="large" />
            ) : (
              <>
                {isCategoriesError && (
                  <p role="alert">
                    Не вдалося завантажити категорії. Спробуйте оновити
                    сторінку.
                  </p>
                )}

                {!isCategoriesError && (
                  <CategoriesFilter
                    categories={categories}
                    selectedCategory={selectedCategory}
                    onCategoryChange={setSelectedCategory}
                  />
                )}

                <section aria-label="Список статей">
                  {isStoriesError ? (
                    <p role="alert">
                      Не вдалося завантажити статті. Спробуйте пізніше.
                    </p>
                  ) : isStoriesFetching ? (
                    <Loader size="medium" />
                  ) : stories.length === 0 ? (
                    <p>У цій категорії поки немає статей.</p>
                  ) : (
                    <StoryCard
                      stories={stories}
                      // owners={owners}
                      isSavedStoryIds={savedStoriesIds}
                      loadingStoryId={loadingStoryId}
                      onSaveStory={handleSaveStory}
                    />
                  )}
                </section>
              </>
            )}
          </div>

          {isModalOpen && <Modal isOpen={isModalOpen} onClose={closeModal} />}
        </main>
      </div>

      <Footer />
    </>
  );
}
