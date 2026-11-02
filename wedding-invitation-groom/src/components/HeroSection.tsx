import React from 'react';
import { ChevronDown, Calendar, MapPin } from 'lucide-react';
import { WeddingConfig } from '../types';
import { GoldDivider, MandalaBackground, WaxSealBadge, ImperialCorner } from './Ornaments';
import { useLanguage } from '../context/LanguageContext';

export const HeroSection: React.FC<{
  wedding: WeddingConfig;
  onOpenEnvelopeModal: () => void;
  onScrollToEvents: () => void;
  onScrollToVenue: () => void;
}> = ({ wedding, onOpenEnvelopeModal, onScrollToEvents, onScrollToVenue }) => {
  const { isHindi, t } = useLanguage();

  const handleLittleScroll = () => {
    window.scrollBy({ top: window.innerHeight * 0.4, behavior: 'smooth' });
  };

  return (
    <header className="relative min-h-[92vh] sm:min-h-screen flex flex-col items-center justify-center text-center px-4 pt-20 sm:pt-20 pb-12 overflow-hidden bg-[var(--bg-primary-dark)]">
      {/* Background Architectural & Palace Atmosphere */}
      <div
        className="hero-palace-bg absolute inset-0 bg-cover bg-center opacity-28 filter contrast-125 scale-105 transition-transform duration-10000 ease-out pointer-events-none"
      />
      
      {/* Soft Vignette & Radial Glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--bg-primary-dark)]/65 via-[var(--bg-secondary)]/45 to-[var(--bg-primary-dark)]/80 pointer-events-none" />

      {/* Traditional Rotating Mandala in background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-25 text-[var(--accent-gold)] animate-[spin_120s_linear_infinite] pointer-events-none">
        <MandalaBackground size={650} />
      </div>

      {/* Main Hero Card Container - Imperial Cartouche */}
      <div className="relative z-30 max-w-3xl w-full mx-auto flex flex-col items-center px-6 py-10 sm:py-14 rounded-3xl royal-midnight-card">
        <ImperialCorner position="top-left" size={42} />
        <ImperialCorner position="top-right" size={42} />
        <ImperialCorner position="bottom-left" size={42} />
        <ImperialCorner position="bottom-right" size={42} />

        {/* Auspicious Shloka top */}
        <p className="text-xs sm:text-sm font-hindi-heading text-[var(--accent-gold-light)] tracking-normal mt-1 mb-5 drop-shadow-md">
          ॥ श्री गणेशाय नमः ॥
        </p>

        {/* Monogram Seal Badge */}
        <div className="mb-6">
          <WaxSealBadge
            initials={wedding.couple.initials}
            size="sm"
            onClick={onOpenEnvelopeModal}
            className="hover:scale-110 shadow-[0_0_20px_rgba(212,175,55,0.4)]"
          />
        </div>

        {/* Introduction */}
        <p className="font-script text-2xl sm:text-3xl text-[var(--text-primary)] tracking-wide mb-2">
          {t('hero.familyInvites')}
        </p>

        <p className="text-[11px] sm:text-xs font-cinzel font-semibold tracking-[0.28em] text-[var(--accent-gold)] uppercase mb-6 opacity-90">
          {t('hero.cordiallyInvite')}
        </p>

        {/* Couple Names - The Crown of the Invitation */}
        <div className="my-2 space-y-1 sm:space-y-0">
          <h1 className="font-cinzel-dec text-4xl sm:text-6xl md:text-7xl font-bold tracking-wider text-gold-gradient drop-shadow-title pt-2 pb-1 inline-block leading-tight">
            {wedding.couple.groom.firstName}
          </h1>
          
          <div className="flex items-center justify-center my-1 sm:my-2">
            <span className="font-script text-3xl sm:text-4xl md:text-5xl text-[var(--accent-gold)] px-4 py-1">
              {t('common.weds')}
            </span>
          </div>

          <h1 className="font-cinzel-dec text-4xl sm:text-6xl md:text-7xl font-bold tracking-wider text-gold-gradient drop-shadow-title pt-1 pb-1 inline-block leading-tight">
            {wedding.couple.bride.firstName}
          </h1>
        </div>

        <GoldDivider variant="imperial" className="w-full max-w-sm my-3" />

        {/* Date & Venue Inscription Plaque */}
        <div className="hero-badge-plaque flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-6 mt-4 px-4 sm:px-6 py-2.5 sm:py-3 rounded-2xl bg-black/50 border border-[var(--accent-gold)]/50 backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.5)] max-w-full">
          <div className="flex items-center gap-2 text-[var(--text-primary)] shrink-0">
            <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[var(--accent-gold)] shrink-0" />
            <span className="font-cinzel text-xs sm:text-sm font-semibold tracking-wider whitespace-nowrap">
              {wedding.displayDate}
            </span>
          </div>

          <div className="hidden sm:block w-1.5 h-1.5 rotate-45 bg-[var(--accent-gold)]/60 shrink-0" />

          <a 
            href={wedding.venue.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-1.5 sm:gap-2 text-[var(--text-primary)] hover:text-[var(--accent-gold-light)] transition-colors cursor-pointer group shrink-0"
          >
            <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[var(--accent-gold)] group-hover:scale-110 transition-transform shrink-0" />
            <span className="font-cinzel text-[11px] sm:text-sm font-semibold tracking-wider whitespace-nowrap">
              {wedding.venue.name}, {wedding.venue.city}
            </span>
          </a>
        </div>

        {/* Quick Action Buttons - Equal Height & Balanced */}
        <div className="flex items-stretch justify-center gap-3 sm:gap-4 mt-6 w-full max-w-sm sm:max-w-md px-1">
          <button
            type="button"
            id="hero-events-cta"
            data-cursor="EVENTS"
            onClick={handleLittleScroll}
            className="royal-gold-btn flex-1 flex items-center justify-center px-3 sm:px-6 py-2.5 sm:py-3 rounded-xl font-cinzel text-xs sm:text-sm font-bold tracking-wider uppercase cursor-pointer border border-[var(--accent-gold)] min-h-[46px] sm:min-h-[50px] text-center"
          >
            <span className="leading-tight">{t('hero.eventsCta')}</span>
          </button>

          <button
            type="button"
            id="hero-venue-cta"
            data-cursor="VENUE"
            onClick={handleLittleScroll}
            className="royal-secondary-btn flex-1 flex items-center justify-center px-3 sm:px-6 py-2.5 sm:py-3 rounded-xl font-cinzel text-xs sm:text-sm font-semibold tracking-wider uppercase cursor-pointer min-h-[46px] sm:min-h-[50px] text-center"
          >
            <span className="leading-tight">{t('hero.venueCta')}</span>
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

