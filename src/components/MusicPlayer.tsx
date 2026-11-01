import React, { useState, useEffect } from 'react';
import { VolumeX, Music } from 'lucide-react';
import { sound } from '../utils/soundEngine';
import { useLanguage } from '../context/LanguageContext';

export const MusicPlayer: React.FC<{ autoStartPrompt?: boolean; className?: string }> = ({
  autoStartPrompt = false,
  className = '',
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    // Sync UI with actual engine state
    const syncTimer = setInterval(() => {
      setIsPlaying(sound.getMusicStatus());
    }, 200);

    if (autoStartPrompt) {
      setShowTooltip(true);
      const timer = setTimeout(() => setShowTooltip(false), 5000);
      return () => {
        clearTimeout(timer);
        clearInterval(syncTimer);
      };
    }

    return () => clearInterval(syncTimer);
  }, [autoStartPrompt]);

  const togglePlayback = () => {
    const newState = sound.toggleMusic();
    setIsPlaying(newState);
    if (!newState) {
      setShowTooltip(false);
    }
  };

  return (
    <div className={`relative flex items-center ${className}`}>
      {/* Royal Music Control Pill Button */}
      <button
        type="button"
        id="wedding-music-toggle"
        data-cursor="MUSIC"
        onClick={togglePlayback}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        aria-label={isPlaying ? 'Pause background wedding music' : 'Play background wedding music'}
        className="group relative flex items-center gap-2.5 px-3.5 sm:px-4 py-2 sm:py-2.5 min-h-[42px] rounded-full border border-[var(--accent-gold)]/60 bg-[var(--bg-card-elevated)]/90 backdrop-blur-md text-[var(--accent-gold)] shadow-[0_8px_24px_rgba(0,0,0,0.5)] transition-all duration-300 hover:scale-103 hover:border-[var(--accent-gold)] hover:shadow-[0_0_20px_rgba(212,175,55,0.35)] active:scale-95 cursor-pointer"
      >
        {/* Pulsing ring when playing */}
        {isPlaying && (
          <span className="absolute inset-0 rounded-full border border-[var(--accent-gold)] animate-ping opacity-25 pointer-events-none" />
        )}

        {/* Equalizer Waveform Bars or Muted Icon */}
        <div className="w-5 h-5 flex items-center justify-center shrink-0">
          {isPlaying ? (
            <div className="flex items-end gap-0.5 h-3.5">
              <span className="w-0.5 bg-[var(--accent-gold)] rounded-full animate-[equalizer_0.8s_ease-in-out_infinite]" />
              <span className="w-0.5 bg-[var(--text-primary)] rounded-full animate-[equalizer_1.1s_ease-in-out_infinite_0.2s]" />
              <span className="w-0.5 bg-[var(--accent-gold)] rounded-full animate-[equalizer_0.7s_ease-in-out_infinite_0.4s]" />
              <span className="w-0.5 bg-[var(--text-primary)] rounded-full animate-[equalizer_1.2s_ease-in-out_infinite_0.1s]" />
            </div>
          ) : (
            <VolumeX className="w-4 h-4 text-[var(--text-tertiary)] group-hover:text-[var(--text-secondary)] transition-colors opacity-80" />
          )}
        </div>

        {/* Text Label - Visible on desktop, subtle on mobile */}
        <span className="text-xs sm:text-sm font-cinzel font-semibold tracking-wider text-[var(--text-primary)] hidden sm:inline-block whitespace-nowrap pt-0.5 pb-0.5 leading-normal">
          {isPlaying ? t('music.playing') : t('music.paused')}
        </span>

        {/* Live indicator dot */}
        {isPlaying && (
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse hidden sm:inline-block shrink-0" />
        )}
      </button>

      {/* Gentle Floating Dropdown Notification (Appears directly BELOW the button, never overlapping adjacent pills) */}
      {showTooltip && (
        <div className="absolute top-full right-0 mt-2 z-50 flex items-center gap-2 bg-[var(--bg-card-elevated)]/95 border border-[var(--accent-gold)]/50 px-3 py-1.5 rounded-full shadow-[0_8px_25px_rgba(0,0,0,0.8)] backdrop-blur-md animate-in fade-in duration-200 pointer-events-none whitespace-nowrap">
          <Music className="w-3 h-3 text-[var(--accent-gold)] shrink-0" />
          <span className="text-[11px] font-sans text-[var(--text-primary)]">
            {isPlaying ? t('music.tooltipPause') : t('music.tooltipPlay')}
          </span>
        </div>
      )}

      <style>{`
        @keyframes equalizer {
          0%, 100% { height: 3px; }
          50% { height: 14px; }
        }
      `}</style>
    </div>
  );
};
