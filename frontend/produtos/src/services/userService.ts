import { User } from '../types';
import api from './api.ts';

export const userService = {
  getAllUsers: async (): Promise<User[]> => {
    const response = await api.get<User[]>('/auth/list');
    return response.data;
  },
  
  getUserById: async (id: number): Promise<User> => {
    const response = await api.get<User>(`/auth/${id}`);
    return response.data;
  },
  
  createUser: async (user: User): Promise<User> => {
    const response = await api.post<User>('/auth/register', user);
    return response.data;
  },
  
  updateUser: async (id: number, user: User): Promise<User> => {
    const response = await api.put<User>(`/auth/${id}`, user);
    return response.data;
  },
  
  deleteUser: async (id: number): Promise<void> => {
    await api.delete(`/auth/${id}`);
  }
};
