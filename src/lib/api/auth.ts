import api from '@/lib/api/api';

export interface RegisterData {
  name: string;
  email: string;
  password: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export async function registerUser(payload: RegisterData) {
  const { data } = await api.post('/auth/register', payload);
  return data;
}

export async function loginUser(payload: LoginData) {
  const { data } = await api.post('/auth/login', payload);
  return data;
}

export async function refreshUserSession() {
  const { data } = await api.post('/auth/refresh');
  return data;
}

export async function logoutUser() {
  const { data } = await api.post('/auth/logout');
  return data;
}
