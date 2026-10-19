import api from '@/lib/api/api';

export const getCategories = async () => {
  const response = await api.get('/categories');
  return response.data;
};
