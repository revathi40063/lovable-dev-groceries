import React from 'react';
import ProductCard from './ProductCard';

interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating?: number;
  discount?: string;
  isHot?: boolean;
  isBestSeller?: boolean;
}

interface RecommendationsProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
  onQuickAdd: (product: Product) => void;
  title?: string;
}

const Recommendations = ({ 
  products, 
  onAddToCart, 
  onQuickAdd, 
  title = "Recommended for You" 
}: RecommendationsProps) => {
  if (!products.length) return null;

  return (
    <div className="py-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-foreground mb-2">{title}</h2>
        <p className="text-muted-foreground">
          Based on your preferences and popular choices
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product, index) => (
          <div
            key={product.id}
            className="animate-fade-in"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <ProductCard
              product={product}
              onAddToCart={onAddToCart}
              onQuickAdd={onQuickAdd}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Recommendations;