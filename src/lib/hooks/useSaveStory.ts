import { useMutation, useQueryClient } from "@tanstack/react-query";
import { saveStory } from "../api/users";


export function useSaveStory() {
  const queryClient = useQueryClient();

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: (storyId: string) => saveStory(storyId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['stories'] });
    },
  });

  return {
    saveStory: mutate,
    isLoading: isPending,
    isError,
    error,
  };
}