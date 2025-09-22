import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
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

interface DealsCarouselProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
  onQuickAdd: (product: Product) => void;
  title?: string;
}

const DealsCarousel = ({ 
  products, 
  onAddToCart, 
  onQuickAdd, 
  title = "Today's Best Deals" 
}: DealsCarouselProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 320;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-1">{title}</h2>
          <p className="text-muted-foreground">Limited time offers you don't want to miss!</p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => scroll('left')}
            className="hover:bg-primary hover:text-primary-foreground"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => scroll('right')}
            className="hover:bg-primary hover:text-primary-foreground"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto scrollbar-hide pb-4"
        style={{ scrollBehavior: 'smooth' }}
      >
        {products.map((product, index) => (
          <div
            key={product.id}
            className="min-w-[280px] animate-fade-in"
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

export default DealsCarousel;