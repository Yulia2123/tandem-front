import axios, { AxiosError } from 'axios';

export type ApiError = AxiosError<{ error: string }>;

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
