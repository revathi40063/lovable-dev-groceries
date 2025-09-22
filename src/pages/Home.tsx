import React from 'react';
import CategoryCarousel from '@/components/CategoryCarousel';
import DealsCarousel from '@/components/DealsCarousel';
import Recommendations from '@/components/Recommendations';
import ProductCard from '@/components/ProductCard';
import { categories, dealProducts, recommendations, featuredProducts } from '@/data/mockData';

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

interface Category {
  id: string;
  name: string;
  icon: string;
  image?: string;
}

interface HomeProps {
  onAddToCart: (product: Product) => void;
  onQuickAdd: (product: Product) => void;
}

const Home = ({ onAddToCart, onQuickAdd }: HomeProps) => {
  const handleCategoryClick = (category: Category) => {
    console.log('Category clicked:', category);
    // Navigate to category page or filter products
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary to-primary-glow text-primary-foreground py-16 mt-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 animate-fade-in">
            Fresh Groceries
          </h1>
          <p className="text-xl md:text-2xl mb-8 animate-fade-in opacity-90" style={{ animationDelay: '0.2s' }}>
            Delivered to your doorstep in minutes
          </p>
          <div className="animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <span className="inline-block bg-accent text-accent-foreground px-6 py-2 rounded-full font-semibold">
              Free delivery on orders above ₹500
            </span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 space-y-12">
        {/* Categories */}
        <section className="animate-fade-in">
          <CategoryCarousel
            categories={categories}
            onCategoryClick={handleCategoryClick}
          />
        </section>

        {/* Deals Carousel */}
        <section className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <DealsCarousel
            products={dealProducts}
            onAddToCart={onAddToCart}
            onQuickAdd={onQuickAdd}
            title="Today's Best Deals"
          />
        </section>

        {/* Featured Products */}
        <section className="animate-fade-in" style={{ animationDelay: '0.4s' }}>
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-foreground mb-2">Featured Products</h2>
            <p className="text-muted-foreground">
              Hand-picked fresh items just for you
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product, index) => (
              <div
                key={product.id}
                className="animate-fade-in"
                style={{ animationDelay: `${0.6 + index * 0.1}s` }}
              >
                <ProductCard
                  product={product}
                  onAddToCart={onAddToCart}
                  onQuickAdd={onQuickAdd}
                />
              </div>
            ))}
          </div>
        </section>

        {/* Recommendations */}
        <section className="animate-fade-in" style={{ animationDelay: '0.8s' }}>
          <Recommendations
            products={recommendations}
            onAddToCart={onAddToCart}
            onQuickAdd={onQuickAdd}
            title="Recommended for You"
          />
        </section>

        {/* Newsletter Section */}
        <section className="animate-fade-in" style={{ animationDelay: '1s' }}>
          <div className="bg-primary/5 rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Stay Updated with Our Latest Offers
            </h3>
            <p className="text-muted-foreground mb-6">
              Get notified about new deals, fresh arrivals, and exclusive discounts
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button className="bg-primary text-primary-foreground px-6 py-2 rounded-lg font-medium hover:bg-primary-glow transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;