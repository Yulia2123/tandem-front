'use client'
import TravellersStories from "@/components/TravellersStories/TravellersStories";
import css from './ProfilePage.module.css'
import { getMySavedHistory, getMyPostedHistory } from "@/lib/api/stories";
import { useProfileStore } from "@/lib/store/historyPageStore";
import { useInfiniteQuery } from "@tanstack/react-query";

export default function ProfilePageClient () {
  const profileTabs = useProfileStore((state) => state.currentTab);

  const { 
    data, 
    isPending,
    isError,
    isSuccess, 
    fetchNextPage, 
    hasNextPage, 
    isFetchingNextPage 
  } = useInfiniteQuery({
    queryKey: ['stories', profileTabs],
    
    queryFn: ({ pageParam = 1 }) => {
      if (profileTabs === 'my-posted-history') {
        return getMyPostedHistory({ page: pageParam, perPage: 9 });
      }
      return getMySavedHistory({ page: pageParam, perPage: 9 });
    },
    
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      if (!lastPage || lastPage.length < 9) {
        return undefined;
      }
      return allPages.length + 1;
    },
  });

  const stories = data?.pages.flatMap(page => page) || [];

  if (isPending) {
    return <p className={css.loadingText}>Завантаження історій...</p>;
  }

  if (isError) {
    return <p className={css.errorText}>Не вдалося завантажити історії. Спробуйте пізніше.</p>;
  }

  return (
    <>
      {isSuccess && <TravellersStories stories={stories} />}
      
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