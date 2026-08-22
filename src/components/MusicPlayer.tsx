import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';
import { sound } from '../utils/soundEngine';

export const MusicPlayer: React.FC<{ autoStartPrompt?: boolean }> = ({ autoStartPrompt = false }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    if (autoStartPrompt) {
      setShowTooltip(true);
      const timer = setTimeout(() => setShowTooltip(false), 6000);
      return () => clearTimeout(timer);
    }
  }, [autoStartPrompt]);

  const togglePlayback = () => {
    const newState = sound.toggleMusic();
    setIsPlaying(newState);
    if (!newState) {
      setShowTooltip(false);
    }
  };

  return (
    <div className="fixed top-5 right-5 z-40 flex items-center gap-3">
      {/* Gentle Floating Tooltip */}
      {showTooltip && (
        <div className="hidden sm:flex items-center gap-2 bg-[var(--bg-card-elevated)]/90 border border-[var(--accent-gold)]/40 px-3 py-1.5 rounded-full shadow-[0_4px_16px_rgba(0,0,0,0.5)] backdrop-blur-md animate-fade-in">
          <span className="text-xs font-sans-clean text-[var(--text-primary)]">
            {isPlaying ? 'Playing Wedding Raag' : 'Tap to enjoy ambient wedding melody'}
          </span>
        </div>
      )}

      {/* Floating Gold Music Button */}
      <button
        type="button"
        id="wedding-music-toggle"
        data-cursor="MUSIC"
        onClick={togglePlayback}
        aria-label={isPlaying ? 'Pause background wedding music' : 'Play background wedding music'}
        className="group relative flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 rounded-full border border-[var(--accent-gold)]/50 bg-[var(--bg-card-elevated)]/85 backdrop-blur-md text-[var(--accent-gold)] shadow-[0_8px_24px_rgba(0,0,0,0.5)] transition-all duration-300 hover:scale-110 hover:border-[var(--accent-gold)] hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] active:scale-95 cursor-pointer"
      >
        {/* Pulsing ring when playing */}
        {isPlaying && (
          <span className="absolute inset-0 rounded-full border border-[var(--accent-gold)] animate-ping opacity-30 pointer-events-none" />
        )}

        {/* Equalizer Waveform Bars or Icons */}
        {isPlaying ? (
          <div className="flex items-end gap-0.5 h-4">
            <span className="w-0.5 bg-[var(--accent-gold)] rounded-full animate-[equalizer_0.8s_ease-in-out_infinite]" />
            <span className="w-0.5 bg-[var(--text-primary)] rounded-full animate-[equalizer_1.1s_ease-in-out_infinite_0.2s]" />
            <span className="w-0.5 bg-[var(--accent-gold)] rounded-full animate-[equalizer_0.7s_ease-in-out_infinite_0.4s]" />
            <span className="w-0.5 bg-[var(--text-primary)] rounded-full animate-[equalizer_1.2s_ease-in-out_infinite_0.1s]" />
          </div>
        ) : (
          <div className="relative">
            <Music className="w-5 h-5 text-[var(--accent-gold)]/80 group-hover:text-[var(--accent-gold-light)] transition-colors" />
          </div>
        )}
      </button>

      <style>{`
        @keyframes equalizer {
          0%, 100% { height: 4px; }
          50% { height: 16px; }
        }
      `}</style>
    </div>
  );
};
