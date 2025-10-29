import { Link, useNavigate } from 'react-router-dom';
import { CartItemComponent } from '@/components/CartItemComponent';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ArrowLeft, ShoppingCart } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { formatCurrency } from '@/utils/formatters';
import { toast } from 'sonner';

export function CartPage() {
  const navigate = useNavigate();
  const { getCartItemsWithProducts, updateCartItemQuantity, removeFromCart, total } = useCart();
  const cartItems = getCartItemsWithProducts();

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    updateCartItemQuantity(productId, quantity);
    toast.success('Cart updated');
  };

  const handleRemove = (productId: string) => {
    removeFromCart(productId);
    toast.success('Item removed from cart');
  };

  const handleCheckout = () => {
    navigate('/checkout');
  };

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-6">
          <ArrowLeft size={16} />
          Back to Products
        </Link>

        <Alert className="max-w-2xl mx-auto">
          <ShoppingCart className="h-4 w-4" />
          <AlertDescription className="ml-2">
            <p className="font-semibold mb-2">Your cart is empty</p>
            <p className="text-sm text-muted-foreground">
              Start shopping to add items to your cart
            </p>
            <Link to="/">
              <Button className="mt-4">Continue Shopping</Button>
            </Link>
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-6">
        <ArrowLeft size={16} />
        Back to Products
      </Link>

      <h2 className="heading-2 mb-6">Shopping Cart</h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {cartItems.map(({ product, quantity }) => (
            <CartItemComponent
              key={product.id}
              product={product}
              quantity={quantity}
              onUpdateQuantity={handleUpdateQuantity}
              onRemove={handleRemove}
            />
          ))}
        </div>

        <div className="lg:col-span-1">
          <Card className="sticky top-20">
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-medium">{formatCurrency(total)}</span>
              </div>
              <Separator />
              <div className="flex justify-between">
                <span className="font-semibold">Total</span>
                <span className="font-bold text-xl text-primary">
                  {formatCurrency(total)}
                </span>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleCheckout} className="w-full" size="lg">
                Proceed to Checkout
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}