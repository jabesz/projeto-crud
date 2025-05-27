import { InventoryMovement } from '../types';
import api from './api.ts';

export const inventoryMovementService = {
  getAllMovements: async (): Promise<InventoryMovement[]> => {
    const response = await api.get<InventoryMovement[]>('/api/movements');
    return response.data;
  },
  
  getMovementById: async (id: number): Promise<InventoryMovement> => {
    const response = await api.get<InventoryMovement>(`/api/movements/${id}`);
    return response.data;
  },
  
  createMovement: async (movement: InventoryMovement): Promise<InventoryMovement> => {
    const response = await api.post<InventoryMovement>('/api/movements', movement);
    return response.data;
  },
  
  deleteMovement: async (id: number): Promise<void> => {
    await api.delete(`/api/movements/${id}`);
  }
};
