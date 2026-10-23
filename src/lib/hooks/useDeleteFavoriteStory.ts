import { useMutation, useQueryClient } from "@tanstack/react-query";
import { removeSavedStory } from "../api/users";


export function useDeleteFavoriteStory() {
  const queryClient = useQueryClient();

  const { mutate, isPending, isSuccess, isError, error } = useMutation({
    mutationFn: (storyId: string) => removeSavedStory(storyId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['savedArticles'] });
    },
  });

  return {
    removeSavedStory: mutate,
    isLoading: isPending,
    isSuccess,
    isError,
    error,
  };
}