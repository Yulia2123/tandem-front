import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { getAllUsers, GetUsersParams } from '@/lib/api/users';

export function useAllUsers(params: GetUsersParams = {}) {
  return useQuery({
    queryKey: ['users', params],
    queryFn: () => getAllUsers(params),
    placeholderData: keepPreviousData,
  });
}
