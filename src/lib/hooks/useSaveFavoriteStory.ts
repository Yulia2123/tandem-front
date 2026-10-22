import { useMutation, useQueryClient } from "@tanstack/react-query";
import { saveStory } from "../api/users";


export function useSaveFavoriteStory() {
  const queryClient = useQueryClient();

  const { mutate, isPending, isSuccess, isError, error } = useMutation({
    mutationFn: (storyId: string) => saveStory(storyId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['stories'] });
    },
  });

  return {
    saveStory: mutate,
    isLoading: isPending,
    isSuccess,
    isError,
    error,
  };
}