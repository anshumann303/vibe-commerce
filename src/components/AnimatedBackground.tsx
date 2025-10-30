import { useState } from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

interface GradientCircle {
  id: number;
  size: number;
  x: number;
  y: number;
  color: string;
  speed: number;
  blur: number;
  opacity: number;
  rotationSpeed: number;
  scaleSpeed: number;
}

export function AnimatedBackground() {
  const { getCombinedTransform } = useScrollAnimation();
  const [circles] = useState<GradientCircle[]>(() => {
    // Generate random circles with soft pastel colors
    const pastelColors = [
      'rgba(255, 182, 193, 0.08)', // Soft pink
      'rgba(173, 216, 230, 0.06)', // Soft blue
      'rgba(221, 160, 221, 0.07)', // Soft plum
      'rgba(255, 218, 185, 0.08)', // Soft peach
      'rgba(152, 251, 152, 0.05)', // Soft green
      'rgba(255, 240, 245, 0.09)', // Soft lavender blush
      'rgba(230, 230, 250, 0.07)', // Soft lavender
      'rgba(255, 228, 225, 0.06)', // Soft misty rose
      'rgba(240, 248, 255, 0.08)', // Soft alice blue
      'rgba(255, 250, 240, 0.07)', // Soft floral white
    ];

    return Array.from({ length: 10 }, (_, i) => ({
      id: i,
      size: Math.random() * 500 + 250, // 250-750px for more variety
      x: Math.random() * 120 - 10, // -10% to 110% for edge overflow
      y: Math.random() * 120 - 10, // -10% to 110% for edge overflow
      color: pastelColors[i % pastelColors.length],
      speed: Math.random() * 0.4 + 0.1, // 0.1-0.5 parallax speed
      blur: Math.random() * 80 + 60, // 60-140px blur for softer effect
      opacity: Math.random() * 0.15 + 0.05, // 0.05-0.2 opacity for subtlety
      rotationSpeed: (Math.random() - 0.5) * 0.02, // -0.01 to 0.01 rotation
      scaleSpeed: Math.random() * 0.00005 + 0.00002, // Subtle scale changes
    }));
  });



  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {circles.map((circle) => (
        <div
          key={circle.id}
          className="absolute rounded-full will-change-transform"
          style={{
            width: `${circle.size}px`,
            height: `${circle.size}px`,
            left: `${circle.x}%`,
            top: `${circle.y}%`,
            background: `radial-gradient(circle, ${circle.color} 0%, ${circle.color.replace(/[\d.]+\)$/g, '0.02)')} 50%, transparent 70%)`,
            filter: `blur(${circle.blur}px)`,
            opacity: circle.opacity,
            transform: `translate(-50%, -50%) ${getCombinedTransform(
              circle.speed * -0.3,
              circle.rotationSpeed,
              circle.scaleSpeed
            )}`,
            animation: `float-${circle.id % 8} ${20 + circle.id * 3}s ease-in-out infinite`,
          }}
        />
      ))}
      
      {/* Accent gradient overlays */}
      <div 
        className="absolute top-1/6 left-1/6 w-[600px] h-[600px] rounded-full will-change-transform"
        style={{
          background: 'radial-gradient(circle, rgba(220, 38, 38, 0.03) 0%, rgba(220, 38, 38, 0.01) 40%, transparent 70%)',
          filter: 'blur(100px)',
          transform: getCombinedTransform(0.15, 0.02, 0.00001),
        }}
      />
      
      <div 
        className="absolute top-2/3 right-1/6 w-[500px] h-[500px] rounded-full will-change-transform"
        style={{
          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.025) 0%, rgba(59, 130, 246, 0.008) 40%, transparent 70%)',
          filter: 'blur(120px)',
          transform: getCombinedTransform(-0.1, -0.015, 0.000008),
        }}
      />
      
      <div 
        className="absolute bottom-1/4 left-1/2 w-[400px] h-[400px] rounded-full will-change-transform"
        style={{
          background: 'radial-gradient(circle, rgba(168, 85, 247, 0.02) 0%, rgba(168, 85, 247, 0.005) 50%, transparent 70%)',
          filter: 'blur(90px)',
          transform: getCombinedTransform(0.08, 0.01, 0.000005),
        }}
      />
    </div>
  );
}