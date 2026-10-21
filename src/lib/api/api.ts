import axios, { AxiosError } from 'axios';

export type ApiError = AxiosError<{ error: string }>;

const api = axios.create({
  baseURL: '/api',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
