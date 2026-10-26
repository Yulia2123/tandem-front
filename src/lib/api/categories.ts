import api from '@/lib/api/api';

export interface Category {
  _id: string;
  name: string;
}

export const getCategories = async () => {
  const response = await api.get('/categories');
  return response.data;
};
