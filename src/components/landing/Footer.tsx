import { Link } from 'react-router-dom';
import { Separator } from '@/components/ui/separator';
import { Instagram, Twitter, Facebook, Mail } from 'lucide-react';

const quickLinks = [
  { name: 'Shop', href: '/products' },
  { name: 'About', href: '/' },
  { name: 'Contact', href: '/' },
  { name: 'FAQs', href: '/' },
];

const socialLinks = [
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Facebook, href: '#', label: 'Facebook' },
  { icon: Mail, href: '#', label: 'Email' },
];

export function Footer() {
  return (
    <footer className="bg-surface border-t">
      <div className="container mx-auto max-w-7xl px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-8">
          {/* Brand */}
          <div>
            <Link to="/" className="inline-block mb-4">
              <h3 className="text-2xl font-bold text-primary">Vibe Commerce</h3>
            </Link>
            <p className="text-muted-foreground mb-6">
              Curating premium tech accessories for modern living.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="w-10 h-10 rounded-full bg-primary/10 hover:bg-primary hover:text-white flex items-center justify-center transition-all duration-300 hover:scale-110"
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Get in Touch</h4>
            <p className="text-muted-foreground mb-2">
              Have questions? We'd love to hear from you.
            </p>
            <a
              href="mailto:hello@vibecommerce.com"
              className="text-primary hover:underline"
            >
              hello@vibecommerce.com
            </a>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>© 2025 Vibe Commerce. All rights reserved.</p>
          <div className="flex gap-6">
            <Link to="/" className="hover:text-primary transition-colors">
              Privacy Policy
            </Link>
            <Link to="/" className="hover:text-primary transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}