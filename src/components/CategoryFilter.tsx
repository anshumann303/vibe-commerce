import { Link, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const categories = [
  { id: 'all', name: 'All Products', href: '/products' },
  { id: 'electronics', name: 'Electronics', href: '/products?category=electronics' },
  { id: 'sports', name: 'Sports', href: '/products?category=sports' },
  { id: 'clothing', name: 'Clothing', href: '/products?category=clothing' },
  { id: 'home', name: 'Home', href: '/products?category=home' },
];

export function CategoryFilter() {
  const [searchParams] = useSearchParams();
  const currentCategory = searchParams.get('category') || 'all';

  return (
    <div className="mb-8">
      <h3 className="text-lg font-semibold text-high-contrast mb-4">Categories</h3>
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => {
          const isActive = currentCategory === category.id || 
                          (currentCategory === null && category.id === 'all');
          
          return (
            <Link key={category.id} to={category.href}>
              <Button
                variant={isActive ? "default" : "outline"}
                size="sm"
                className={`transition-all duration-200 ${
                  isActive 
                    ? 'bg-foreground text-background hover:bg-foreground/90' 
                    : 'border-border hover:border-accent hover:text-accent'
                }`}
              >
                {category.name}
              </Button>
            </Link>
          );
        })}
      </div>
    </div>
  );
}