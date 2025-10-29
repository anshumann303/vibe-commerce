import { HeroSection } from '@/components/landing/HeroSection';
import { FeaturedCategories } from '@/components/landing/FeaturedCategories';
import { TrendingProducts } from '@/components/landing/TrendingProducts';
import { Testimonials } from '@/components/landing/Testimonials';
import { AboutBrand } from '@/components/landing/AboutBrand';
import { Newsletter } from '@/components/landing/Newsletter';
import { Footer } from '@/components/landing/Footer';

export function LandingPage() {
  return (
    <div className="w-full">
      <HeroSection />
      <FeaturedCategories />
      <TrendingProducts />
      <Testimonials />
      <AboutBrand />
      <Newsletter />
      <Footer />
    </div>
  );
}