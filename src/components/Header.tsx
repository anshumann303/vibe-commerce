import { Link } from 'react-router-dom';
import { ShoppingCart, Search, Menu, User, ChevronDown } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useCart } from '@/context/CartContext';
import { useScrollToSection } from '@/utils/navigation';

export function Header() {
  const { itemCount } = useCart();
  const scrollToSection = useScrollToSection();


  const handleAboutClick = (e: React.MouseEvent) => {
    e.preventDefault();
    scrollToSection('about-section', '/');
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-background border-b border-border">
      {/* Top bar */}
      <div className="border-b border-border bg-muted/30">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="flex h-10 items-center justify-between text-xs">
            <div className="flex items-center space-x-4">
              <span className="text-muted-foreground">Free shipping on orders over ₹999</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/support" className="text-muted-foreground hover:text-foreground transition-colors">
                Support
              </Link>
              <Link to="/track" className="text-muted-foreground hover:text-foreground transition-colors">
                Track Order
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="container mx-auto max-w-7xl px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <div className="text-2xl font-black text-foreground tracking-tight">
              VIBE
            </div>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className="nav-link text-sm font-medium text-foreground hover:text-accent"
            >
              Home
            </Link>
            <Link
              to="/products"
              className="nav-link text-sm font-medium text-foreground hover:text-accent"
            >
              Products
            </Link>
            <div className="relative group">
              <Link 
                to="/products"
                className="nav-link flex items-center gap-1 text-sm font-medium text-foreground hover:text-accent"
              >
                Categories
                <ChevronDown className="w-3 h-3 transition-transform group-hover:rotate-180" />
              </Link>
              <div className="absolute top-full left-0 mt-2 w-48 bg-background border border-border rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="py-2">
                  <Link 
                    to="/products?category=audio" 
                    className="block px-4 py-2 text-sm text-foreground hover:bg-muted hover:text-accent transition-colors"
                  >
                    Audio
                  </Link>
                  <Link 
                    to="/products?category=wearables" 
                    className="block px-4 py-2 text-sm text-foreground hover:bg-muted hover:text-accent transition-colors"
                  >
                    Wearables
                  </Link>
                  <Link 
                    to="/products?category=accessories" 
                    className="block px-4 py-2 text-sm text-foreground hover:bg-muted hover:text-accent transition-colors"
                  >
                    Accessories
                  </Link>
                  <Link 
                    to="/products" 
                    className="block px-4 py-2 text-sm font-medium text-accent hover:bg-muted transition-colors border-t border-border mt-2 pt-3"
                  >
                    View All Products
                  </Link>
                </div>
              </div>
            </div>
            <button
              onClick={handleAboutClick}
              className="nav-link text-sm font-medium text-foreground hover:text-accent cursor-pointer"
            >
              About
            </button>
          </nav>

          {/* Search and Actions */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <div className="hidden lg:flex items-center relative">
              <Input
                type="search"
                placeholder="Search products..."
                className="w-64 pl-10 pr-4 py-2 text-sm border-border focus:border-accent focus:ring-accent"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            </div>

            {/* User Account */}
            <Button variant="ghost" size="sm" className="hidden md:flex">
              <User className="w-4 h-4" />
            </Button>

            {/* Cart */}
            <Link to="/cart">
              <Button variant="ghost" size="sm" className="relative">
                <ShoppingCart className="w-4 h-4" />
                {itemCount > 0 && (
                  <Badge
                    className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs bg-accent text-accent-foreground"
                  >
                    {itemCount}
                  </Badge>
                )}
              </Button>
            </Link>

            {/* Mobile menu */}
            <Button variant="ghost" size="sm" className="md:hidden">
              <Menu className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}