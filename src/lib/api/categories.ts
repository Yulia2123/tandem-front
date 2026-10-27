import api from '@/lib/api/api';
import type { CategoriesResponse } from '@/types/category';

export const getCategories = async (): Promise<CategoriesResponse> => {
  const response = await api.get<CategoriesResponse>('/categories');
  return response.data;
};
