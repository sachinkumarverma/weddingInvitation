import React, { useEffect, useState } from 'react';

export const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [hoverText, setHoverText] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only enable on non-touch desktop devices
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement;
      const interactiveEl = target?.closest('button, a, input, [data-cursor]');
      
      if (interactiveEl) {
        setIsHovered(true);
        const customText = interactiveEl.getAttribute('data-cursor') || '';
        setHoverText(customText);
      } else {
        setIsHovered(false);
        setHoverText('');
      }
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <>
      {/* Small Gold Center Dot */}
      <div
        className="fixed pointer-events-none z-50 rounded-full bg-[var(--accent-gold)] shadow-[0_0_8px_var(--accent-gold)] transition-transform duration-75 ease-out -translate-x-1/2 -translate-y-1/2"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          width: isHovered ? '6px' : '8px',
          height: isHovered ? '6px' : '8px',
        }}
      />

      {/* Smooth Trailing Gold Ring / Badge */}
      <div
        className={`fixed pointer-events-none z-50 flex items-center justify-center rounded-full border border-[var(--accent-gold)]/60 backdrop-blur-[2px] transition-all duration-300 ease-out -translate-x-1/2 -translate-y-1/2 ${
          isHovered
            ? 'scale-125 bg-[var(--accent-gold)]/15 border-[var(--accent-gold)] shadow-[0_0_20px_rgba(212,175,55,0.4)]'
            : 'scale-100 bg-transparent'
        }`}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          width: hoverText ? '64px' : isHovered ? '48px' : '32px',
          height: hoverText ? '64px' : isHovered ? '48px' : '32px',
        }}
      >
        {hoverText && (
          <span className="text-[10px] font-cinzel font-bold text-[var(--text-secondary)] tracking-widest uppercase animate-pulse">
            {hoverText}
          </span>
        )}
      </div>
    </>
  );
};
