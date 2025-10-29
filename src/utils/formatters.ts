import type { ProductCategory, OrderStatus } from '@/types/enums';

// Format currency values
export const formatCurrency = (amount: number): string => {
  return `$${amount.toFixed(2)}`;
};

// Format product category for display
export const formatCategory = (category: ProductCategory): string => {
  return category.charAt(0).toUpperCase() + category.slice(1);
};

// Format order status for display
export const formatOrderStatus = (status: OrderStatus): string => {
  return status.charAt(0).toUpperCase() + status.slice(1);
};