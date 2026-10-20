import { useInfiniteQuery } from '@tanstack/react-query';
import { getTravellers } from '@/lib/api/travellers';

export function useTravellers() {
  return useInfiniteQuery({
    queryKey: ['travellers'],
    queryFn: ({ pageParam }) =>
      getTravellers({
        page: pageParam,
        perPage: 10,
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