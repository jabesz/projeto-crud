import { Product } from '../types';
import api from './api.ts';

export const productService = {
  
  getAllProducts: async (): Promise<Product[]> => {
    const response = await api.get<Product[]>('/products');
    return response.data;
  },
  
  getProductById: async (id: number): Promise<Product> => {
    const response = await api.get<Product>(`/products/${id}`);
    return response.data;
  },
  
  createProduct: async (product: Product): Promise<Product> => {
    const response = await api.post<Product>('/products', product);
    return response.data;
  },
  
  updateProduct: async (id: number, product: Product): Promise<Product> => {
    const response = await api.put<Product>(`/products/${id}`, product);
    return response.data;
  },
  
  deleteProduct: async (id: number): Promise<void> => {
    await api.delete(`/products/${id}`);
  }
};
