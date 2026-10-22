import { Article } from '@/types/article';
import api from './api';

export interface Story {
  _id: string;
  title?: string;
  description?: string;
  category?: string;
  rate?: number;
  [key: string]: unknown;
}

export interface StoriesResponse {
  page: number;
  perPage: number;
  totalItems: number;
  totalPages: number;
  stories: Article[];
}

export interface GetStoriesParams {
  page?: number;
  perPage?: number;
  category?: string;
  popular?: 'asc' | 'desc';
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
