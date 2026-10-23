import { useQuery } from '@tanstack/react-query';
import { getSavedStories } from '../api/users';
import { useAuthStore } from '@/lib/store/authStore';

export function useGetSavedStories() {
  const { isAuthenticated } = useAuthStore();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['savedArticles'],
    queryFn: getSavedStories,
    enabled: isAuthenticated,
  });

  return { savedStories: data, isLoading, isError, error };
}
