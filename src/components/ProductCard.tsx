import React from 'react';
import { Plus, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

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

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onQuickAdd: (product: Product) => void;
}

const ProductCard = ({ product, onAddToCart, onQuickAdd }: ProductCardProps) => {
  const discountPercentage = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="product-card group relative overflow-hidden">
      {/* Badges */}
      <div className="absolute top-2 left-2 z-10 flex flex-col gap-1">
        {product.isHot && (
          <Badge className="bg-destructive text-destructive-foreground text-xs">
            🔥 Hot Deal
          </Badge>
        )}
        {product.isBestSeller && (
          <Badge className="bg-accent text-accent-foreground text-xs">
            ⭐ Best Seller
          </Badge>
        )}
        {discountPercentage > 0 && (
          <Badge className="bg-primary text-primary-foreground text-xs">
            {discountPercentage}% OFF
          </Badge>
        )}
      </div>

      {/* Product Image */}
      <div className="relative overflow-hidden rounded-t-xl bg-muted">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
        />
        
        {/* Quick Add Button - Slides up on hover */}
        <div className="absolute bottom-2 left-2 right-2">
          <Button 
            onClick={() => onQuickAdd(product)}
            className="quick-add-btn w-full"
            size="sm"
          >
            Quick Add
          </Button>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4 space-y-3">
        <div>
          <h3 className="font-semibold text-foreground line-clamp-2 mb-1">
            {product.name}
          </h3>
          
          {product.rating && (
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-accent text-accent" />
              <span className="text-sm text-muted-foreground">{product.rating}</span>
            </div>
          )}
        </div>

        {/* Price */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-primary">
              ₹{product.price}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-muted-foreground line-through">
                ₹{product.originalPrice}
              </span>
            )}
          </div>

          {/* Add to Cart Button */}
          <Button
            onClick={() => onAddToCart(product)}
            size="sm"
            className="hover:scale-105 transition-transform"
          >
            <Plus className="h-4 w-4 mr-1" />
            Add
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;