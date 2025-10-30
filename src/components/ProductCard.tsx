import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { formatCurrency } from '@/utils/formatters';
import type { Product } from '@/types/schema';
import { useState } from 'react';

interface ProductCardProps {
  product: Product;
  onAddToCart: (productId: string) => void;
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

  const handleImageError = () => {
    console.warn(`Failed to load image for ${product.name}:`, product.image);
    setImageError(true);
    setImageLoading(false);
  };

  const handleImageLoad = () => {
    setImageLoading(false);
    setImageError(false);
  };

  return (
    <Card className="modern-card group cursor-pointer backdrop-blur-sm bg-gray-900/95 border border-gray-700/50 shadow-xl hover:shadow-2xl transition-all duration-300">
      <div className="aspect-square overflow-hidden relative rounded-t-lg">
        {imageLoading && !imageError && (
          <div className="animate-pulse bg-gray-800 w-full h-full flex items-center justify-center">
            <span style={{ color: '#e0e0e0' }} className="text-sm">Loading...</span>
          </div>
        )}
        {imageError ? (
          <div className="w-full h-full bg-gray-800 flex items-center justify-center">
            <span style={{ color: '#e0e0e0' }} className="text-sm text-center p-4">
              Image not available<br />
              <small className="text-xs opacity-75">{product.name}</small>
            </span>
          </div>
        ) : (
          <>
            <img
              src={product.image}
              alt={`${product.name} - ${product.description}`}
              className={`h-full w-full object-cover transition-all duration-500 group-hover:scale-110 ${imageLoading ? 'opacity-0' : 'opacity-100'}`}
              onError={handleImageError}
              onLoad={handleImageLoad}
            />
            {/* Subtle gradient overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </>
        )}
        {product.stock <= 5 && product.stock > 0 && (
          <div className="absolute top-3 left-3 bg-red-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-lg">
            LOW STOCK
          </div>
        )}
      </div>
      
      <div className="p-6 bg-gray-900/98">
        <div className="mb-4">
          <h3 className="font-semibold text-lg mb-2 line-clamp-1 group-hover:text-red-400 transition-colors duration-200" style={{ color: '#f5f5f5' }}>
            {product.name}
          </h3>
          <p className="text-sm line-clamp-2 leading-relaxed opacity-90" style={{ color: '#e0e0e0' }}>
            {product.description}
          </p>
        </div>
        
        <div className="flex items-center justify-between mb-6">
          <div className="text-2xl font-bold" style={{ color: '#f5f5f5' }}>
            {formatCurrency(product.price)}
          </div>
          <div className="text-xs" style={{ color: '#b0b0b0' }}>
            {product.stock > 0 ? `${product.stock} left` : 'Out of stock'}
          </div>
        </div>
        
        <Button
          onClick={() => onAddToCart(product.id)}
          disabled={product.stock === 0}
          className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold tracking-wide transition-all duration-200 py-3 rounded-lg shadow-lg hover:shadow-xl disabled:bg-gray-600 disabled:text-gray-400 disabled:cursor-not-allowed"
        >
          {product.stock === 0 ? 'OUT OF STOCK' : 'ADD TO CART'}
        </Button>
      </div>
    </Card>
  );
}