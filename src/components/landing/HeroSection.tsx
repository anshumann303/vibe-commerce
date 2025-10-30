import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles } from 'lucide-react';

export function HeroSection() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToProducts = () => {
    const element = document.getElementById('featured-categories');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Subtle overlay for content readability */}
      <div 
        className="absolute inset-0 bg-background/80 backdrop-blur-[1px]"
        style={{
          transform: `translateY(${scrollY * 0.1}px)`,
        }}
      />
      
      {/* Interactive geometric elements that respond to scroll */}
      <div 
        className="absolute top-20 right-20 w-32 h-32 border border-border/30 rounded-full animate-gentle-pulse"
        style={{
          transform: `translateY(${scrollY * 0.3}px) rotate(${scrollY * 0.1}deg)`,
        }}
      />
      <div 
        className="absolute bottom-20 left-20 w-24 h-24 bg-accent/10 rounded-full"
        style={{
          transform: `translateY(${scrollY * -0.2}px) scale(${1 + scrollY * 0.0002})`,
        }}
      />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 max-w-7xl text-center">
        <div className="animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-muted border border-border mb-8">
            <Sparkles className="w-4 h-4 text-accent" />
            <span className="text-sm font-semibold text-foreground">NEW ARRIVALS</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-foreground mb-8 leading-tight tracking-tighter">
            UNLEASH
            <br />
            <span className="text-accent">
              YOUR VIBE
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-4 max-w-2xl mx-auto font-medium">
            Premium Audio. Unmatched Style.
          </p>
          <p className="text-lg clean-text mb-12 max-w-3xl mx-auto">
            Experience crystal-clear sound with our cutting-edge audio technology designed for the modern lifestyle.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              size="lg"
              onClick={scrollToProducts}
              className="bg-accent hover:bg-accent/90 text-accent-foreground text-lg px-8 py-4 font-semibold tracking-wide transition-all duration-200 hover:scale-105"
            >
              SHOP NOW
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Link to="/products">
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-foreground text-foreground hover:bg-foreground hover:text-background text-lg px-8 py-4 font-semibold tracking-wide transition-all duration-200"
              >
                EXPLORE
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-muted-foreground/30 rounded-full flex justify-center pt-2">
          <div className="w-1 h-3 bg-muted-foreground/50 rounded-full" />
        </div>
      </div>
    </section>
  );
}