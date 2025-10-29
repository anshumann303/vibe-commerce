import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Minus, Trash } from 'lucide-react';
import { formatCurrency } from '@/utils/formatters';
import type { Product } from '@/types/schema';

interface CartItemComponentProps {
  product: Product;
  quantity: number;
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemove: (productId: string) => void;
}

export function CartItemComponent({
  product,
  quantity,
  onUpdateQuantity,
  onRemove,
}: CartItemComponentProps) {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex gap-4">
          <div className="w-24 h-24 flex-shrink-0 overflow-hidden rounded-md">
            <img
              src={product.image}
              alt={`${product.name} - ${product.description}`}
              className="h-full w-full object-cover"
              style={{ width: '100%', height: '100%' }}
            />
          </div>

          <div className="flex-1 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex-1">
              <h3 className="font-semibold text-lg">{product.name}</h3>
              <p className="text-sm text-muted-foreground line-clamp-2">
                {product.description}
              </p>
              <p className="price-text mt-2">{formatCurrency(product.price)}</p>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => onUpdateQuantity(product.id, quantity - 1)}
                  disabled={quantity <= 1}
                >
                  <Minus size={16} />
                </Button>
                <span className="w-12 text-center font-medium">{quantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => onUpdateQuantity(product.id, quantity + 1)}
                  disabled={quantity >= product.stock}
                >
                  <Plus size={16} />
                </Button>
              </div>

              <Button
                variant="destructive"
                size="icon"
                onClick={() => onRemove(product.id)}
              >
                <Trash size={16} />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}