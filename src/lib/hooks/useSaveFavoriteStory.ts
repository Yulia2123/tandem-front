
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { saveStory } from '../api/users';

export function useSaveFavoriteStory() {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending, isSuccess, isError, error } = useMutation({
    mutationFn: (storyId: string) => saveStory(storyId),
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
    saveStory: mutateAsync,
    isLoading: isPending,
    isSuccess,
    isError,
    error,
  };
}
