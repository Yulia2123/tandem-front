import { useInfiniteQuery } from '@tanstack/react-query';
import { getStories } from '@/lib/api/stories';

interface UseInfiniteStoriesParams {
  perPage?: number;
  category?: string;
  popular?: 'asc' | 'desc';
}

export function useInfiniteStories({
  perPage = 8,
  category,
  popular = 'desc',
}: UseInfiniteStoriesParams = {}) {
  return useInfiniteQuery({
    queryKey: ['stories-infinite', perPage, category, popular],

    queryFn: ({ pageParam }) =>
      getStories({
        page: pageParam,
        perPage,
        ...(category ? { category } : {}),
        popular,
      }),

    initialPageParam: 1,

    getNextPageParam: (lastPage) => {
      if (lastPage.page < lastPage.totalPages) {
        return lastPage.page + 1;
      }

      return undefined;
    },
  });
}
