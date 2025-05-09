
export interface Mechanic {
  id: string;
  name: string;
  specialization?: string;
  phone?: string;
}

export interface Service {
  id: string;
  name: string;
  price: number;
  description: string;
  imageUrl?: string;
  comment?: string;
}

export interface CompletedService {
  id: string;
  mechanicId: string;
  serviceIds: string[];
  totalAmount: number;
  receivedAmount: number;
  completionDate: string; // ISO string
  createdAt: string; // ISO string
}

export type ViewMode = 'list' | 'grid';

export interface MotorcycleModel {
  id: string;
  name: string;
}

export interface Customer {
  id: string;
  name: string;
  phone?: string;
  email?: string;
  address?: string;
}

// Adicionando nova interface para indicar o tipo de cliente
export interface CustomerSelection {
  id?: string;  // ID se for cliente existente
  name: string; // Nome do cliente (existente ou novo)
  isNew?: boolean; // Indica se é um novo cliente
}
