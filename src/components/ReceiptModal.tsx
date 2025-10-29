import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { CheckCircle } from 'lucide-react';
import { formatCurrency } from '@/utils/formatters';
import type { Product, CustomerInfo } from '@/types/schema';

interface ReceiptModalProps {
  isOpen: boolean;
  onClose: () => void;
  order: {
    items: Array<{
      product: Product;
      quantity: number;
    }>;
    total: number;
    customerInfo: CustomerInfo;
  };
}

export function ReceiptModal({ isOpen, onClose, order }: ReceiptModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <div className="flex items-center justify-center mb-4">
            <div className="rounded-full bg-success/10 p-3">
              <CheckCircle className="h-8 w-8 text-success" />
            </div>
          </div>
          <DialogTitle className="text-center text-2xl">Order Confirmation</DialogTitle>
          <DialogDescription className="text-center">
            Thank you for your order!
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <h3 className="font-semibold mb-2">Customer Information</h3>
            <div className="text-sm space-y-1">
              <p>
                <span className="text-muted-foreground">Name:</span> {order.customerInfo.name}
              </p>
              <p>
                <span className="text-muted-foreground">Email:</span> {order.customerInfo.email}
              </p>
            </div>
          </div>

          <Separator />

          <div>
            <h3 className="font-semibold mb-3">Order Summary</h3>
            <div className="space-y-3">
              {order.items.map(({ product, quantity }) => (
                <div key={product.id} className="flex justify-between text-sm">
                  <div className="flex-1">
                    <p className="font-medium">{product.name}</p>
                    <p className="text-muted-foreground">Qty: {quantity}</p>
                  </div>
                  <p className="font-medium">{formatCurrency(product.price * quantity)}</p>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          <div className="flex justify-between items-center">
            <span className="font-semibold text-lg">Total Amount</span>
            <span className="font-bold text-2xl text-primary">
              {formatCurrency(order.total)}
            </span>
          </div>
        </div>

        <DialogFooter className="sm:justify-center">
          <Button onClick={onClose} size="lg" className="w-full sm:w-auto">
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}