import { ProductCard } from '@/components/ProductCard';
import { CategoryFilter } from '@/components/CategoryFilter';
import { useCart } from '@/context/CartContext';
import { useProducts } from '@/hooks/useProducts';
import { toast } from 'sonner';
import { useSearchParams } from 'react-router-dom';
import { useMemo } from 'react';

export function ProductsGrid() {
  const { addToCart } = useCart();
  const { products, loading } = useProducts();
  const [searchParams] = useSearchParams();
  const categoryFilter = searchParams.get('category');

  const filteredProducts = useMemo(() => {
    if (!categoryFilter) return products;
    return products.filter(product => 
      product.category.toLowerCase() === categoryFilter.toLowerCase()
    );
  }, [products, categoryFilter]);

  const getCategoryTitle = () => {
    if (!categoryFilter) return 'All Products';
    return categoryFilter.charAt(0).toUpperCase() + categoryFilter.slice(1);
  };

  const handleAddToCart = (productId: string) => {
    addToCart(productId);
    const product = filteredProducts.find((p) => p.id === productId);
    toast.success('Product added to cart', {
      description: product ? `${product.name} has been added to your cart` : undefined,
    });
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading products...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="heading-2 mb-2">{getCategoryTitle()}</h2>
            <p className="text-muted-foreground">
              {categoryFilter 
                ? `Discover our ${categoryFilter} collection` 
                : 'Browse our complete collection of premium products'
              }
            </p>
          </div>
          {categoryFilter && (
            <div className="text-sm text-muted-foreground">
              {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''} found
            </div>
          )}
        </div>

      </div>

      <CategoryFilter />

      {filteredProducts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground text-lg mb-4">
            No products found in this category.
          </p>
          <button 
            onClick={() => window.history.back()}
            className="text-accent hover:underline"
          >
            Go back
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={handleAddToCart}
            />
          ))}
        </div>
      )}
    </div>
  );
}