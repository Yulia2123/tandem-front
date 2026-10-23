
import travellersData from '@/data/travellers.json';

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

interface JsonTraveller {
  _id: string | { $oid: string };
  name: string;
  avatarUrl: string;
  articlesAmount: number;
}

export interface GetTravellersParams {
  page?: number;
  perPage?: number;
}

const travellers: Traveller[] = (
  travellersData as JsonTraveller[]
).map((traveller) => ({
  ...traveller,
  _id:
    typeof traveller._id === 'string'
      ? traveller._id
      : traveller._id.$oid,
}));

export async function getTravellers({
  page = 1,
  perPage = 10,
}: GetTravellersParams = {}): Promise<TravellersResponse> {
  const totalItems = travellers.length;
  const totalPages = Math.ceil(totalItems / perPage);
  const startIndex = (page - 1) * perPage;

  return {
    page,
    perPage,
    totalItems,
    totalPages,
    travellers: travellers.slice(startIndex, startIndex + perPage),
  };
}
