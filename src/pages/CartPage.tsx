import React from 'react';
import Cart from '@/components/Cart';

interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

interface CartPageProps {
  cartItems: CartItem[];
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemoveItem: (id: string) => void;
  onReorderPrevious: () => void;
}

const CartPage = ({ cartItems, onUpdateQuantity, onRemoveItem, onReorderPrevious }: CartPageProps) => {
  return (
    <div className="min-h-screen bg-background pt-16">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-foreground mb-8 animate-fade-in">
          Shopping Cart
        </h1>
        <Cart
          items={cartItems}
          onUpdateQuantity={onUpdateQuantity}
          onRemoveItem={onRemoveItem}
          onReorderPrevious={onReorderPrevious}
        />
      </div>
    </div>
  );
};

export default CartPage;