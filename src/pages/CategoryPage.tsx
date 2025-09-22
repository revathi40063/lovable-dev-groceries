import React from 'react';
import { useParams } from 'react-router-dom';
import ProductCard from '@/components/ProductCard';
import { products, categories } from '@/data/mockData';

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
  category: string;
}

interface CategoryPageProps {
  onAddToCart: (product: Product) => void;
  onQuickAdd: (product: Product) => void;
}

const CategoryPage = ({ onAddToCart, onQuickAdd }: CategoryPageProps) => {
  const { categoryName } = useParams<{ categoryName: string }>();
  
  const category = categories.find(cat => 
    cat.name.toLowerCase().replace(/\s+/g, '-') === categoryName
  );
  
  const categoryProducts = products.filter(product => {
    if (!category) return false;
    return product.category === category.id;
  });

  if (!category) {
    return (
      <div className="min-h-screen bg-background pt-24">
        <div className="container mx-auto px-4 py-8 text-center">
          <h1 className="text-3xl font-bold text-foreground mb-4">Category Not Found</h1>
          <p className="text-muted-foreground">The category you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-24">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 animate-fade-in">
          <div className="flex items-center gap-4 mb-4">
            <span className="text-4xl">{category.icon}</span>
            <h1 className="text-3xl font-bold text-foreground">{category.name}</h1>
          </div>
          <p className="text-muted-foreground">
            Fresh and quality products in {category.name.toLowerCase()}
          </p>
        </div>

        {categoryProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {categoryProducts.map((product, index) => (
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
        ) : (
          <div className="text-center py-12 animate-fade-in">
            <div className="text-6xl mb-4">🛒</div>
            <h2 className="text-2xl font-semibold text-foreground mb-2">
              No products found
            </h2>
            <p className="text-muted-foreground">
              We're working on adding more products to this category.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;