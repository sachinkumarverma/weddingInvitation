import React from 'react';

// Royal Indian Floral / Paisley / Imperial Divider with Center Star or Lotus
export const GoldDivider: React.FC<{ className?: string; variant?: 'lotus' | 'diamond' | 'paisley' | 'crest' | 'imperial' }> = ({
  className = '',
  variant = 'imperial',
}) => {
  return (
    <div className={`flex items-center justify-center gap-3 my-5 opacity-90 ${className}`}>
      <div className="h-[1px] w-12 sm:w-28 bg-gradient-to-r from-transparent via-[var(--accent-gold)]/60 to-[var(--accent-gold)]" />
      {variant === 'lotus' && (
        <svg className="w-6 h-6 text-[var(--accent-gold)] animate-pulse-glow" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C12 2 9 7 9 10C9 12.5 10.5 14 12 15C13.5 14 15 12.5 15 10C15 7 12 2 12 2Z" opacity="0.9" />
          <path d="M12 15C9.5 15 7 13.5 6 11C6 11 5 15 8 18C10 20 12 21 12 21C12 21 14 20 16 18C19 15 18 11 18 11C17 13.5 14.5 15 12 15Z" opacity="0.75" />
          <path d="M4 14C4 14 2 17 5 19C7 20.5 9 20.5 9 20.5C9 20.5 6.5 18.5 6.5 16C6.5 14.5 7.5 13.5 8 13C6 13 4 14 4 14Z" opacity="0.6" />
          <path d="M20 14C20 14 22 17 19 19C17 20.5 15 20.5 15 20.5C15 20.5 17.5 18.5 17.5 16C17.5 14.5 16.5 13.5 16 13C18 13 20 14 20 14Z" opacity="0.6" />
        </svg>
      )}
      {(variant === 'crest' || variant === 'imperial') && (
        <div className="flex items-center gap-1.5 text-[var(--accent-gold)]">
          <span className="w-1.5 h-1.5 rotate-45 border border-current opacity-70 shrink-0" />
          <svg className="w-5 h-5 text-[var(--accent-gold)] drop-shadow-[0_0_8px_rgba(212,175,55,0.5)]" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2L14.2 8.2L20.5 6.5L16.8 11.8L22 15L15.8 15.8L16.5 22L12 17.5L7.5 22L8.2 15.8L2 15L7.2 11.8L3.5 6.5L9.8 8.2L12 2Z" />
          </svg>
          <span className="w-1.5 h-1.5 rotate-45 border border-current opacity-70 shrink-0" />
        </div>
      )}
      {variant === 'diamond' && (
        <div className="w-2.5 h-2.5 rotate-45 border border-[var(--accent-gold)] bg-[var(--accent-gold)]/30 shadow-[0_0_8px_var(--accent-gold)]" />
      )}
      {variant === 'paisley' && (
        <svg className="w-5 h-5 text-[var(--accent-gold)]" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C8 2 4 6 4 11C4 16 8 20 13 20C17 20 20 17 20 13C20 8 15 6 15 3C15 2 13 2 12 2ZM13 16C10.8 16 9 14.2 9 12C9 9.8 10.8 8 13 8C15.2 8 17 9.8 17 12C17 14.2 15.2 16 13 16Z" />
        </svg>
      )}
      <div className="h-[1px] w-12 sm:w-28 bg-gradient-to-l from-transparent via-[var(--accent-gold)]/60 to-[var(--accent-gold)]" />
    </div>
  );
};

// Imperial Corner Bracket with Stepped Hairlines and Diamond Accent
export const ImperialCorner: React.FC<{
  position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  className?: string;
  size?: number;
}> = ({ position, className = '', size = 38 }) => {
  const rotateClass = {
    'top-left': 'top-0 left-0',
    'top-right': 'top-0 right-0 rotate-90',
    'bottom-right': 'bottom-0 right-0 rotate-180',
    'bottom-left': 'bottom-0 left-0 -rotate-90',
  }[position];

  return (
    <div className={`absolute ${rotateClass} pointer-events-none p-1.5 ${className}`} style={{ width: size, height: size }}>
      <svg viewBox="0 0 38 38" fill="none" className="w-full h-full text-[var(--accent-gold)]">
        {/* Outer sharp corner bracket */}
        <path d="M0 0 H36 V3 H3 V36 H0 V0 Z" fill="currentColor" opacity="0.9" />
        {/* Inner stepped hairline */}
        <path d="M7 7 H26 V9 H9 V26 H7 V7 Z" fill="currentColor" opacity="0.5" />
        {/* Center royal diamond jewel */}
        <polygon points="14,14 17,11 20,14 17,17" fill="currentColor" opacity="0.95" />
        <circle cx="3" cy="3" r="1.5" fill="currentColor" />
      </svg>
    </div>
  );
};

// Legacy Royal Corner Ornament for Cards & Frames (preserved for compatibility)
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

// Traditional Royal Indian Mandala SVG background with fine gold linework
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
      className={`pointer-events-none select-none ${className}`}
      aria-hidden="true"
    >
      {/* Outer Fine Scalloped Perimeter & Sacred Rings */}
      <circle cx="250" cy="250" r="242" stroke="currentColor" strokeWidth="0.6" strokeDasharray="3 4" opacity="0.35" />
      <circle cx="250" cy="250" r="234" stroke="currentColor" strokeWidth="0.8" opacity="0.4" />
      <circle cx="250" cy="250" r="218" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 3" opacity="0.3" />
      <circle cx="250" cy="250" r="185" stroke="currentColor" strokeWidth="1" opacity="0.45" />
      <circle cx="250" cy="250" r="145" stroke="currentColor" strokeWidth="0.75" strokeDasharray="4 4" opacity="0.35" />
      <circle cx="250" cy="250" r="110" stroke="currentColor" strokeWidth="1" opacity="0.5" />
      <circle cx="250" cy="250" r="65" stroke="currentColor" strokeWidth="0.8" strokeDasharray="2 3" opacity="0.4" />
      <circle cx="250" cy="250" r="30" stroke="currentColor" strokeWidth="1.2" opacity="0.6" />
      <circle cx="250" cy="250" r="8" fill="currentColor" opacity="0.5" />

      {/* 24 Outer Lace Arches */}
      {Array.from({ length: 24 }).map((_, i) => {
        const angle = (i * 360) / 24;
        return (
          <g key={`arch-${i}`} transform={`rotate(${angle} 250 250)`}>
            <path
              d="M250 16 C258 24 258 32 250 40 C242 32 242 24 250 16 Z"
              stroke="currentColor"
              strokeWidth="0.6"
              fill="currentColor"
              fillOpacity="0.02"
              opacity="0.45"
            />
            <circle cx="250" cy="12" r="1.5" fill="currentColor" opacity="0.5" />
          </g>
        );
      })}

      {/* 16 Royal Lotus Petals with Delicate Ribbing */}
      {Array.from({ length: 16 }).map((_, i) => {
        const angle = (i * 360) / 16;
        return (
          <g key={`petal-${i}`} transform={`rotate(${angle} 250 250)`}>
            {/* Outer pointed lotus tip */}
            <path
              d="M250 40 C275 90 280 145 250 185 C220 145 225 90 250 40 Z"
              stroke="currentColor"
              strokeWidth="0.75"
              fill="currentColor"
              fillOpacity="0.03"
              opacity="0.5"
            />
            {/* Center vein */}
            <line x1="250" y1="55" x2="250" y2="175" stroke="currentColor" strokeWidth="0.5" opacity="0.35" />
            
            {/* Flanking leaf arcs */}
            <path
              d="M250 75 C265 110 268 145 250 165"
              stroke="currentColor"
              strokeWidth="0.5"
              opacity="0.3"
            />
            <path
              d="M250 75 C235 110 232 145 250 165"
              stroke="currentColor"
              strokeWidth="0.5"
              opacity="0.3"
            />

            {/* Micro pearl dot on petal apex */}
            <circle cx="250" cy="46" r="2" fill="currentColor" opacity="0.6" />
          </g>
        );
      })}

      {/* 16 Intermediate Rosette Petals (Offset by 11.25 deg) */}
      {Array.from({ length: 16 }).map((_, i) => {
        const angle = (i * 360) / 16 + 11.25;
        return (
          <g key={`inner-petal-${i}`} transform={`rotate(${angle} 250 250)`}>
            <path
              d="M250 110 C268 140 265 175 250 195 C235 175 232 140 250 110 Z"
              stroke="currentColor"
              strokeWidth="0.7"
              fill="currentColor"
              fillOpacity="0.04"
              opacity="0.4"
            />
            <circle cx="250" cy="120" r="1.8" fill="currentColor" opacity="0.45" />
          </g>
        );
      })}

      {/* 8 Central Floral Medallion Petals */}
      {Array.from({ length: 8 }).map((_, i) => {
        const angle = (i * 360) / 8;
        return (
          <g key={`center-petal-${i}`} transform={`rotate(${angle} 250 250)`}>
            <path
              d="M250 195 C260 215 258 235 250 245 C242 235 240 215 250 195 Z"
              stroke="currentColor"
              strokeWidth="0.9"
              fill="currentColor"
              fillOpacity="0.06"
              opacity="0.55"
            />
          </g>
        );
      })}
    </svg>
  );
};

// Royal Indian Crown / Kalgi Motif for Groom Distinction
export const GroomCrownMotif: React.FC<{ className?: string; size?: number }> = ({
  className = '',
  size = 24,
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={`text-[var(--accent-gold)] ${className}`}
    >
      <path d="M5 16L3 5L8.5 10L12 3L15.5 10L21 5L19 16H5Z" opacity="0.9" />
      <path d="M5 18H19V20H5V18Z" opacity="0.95" />
      <circle cx="12" cy="2" r="1.5" fill="currentColor" />
      <circle cx="3" cy="4" r="1.2" fill="currentColor" />
      <circle cx="21" cy="4" r="1.2" fill="currentColor" />
    </svg>
  );
};

// Tactile Royal Midnight & Gold Wax Seal
export const WaxSealBadge: React.FC<{
  initials?: string;
  city?: string;
  className?: string;
  onClick?: () => void;
  size?: 'sm' | 'md' | 'lg';
  isPulsing?: boolean;
}> = ({ initials = 'S & H', city = '', className = '', onClick, size = 'md', isPulsing = false }) => {
  const sizeMap = {
    sm: 'w-20 h-20 text-base',
    md: 'w-28 h-28 text-2xl',
    lg: 'w-36 h-36 text-4xl',
  };

  const isHindiCity = Boolean(city && /[\u0900-\u097F]/.test(city));

  return (
    <button
      type="button"
      id="wax-seal-badge"
      onClick={onClick}
      className={`wax-seal-badge relative inline-flex items-center justify-center rounded-full select-none cursor-pointer transition-transform duration-300 hover:scale-105 active:scale-95 ${sizeMap[size]} ${isPulsing ? 'animate-pulse-glow' : ''} ${className}`}
      style={{
        background: 'var(--wax-seal-bg, radial-gradient(circle at 35% 30%, #2e2172 0%, #181044 60%, #0c0826 100%))',
        boxShadow: 'var(--wax-seal-shadow, 0 8px 24px rgba(0, 0, 0, 0.6), inset 0 2px 4px rgba(255, 255, 255, 0.25), inset 0 -4px 8px rgba(0, 0, 0, 0.7), 0 0 0 2px rgba(212, 175, 55, 0.5))',
      }}
    >
      {/* Outer irregular wax rim */}
      <div className="absolute inset-1.5 rounded-full border border-[var(--accent-gold)]/50 border-dashed opacity-70 pointer-events-none" />
      
      {/* Center gold monogram ring */}
      <div className="relative flex flex-col items-center justify-center text-center wax-seal-text">
        <span className="font-cinzel-dec font-bold text-[var(--accent-gold-light)] tracking-wider drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]">
          {initials}
        </span>
        {city ? (
          <span
            className={`text-[0.42em] text-[var(--accent-gold)] mt-0.5 opacity-90 ${
              isHindiCity
                ? 'font-hindi-heading'
                : 'font-sans tracking-[0.2em] uppercase'
            }`}
            style={isHindiCity ? { letterSpacing: '0px' } : undefined}
          >
            {city}
          </span>
        ) : null}
      </div>
    </button>
  );
};
