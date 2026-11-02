import React, { useMemo } from 'react';

interface Particle {
  id: number;
  top: string;
  left: string;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
}

export const FloatingParticles: React.FC<{ count?: number; showPetals?: boolean }> = ({
  count = 28,
  showPetals = true,
}) => {
  const particles: Particle[] = useMemo(() => {
    return Array.from({ length: count }).map((_, i) => ({
      id: i,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      size: Math.random() * 3 + 1.5,
      duration: Math.random() * 8 + 6,
      delay: Math.random() * 5,
      opacity: Math.random() * 0.7 + 0.3,
    }));
  }, [count]);

  const petals = useMemo(() => {
    if (!showPetals) return [];
    return Array.from({ length: 9 }).map((_, i) => ({
      id: i,
      left: `${(i * 11 + Math.random() * 5) % 95}%`,
      duration: 12 + Math.random() * 8,
      delay: i * 1.8,
      size: 14 + Math.random() * 10,
      rotation: Math.random() * 360,
    }));
  }, [showPetals]);

  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
      {/* Subtle Golden Dust Particles */}
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full bg-gradient-to-tr from-[#ffe680] to-[var(--accent-gold)]"
          style={{
            top: p.top,
            left: p.left,
            width: `${p.size}px`,
            height: `${p.size}px`,
            opacity: p.opacity,
            boxShadow: '0 0 6px rgba(212, 175, 55, 0.8)',
            animation: `gentleFloat ${p.duration}s ease-in-out infinite`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}

      {/* Floating Rose Petals */}
      {petals.map((petal) => (
        <div
          key={`petal-${petal.id}`}
          className="absolute opacity-60"
          style={{
            left: petal.left,
            top: '-50px',
            animation: `fallAndSway ${petal.duration}s linear infinite`,
            animationDelay: `${petal.delay}s`,
          }}
        >
          <svg
            width={petal.size}
            height={petal.size * 1.2}
            viewBox="0 0 30 36"
            fill="none"
            style={{ transform: `rotate(${petal.rotation}deg)` }}
          >
            <path
              d="M15 0 C25 8 30 22 15 36 C0 22 5 8 15 0 Z"
              fill="url(#rosePetalGrad)"
              opacity="0.85"
            />
            <defs>
              <linearGradient id="rosePetalGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#d94862" />
                <stop offset="60%" stopColor="#9e1834" />
                <stop offset="100%" stopColor="#4a0512" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      ))}

      <style>{`
        @keyframes fallAndSway {
          0% {
            transform: translateY(0vh) translateX(0px) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 0.75;
          }
          90% {
            opacity: 0.75;
          }
          100% {
            transform: translateY(110vh) translateX(50px) rotate(360deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};
