import React from 'react';
import { Minus, Plus, Trash2, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

interface CartProps {
  items: CartItem[];
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemoveItem: (id: string) => void;
  onReorderPrevious?: () => void;
}

const Cart = ({ items, onUpdateQuantity, onRemoveItem, onReorderPrevious }: CartProps) => {
  const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  if (items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Card className="text-center py-12">
          <CardContent>
            <div className="text-6xl mb-4">🛒</div>
            <h2 className="text-2xl font-bold text-foreground mb-2">Your cart is empty</h2>
            <p className="text-muted-foreground mb-6">
              Add some delicious items to your cart and they will show up here.
            </p>
            {onReorderPrevious && (
              <Button 
                onClick={onReorderPrevious}
                variant="outline"
                className="mr-4 hover:bg-primary hover:text-primary-foreground"
              >
                <RotateCcw className="h-4 w-4 mr-2" />
                Reorder Previous Cart
              </Button>
            )}
            <Button onClick={() => window.history.back()}>
              Continue Shopping
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Shopping Cart ({itemCount} items)</span>
                {onReorderPrevious && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={onReorderPrevious}
                    className="hover:bg-primary hover:text-primary-foreground"
                  >
                    <RotateCcw className="h-4 w-4 mr-2" />
                    Reorder Previous
                  </Button>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {items.map((item, index) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg animate-fade-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    
                    <div className="flex-1">
                      <h3 className="font-medium text-foreground">{item.name}</h3>
                      <p className="text-primary font-semibold">₹{item.price}</p>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 hover:bg-primary hover:text-primary-foreground"
                        onClick={() => onUpdateQuantity(item.id, Math.max(0, item.quantity - 1))}
                        disabled={item.quantity <= 1}
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      
                      <span className="w-8 text-center font-medium">
                        {item.quantity}
                      </span>
                      
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 hover:bg-primary hover:text-primary-foreground"
                        onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>

                    {/* Item Total */}
                    <div className="text-right min-w-[80px]">
                      <p className="font-semibold text-foreground">
                        ₹{(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>

                    {/* Remove Button */}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-destructive hover:bg-destructive hover:text-destructive-foreground"
                      onClick={() => onRemoveItem(item.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <Card className="sticky top-24">
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal ({itemCount} items)</span>
                  <span>₹{total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery Fee</span>
                  <span className="text-primary">Free</span>
                </div>
                <div className="border-t pt-2">
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total</span>
                    <span className="text-primary">₹{total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <Button className="w-full bg-primary hover:bg-primary-glow text-primary-foreground font-semibold py-3">
                Proceed to Checkout
              </Button>

              <div className="text-center">
                <p className="text-sm text-muted-foreground">
                  Free delivery on orders above ₹500
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Cart;