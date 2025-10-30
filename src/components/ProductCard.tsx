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
    <Card className="modern-card group cursor-pointer backdrop-blur-sm bg-white border border-gray-200">
      <div className="aspect-square overflow-hidden bg-muted/30 relative">
        {imageLoading && !imageError && (
          <div className="animate-pulse bg-gray-200 w-full h-full flex items-center justify-center">
            <span className="text-gray-500 text-sm">Loading...</span>
          </div>
        )}
        {imageError ? (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <span className="text-gray-600 text-sm text-center p-4">
              Image not available<br />
              <small className="text-xs">{product.name}</small>
            </span>
          </div>
        ) : (
          <img
            src={product.image}
            alt={`${product.name} - ${product.description}`}
            className={`h-full w-full object-cover transition-all duration-300 group-hover:scale-105 ${imageLoading ? 'opacity-0' : 'opacity-100'}`}
            onError={handleImageError}
            onLoad={handleImageLoad}
          />
        )}
        {product.stock <= 5 && product.stock > 0 && (
          <div className="absolute top-3 left-3 bg-accent text-accent-foreground text-xs font-semibold px-2 py-1 rounded">
            LOW STOCK
          </div>
        )}
      </div>
      
      <div className="p-6">
        <div className="mb-4">
          <h3 className="font-semibold text-black text-lg mb-2 line-clamp-1 group-hover:text-accent transition-colors">
            {product.name}
          </h3>
          <p className="text-gray-600 text-sm line-clamp-2 leading-relaxed">
            {product.description}
          </p>
        </div>
        
        <div className="flex items-center justify-between mb-4">
          <div className="text-2xl font-bold text-black">
            {formatCurrency(product.price)}
          </div>
          <div className="text-xs text-gray-500">
            {product.stock > 0 ? `${product.stock} left` : 'Out of stock'}
          </div>
        </div>
        
        <Button
          onClick={() => onAddToCart(product.id)}
          disabled={product.stock === 0}
          className="w-full bg-black hover:bg-gray-800 text-white font-semibold tracking-wide transition-all duration-200 disabled:bg-gray-300 disabled:text-gray-500"
        >
          {product.stock === 0 ? 'OUT OF STOCK' : 'ADD TO CART'}
        </Button>
      </div>
    </Card>
  );
}