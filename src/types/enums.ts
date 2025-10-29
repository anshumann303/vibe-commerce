// Product category enum
export const ProductCategory = {
  Electronics: "electronics",
  Clothing: "clothing",
  Books: "books",
  Home: "home",
  Sports: "sports",
  Beauty: "beauty"
} as const;

export type ProductCategory = typeof ProductCategory[keyof typeof ProductCategory];

// Order status enum
export const OrderStatus = {
  Pending: "pending",
  Confirmed: "confirmed",
  Shipped: "shipped",
  Delivered: "delivered",
  Cancelled: "cancelled"
} as const;

export type OrderStatus = typeof OrderStatus[keyof typeof OrderStatus];