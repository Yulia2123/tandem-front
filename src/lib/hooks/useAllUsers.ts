import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { getAllUsers } from '@/lib/api/users';

export function useAllUsers() {
  return useQuery({
    queryKey: ['users'],
    queryFn: () => getAllUsers(),
    placeholderData: keepPreviousData,
  });
}
