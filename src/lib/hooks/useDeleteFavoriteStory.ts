
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { removeSavedStory } from '../api/users';

export function useDeleteFavoriteStory() {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending, isSuccess, isError, error } = useMutation({
    mutationFn: (storyId: string) => removeSavedStory(storyId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['savedArticles'] });
      queryClient.invalidateQueries({
        queryKey: ['profile-stories', 'saved'],
      });
      queryClient.invalidateQueries({ queryKey: ['user'] });
      queryClient.invalidateQueries({ queryKey: ['current-user'] });
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
