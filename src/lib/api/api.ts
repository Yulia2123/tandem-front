import axios, { AxiosError } from 'axios';
import { Story } from '@/types/story';
export type ApiError = AxiosError<{ error: string }>;

const api = axios.create({
  baseURL: '/api',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getStoryById = async (storyId: string): Promise<Story> => {
  const response = await api.get<{ story: Story }>(`/stories/${storyId}`);
  return response.data.story; // Додали .story на кінці!
};

export const getUserById = async (userId: string) => {
  const response = await api.get(`/users/${userId}`); // або /users/${userId} залежно від твого роута на бекенді
  return response.data;
};
export default api;
