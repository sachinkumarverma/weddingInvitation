import React, { useState, useEffect } from 'react';
import { Mail, Calendar, MapPin } from 'lucide-react';
import { weddingData } from './data/weddingData';
import { FloatingParticles } from './components/FloatingParticles';
import { CustomCursor } from './components/CustomCursor';
import { MusicPlayer } from './components/MusicPlayer';
import { EnvelopeModal } from './components/EnvelopeModal';
import { HeroSection } from './components/HeroSection';
import { ScratchRevealCard } from './components/ScratchRevealCard';
import { CountdownSection } from './components/CountdownSection';
import { CoupleSection } from './components/CoupleSection';
import { EventsSection } from './components/EventsSection';
import { GallerySection } from './components/GallerySection';
import { VenueSection } from './components/VenueSection';
import { FamilySection } from './components/FamilySection';
import { ShareSection } from './components/ShareSection';
import { FinalSection } from './components/FinalSection';
import { EasterEggModal } from './components/EasterEggs';
import { ThemeSwitcher } from './components/ThemeSwitcher';
import { useSecurity } from './utils/useSecurity';

export default function App() {
  useSecurity();
  const [isEnvelopeOpen, setIsEnvelopeOpen] = useState(true);
  const [hasOpenedBefore, setHasOpenedBefore] = useState(false);
  const [isEasterEggOpen, setIsEasterEggOpen] = useState(false);
  const [activeNavTab, setActiveNavTab] = useState<'events' | 'venue' | 'card'>('events');
  const [theme, setTheme] = useState<'default' | 'pink' | 'midnight'>('default');

  useEffect(() => {
    if (isEnvelopeOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isEnvelopeOpen]);

  const handleEnvelopeOpened = () => {
    setIsEnvelopeOpen(false);
    setHasOpenedBefore(true);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const handleReopenEnvelope = () => {
    setActiveNavTab('card');
    setIsEnvelopeOpen(true);
  };

  const scrollToSection = (sectionId: string, tabName?: 'events' | 'venue') => {
    if (tabName) setActiveNavTab(tabName);
    if (isEnvelopeOpen) {
      setIsEnvelopeOpen(false);
      setHasOpenedBefore(true);
    }
    setTimeout(() => {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 60);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div
      className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-secondary)] font-sans-clean relative overflow-x-hidden selection:bg-[var(--accent-gold)]/30 selection:text-[#ffffff]"
    >
      {/* Theme Switcher (Top Left) */}
      <ThemeSwitcher theme={theme} setTheme={setTheme} />

      {/* Desktop Luxury Follow Cursor */}
      <CustomCursor />

      {/* Floating Golden Dust, Rose Petals, or Midnight Stars depending on theme */}
      <FloatingParticles count={24} theme={theme} />

      {/* Ambient Music Player */}
      <MusicPlayer autoStartPrompt={hasOpenedBefore} />

      {/* The 3D Royal Physical Envelope & Opened Card Experience */}
      <EnvelopeModal
        wedding={weddingData}
        isOpen={isEnvelopeOpen}
        hasOpenedBefore={hasOpenedBefore}
        onOpened={handleEnvelopeOpened}
      />

      {/* Main Wedding Invitation Website Content */}
      <main className="relative z-20">
        {/* 1. Hero Section */}
        <HeroSection
          wedding={weddingData}
          onOpenEnvelopeModal={handleReopenEnvelope}
          onScrollToEvents={() => scrollToSection('events-section', 'events')}
          onScrollToVenue={() => scrollToSection('venue-section', 'venue')}
        />

        {/* --- DYNAMIC BACKGROUND WRAPPER FOR SECTIONS 2-10 --- */}
        {/* This ensures the palace background starts exactly after the Hero Section ends */}
        <div 
          className="relative bg-[length:100%_auto] bg-repeat-y transition-all duration-1000" 
          style={{ backgroundImage: 'var(--bg-image, none)' }}
        >
          {/* 2. Interactive Scratch-to-Reveal Gold Card */}
          <ScratchRevealCard wedding={weddingData} />

        {/* 3. Live Auspicious Countdown Section with Native Add-to-Calendar */}
        <CountdownSection wedding={weddingData} />

        {/* 4. Split-Screen Couple Showcase */}
        <CoupleSection wedding={weddingData} />

        {/* 5. Wedding Events & Ceremonies Itinerary */}
        <EventsSection wedding={weddingData} />

        {/* 6. Editorial Photo Gallery with Lightbox */}
        <GallerySection wedding={weddingData} />

        {/* 7. Venue & Location Showcase (Jaiswal Marriage Garden, Bhopal) */}
        <VenueSection wedding={weddingData} />

        {/* 8. Sacred Vedic Family Blessings (Dubey & Pathak Families) */}
        <FamilySection wedding={weddingData} />

        {/* 9. Social Sharing & WhatsApp Invite Generator */}
        <ShareSection wedding={weddingData} />

        {/* 10. Emotional Climax & Closing */}
          <FinalSection
            wedding={weddingData}
            onScrollToTop={scrollToTop}
          />
        </div>
      </main>

      {/* Mobile Sticky Quick Navigation Bar */}
      <div className="sm:hidden fixed bottom-4 left-4 right-4 z-40 flex items-center justify-around p-1.5 rounded-full bg-[var(--bg-card-elevated)]/95 border border-[var(--accent-gold)]/50 backdrop-blur-xl shadow-[0_10px_35px_rgba(0,0,0,0.9)]">
        <button
          type="button"
          onClick={() => scrollToSection('events-section', 'events')}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-full font-cinzel text-xs uppercase tracking-wider transition-all cursor-pointer ${
            activeNavTab === 'events' && !isEnvelopeOpen
              ? 'bg-gradient-to-r from-[var(--brand-crimson-dark)] to-[var(--brand-crimson)] text-white font-bold shadow-md border border-[var(--accent-gold)]/60'
              : 'text-[var(--text-secondary)] hover:text-[var(--accent-gold-light)]'
          }`}
        >
          <Calendar className="w-3.5 h-3.5 text-[var(--accent-gold-light)]" />
          <span>Events</span>
        </button>

        <button
          type="button"
          onClick={() => scrollToSection('venue-section', 'venue')}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-full font-cinzel text-xs uppercase tracking-wider transition-all cursor-pointer ${
            activeNavTab === 'venue' && !isEnvelopeOpen
              ? 'bg-gradient-to-r from-[var(--brand-crimson-dark)] to-[var(--brand-crimson)] text-white font-bold shadow-md border border-[var(--accent-gold)]/60'
              : 'text-[var(--text-secondary)] hover:text-[var(--accent-gold-light)]'
          }`}
        >
          <MapPin className="w-3.5 h-3.5 text-[var(--accent-gold-light)]" />
          <span>Venue Map</span>
        </button>

        <button
          type="button"
          onClick={handleReopenEnvelope}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-full font-cinzel text-xs uppercase tracking-wider transition-all cursor-pointer ${
            activeNavTab === 'card' || isEnvelopeOpen
              ? 'bg-gradient-to-r from-[var(--brand-crimson-dark)] to-[var(--brand-crimson)] text-white font-bold shadow-md border border-[var(--accent-gold)]/60'
              : 'text-[var(--text-secondary)] hover:text-[var(--accent-gold-light)]'
          }`}
        >
          <Mail className="w-3.5 h-3.5 text-[var(--accent-gold-light)]" />
          <span>Card</span>
        </button>
      </div>

      {/* Secret Monogram Easter Egg Modal */}
      <EasterEggModal
        isOpen={isEasterEggOpen}
        onClose={() => setIsEasterEggOpen(false)}
      />
    </div>
  );
}

