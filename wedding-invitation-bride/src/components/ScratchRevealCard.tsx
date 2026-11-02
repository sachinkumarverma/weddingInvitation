import React, { useRef, useState, useEffect } from 'react';
import Confetti from 'react-confetti';
import { Sparkles, Heart, RefreshCw } from 'lucide-react';
import { sound } from '../utils/soundEngine';
import { RoyalCorner, GoldDivider } from './Ornaments';
import { WeddingConfig } from '../types';
import { useLanguage } from '../context/LanguageContext';

export const ScratchRevealCard: React.FC<{ wedding: WeddingConfig }> = ({ wedding }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [isScratching, setIsScratching] = useState(false);
  const [scratchPercent, setScratchPercent] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [recycleConfetti, setRecycleConfetti] = useState(true);
  const { isHindi, t } = useLanguage();

  // Initialize Canvas Gold Foil Layer
  const initCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.offsetWidth || 340;
    const height = canvas.offsetHeight || 220;
    canvas.width = width;
    canvas.height = height;

    // Create Metallic Gold Shimmer Foil Gradient
    const grad = ctx.createLinearGradient(0, 0, width, height);
    grad.addColorStop(0, '#caa239');
    grad.addColorStop(0.3, '#f5e298');
    grad.addColorStop(0.6, '#a87814');
    grad.addColorStop(0.85, '#ffd700');
    grad.addColorStop(1, '#caa239');

    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);

    // Add ornamental filigree lines on foil
    ctx.strokeStyle = 'rgba(100, 60, 10, 0.3)';
    ctx.lineWidth = 2;
    ctx.strokeRect(12, 12, width - 24, height - 24);

    // Draw Foil Center Text
    ctx.fillStyle = '#422402';
    ctx.font = isHindi ? 'bold 18px "Hind", sans-serif' : 'bold 16px "Cinzel", serif';
    ctx.textAlign = 'center';
    ctx.fillText(t('scratch.scratchToReveal'), width / 2, height / 2 - 8);

    ctx.font = isHindi ? '600 15px "Hind", sans-serif' : '13px "Great Vibes", cursive';
    ctx.fillStyle = '#613809';
    ctx.fillText(t('scratch.dateAndVows'), width / 2, height / 2 + 18);
  };

  useEffect(() => {
    initCanvas();
    window.addEventListener('resize', initCanvas);
    return () => window.removeEventListener('resize', initCanvas);
  }, [isHindi]);

  const scratch = (clientX: number, clientY: number) => {
    const canvas = canvasRef.current;
    if (!canvas || isRevealed) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, 22, 0, Math.PI * 2);
    ctx.fill();

    // Occasional sound tick
    if (Math.random() > 0.6) {
      sound.playSitarNote(550 + Math.random() * 200, 0.4, 'sine', 0.04);
    }

    // Check completion threshold
    checkScratchCompletion();
  };

  const checkScratchCompletion = () => {
    const canvas = canvasRef.current;
    if (!canvas || isRevealed) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Sample pixels to compute percentage cleared
    const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const pixels = imgData.data;
    let transparentCount = 0;
    const step = 32; // sampling step for performance

    for (let i = 3; i < pixels.length; i += step * 4) {
      if (pixels[i] === 0) transparentCount++;
    }

    const totalSampled = pixels.length / (step * 4);
    const percent = Math.round((transparentCount / totalSampled) * 100);
    setScratchPercent(percent);

    if (percent > 30 && !isRevealed) {
      handleCompleteReveal();
    }
  };

  const handleCompleteReveal = () => {
    setIsRevealed(true);
    sound.playGoldShimmer();
    
    // Play the celebration chime when the slow fade completes (1.5s)
    setTimeout(() => {
      sound.playCelebrationChimes();
    }, 1500);

    setShowConfetti(true);
    setRecycleConfetti(true);

    // Stop generating new particles after 4 seconds
    setTimeout(() => setRecycleConfetti(false), 4000);

    // Completely remove the canvas after 10 seconds to allow existing particles to fall
    setTimeout(() => setShowConfetti(false), 10000);
  };

  const handleReset = () => {
    setIsRevealed(false);
    setScratchPercent(0);
    setTimeout(initCanvas, 50);
  };

  return (
    <section className="py-16 px-4 max-w-4xl mx-auto text-center relative">
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-[100]">
          <Confetti 
            width={window.innerWidth}
            height={window.innerHeight}
            numberOfPieces={250}
            gravity={0.15}
            recycle={recycleConfetti}
            colors={['#ffb7c5', '#ff9eaa', '#ffc0cb', '#d4af37', '#eab308', '#ffffff']}
          />
        </div>
      )}
      <div className="mb-8">
        <p className="font-script text-2xl text-[var(--text-primary)] py-0.5">{t('scratch.subtitle')}</p>
        <h2 className="font-cinzel text-2xl sm:text-3xl font-bold text-gold-gradient tracking-wider uppercase mt-1 pt-2 pb-1 inline-block leading-snug">
          {t('scratch.title')}
        </h2>
        <p className="text-xs sm:text-sm font-sans text-[var(--text-secondary)] max-w-md mx-auto mt-2">
          {t('scratch.instruction')}
        </p>
        <GoldDivider variant="diamond" className="max-w-xs mx-auto my-4" />
      </div>

      {/* The Scratch Container */}
      <div className="scratch-card-wrapper relative mx-auto w-full max-w-sm sm:max-w-md">
        <div className="scratch-card-container relative w-full rounded-2xl overflow-hidden border border-[var(--accent-gold)]/40 shadow-[0_20px_50px_rgba(0,0,0,0.8)] bg-[var(--bg-card)] backdrop-blur-md">
        <RoyalCorner position="top-left" />
        <RoyalCorner position="top-right" />
        <RoyalCorner position="bottom-left" />
        <RoyalCorner position="bottom-right" />

        {/* Hidden Content Revealed Beneath */}
        <div className="scratch-content-wrapper p-6 sm:p-8 flex flex-col items-center justify-center min-h-[220px] h-full text-center">
          <div className="scratch-header inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--brand-crimson-dark)]/60 border border-[var(--accent-gold)]/40 text-[var(--text-secondary)] text-xs font-cinzel mb-2 min-h-[32px]">
            <Heart className="w-3.5 h-3.5 text-[#e11d48] fill-current animate-pulse shrink-0" />
            <span className="pt-0.5 pb-0.5 inline-block leading-normal">{t('scratch.saveOurDate')}</span>
          </div>

          <h3 className="font-cinzel-dec text-2xl sm:text-3xl font-bold text-[var(--accent-gold-light)] tracking-wider my-1">
            {wedding.displayDate}
          </h3>

          <p className="font-script text-xl text-[var(--text-primary)] mt-1">
            {wedding.venue.name}
          </p>

          <p className="text-xs font-sans text-[#e4cdb5] mt-2 max-w-xs italic">
            "{wedding.couple.quote}"
          </p>

          <div className="scratch-footer mt-4 flex flex-col gap-1.5 text-[11px] font-cinzel text-[var(--accent-gold)] font-semibold tracking-widest uppercase">
            <span>{wedding.couple.hashtag}</span>
            <span>{wedding.venue.city}, {wedding.venue.state}</span>
          </div>
        </div>

        {/* Canvas Scratch Foil Layer (Overlaid on top) */}
        <canvas
          ref={canvasRef}
          id="scratch-card-canvas"
          className={`absolute inset-0 w-full h-full cursor-crosshair touch-none select-none z-20 transition-opacity duration-[1500ms] ease-in-out ${
            isRevealed ? 'opacity-0 pointer-events-none' : 'opacity-100'
          }`}
            onMouseDown={(e) => {
              setIsScratching(true);
              scratch(e.clientX, e.clientY);
            }}
            onMouseMove={(e) => {
              if (isScratching) scratch(e.clientX, e.clientY);
            }}
            onMouseUp={() => setIsScratching(false)}
            onMouseLeave={() => setIsScratching(false)}
            onTouchStart={(e) => {
              setIsScratching(true);
              const touch = e.touches[0];
              scratch(touch.clientX, touch.clientY);
            }}
            onTouchMove={(e) => {
              if (isScratching) {
                const touch = e.touches[0];
                scratch(touch.clientX, touch.clientY);
              }
            }}
            onTouchEnd={() => setIsScratching(false)}
          />
        </div>
      </div>

      {/* Controls / Accessibility Actions */}
      <div className="flex items-center justify-center gap-3 mt-5">
        {!isRevealed ? (
          <button
            type="button"
            id="instant-reveal-btn"
            data-cursor="REVEAL"
            onClick={handleCompleteReveal}
            className="flex items-center gap-2 px-4 py-2 rounded-full border border-[var(--accent-gold)]/40 bg-[var(--bg-card-elevated)]/80 text-[var(--text-secondary)] hover:bg-[var(--bg-card)] hover:border-[var(--accent-gold)] text-xs font-cinzel transition-all shadow-md cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-[var(--accent-gold)]" />
            {t('scratch.revealInstantly')}
          </button>
        ) : (
          <button
            type="button"
            id="reset-scratch-btn"
            onClick={handleReset}
            className="flex items-center gap-2 px-4 py-2 rounded-full border border-[var(--accent-gold)]/30 bg-[var(--bg-card-elevated)]/60 text-[var(--text-secondary)] hover:text-[#ffffff] hover:border-[var(--accent-gold)] text-xs font-cinzel transition-all shadow-md cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5 text-[var(--accent-gold)]" />
            {t('scratch.scratchAgain')}
          </button>
        )}
      </div>
    </section>
  );
};
