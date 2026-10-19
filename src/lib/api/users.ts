import api from '@/lib/api/api';

export const getCurrentUser = async () => {
  const response = await api.get('/users/me');
  return response.data;
};

export const getCurrentUserStories = async (
  params?: Record<string, string | number>,
) => {
  const response = await api.get('/users/me/stories', { params });
  return response.data;
};

export const getSavedStories = async () => {
  const response = await api.get('/users/me/saved-stories');
  return response.data;
};

export const saveStory = async (storyId: string) => {
  const response = await api.post(`/users/me/saved-stories/${storyId}`);
  return response.data;
};

export const removeSavedStory = async (storyId: string) => {
  const response = await api.delete(`/users/me/saved-stories/${storyId}`);
  return response.data;
};

export const getUserProfile = async (userId: string) => {
  const response = await api.get(`/users/${userId}`);
  return response.data;
};
