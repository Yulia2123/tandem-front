// import api from '@/lib/api/api';

// export const getCategories = async () => {
//   const response = await api.get('/categories');
//   return response.data;
// };

import api from '@/lib/api/api';
import type { CategoriesResponse } from '@/types/category';

export const getCategories = async (): Promise<CategoriesResponse> => {
  const response = await api.get<CategoriesResponse>('/categories');
  return response.data;
};
