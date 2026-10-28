import api from './api';
import type { Story } from '@/types/story';

export type { Story };

// export interface Story {
//   _id: string;
//   title?: string;
//   description?: string;
//   category?: string;
//   rate?: number;
//   [key: string]: unknown;
// }

export interface StoriesResponse {
  page: number;
  perPage: number;
  totalItems: number;
  totalPages: number;
  stories: Story[];
}

export interface GetStoriesParams {
  page?: number;
  perPage?: number;
  category?: string;
  popular?: 'asc' | 'desc';
  ownerId?: string;
}

interface SavedStoriesApiResponse {
  page: number;
  perPage: number;
  totalItems: number;
  totalPages: number;
  data: Story[];
}

export interface profileTabs {
  tab: 'saved-history' | 'my-posted-history';
}
export async function getStories(
  params: GetStoriesParams = {},
): Promise<StoriesResponse> {
  const { data } = await api.get<StoriesResponse>('/stories', { params });
  return data;
}

export async function getStoryById(storyId: string) {
  const { data } = await api.get(`/stories/${storyId}`);
  return data;
}

export async function getRecommendedStories(storyId: string) {
  const { data } = await api.get(`/stories/${storyId}/recommended`);
  return data;
}

export async function createStory(payload: Record<string, unknown>) {
  const { data } = await api.post('/stories', payload);
  return data;
}

export async function getMySavedHistory(config: {
  perPage: number;
  page: number;
}): Promise<StoriesResponse> {
  const { data } = await api.get<SavedStoriesApiResponse>(
    '/users/me/saved-stories',
    { params: config },
  );

  return {
    page: data.page,
    perPage: data.perPage,
    totalItems: data.totalItems,
    totalPages: data.totalPages,
    stories: data.data,
  };
}

export async function getMyPostedHistory(config: {
  perPage: number;
  page: number;
}): Promise<StoriesResponse> {
  const { data } = await api.get<StoriesResponse>('/users/me/stories', {
    params: config,
  });

  return data;
}
