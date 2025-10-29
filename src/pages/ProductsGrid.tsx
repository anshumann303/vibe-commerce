import { ProductCard } from '@/components/ProductCard';
import { useCart } from '@/context/CartContext';
import { mockProducts } from '@/data/productsMockData';
import { toast } from 'sonner';

export function ProductsGrid() {
  const { addToCart } = useCart();

  const handleAddToCart = (productId: string) => {
    addToCart(productId);
    const product = mockProducts.find((p) => p.id === productId);
    toast.success('Product added to cart', {
      description: product ? `${product.name} has been added to your cart` : undefined,
    });
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="mb-8">
        <h2 className="heading-2 mb-2">Products</h2>
        <p className="text-muted-foreground">
          Browse our collection of premium products
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={handleAddToCart}
          />
        ))}
      </div>
    </div>
  );
}