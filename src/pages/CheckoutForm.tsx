import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { formatCurrency } from '@/utils/formatters';
import { ReceiptModal } from '@/components/ReceiptModal';
import type { CustomerInfo } from '@/types/schema';

interface CheckoutFormData {
  name: string;
  email: string;
}

export function CheckoutForm() {
  const navigate = useNavigate();
  const { getCartItemsWithProducts, total, clearCart } = useCart();
  const cartItems = getCartItemsWithProducts();
  const [showReceipt, setShowReceipt] = useState(false);
  const [orderData, setOrderData] = useState<{
    items: typeof cartItems;
    total: number;
    customerInfo: CustomerInfo;
  } | null>(null);

  const form = useForm<CheckoutFormData>({
    defaultValues: {
      name: '',
      email: '',
    },
  });

  const onSubmit = (data: CheckoutFormData) => {
    setOrderData({
      items: cartItems,
      total,
      customerInfo: data,
    });
    setShowReceipt(true);
  };

  const handleCloseReceipt = () => {
    setShowReceipt(false);
    clearCart();
    navigate('/');
  };

  if (cartItems.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <Link to="/cart" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-6">
        <ArrowLeft size={16} />
        Back to Cart
      </Link>

      <h2 className="heading-2 mb-6">Checkout</h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Customer Information</CardTitle>
              <CardDescription>
                Please provide your details to complete the order
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    rules={{
                      required: 'Name is required',
                      minLength: {
                        value: 2,
                        message: 'Name must be at least 2 characters',
                      },
                    }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input placeholder="John Doe" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    rules={{
                      required: 'Email is required',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Invalid email address',
                      },
                    }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Address</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="john@example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button type="submit" size="lg" className="w-full">
                    Place Order
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-1">
          <Card className="sticky top-20">
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                {cartItems.map(({ product, quantity }) => (
                  <div key={product.id} className="flex justify-between text-sm">
                    <div className="flex-1">
                      <p className="font-medium line-clamp-1">{product.name}</p>
                      <p className="text-muted-foreground">Qty: {quantity}</p>
                    </div>
                    <p className="font-medium">{formatCurrency(product.price * quantity)}</p>
                  </div>
                ))}
              </div>

              <Separator />

              <div className="flex justify-between">
                <span className="font-semibold">Total</span>
                <span className="font-bold text-xl text-primary">
                  {formatCurrency(total)}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {orderData && (
        <ReceiptModal
          isOpen={showReceipt}
          onClose={handleCloseReceipt}
          order={orderData}
        />
      )}
    </div>
  );
}