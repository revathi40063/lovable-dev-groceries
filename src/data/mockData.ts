// Mock data for the grocery store
import bananasImg from '@/assets/products/bananas.jpg';
import applesImg from '@/assets/products/apples.jpg';
import milkImg from '@/assets/products/milk.jpg';
import breadImg from '@/assets/products/bread.jpg';
import vegetablesImg from '@/assets/products/vegetables.jpg';
import snacksImg from '@/assets/products/snacks.jpg';

export interface Product {
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

export interface Category {
  id: string;
  name: string;
  icon: string;
  image?: string;
}

export const categories: Category[] = [
  { id: 'fruits', name: 'Fruits & Vegetables', icon: '🥬' },
  { id: 'dairy', name: 'Dairy & Bakery', icon: '🥛' },
  { id: 'snacks', name: 'Snacks & Beverages', icon: '🍿' },
  { id: 'personal', name: 'Personal Care', icon: '🧴' },
  { id: 'household', name: 'Household Items', icon: '🧽' },
  { id: 'meat', name: 'Meat & Seafood', icon: '🐟' },
  { id: 'frozen', name: 'Frozen Foods', icon: '🧊' },
  { id: 'baby', name: 'Baby Care', icon: '👶' },
];

export const products: Product[] = [
  {
    id: '1',
    name: 'Fresh Organic Bananas',
    price: 45,
    originalPrice: 60,
    image: bananasImg,
    rating: 4.5,
    isHot: true,
    category: 'fruits'
  },
  {
    id: '2',
    name: 'Red Delicious Apples',
    price: 120,
    originalPrice: 150,
    image: applesImg,
    rating: 4.8,
    isBestSeller: true,
    category: 'fruits'
  },
  {
    id: '3',
    name: 'Fresh Whole Milk',
    price: 65,
    image: milkImg,
    rating: 4.6,
    category: 'dairy'
  },
  {
    id: '4',
    name: 'Artisan Bread Loaves',
    price: 85,
    originalPrice: 100,
    image: breadImg,
    rating: 4.7,
    category: 'dairy'
  },
  {
    id: '5',
    name: 'Fresh Vegetable Mix',
    price: 95,
    originalPrice: 120,
    image: vegetablesImg,
    rating: 4.4,
    isHot: true,
    category: 'fruits'
  },
  {
    id: '6',
    name: 'Premium Snack Pack',
    price: 180,
    originalPrice: 220,
    image: snacksImg,
    rating: 4.3,
    isBestSeller: true,
    category: 'snacks'
  },
  // Additional products for variety
  {
    id: '7',
    name: 'Organic Tomatoes',
    price: 55,
    originalPrice: 70,
    image: vegetablesImg,
    rating: 4.6,
    category: 'fruits'
  },
  {
    id: '8',
    name: 'Greek Yogurt',
    price: 85,
    image: milkImg,
    rating: 4.7,
    isBestSeller: true,
    category: 'dairy'
  },
  {
    id: '9',
    name: 'Mixed Nuts',
    price: 245,
    originalPrice: 280,
    image: snacksImg,
    rating: 4.5,
    isHot: true,
    category: 'snacks'
  },
  {
    id: '10',
    name: 'Fresh Oranges',
    price: 75,
    image: bananasImg,
    rating: 4.4,
    category: 'fruits'
  }
];

export const dealProducts = products.filter(p => p.isHot || p.isBestSeller || p.originalPrice);

export const recommendations = products.slice(0, 4);

export const featuredProducts = products.slice(0, 8);