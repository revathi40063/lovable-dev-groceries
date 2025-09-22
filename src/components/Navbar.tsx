import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ShoppingCart, User, Menu, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface NavbarProps {
  cartItemsCount: number;
}

const Navbar = ({ cartItemsCount }: NavbarProps) => {
  const [scrolled, setScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const navigate = useNavigate();

  const categories = [
    'Fruits & Vegetables',
    'Dairy & Bakery',
    'Snacks & Beverages',
    'Personal Care',
    'Household Items',
    'Meat & Seafood',
  ];

  const suggestions = [
    'Bananas',
    'Apples',
    'Milk',
    'Bread',
    'Eggs',
    'Chicken',
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const filteredSuggestions = suggestions.filter(item =>
    item.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 bg-primary text-primary-foreground transition-all duration-300 ${
        scrolled ? 'py-2 shadow-lg' : 'py-4'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 hover:scale-105 transition-transform">
            <div className="bg-accent text-accent-foreground px-3 py-1 rounded-lg font-bold text-lg">
              FreshCart
            </div>
          </Link>

          {/* Search Bar - Hidden on mobile */}
          <div className="hidden md:flex flex-1 max-w-md mx-8 relative">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search for products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setShowSuggestions(true)}
                onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                className="w-full pl-10 pr-4 py-2 bg-card text-card-foreground border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
              />
              {showSuggestions && searchQuery && (
                <div className="search-suggestions animate-slide-up">
                  {filteredSuggestions.slice(0, 5).map((suggestion, index) => (
                    <div
                      key={index}
                      className="px-4 py-2 hover:bg-muted cursor-pointer transition-colors"
                      onClick={() => {
                        setSearchQuery(suggestion);
                        setShowSuggestions(false);
                      }}
                    >
                      <span className="text-accent font-medium">
                        {suggestion.substring(0, searchQuery.length)}
                      </span>
                      {suggestion.substring(searchQuery.length)}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Navigation Links */}
          <div className="flex items-center space-x-6">
            {/* Categories Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="hidden md:flex items-center space-x-1 hover:bg-primary-glow hover:scale-105 transition-all">
                  <span>Categories</span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 bg-card border border-border shadow-lg">
                {categories.map((category) => (
                  <DropdownMenuItem
                    key={category}
                    className="hover:bg-muted transition-colors cursor-pointer"
                    onClick={() => navigate(`/category/${category.toLowerCase().replace(/\s+/g, '-')}`)}
                  >
                    {category}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Offers Link */}
            <Link
              to="/offers"
              className="hidden md:block hover:text-accent hover:scale-105 transition-all font-medium"
            >
              Offers
            </Link>

            {/* Cart */}
            <Link
              to="/cart"
              className="relative hover:scale-110 transition-transform"
            >
              <ShoppingCart className="h-6 w-6" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-accent text-accent-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold animate-scale-in">
                  {cartItemsCount}
                </span>
              )}
            </Link>

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="hover:bg-primary-glow hover:scale-105 transition-all">
                  <User className="h-6 w-6" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-card border border-border shadow-lg">
                <DropdownMenuItem onClick={() => navigate('/login')}>
                  Login
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/register')}>
                  Register
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/orders')}>
                  My Orders
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Mobile Menu */}
            <Button variant="ghost" size="icon" className="md:hidden hover:bg-primary-glow">
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;