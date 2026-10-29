
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { removeSavedStory } from '../api/users';

export function useDeleteFavoriteStory() {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending, isSuccess, isError, error } = useMutation({
    mutationFn: (storyId: string) => removeSavedStory(storyId),

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['savedArticles'],
      });

      await queryClient.invalidateQueries({
        predicate: (query) =>
          query.queryKey.some(
            (key) =>
              typeof key === 'string' &&
              (key.toLowerCase().includes('saved') ||
                key.toLowerCase().includes('profile')),
          ),
      });
    },
  });

  return {
    removeSavedStory: mutateAsync,
    isLoading: isPending,
    isSuccess,
    isError,
    error,
  };
}
