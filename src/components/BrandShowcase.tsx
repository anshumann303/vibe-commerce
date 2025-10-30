import { Logo } from '@/components/Logo';

export function BrandShowcase() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary via-secondary to-accent/20">
      <div className="text-center">
        <Logo size="lg" showText={true} showSlogan={true} />
      </div>
    </section>
  );
}