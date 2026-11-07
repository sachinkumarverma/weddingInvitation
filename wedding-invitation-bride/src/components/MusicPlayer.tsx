import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { sound } from '../utils/soundEngine';

export const MusicPlayer: React.FC<{ autoStartPrompt?: boolean; className?: string }> = ({
  className = '',
}) => {
  const [isPlaying, setIsPlaying] = useState(() => sound.getMusicStatus());
  const [isUserMuted, setIsUserMuted] = useState(() => sound.isUserMuted());

  useEffect(() => {
    sound.initAutoplay();
    const unsubscribe = sound.subscribe((playing) => {
      setIsPlaying(playing);
      setIsUserMuted(sound.isUserMuted());
    });

    // Fallback sync timer to ensure UI stays synced with media events
    const syncTimer = setInterval(() => {
      setIsPlaying(sound.getMusicStatus());
      setIsUserMuted(sound.isUserMuted());
    }, 400);

    return () => {
      unsubscribe();
      clearInterval(syncTimer);
    };
  }, []);

  const togglePlayback = () => {
    sound.toggleMusic();
    setIsPlaying(sound.getMusicStatus());
    setIsUserMuted(sound.isUserMuted());
  };

  const isSoundOn = !isUserMuted;

  return (
    <div className={`relative flex items-center ${className}`}>
      {/* Royal Music Control Pill Button */}
      <button
        type="button"
        id="wedding-music-toggle"
        data-cursor="MUSIC"
        onClick={togglePlayback}
        aria-label={
          isUserMuted
            ? 'Wedding music is muted. Tap to play'
            : isPlaying
            ? 'Pause wedding music'
            : 'Wedding music is on. Tap to play'
        }
        title={
          isUserMuted
            ? 'Music: Muted (Click to play)'
            : isPlaying
            ? 'Music: Playing (Click to pause)'
            : 'Music: ON by default (Click to mute)'
        }
        className="group relative flex items-center justify-center w-9 h-9 rounded-full border border-[var(--accent-gold)]/60 bg-[var(--bg-card-elevated)]/90 backdrop-blur-md text-[var(--accent-gold)] shadow-[0_6px_20px_rgba(0,0,0,0.5)] transition-all duration-300 hover:scale-105 hover:border-[var(--accent-gold)] hover:shadow-[0_0_20px_rgba(212,175,55,0.35)] active:scale-95 cursor-pointer p-0 shrink-0"
      >
        {/* Pulsing ring when sound is enabled */}
        {isSoundOn && (
          <span className="absolute inset-0 rounded-full border border-[var(--accent-gold)] animate-ping opacity-25 pointer-events-none" />
        )}

        {/* Equalizer Waveform Bars when playing, Volume2 when sound ON, VolumeX ONLY when user explicitly muted */}
        <div className="w-5 h-5 flex items-center justify-center shrink-0">
          {isPlaying ? (
            <div className="flex items-end gap-0.5 h-3.5">
              <span className="w-0.5 bg-[var(--accent-gold)] rounded-full animate-[equalizer_0.8s_ease-in-out_infinite]" />
              <span className="w-0.5 bg-[var(--text-primary)] rounded-full animate-[equalizer_1.1s_ease-in-out_infinite_0.2s]" />
              <span className="w-0.5 bg-[var(--accent-gold)] rounded-full animate-[equalizer_0.7s_ease-in-out_infinite_0.4s]" />
              <span className="w-0.5 bg-[var(--text-primary)] rounded-full animate-[equalizer_1.2s_ease-in-out_infinite_0.1s]" />
            </div>
          ) : isSoundOn ? (
            <Volume2 className="w-4 h-4 text-[var(--accent-gold)] group-hover:scale-110 transition-transform opacity-95 animate-pulse" />
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
