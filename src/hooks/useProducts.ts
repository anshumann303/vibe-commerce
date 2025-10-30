import { useState, useEffect } from 'react';
import { api, ApiError } from '@/services/api';
import type { Product } from '@/types/schema';
import { mockProducts } from '@/data/productsMockData';

export function useProducts() {
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await api.products.getAll();
      // Map backend data to frontend Product type
      const mappedProducts: Product[] = data.map((item: any, index: number) => ({
        id: item.id,
        name: item.name,
        price: item.price,
        description: item.description,
        image: item.image,
        category: index < 2 ? 'electronics' as const : 
                 index < 4 ? 'sports' as const : 
                 index < 5 ? 'clothing' as const : 'home' as const,
        stock: 15 - (index * 2), // Varying stock levels
      }));
      setProducts(mappedProducts);
    } catch (err) {
      console.warn('Failed to fetch products from API, using mock data:', err);
      setError(err instanceof ApiError ? err.message : 'Failed to fetch products');
      // Keep using mock data as fallback
      setProducts(mockProducts);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return {
    products,
    loading,
    error,
    refetch: fetchProducts,
  };
}