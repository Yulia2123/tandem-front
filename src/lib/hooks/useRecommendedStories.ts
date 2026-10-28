import { useQuery } from '@tanstack/react-query';
import { getRecommendedStories } from '../api/stories';

export function useGetRecommendedStories(storyId: string) {
  return useQuery({
    queryKey: ['savedArticles', storyId],
    queryFn: () => getRecommendedStories(storyId),
  });
}
