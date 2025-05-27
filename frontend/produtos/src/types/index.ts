// Interfaces para os modelos de dados

export interface Product {
  id?: number;
  name: string;
  category: string;
  description: string;
  price: number;
  quantity: number;
  supplier: string;
  initialStock?: number;
}

export interface User {
  id?: number;
  name: string;
  email: string;
  password?: string;
}

export interface InventoryMovement {
  id?: number;
  productId: number;
  quantity: number;
  type: 'ENTRADA' | 'SAIDA';
  movementDate: string;
  description: string;
  productName?: string; // Campo adicional para exibição
}

export interface AuthRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
}

// Interfaces para estados e props de componentes

export interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

export interface AlertProps {
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
  show: boolean;
  onClose: () => void;
}

export interface ModalProps {
  show: boolean;
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor: string[];
    borderColor?: string[];
    borderWidth?: number;
  }[];
}

export interface DashboardStats {
  totalProducts: number;
  totalValue: number;
  lowStockProducts: number;
  recentMovements: InventoryMovement[];
  productsByCategory: ChartData;
}
