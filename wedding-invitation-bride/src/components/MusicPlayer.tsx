import React, { useState, useEffect } from 'react';
import { VolumeX } from 'lucide-react';
import { sound } from '../utils/soundEngine';

export const MusicPlayer: React.FC<{ autoStartPrompt?: boolean; className?: string }> = ({
  className = '',
}) => {
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    // Sync UI with actual engine state
    const syncTimer = setInterval(() => {
      setIsPlaying(sound.getMusicStatus());
    }, 200);

    return () => clearInterval(syncTimer);
  }, []);

  const togglePlayback = () => {
    const newState = sound.toggleMusic();
    setIsPlaying(newState);
  };

  return (
    <div className={`relative flex items-center ${className}`}>
      {/* Royal Music Control Pill Button */}
      <button
        type="button"
        id="wedding-music-toggle"
        data-cursor="MUSIC"
        onClick={togglePlayback}
        aria-label={isPlaying ? 'Pause background wedding music' : 'Play background wedding music'}
        className="group relative flex items-center justify-center w-9 h-9 rounded-full border border-[var(--accent-gold)]/60 bg-[var(--bg-card-elevated)]/90 backdrop-blur-md text-[var(--accent-gold)] shadow-[0_6px_20px_rgba(0,0,0,0.5)] transition-all duration-300 hover:scale-105 hover:border-[var(--accent-gold)] hover:shadow-[0_0_20px_rgba(212,175,55,0.35)] active:scale-95 cursor-pointer p-0 shrink-0"
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
      </button>

      <style>{`
        @keyframes equalizer {
          0%, 100% { height: 3px; }
          50% { height: 14px; }
        }
      `}</style>
    </div>
  );
};
