import { useInfiniteQuery } from '@tanstack/react-query';
import { getTravellers } from '@/lib/api/travellers';

export function useTravellers(perPage = 12) {
  return useInfiniteQuery({
    queryKey: ['travellers', perPage],
    queryFn: ({ pageParam }) =>
      getTravellers({
        page: pageParam,
        perPage,
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
