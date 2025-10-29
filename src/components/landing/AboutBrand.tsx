import { Truck, Shield, RotateCcw } from 'lucide-react';

const features = [
  {
    icon: Truck,
    title: 'Fast Delivery',
    description: 'Free shipping on orders over $50',
  },
  {
    icon: Shield,
    title: 'Secure Payments',
    description: '100% secure payment processing',
  },
  {
    icon: RotateCcw,
    title: 'Easy Returns',
    description: '30-day hassle-free returns',
  },
];

export function AboutBrand() {
  return (
    <section className="py-20 px-4 bg-background">
      <div className="container mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text content */}
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Elevate Your
              <br />
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Daily Experience
              </span>
            </h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              At Vibe Commerce, we curate quality tech accessories that elevate your daily life. 
              Every product is carefully selected to ensure it meets our high standards of design, 
              functionality, and durability.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              We believe technology should enhance your lifestyle, not complicate it. 
              That's why we focus on products that seamlessly integrate into your routine.
            </p>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.title}
                  className="group relative overflow-hidden rounded-2xl p-8 bg-gradient-to-br from-surface to-background border-2 border-border hover:border-primary/50 transition-all duration-300 hover:shadow-xl"
                  style={{
                    animationDelay: `${index * 100}ms`,
                  }}
                >
                  <div className="flex items-start gap-6">
                    <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                      <p className="text-muted-foreground">{feature.description}</p>
                    </div>
                  </div>
                  
                  {/* Hover effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}