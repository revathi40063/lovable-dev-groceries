import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Category {
  id: string;
  name: string;
  icon: string;
  image?: string;
}

interface CategoryCarouselProps {
  categories: Category[];
  onCategoryClick: (category: Category) => void;
  activeCategory?: string;
}

const CategoryCarousel = ({ categories, onCategoryClick, activeCategory }: CategoryCarouselProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 300;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="relative">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-foreground">Shop by Category</h2>
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
        className="category-scroll"
      >
        {categories.map((category, index) => (
          <div
            key={category.id}
            onClick={() => onCategoryClick(category)}
            className={`category-item min-w-[160px] text-center animate-fade-in ${
              activeCategory === category.id ? 'ring-2 ring-primary bg-primary/5' : ''
            }`}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="text-4xl mb-3">{category.icon}</div>
            <h3 className="font-medium text-sm text-foreground leading-tight">
              {category.name}
            </h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryCarousel;