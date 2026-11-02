import React from 'react';
import { ChevronDown, Calendar, MapPin } from 'lucide-react';
import { WeddingConfig } from '../types';
import { GoldDivider, MandalaBackground, WaxSealBadge } from './Ornaments';
import { useLanguage } from '../context/LanguageContext';

export const HeroSection: React.FC<{
  wedding: WeddingConfig;
  onOpenEnvelopeModal: () => void;
  onScrollToEvents: () => void;
  onScrollToVenue: () => void;
}> = ({ wedding, onOpenEnvelopeModal, onScrollToEvents, onScrollToVenue }) => {
  const { t } = useLanguage();

  const handleLittleScroll = () => {
    window.scrollBy({ top: window.innerHeight * 0.4, behavior: 'smooth' });
  };

  return (
    <header className="relative min-h-[92vh] sm:min-h-screen flex flex-col items-center justify-center text-center px-4 pt-20 sm:pt-20 pb-12 overflow-hidden bg-[var(--bg-primary-dark)]">
      {/* Background Architectural & Palace Atmosphere */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-20 filter contrast-125 scale-105 transition-transform duration-10000 ease-out pointer-events-none"
        style={{
          backgroundImage: `url('/royal.webp')`,
        }}
      />
      
      {/* Soft Vignette & Radial Glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--bg-primary-dark)]/80 via-[var(--bg-secondary)]/60 to-[var(--bg-primary-dark)] pointer-events-none" />

      {/* Main Hero Card Container */}
      <div className="relative z-30 max-w-3xl mx-auto flex flex-col items-center">
        {/* Auspicious Shloka top */}
        <p className="text-xs sm:text-sm font-hindi-heading text-[var(--accent-gold-light)] tracking-normal mt-3 sm:mt-4 mb-5 drop-shadow-md">
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
          {t('hero.familyInvites')}
        </p>

        <p className="text-[11px] sm:text-xs font-cinzel font-semibold tracking-[0.3em] text-[var(--accent-gold)] uppercase mb-6 opacity-90">
          {t('hero.cordiallyInvite')}
        </p>

        {/* Couple Names - The Crown of the Invitation with Centered Rotating Royal Mandala Halo */}
        <div className="relative my-3 space-y-1 sm:space-y-0 flex flex-col items-center justify-center">
          {/* Traditional Rotating Mandala centered directly behind Harshita weds Satyam */}
          <div 
            className="hero-mandala-container text-[var(--accent-gold)] pointer-events-none select-none -z-10"
            aria-hidden="true"
          >
            <div className="hero-mandala-spinner animate-mandala-slow-spin">
              <MandalaBackground className="w-[480px] h-[480px] sm:w-[680px] sm:h-[680px] lg:w-[840px] lg:h-[840px] shrink-0" size={840} />
            </div>
          </div>

          <h1 className="font-cinzel-dec text-4xl sm:text-6xl md:text-7xl font-bold tracking-wider text-gold-gradient drop-shadow-title pt-3 pb-1 inline-block leading-tight relative z-10">
            {wedding.couple.bride.firstName}
          </h1>
          
          <div className="flex items-center justify-center my-1 sm:my-2 relative z-10">
            <span className="font-script text-3xl sm:text-4xl md:text-5xl text-[var(--accent-gold)] px-4 py-1">
              {t('common.weds')}
            </span>
          </div>

          <h1 className="font-cinzel-dec text-4xl sm:text-6xl md:text-7xl font-bold tracking-wider text-gold-gradient drop-shadow-title pt-2 pb-1 inline-block leading-tight relative z-10">
            {wedding.couple.groom.firstName}
          </h1>
        </div>

        <GoldDivider variant="lotus" className="w-full max-w-xs my-3" />

        {/* Date & Venue Badges */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 mt-6">
          <div className="flex items-center gap-2.5 px-6 py-2.5 rounded-full bg-black/40 backdrop-blur-md border border-[var(--accent-gold)]/40 hover:bg-[var(--accent-gold)]/20 transition-all cursor-default group">
            <Calendar className="w-4 h-4 text-[var(--accent-gold)] group-hover:scale-110 transition-transform" />
            <span className="font-cinzel text-xs sm:text-sm font-semibold tracking-wider text-[var(--text-primary)]">
              {wedding.displayDate}
            </span>
          </div>

          <a 
            href={wedding.venue.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2.5 px-6 py-2.5 rounded-full bg-black/40 backdrop-blur-md border border-[var(--accent-gold)]/40 hover:bg-[var(--accent-gold)]/20 transition-all cursor-pointer group"
          >
            <MapPin className="w-4 h-4 text-[var(--accent-gold)] group-hover:scale-110 transition-transform" />
            <span className="font-cinzel text-xs sm:text-sm font-semibold tracking-wider text-[var(--text-primary)]">
              {wedding.venue.name}, {wedding.venue.city}
            </span>
          </a>
        </div>

        {/* Quick Action Buttons */}
        <div className="flex items-center gap-4 mt-5">
          <button
            type="button"
            id="hero-events-cta"
            data-cursor="EVENTS"
            onClick={handleLittleScroll}
            className="btn-primary px-7 sm:px-9 py-3 rounded-full font-cinzel text-xs sm:text-sm tracking-widest uppercase cursor-pointer"
          >
            {t('hero.eventsCta')}
          </button>

          <button
            type="button"
            id="hero-venue-cta"
            data-cursor="VENUE"
            onClick={handleLittleScroll}
            className="btn-secondary px-5 sm:px-7 py-3 rounded-full font-cinzel text-xs sm:text-sm tracking-wider uppercase cursor-pointer backdrop-blur-md"
          >
            {t('hero.venueCta')}
          </button>
        </div>
      </div>

      {/* Elegant Scroll Down Indicator */}
      <button
        type="button"
        onClick={handleLittleScroll}
        aria-label="Scroll to explore invitation"
        className="relative z-20 mt-12 sm:mt-16 flex flex-col items-center gap-1 text-[var(--accent-gold)]/80 hover:text-[var(--accent-gold)] transition-colors cursor-pointer group"
      >
        <span className="text-[10px] font-cinzel tracking-[0.25em] uppercase opacity-75 group-hover:opacity-100">
          {t('hero.scrollToExplore')}
        </span>
        <ChevronDown className="w-5 h-5 animate-bounce text-[var(--accent-gold)]" />
      </button>
    </header>
  );
};

