'use client';

import TravellersStories from '@/components/TravellersStories/TravellersStories';
import css from './ProfilePage.module.css';
import {
  getMySavedHistory,
  getMyPostedHistory,
  type StoriesResponse,
} from '@/lib/api/stories';
import { useProfileStore } from '@/lib/store/historyPageStore';
import { useInfiniteQuery } from '@tanstack/react-query';

export default function ProfilePageClient() {
  const profileTabs = useProfileStore((state) => state.currentTab);

  const {
    data,
    isPending,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['stories', profileTabs],

    queryFn: ({ pageParam }) => {
      const config = { page: pageParam, perPage: 9 };

      if (profileTabs === 'my-posted-history') {
        return getMyPostedHistory(config);
      }

      return getMySavedHistory(config);
    },

    initialPageParam: 1,

    getNextPageParam: (lastPage: StoriesResponse) => {
      return lastPage.page < lastPage.totalPages
        ? lastPage.page + 1
        : undefined;
    },
  });

  const stories = data?.pages.flatMap((page) => page.stories) ?? [];

  if (isPending) {
    return <p className={css.loadingText}>Завантаження історій...</p>;
  }

  if (isError) {
    return (
      <p className={css.errorText}>
        Не вдалося завантажити історії. Спробуйте пізніше.
      </p>
    );
  }

  return (
    <>
      <TravellersStories stories={stories} />

      {hasNextPage && (
        <button
          type="button"
          onClick={() => fetchNextPage()}
          disabled={isFetchingNextPage}
          className={css.loadmore}
        >
          {isFetchingNextPage ? 'Завантаження...' : 'Load More'}
        </button>
      )}
    </>
  );
}
