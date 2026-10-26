'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import toast from 'react-hot-toast';

import CategoriesFilter from '@/components/CategoriesFilter/CategoriesFilter';
import StoryCard from '@/components/StoryCard/StoryCard';
import Modal from '@/components/Modal/Modal';

import { useCategories } from '@/lib/hooks/useCategories';
import { useStories } from '@/lib/hooks/useStories';
import { useAllUsers } from '@/lib/hooks/useAllUsers';
import { useSaveFavoriteStory } from '@/lib/hooks/useSaveFavoriteStory';
import { useDeleteFavoriteStory } from '@/lib/hooks/useDeleteFavoriteStory';
import { useGetSavedStories } from '@/lib/hooks/useGetSavedStories';
import { useAuthStore } from '@/lib/store/authStore';

import type { Article } from '@/types/article';
import css from './page.module.css';

import Header from '@/components/layout/Header/Header';
import Footer from '@/components/layout/Footer/Footer';
import Loader from '@/components/common/Loader/Loader';

export default function StoriesPage() {
  const [selectedCategory, setSelectedCategory] = useState('');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const [isDesktop, setIsDesktop] = useState(false);

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
    // const { data, isPending, isFetching, isError } = useStories({
    //   page,
    //   perPage: 10,
    //   ...(category ? { category } : {}),
  });

  const {
    data: ownersData,
    isLoading: isUsersLoading,
    isError: isUsersError,
  } = useAllUsers();

  const { saveStory, isLoading: isSaveStoryLoading } = useSaveFavoriteStory();

  const { removeSavedStory, isLoading: isRemoveStoryLoading } =
    useDeleteFavoriteStory();

  const { savedStories, isLoading: isSavedStoriesLoading } =
    useGetSavedStories();

  const categories = categoriesData?.categories ?? [];
  const stories = storiesData?.stories ?? [];
  const owners = ownersData?.users ?? [];

  const savedStoriesIds = isAuthenticated
    ? (savedStories?.data ?? []).map((story: Article) => story._id)
    : [];

  const handleSaveStory = async (storyId: string) => {
    if (!isAuthenticated) {
      openModal();
      return;
    }

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
    }
  };

  const isFavoriteLoading =
    isSaveStoryLoading || isRemoveStoryLoading || isSavedStoriesLoading;

  return (
    <>
      <Header />

      <div className="section">
        <main className={css.page}>
          <div className={`container ${css.container}`}>
            <h1 className={css.title}>Статті</h1>

            {/* {isCategoriesLoading && (
              <p role="status">Завантаження категорій...</p>
            )} */}

            {/* {isFetching && !isPending && <Loader size="medium" />}

      {isPending && <Loader size="large" />} */}

            {isCategoriesError && (
              <p role="alert">
                Не вдалося завантажити категорії. Спробуйте оновити сторінку.
              </p>
            )}

            {!isCategoriesLoading && !isCategoriesError && (
              <CategoriesFilter
                categories={categories}
                selectedCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
              />
            )}

            <section aria-label="Список статей">
              {isStoriesFetching && (
                <p role="status" className={css.loadingMessage}>
                  Завантаження статей...
                </p>
              )}

              {(isStoriesError || isUsersError) && (
                <p role="alert">
                  Не вдалося завантажити статті. Спробуйте пізніше.
                </p>
              )}

              {!isStoriesError &&
                !isUsersError &&
                !isStoriesLoading &&
                !isUsersLoading &&
                (stories.length === 0 ? (
                  <p>У цій категорії поки немає статей.</p>
                ) : (
                  <StoryCard
                    stories={stories}
                    owners={owners}
                    isSavedStoryIds={savedStoriesIds}
                    isLoading={isFavoriteLoading}
                    onSaveStory={handleSaveStory}
                  />
                ))}
            </section>
          </div>

          {isModalOpen && (
            <Modal onClose={closeModal}>
              <div className={css.modalContainerWrapper}>
                <div className={css.modalTextWrapper}>
                  <h2 className={css.modalTitle}>Помилка під час збереження</h2>
                  <p className={css.modalText}>
                    Щоб зберегти статтю вам треба увійти, якщо ще немає
                    облікового запису зареєструйтесь
                  </p>
                </div>
                <div className={css.modalNavWrapper}>
                  <Link
                    className={`${css.modalLink} ${css.Login}`}
                    href="/auth/login"
                  >
                    Увійти
                  </Link>
                  <Link
                    className={`${css.modalLink} ${css.Register}`}
                    href="/auth/register"
                  >
                    Зареєструватись
                  </Link>
                </div>
              </div>
            </Modal>
          )}
        </main>
      </div>

      <Footer />
    </>
  );
}

// 'use client';

// import { useState } from 'react';
// import { useStories } from '@/lib/hooks/useStories';
// import { useCategories } from '@/lib/hooks/useCategories';

// export default function StoriesPage() {
//   const [page, setPage] = useState(1);
//   const [category, setCategory] = useState('');

//   const { data: categoriesData, isPending: categoriesPending } =
//     useCategories();

//   const { data, isPending, isError } = useStories({
//     page,
//     perPage: 10,
//     ...(category ? { category } : {}),
//   });

//   const categories = Array.isArray(categoriesData)
//     ? categoriesData
//     : (categoriesData?.categories ?? []);

//   return (
//     <main>
//       <h1>Історії мандрів</h1>

//       <label htmlFor="category">Категорія:</label>
//       <select
//         id="category"
//         value={category}
//         onChange={(event) => {
//           setCategory(event.target.value);
//           setPage(1);
//         }}
//         disabled={categoriesPending}
//       >
//         <option value="">Усі категорії</option>
//         {categories.map((item: { _id: string; category: string }) => (
//           <option key={item._id} value={item.category}>
//             {item.category}
//           </option>
//         ))}
//       </select>

//       {isPending && <p>Завантаження історій...</p>}

//       {isError && <p>Не вдалося завантажити історії.</p>}

//       {data && (
//         <>
//           {data.stories.length === 0 ? (
//             <p>Поки що історій немає.</p>
//           ) : (
//             <ul>
//               {data.stories.map((story) => (
//                 <li key={story._id}>
//                   <h2>{story.title ?? 'Історія мандрівника'}</h2>
//                   {story.article && <p>{story.article}</p>}
//                 </li>
//               ))}
//             </ul>
//           )}

//           <button
//             type="button"
//             disabled={page <= 1}
//             onClick={() => setPage((current) => current - 1)}
//           >
//             Попередня
//           </button>

//           <span>
//             {' '}
//             Сторінка {page} з {data.totalPages}{' '}
//           </span>

//           <button
//             type="button"
//             disabled={page >= data.totalPages}
//             onClick={() => setPage((current) => current + 1)}
//           >
//             Наступна
//           </button>
//         </>
//       )}
//     </main>
//   );
// }
