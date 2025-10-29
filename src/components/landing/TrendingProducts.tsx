import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Flame, Star } from 'lucide-react';
import { mockProducts } from '@/data/productsMockData';
import { formatCurrency } from '@/utils/formatters';

export function TrendingProducts() {
  // Use first 4 products as trending
  const trendingProducts = mockProducts.slice(0, 4);

  return (
    <section className="py-20 px-4 bg-background">
      <div className="container mx-auto max-w-7xl">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Trending Now
            </h2>
            <p className="text-lg text-muted-foreground">
              Most loved products by our customers
            </p>
          </div>
          <Link to="/products" className="hidden md:block">
            <Button variant="outline" size="lg">
              View All Products
            </Button>
          </Link>
        </div>

        <Carousel
          opts={{
            align: 'start',
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-4">
            {trendingProducts.map((product, index) => (
              <CarouselItem key={product.id} className="pl-4 md:basis-1/2 lg:basis-1/3">
                <Card className="overflow-hidden group hover:shadow-2xl transition-all duration-300 border-2 hover:border-primary/50">
                  <div className="relative aspect-square overflow-hidden">
                    <img
                      src={product.image}
                      alt={`${product.name} - ${product.description}`}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      style={{ width: '100%', height: '100%' }}
                    />
                    <Badge
                      className={`absolute top-4 right-4 ${
                        index % 2 === 0
                          ? 'bg-gradient-to-r from-orange-500 to-red-500'
                          : 'bg-gradient-to-r from-yellow-500 to-orange-500'
                      } text-white border-0`}
                    >
                      {index % 2 === 0 ? (
                        <>
                          <Flame className="w-3 h-3 mr-1" />
                          Trending
                        </>
                      ) : (
                        <>
                          <Star className="w-3 h-3 mr-1" />
                          Favorite
                        </>
                      )}
                    </Badge>
                  </div>
                  <CardContent className="p-6">
                    <h3 className="font-bold text-xl mb-2 line-clamp-1">
                      {product.name}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                      {product.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-primary">
                        {formatCurrency(product.price)}
                      </span>
                      <Link to="/products">
                        <Button size="sm" className="rounded-full">
                          View Details
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex -left-12" />
          <CarouselNext className="hidden md:flex -right-12" />
        </Carousel>

        <div className="text-center mt-8 md:hidden">
          <Link to="/products">
            <Button variant="outline" size="lg">
              View All Products
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}