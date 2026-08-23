import React from 'react';
import { Mail, Heart, ArrowUp } from 'lucide-react';
import { WeddingConfig } from '../types';
import { RoyalCorner, GoldDivider, WaxSealBadge } from './Ornaments';

export const FinalSection: React.FC<{
  wedding: WeddingConfig;
  onScrollToTop: () => void;
}> = ({ wedding, onScrollToTop }) => {
  return (
    <footer className="relative py-28 px-4 text-center overflow-hidden border-t border-[var(--accent-gold)]/30 bg-gradient-to-b from-[var(--bg-primary)] to-[var(--bg-primary-dark,var(--bg-primary))]">
      {/* Background Palace Architecture silhouette */}
      <div
        className="absolute inset-0 bg-cover bg-bottom opacity-15 filter contrast-125 pointer-events-none"
        style={{
          backgroundImage: `url('${wedding.venue.cityImage || "https://images.unsplash.com/photo-1599661046289-e31897846e41?q=80&w=1600&auto=format&fit=crop"}')`,
        }}
      />

      <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center">
        {/* Monogram Badge */}
        <div className="mb-6">
          <WaxSealBadge
            initials={wedding.couple.initials}
            size="lg"
            className="shadow-[0_0_30px_rgba(212,175,55,0.4)]"
          />
        </div>

        {/* Emotionally Resonant Climax */}
        <div className="space-y-1 mb-4">
          <h2 className="font-cinzel-dec text-3xl sm:text-5xl font-bold tracking-widest text-gold-gradient">
            TWO HEARTS.
          </h2>
          <h2 className="font-cinzel-dec text-3xl sm:text-5xl font-bold tracking-widest text-gold-gradient">
            ONE JOURNEY.
          </h2>
          <h2 className="font-cinzel-dec text-3xl sm:text-5xl font-bold tracking-widest text-gold-gradient">
            FOREVER.
          </h2>
        </div>

        <p className="font-script text-3xl sm:text-4xl text-[var(--text-secondary)] my-3">
          {wedding.couple.groom.firstName} & {wedding.couple.bride.firstName}
        </p>

        <div className="font-cinzel text-xs sm:text-sm font-semibold tracking-[0.3em] text-[var(--accent-gold)] uppercase my-2">
          {wedding.displayDate} • {wedding.venue.city}, {wedding.venue.state}
        </div>

        <GoldDivider variant="lotus" className="max-w-xs my-6" />

        <p className="font-sans text-xs sm:text-sm text-[var(--text-secondary)] italic max-w-md mx-auto">
          "Thank you for being part of our story, our joy, and our forever."
        </p>

        {/* Scroll to Top Button */}
        <div className="flex items-center justify-center mt-8">
          <button
            type="button"
            id="scroll-to-top-btn"
            onClick={onScrollToTop}
            aria-label="Scroll back to top"
            className="flex items-center gap-2 px-6 py-2.5 rounded-full border border-[var(--accent-gold)]/40 bg-[var(--bg-card-elevated)]/80 text-[var(--text-secondary)] hover:text-[#ffffff] hover:border-[var(--accent-gold)] hover:bg-[var(--bg-card)] text-xs font-cinzel tracking-wider uppercase transition-all cursor-pointer shadow-md"
          >
            <ArrowUp className="w-3.5 h-3.5 text-[var(--accent-gold)]" />
            Back to Top
          </button>
        </div>

        {/* Subtle Watermark */}
        <div className="mt-12 text-[10px] font-sans tracking-widest text-[#a68972] uppercase opacity-75">
          {wedding.couple.hashtag} • Designed with Royal Elegance
        </div>
      </div>
    </footer>
  );
};
