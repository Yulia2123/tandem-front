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
  stories: Story[];
}

export interface GetStoriesParams {
  page?: number;
  perPage?: number;
  category?: string;
  popular?: 'asc' | 'desc';
}
export interface profileTabs {
  tab: 'saved-history' | 'my-posted-history'
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
  perPage: number,
  page: number
}): Promise<Story[]> {
    const { data } = await api.get('/me/stories', {params: {
      page: config.page, perPage: config.perPage
    }});
    return data;
}
export async function getMyPostedHistory(config: {
  perPage: number,
  page: number
}): Promise<Story[]> {
      const { data } = await api.get('/users/me/stories', {params: {
      page: config.page, perPage: config.perPage
    }});
    return data;
}