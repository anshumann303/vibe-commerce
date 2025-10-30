import { useEffect, useState } from 'react';

export function useScrollAnimation() {
  const [scrollY, setScrollY] = useState(0);
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('down');
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      setScrollDirection(currentScrollY > lastScrollY ? 'down' : 'up');
      setScrollY(currentScrollY);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  // Utility functions for common scroll-based transformations
  const getParallaxTransform = (speed: number = 0.5) => {
    return `translateY(${scrollY * speed}px)`;
  };

  const getRotationTransform = (speed: number = 0.1) => {
    return `rotate(${scrollY * speed}deg)`;
  };

  const getScaleTransform = (speed: number = 0.0001) => {
    return `scale(${1 + scrollY * speed})`;
  };

  const getCombinedTransform = (
    parallaxSpeed: number = 0.5,
    rotationSpeed: number = 0.1,
    scaleSpeed: number = 0.0001
  ) => {
    return `translateY(${scrollY * parallaxSpeed}px) rotate(${scrollY * rotationSpeed}deg) scale(${1 + scrollY * scaleSpeed})`;
  };

  return {
    scrollY,
    scrollDirection,
    getParallaxTransform,
    getRotationTransform,
    getScaleTransform,
    getCombinedTransform,
  };
}