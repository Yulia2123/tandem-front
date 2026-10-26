import api from '@/lib/api/api';

export interface Traveller {
  _id: string;
  name: string;
  avatarUrl: string;
  articlesAmount: number;
}

export interface TravellersResponse {
  page: number;
  perPage: number;
  totalItems: number;
  totalPages: number;
  travellers: Traveller[];
}

export interface GetTravellersParams {
  page?: number;
  perPage?: number;
}

interface ApiTravellersResponse {
  page: number;
  perPage: number;
  totalItems: number;
  totalPages: number;
  users: Traveller[];
}

export async function getTravellers({
  page = 1,
  perPage = 12,
}: GetTravellersParams = {}): Promise<TravellersResponse> {
  const response = await api.get<ApiTravellersResponse>('/users', {
    params: {
      page,
      perPage,
    },
  });

  return {
    page: response.data.page,
    perPage: response.data.perPage,
    totalItems: response.data.totalItems,
    totalPages: response.data.totalPages,
    travellers: response.data.users,
  };
}
