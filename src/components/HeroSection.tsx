import React from 'react';
import { ChevronDown, Calendar, MapPin, Sparkles } from 'lucide-react';
import { WeddingConfig } from '../types';
import { GoldDivider, MandalaBackground, WaxSealBadge } from './Ornaments';

export const HeroSection: React.FC<{
  wedding: WeddingConfig;
  onOpenEnvelopeModal: () => void;
  onScrollToEvents: () => void;
  onScrollToVenue: () => void;
}> = ({ wedding, onOpenEnvelopeModal, onScrollToEvents, onScrollToVenue }) => {
  return (
    <header className="relative min-h-[92vh] sm:min-h-screen flex flex-col items-center justify-center text-center px-4 pt-16 pb-12 overflow-hidden">
      {/* Background Architectural & Palace Atmosphere */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-20 filter contrast-125 scale-105 transition-transform duration-10000 ease-out pointer-events-none"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1599661046289-e31897846e41?q=80&w=1600&auto=format&fit=crop')`,
        }}
      />
      
      {/* Soft Vignette & Radial Glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--bg-primary-dark)]/80 via-[var(--bg-secondary)]/60 to-[var(--bg-primary-dark)] pointer-events-none" />

      {/* Traditional Rotating Mandala in background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-25 text-[var(--accent-gold)] animate-[spin_120s_linear_infinite] pointer-events-none">
        <MandalaBackground size={650} />
      </div>

      {/* Main Hero Card Container */}
      <div className="relative z-20 max-w-3xl mx-auto flex flex-col items-center">
        {/* Auspicious Shloka top */}
        <p className="text-xs sm:text-sm font-serif-luxury text-[var(--accent-gold-light)] tracking-widest uppercase mb-5 drop-shadow-md">
          ॥ श्री गणेशाय नमः ॥
        </p>

        {/* Monogram Seal Badge */}
        <div className="mb-7">
          <WaxSealBadge
            initials={wedding.couple.initials}
            size="sm"
            onClick={onOpenEnvelopeModal}
            className="hover:scale-110 shadow-[0_0_20px_rgba(212,175,55,0.4)]"
          />
        </div>

        {/* Introduction */}
        <p className="font-script text-2xl sm:text-3xl text-[var(--text-primary)] tracking-wide mb-3">
          Dubey & Pathak Family
        </p>

        <p className="text-[11px] sm:text-xs font-cinzel font-semibold tracking-[0.3em] text-[var(--accent-gold)] uppercase mb-6 opacity-90">
          Cordially invite you to celebrate the royal wedding of
        </p>

        {/* Couple Names - The Crown of the Invitation */}
        <div className="my-3 space-y-1 sm:space-y-0">
          <h1 className="font-cinzel-dec text-4xl sm:text-6xl md:text-7xl font-bold tracking-wider text-gold-gradient drop-shadow-title">
            SATYAM
          </h1>
          
          <div className="flex items-center justify-center my-1 sm:my-2">
            <span className="font-script text-3xl sm:text-4xl md:text-5xl text-[var(--accent-gold)] px-4 -my-2">
              weds
            </span>
          </div>

          <h1 className="font-cinzel-dec text-4xl sm:text-6xl md:text-7xl font-bold tracking-wider text-gold-gradient drop-shadow-title">
            HARSHITA
          </h1>
        </div>

        <GoldDivider variant="lotus" className="w-full max-w-xs my-3" />

        {/* Date & Venue Badges */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 my-3">
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--bg-card)]/80 border border-[var(--accent-gold)]/40 backdrop-blur-md shadow-[0_4px_15px_rgba(0,0,0,0.6)]">
            <Calendar className="w-4 h-4 text-[var(--accent-gold)]" />
            <span className="font-cinzel text-xs sm:text-sm font-semibold tracking-wider text-[var(--text-primary)]">
              {wedding.displayDate}
            </span>
          </div>

          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--bg-card)]/80 border border-[var(--accent-gold)]/40 backdrop-blur-md shadow-[0_4px_15px_rgba(0,0,0,0.6)]">
            <MapPin className="w-4 h-4 text-[var(--accent-gold)]" />
            <span className="font-cinzel text-xs sm:text-sm font-semibold tracking-wider text-[var(--text-primary)]">
              {wedding.venue.name}, {wedding.venue.city}
            </span>
          </div>
        </div>

        {/* Quick Action Buttons */}
        <div className="flex items-center gap-4 mt-5">
          <button
            type="button"
            id="hero-events-cta"
            data-cursor="EVENTS"
            onClick={onScrollToEvents}
            className="btn-primary px-7 sm:px-9 py-3 rounded-full font-cinzel text-xs sm:text-sm tracking-widest uppercase cursor-pointer"
          >
            Wedding Events & Itinerary
          </button>

          <button
            type="button"
            id="hero-venue-cta"
            data-cursor="VENUE"
            onClick={onScrollToVenue}
            className="btn-secondary px-5 sm:px-7 py-3 rounded-full font-cinzel text-xs sm:text-sm tracking-wider uppercase cursor-pointer backdrop-blur-md"
          >
            Venue & Map
          </button>
        </div>
      </div>

      {/* Elegant Scroll Down Indicator */}
      <button
        type="button"
        onClick={onScrollToEvents}
        aria-label="Scroll to explore invitation"
        className="relative z-20 mt-12 sm:mt-16 flex flex-col items-center gap-1 text-[var(--accent-gold)]/80 hover:text-[var(--accent-gold)] transition-colors cursor-pointer group"
      >
        <span className="text-[10px] font-cinzel tracking-[0.25em] uppercase opacity-75 group-hover:opacity-100">
          Scroll to Explore
        </span>
        <ChevronDown className="w-5 h-5 animate-bounce text-[var(--accent-gold)]" />
      </button>
    </header>
  );
};

