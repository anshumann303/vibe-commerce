import type { Product } from '@/types/schema';

// Mock product data
export const mockProducts: Product[] = [
  {
    id: "1",
    name: "Wireless Headphones",
    price: 79.99,
    description: "Premium noise-cancelling wireless headphones with 30-hour battery life",
    image: "https://images.unsplash.com/photo-1648447265709-67a4e785d7e2?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHwzfHxoZWFkcGhvbmVzJTIwd2lyZWxlc3MlMjB0ZWNobm9sb2d5fGVufDB8Mnx8fDE3NjE3Njk2MTF8MA&ixlib=rb-4.1.0&q=85",
    category: "electronics" as const,
    stock: 15
  },
  {
    id: "2",
    name: "Smart Watch",
    price: 199.99,
    description: "Fitness tracking smartwatch with heart rate monitor and GPS",
    image: "https://images.unsplash.com/photo-1697490057407-34c996cab84f?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHwyfHxzbWFydHdhdGNoJTIwZml0bmVzcyUyMHdlYXJhYmxlfGVufDB8Mnx8fDE3NjE3Njk2MTF8MA&ixlib=rb-4.1.0&q=85",
    category: "electronics" as const,
    stock: 8
  },
  {
    id: "3",
    name: "Running Shoes",
    price: 89.99,
    description: "Lightweight running shoes with superior cushioning and support",
    image: "https://images.unsplash.com/photo-1645106281638-79585657aa4e?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHwxfHxydW5uaW5nJTIwc2hvZXMlMjBzbmVha2VycyUyMHNwb3J0c3xlbnwwfDJ8fHwxNzYxNzY5NjExfDA&ixlib=rb-4.1.0&q=85",
    category: "sports" as const,
    stock: 20
  },
  {
    id: "4",
    name: "Leather Backpack",
    price: 129.99,
    description: "Stylish leather backpack with laptop compartment and multiple pockets",
    image: "https://images.unsplash.com/photo-1691480250099-a63081ecfcb8?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHw1fHxiYWNrcGFjayUyMGxlYXRoZXIlMjBiYWd8ZW58MHwyfHx8MTc2MTc2OTYxMXww&ixlib=rb-4.1.0&q=85",
    category: "clothing" as const,
    stock: 12
  },
  {
    id: "5",
    name: "Coffee Maker",
    price: 149.99,
    description: "Programmable coffee maker with thermal carafe and auto-brew feature",
    image: "https://images.unsplash.com/photo-1637029680169-8304d6a10816?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHwyfHxjb2ZmZWUlMjBtYWtlciUyMGFwcGxpYW5jZSUyMGtpdGNoZW58ZW58MHwyfHx8MTc2MTc2OTYxMXww&ixlib=rb-4.1.0&q=85",
    category: "home" as const,
    stock: 10
  },
  {
    id: "6",
    name: "Yoga Mat",
    price: 34.99,
    description: "Non-slip yoga mat with extra cushioning for comfort",
    image: "https://images.unsplash.com/photo-1582106316415-d02d4d0e9066?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHwxfHx5b2dhJTIwbWF0JTIwZml0bmVzcyUyMGV4ZXJjaXNlfGVufDB8Mnx8fDE3NjE3Njk2MTF8MA&ixlib=rb-4.1.0&q=85",
    category: "sports" as const,
    stock: 25
  }
];