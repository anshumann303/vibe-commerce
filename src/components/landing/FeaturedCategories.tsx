import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const categories = [
  {
    name: 'Audio',
    image: 'https://images.unsplash.com/photo-1722110351621-f1a54d062b4d?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHwxfHxoZWFkcGhvbmVzJTIwYXVkaW8lMjBtdXNpY3xlbnwwfDB8fHwxNzYxNzcwMjA0fDA&ixlib=rb-4.1.0&q=85',
    description: 'Premium headphones & speakers',
    attribution: 'OGenius Aficionados on Unsplash',
  },
  {
    name: 'Wearables',
    image: 'https://images.unsplash.com/photo-1760520338230-3074dded8778?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHw1fHxzbWFydHdhdGNoJTIwd2VhcmFibGUlMjBmaXRuZXNzfGVufDB8MHx8fDE3NjE3NzAyMDR8MA&ixlib=rb-4.1.0&q=85',
    description: 'Smart watches & fitness trackers',
    attribution: 'Daniel Romero on Unsplash',
  },
  {
    name: 'Accessories',
    image: 'https://images.unsplash.com/photo-1758218134520-6a346d607ae0?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHw0fHxhY2Nlc3NvcmllcyUyMHRlY2hub2xvZ3klMjBnYWRnZXRzfGVufDB8MHx8fDE3NjE3NzAyMDR8MA&ixlib=rb-4.1.0&q=85',
    description: 'Cables, chargers & more',
    attribution: 'Kamil Switalski on Unsplash',
  },
  {
    name: 'Essentials',
    image: 'https://images.unsplash.com/photo-1684560208006-274881cc4c4b?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHw4fHx3b3Jrc3BhY2UlMjBkZXNrJTIwZXNzZW50aWFsc3xlbnwwfDB8fHwxNzYxNzcwMjA0fDA&ixlib=rb-4.1.0&q=85',
    description: 'Workspace must-haves',
    attribution: 'Sparsh Paliwal on Unsplash',
  },
];

export function FeaturedCategories() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section id="featured-categories" className="py-20 px-4 bg-surface">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Shop by Category
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover our curated collections designed for your lifestyle
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <Link
              key={category.name}
              to="/products"
              className="group relative overflow-hidden rounded-2xl aspect-[3/4] cursor-pointer"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Image */}
              <img
                src={category.image}
                alt={`${category.description} - ${category.attribution}`}
                className={`absolute inset-0 w-full h-full object-cover transition-transform duration-700 ${
                  hoveredIndex === index ? 'scale-110' : 'scale-100'
                }`}
                style={{ width: '100%', height: '100%' }}
              />
              
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
              
              {/* Content */}
              <div className="absolute inset-0 p-6 flex flex-col justify-end">
                <h3 className="text-2xl font-bold text-white mb-2">
                  {category.name}
                </h3>
                <p className="text-white/80 mb-4">{category.description}</p>
                
                {/* Button appears on hover */}
                <Button
                  className={`w-full bg-white text-primary hover:bg-white/90 transition-all duration-300 ${
                    hoveredIndex === index
                      ? 'opacity-100 translate-y-0'
                      : 'opacity-0 translate-y-4'
                  }`}
                >
                  Shop Category
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}