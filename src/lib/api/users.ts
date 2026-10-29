import api from '@/lib/api/api';
import { User } from '@/types/user';
import { refreshUserSession } from './auth';

export interface GetUsersParams {
  page?: number;
  perPage?: number;
}

export interface UsersResponse {
  page: number;
  perPage: number;
  totalItems: number;
  totalPages: number;
  users: User[];
}

export const getCurrentUser = async () => {
  const response = await api.get('/users/me');
  return response.data.user;
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

export const getAllUsers = async (
  params: GetUsersParams = {},
): Promise<UsersResponse> => {
  const response = await api.get(`/users/`, { params });
  return response.data;
};

export async function checkSession() {
  try {
    const data = await refreshUserSession();
    return data;
  } catch {
    throw new Error("Session check failed");
  }
}