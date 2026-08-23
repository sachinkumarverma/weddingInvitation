import React from 'react';

// Royal Indian Floral / Paisley Divider with Center Lotus / Diamond
export const GoldDivider: React.FC<{ className?: string; variant?: 'lotus' | 'diamond' | 'paisley' }> = ({
  className = '',
  variant = 'lotus',
}) => {
  return (
    <div className={`flex items-center justify-center gap-3 my-6 opacity-90 ${className}`}>
      <div className="h-[1px] w-12 sm:w-24 bg-gradient-to-r from-transparent via-[var(--accent-gold)] to-[var(--accent-gold)]" />
      {variant === 'lotus' && (
        <svg className="w-6 h-6 text-[var(--accent-gold)] animate-pulse-glow" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C12 2 9 7 9 10C9 12.5 10.5 14 12 15C13.5 14 15 12.5 15 10C15 7 12 2 12 2Z" opacity="0.9" />
          <path d="M12 15C9.5 15 7 13.5 6 11C6 11 5 15 8 18C10 20 12 21 12 21C12 21 14 20 16 18C19 15 18 11 18 11C17 13.5 14.5 15 12 15Z" opacity="0.75" />
          <path d="M4 14C4 14 2 17 5 19C7 20.5 9 20.5 9 20.5C9 20.5 6.5 18.5 6.5 16C6.5 14.5 7.5 13.5 8 13C6 13 4 14 4 14Z" opacity="0.6" />
          <path d="M20 14C20 14 22 17 19 19C17 20.5 15 20.5 15 20.5C15 20.5 17.5 18.5 17.5 16C17.5 14.5 16.5 13.5 16 13C18 13 20 14 20 14Z" opacity="0.6" />
        </svg>
      )}
      {variant === 'diamond' && (
        <div className="w-2.5 h-2.5 rotate-45 border border-[var(--accent-gold)] bg-[var(--accent-gold)]/30 shadow-[0_0_8px_var(--accent-gold)]" />
      )}
      {variant === 'paisley' && (
        <svg className="w-5 h-5 text-[var(--accent-gold)]" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C8 2 4 6 4 11C4 16 8 20 13 20C17 20 20 17 20 13C20 8 15 6 15 3C15 2 13 2 12 2ZM13 16C10.8 16 9 14.2 9 12C9 9.8 10.8 8 13 8C15.2 8 17 9.8 17 12C17 14.2 15.2 16 13 16Z" />
        </svg>
      )}
      <div className="h-[1px] w-12 sm:w-24 bg-gradient-to-l from-transparent via-[var(--accent-gold)] to-[var(--accent-gold)]" />
    </div>
  );
};

// Royal Corner Ornament for Cards & Frames
export const RoyalCorner: React.FC<{
  position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  className?: string;
}> = ({ position, className = '' }) => {
  const rotateClass = {
    'top-left': 'top-0 left-0',
    'top-right': 'top-0 right-0 rotate-90',
    'bottom-right': 'bottom-0 right-0 rotate-180',
    'bottom-left': 'bottom-0 left-0 -rotate-90',
  }[position];

  return (
    <div className={`absolute ${rotateClass} w-8 h-8 pointer-events-none p-1.5 ${className}`}>
      <svg viewBox="0 0 40 40" fill="none" className="w-full h-full text-[var(--accent-gold)]/70">
        <path d="M0 0 H35 C20 0 0 20 0 35 V0 Z" fill="currentColor" opacity="0.2" />
        <path d="M0 0 H40 V4 H4 V40 H0 V0 Z" fill="currentColor" />
        <circle cx="10" cy="10" r="2.5" fill="currentColor" />
        <path d="M4 18 C12 18 18 12 18 4" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    </div>
  );
};

// Traditional Mandala SVG background
export const MandalaBackground: React.FC<{ className?: string; size?: number }> = ({
  className = '',
  size = 500,
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 500 500"
      fill="none"
      className={`pointer-events-none ${className}`}
    >
      <circle cx="250" cy="250" r="230" stroke="currentColor" strokeWidth="0.75" strokeDasharray="4 4" opacity="0.3" />
      <circle cx="250" cy="250" r="190" stroke="currentColor" strokeWidth="1" opacity="0.4" />
      <circle cx="250" cy="250" r="140" stroke="currentColor" strokeWidth="1.2" opacity="0.5" />
      <circle cx="250" cy="250" r="80" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />
      <circle cx="250" cy="250" r="30" fill="currentColor" opacity="0.1" />

      {/* Radial Petals */}
      {Array.from({ length: 16 }).map((_, i) => {
        const angle = (i * 360) / 16;
        return (
          <g key={i} transform={`rotate(${angle} 250 250)`}>
            <path
              d="M250 110 C265 150 265 190 250 220 C235 190 235 150 250 110 Z"
              stroke="currentColor"
              strokeWidth="0.8"
              fill="currentColor"
              fillOpacity="0.03"
            />
            <circle cx="250" cy="90" r="3" fill="currentColor" opacity="0.5" />
            <path
              d="M250 30 C270 70 280 120 250 140 C220 120 230 70 250 30 Z"
              stroke="currentColor"
              strokeWidth="0.6"
              opacity="0.3"
            />
          </g>
        );
      })}
    </svg>
  );
};

// Tactile Crimson & Gold Wax Seal
export const WaxSealBadge: React.FC<{
  initials?: string;
  city?: string;
  className?: string;
  onClick?: () => void;
  size?: 'sm' | 'md' | 'lg';
  isPulsing?: boolean;
}> = ({ initials = 'S & H', city = 'Bhopal', className = '', onClick, size = 'md', isPulsing = false }) => {
  const sizeMap = {
    sm: 'w-16 h-16 text-sm',
    md: 'w-24 h-24 text-xl',
    lg: 'w-32 h-32 text-3xl',
  };

  return (
    <button
      type="button"
      id="wax-seal-badge"
      onClick={onClick}
      className={`relative inline-flex items-center justify-center rounded-full select-none cursor-pointer transition-transform duration-300 hover:scale-105 active:scale-95 ${sizeMap[size]} ${isPulsing ? 'animate-pulse-glow' : ''} ${className}`}
      style={{
        background: 'radial-gradient(circle at 35% 30%, var(--brand-crimson) 0%, #6e0d22 60%, #3e0512 100%)',
        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.6), inset 0 2px 4px rgba(255, 255, 255, 0.25), inset 0 -4px 8px rgba(0, 0, 0, 0.7), 0 0 0 2px rgba(212, 175, 55, 0.4)',
      }}
    >
      {/* Outer irregular wax rim */}
      <div className="absolute inset-1.5 rounded-full border border-[var(--accent-gold)]/40 border-dashed opacity-60 pointer-events-none" />
      
      {/* Center gold monogram ring */}
      <div className="relative flex flex-col items-center justify-center text-center wax-seal-text">
        <span className="font-cinzel-dec font-bold text-[var(--text-primary)] tracking-wider drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
          {initials}
        </span>
        <span className="text-[0.4em] font-sans tracking-[0.2em] text-[var(--accent-gold)] uppercase mt-0.5 opacity-90">
          {city}
        </span>
      </div>
    </button>
  );
};
