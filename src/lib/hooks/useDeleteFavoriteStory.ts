import { useMutation, useQueryClient } from "@tanstack/react-query";
import { removeSavedStory } from "../api/users";


export function useDeleteFavoriteStory() {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending, isSuccess, isError, error } = useMutation({
    mutationFn: (storyId: string) => removeSavedStory(storyId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['savedArticles'] });
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