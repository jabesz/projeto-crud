import axios from 'axios';
import { AuthRequest, AuthResponse, User } from '../types';

const API_URL = 'http://localhost:3030';

// Configuração do axios com interceptor para token JWT
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para tratar erros de autenticação
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const authService = {
  login: async (credentials: AuthRequest): Promise<string> => {
    const response = await api.post<AuthResponse>('/auth/login', credentials);
    const token = response.data.token;
    localStorage.setItem('token', token);
    return token;
  },
  
  logout: (): void => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  },
  
  register: async (user: User): Promise<User> => {
    const response = await api.post<User>('/auth/register', user);
    return response.data;
  },
  
  isAuthenticated: (): boolean => {
    const token = localStorage.getItem('token');
    return !!token;
  },
  
  getToken: (): string | null => {
    return localStorage.getItem('token');
  }
};

export default api;