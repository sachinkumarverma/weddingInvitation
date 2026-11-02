import React, { useMemo } from 'react';

interface DustParticle {
  id: number;
  top: string;
  left: string;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
}

interface BokehLight {
  id: number;
  positionClass: string;
  sizeClass: string;
  delay: number;
  duration: number;
}

interface Petal {
  id: number;
  left: string;
  duration: number;
  delay: number;
  size: number;
  rotation: number;
}

export const FloatingParticles: React.FC<{
  count?: number;
  showPetals?: boolean;
  theme?: 'midnight' | 'pink';
}> = ({
  showPetals,
  theme = 'midnight',
}) => {
  const isPink = theme === 'pink';
  const shouldShowPetals = showPetals ?? true;

  // Edge-weighted soft gold dust particles:
  // Placed along outer corridors (2-20% left, 80-98% right)
  // so central reading area remains pristine and unobstructed!
  const particles: DustParticle[] = useMemo(() => {
    const list: DustParticle[] = [];
    const total = 16;
    for (let i = 0; i < total; i++) {
      const isLeft = i % 2 === 0;
      const left = isLeft
        ? `${2 + Math.random() * 18}%` // Left edge corridor: 2% - 20%
        : `${80 + Math.random() * 18}%`; // Right edge corridor: 80% - 98%
      const top = `${(i * (100 / total) + Math.random() * 6) % 96}%`;
      list.push({
        id: i,
        top,
        left,
        size: Math.random() * 2 + 1.5, // 1.5px - 3.5px delicate specks
        duration: 14 + Math.random() * 10, // 14s - 24s ultra slow drift
        delay: Math.random() * 6,
        opacity: Math.random() * 0.4 + 0.25, // 0.25 - 0.65 soft opacity
      });
    }
    return list;
  }, []);

  // Faint ambient bokeh lights drifting along page edges
  const bokehLights: BokehLight[] = useMemo(() => [
    {
      id: 1,
      positionClass: '-top-10 -left-12 sm:-left-8',
      sizeClass: 'w-48 h-48 sm:w-80 sm:h-80',
      delay: 0,
      duration: 22,
    },
    {
      id: 2,
      positionClass: 'top-[30%] -right-16 sm:-right-10',
      sizeClass: 'w-52 h-52 sm:w-96 sm:h-96',
      delay: 4,
      duration: 26,
    },
    {
      id: 3,
      positionClass: 'top-[65%] -left-16 sm:-left-12',
      sizeClass: 'w-44 h-44 sm:w-72 sm:h-72',
      delay: 2,
      duration: 24,
    },
    {
      id: 4,
      positionClass: 'top-[88%] -right-12 sm:-right-8',
      sizeClass: 'w-56 h-56 sm:w-88 sm:h-88',
      delay: 6,
      duration: 28,
    },
  ], []);

  // Sparse, occasional romantic petals (adapts to themes)
  const petals: Petal[] = useMemo(() => {
    if (!shouldShowPetals) return [];
    return [
      { id: 0, left: '8%', duration: 26, delay: 0, size: 18, rotation: 25 },
      { id: 1, left: '88%', duration: 28, delay: 7, size: 15, rotation: -40 },
      { id: 2, left: '18%', duration: 30, delay: 14, size: 20, rotation: 65 },
      { id: 3, left: '82%', duration: 25, delay: 21, size: 16, rotation: -20 },
    ];
  }, [shouldShowPetals]);

  return (
    <div 
      className="ambient-decor-layer fixed inset-0 pointer-events-none select-none z-10 overflow-hidden" 
      aria-hidden="true"
    >
      {/* 1. Faint Peripheral Bokeh Glow Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {bokehLights.map((b) => (
          <div
            key={`bokeh-${b.id}`}
            className={`ambient-bokeh-orb absolute rounded-full ${b.positionClass} ${b.sizeClass}`}
            style={{
              animation: `bokehPulseDrift ${b.duration}s ease-in-out infinite alternate`,
              animationDelay: `${b.delay}s`,
            }}
          />
        ))}
      </div>

      {/* 2. Edge-Weighted Soft Gold Dust Particles */}
      {particles.map((p) => (
        <div
          key={`dust-${p.id}`}
          className="ambient-gold-dust absolute rounded-full"
          style={{
            top: p.top,
            left: p.left,
            width: `${p.size}px`,
            height: `${p.size}px`,
            opacity: p.opacity,
            animation: `gentleDrift ${p.duration}s ease-in-out infinite alternate`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}

      {/* 3. Occasional Delicate Rose Petals */}
      {petals.map((petal) => (
        <div
          key={`petal-${petal.id}`}
          className="ambient-rose-petal absolute hidden sm:block"
          style={{
            left: petal.left,
            top: '-60px',
            animation: `slowPetalFall ${petal.duration}s linear infinite`,
            animationDelay: `${petal.delay}s`,
            willChange: 'transform, opacity',
          }}
        >
          <svg
            width={petal.size}
            height={petal.size * 1.25}
            viewBox="0 0 30 36"
            fill="none"
            className="transform transition-transform"
            style={{ transform: `rotate(${petal.rotation}deg)` }}
          >
            <path
              d="M15 0 C26 7 30 22 15 36 C0 22 4 7 15 0 Z"
              fill="url(#ambientPetalGradGroom)"
              opacity="0.82"
            />
            <path
              d="M15 4 C22 10 24 22 15 32 C6 22 8 10 15 4 Z"
              fill="none"
              stroke="rgba(255, 255, 255, 0.2)"
              strokeWidth="0.5"
            />
          </svg>
        </div>
      ))}

      {/* SVG Petal Gradient Definition */}
      <svg className="absolute w-0 h-0 pointer-events-none" aria-hidden="true">
        <defs>
          <linearGradient id="ambientPetalGradGroom" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="var(--petal-stop-1, #b91c1c)" />
            <stop offset="55%" stopColor="var(--petal-stop-2, #881337)" />
            <stop offset="100%" stopColor="var(--petal-stop-3, #4c0519)" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};
