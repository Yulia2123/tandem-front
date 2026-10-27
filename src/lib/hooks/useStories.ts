import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { getStories, type GetStoriesParams } from '@/lib/api/stories';

export function useStories(params: GetStoriesParams = {}) {
  return useQuery({
    queryKey: ['stories', params],
    queryFn: () => getStories(params),
    placeholderData: keepPreviousData,
  });
}
