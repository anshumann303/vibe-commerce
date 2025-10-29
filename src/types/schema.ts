// Product type
export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  category: "electronics" | "clothing" | "books" | "home" | "sports" | "beauty";
  stock: number;
}

// Cart item type
export interface CartItem {
  productId: string;
  quantity: number;
}

// Cart item with product details (derived type)
export interface CartItemWithProduct extends CartItem {
  product: Product;
}

// Customer information type
export interface CustomerInfo {
  name: string;
  email: string;
}

// Order type
export interface Order {
  id: string;
  customerInfo: CustomerInfo;
  items: CartItemWithProduct[];
  total: number;
  status: "pending" | "confirmed" | "shipped" | "delivered" | "cancelled";
  createdAt: Date;
}