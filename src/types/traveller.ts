export interface Traveller {
  _id: string;
  name: string;
  avatarUrl: string;
  articlesAmount: number;
  savedArticles: string[];
}

export interface TravellersResponse {
  users: Traveller[];
  page: number;
  perPage: number;
  totalItems: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}