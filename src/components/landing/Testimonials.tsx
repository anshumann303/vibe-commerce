import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Sarah Johnson',
    avatar: 'https://i.pravatar.cc/150?img=5',
    feedback: 'Amazing quality products! The wireless headphones exceeded my expectations. Great customer service too.',
    rating: 5,
  },
  {
    name: 'Michael Chen',
    avatar: 'https://i.pravatar.cc/150?img=12',
    feedback: 'Fast delivery and premium packaging. The smartwatch is perfect for my fitness routine. Highly recommend!',
    rating: 5,
  },
  {
    name: 'Emma Williams',
    avatar: 'https://i.pravatar.cc/150?img=9',
    feedback: 'Love the modern design and functionality. Vibe Commerce has become my go-to for tech accessories.',
    rating: 5,
  },
];

export function Testimonials() {
  return (
    <section className="py-20 px-4 bg-gradient-to-br from-surface via-background to-surface">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            What Our Customers Say
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Join thousands of satisfied customers who trust Vibe Commerce
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card
              key={testimonial.name}
              className="relative overflow-hidden backdrop-blur-sm bg-card/50 border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:-translate-y-2"
              style={{
                animationDelay: `${index * 100}ms`,
              }}
            >
              <CardContent className="p-8">
                <Quote className="w-10 h-10 text-primary/20 mb-4" />
                
                <p className="text-foreground mb-6 leading-relaxed">
                  "{testimonial.feedback}"
                </p>

                <div className="flex items-center gap-1 mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-5 h-5 fill-yellow-400"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                  ))}
                </div>

                <div className="flex items-center gap-4">
                  <Avatar className="w-12 h-12 border-2 border-primary/20">
                    <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                    <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">Verified Customer</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}