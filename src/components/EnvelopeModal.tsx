import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Calendar, MapPin, ChevronDown } from 'lucide-react';
import { sound } from '../utils/soundEngine';
import { RoyalCorner, WaxSealBadge, GoldDivider } from './Ornaments';
import { WeddingConfig } from '../types';
import { addToNativeCalendar } from '../utils/calendar';

interface EnvelopeModalProps {
  wedding: WeddingConfig;
  isOpen: boolean;
  hasOpenedBefore?: boolean;
  onOpened: () => void;
}

export const EnvelopeModal: React.FC<EnvelopeModalProps> = ({
  wedding,
  isOpen,
  hasOpenedBefore = false,
  onOpened,
}) => {
  // If previously opened, show opened card directly; otherwise start sealed
  const [stage, setStage] = useState<'closed' | 'unsealing' | 'opening' | 'revealed' | 'opened_card'>('closed');

  useEffect(() => {
    if (isOpen) {
      if (hasOpenedBefore) {
        setStage('opened_card');
      } else {
        setStage('closed');
      }
    }
  }, [isOpen, hasOpenedBefore]);

  if (!isOpen) return null;

  const handleDismiss = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    onOpened();
  };

  const handleOpenEnvelope = () => {
    if (stage === 'revealed' || stage === 'opened_card') {
      onOpened();
      return;
    }
    if (stage !== 'closed') return;

    // 1. Play wax crack sound & start music
    sound.playWaxSealSnap();
    sound.startAmbientMelody();
    setStage('unsealing');

    // 2. Play paper open sound
    setTimeout(() => {
      sound.playEnvelopeOpen();
      setStage('opening');
    }, 450);

    // 3. Trigger confetti burst and set to revealed
    setTimeout(() => {
      setStage('revealed');
      confetti({
        particleCount: 75,
        spread: 85,
        origin: { y: 0.6 },
        colors: ['var(--accent-gold)', 'var(--accent-gold-light)', 'var(--brand-crimson)', 'var(--text-primary)', '#ffffff'],
        shapes: ['circle'],
        scalar: 1.1,
      });
    }, 1000);
  };

  const handleAddWeddingToCalendar = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToNativeCalendar({
      title: `Satyam & Harshita's Wedding`,
      description: `Dubey & Pathak Family cordially invite you to celebrate the wedding ceremony of Satyam & Harshita at ${wedding.venue.name}, ${wedding.venue.city}.`,
      location: `${wedding.venue.name}, ${wedding.venue.address}`,
      startDate: wedding.weddingDate,
      endDate: '2026-12-03T02:00:00',
    });
  };

  const handleOpenMap = (e: React.MouseEvent) => {
    e.stopPropagation();
    window.open(wedding.venue.mapUrl, '_blank');
  };

  return (
    <div
      id="envelope-modal-overlay"
      onClick={() => {
        if (stage === 'revealed' || stage === 'opened_card') {
          onOpened();
        }
      }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[var(--bg-card)] backdrop-blur-xl p-3 sm:p-6 transition-opacity duration-500 overflow-y-auto"
    >
      {/* Ambient background light radial aura */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(168,28,56,0.38)_0%,rgba(15,7,9,0.96)_75%)] pointer-events-none" />

      {stage === 'opened_card' ? (
        /* ========================================================================= */
        /* DIRECT OPENED CARD VIEW (When accessed via "Card" tab or already opened)  */
        /* ========================================================================= */
        <div
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-sm sm:max-w-md my-auto rounded-3xl p-5 sm:p-7 text-center select-none shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9),0_0_40px_rgba(212,175,55,0.25)] border-2 border-[var(--accent-gold)]/70 animate-scale-in"
          style={{
            background: 'linear-gradient(135deg, #fffcf5 0%, #fbedcb 45%, #ebd193 100%)',
            boxShadow: '0 25px 60px rgba(0,0,0,0.8), inset 0 0 40px rgba(212,175,55,0.2)',
          }}
        >
          {/* Ornate Gold Corners */}
          <RoyalCorner position="top-left" color="var(--brand-crimson-dark)" />
          <RoyalCorner position="top-right" color="var(--brand-crimson-dark)" />
          <RoyalCorner position="bottom-left" color="var(--brand-crimson-dark)" />
          <RoyalCorner position="bottom-right" color="var(--brand-crimson-dark)" />

          {/* Inner Decorative Double Border */}
          <div className="border border-[#aa7c11]/40 rounded-2xl p-4 sm:p-6 flex flex-col justify-between">
            {/* Auspicious Shloka */}
            <p className="font-serif-luxury text-[11px] sm:text-xs text-[var(--brand-crimson-dark)] tracking-widest uppercase font-bold mb-2">
              ॥ श्री गणेशाय नमः ॥
            </p>

            {/* Monogram Seal Badge */}
            <div className="flex justify-center my-1.5">
              <WaxSealBadge
                initials={wedding.couple.initials}
                city={wedding.venue.city}
                size="sm"
              />
            </div>

            {/* Family Invocation */}
            <p className="font-script text-xl sm:text-2xl text-[var(--brand-crimson-dark)] mt-1.5 mb-1 leading-tight">
              Dubey & Pathak Family
            </p>
            <p className="text-[10px] sm:text-[11px] font-cinzel font-semibold tracking-[0.22em] text-[#6b1424] uppercase mb-3">
              Cordially invite you to celebrate the wedding of
            </p>

            {/* Couple Names */}
            <div className="my-2 py-1">
              <h1 className="font-cinzel-dec text-2xl sm:text-3xl font-bold tracking-wider text-[#3d0813] leading-none">
                SATYAM
              </h1>
              <div className="font-script text-2xl text-[var(--brand-crimson)] my-1 leading-tight">
                weds
              </div>
              <h1 className="font-cinzel-dec text-2xl sm:text-3xl font-bold tracking-wider text-[#3d0813] leading-none">
                HARSHITA
              </h1>
            </div>

            <GoldDivider variant="lotus" className="w-full max-w-xs mx-auto my-2.5" />

            {/* Date and Time */}
            <div className="my-2 py-2 border-y border-[#aa7c11]/30">
              <div className="font-cinzel text-xs sm:text-sm font-bold text-[var(--brand-crimson-dark)] tracking-widest uppercase">
                Wednesday • 02 December 2026
              </div>
              <div className="font-sans text-[11px] sm:text-xs text-[#6b1424] font-medium mt-1">
                Barat & Varmala: 07:00 PM Onwards
              </div>
            </div>

            {/* Venue Location */}
            <div className="my-2">
              <div className="font-cinzel text-xs sm:text-sm font-bold text-[#3d0813] tracking-wide">
                {wedding.venue.name}
              </div>
              <div className="font-sans text-[11px] sm:text-xs text-[#70303b] mt-0.5">
                {wedding.venue.address}
              </div>
            </div>

            {/* Action Buttons inside Card in a clean single line */}
            <div className="flex flex-row items-center justify-center gap-2.5 mt-4 w-full">
              <button
                type="button"
                id="opened-card-calendar-btn"
                data-cursor="CALENDAR"
                onClick={handleAddWeddingToCalendar}
                className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-full bg-[var(--brand-crimson-dark)] text-[#ffffff] hover:bg-[var(--brand-crimson)] text-xs font-cinzel font-bold tracking-wider uppercase transition-all shadow-md cursor-pointer whitespace-nowrap"
              >
                <Calendar className="w-3.5 h-3.5 text-[var(--accent-gold-light)] shrink-0" />
                <span>Save the Date</span>
              </button>

              <button
                type="button"
                id="opened-card-map-btn"
                data-cursor="MAP"
                onClick={handleOpenMap}
                className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-full bg-[var(--bg-card-elevated)]/10 border border-[var(--brand-crimson-dark)]/40 text-[var(--brand-crimson-dark)] hover:bg-[var(--brand-crimson-dark)]/20 text-xs font-cinzel font-bold tracking-wider uppercase transition-all cursor-pointer whitespace-nowrap"
              >
                <MapPin className="w-3.5 h-3.5 text-[var(--brand-crimson-dark)] shrink-0" />
                <span>Venue Map</span>
              </button>
            </div>

            {/* Single Close & View Website button */}
            <div className="mt-3.5 pt-2.5 border-t border-[#aa7c11]/25 flex items-center justify-center">
              <button
                type="button"
                id="opened-card-close-btn"
                onClick={handleDismiss}
                className="w-full py-2.5 px-5 rounded-full bg-gradient-to-r from-[var(--brand-crimson-dark)] via-[var(--brand-crimson)] to-[var(--brand-crimson-dark)] text-[#ffffff] hover:scale-102 transition-all font-cinzel text-xs font-bold uppercase tracking-widest shadow-sm cursor-pointer"
              >
                Close & View Website
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* ========================================================================= */
        /* 3D WAX SEALED ENVELOPE (For initial visit)                                */
        /* ========================================================================= */
        <>
          <div
            className="relative w-full max-w-sm sm:max-w-md md:max-w-lg aspect-[4/3] sm:aspect-[1.3/1] perspective-1000 my-auto"
            onClick={(e) => {
              e.stopPropagation();
              handleOpenEnvelope();
            }}
          >
            <div
              id="royal-envelope-wrapper"
              className={`relative w-full h-full rounded-2xl cursor-pointer transition-all duration-700 select-none ${
                stage === 'closed'
                  ? 'animate-gentle-float hover:scale-102'
                  : stage === 'unsealing'
                  ? 'scale-105'
                  : 'scale-108 -translate-y-4'
              }`}
              style={{
                background: 'linear-gradient(145deg, #2b0b14 0%, #1a050b 60%, #120307 100%)',
                boxShadow:
                  '0 25px 60px -15px rgba(0, 0, 0, 0.9), 0 0 40px rgba(212, 175, 55, 0.15), inset 0 1px 2px rgba(255, 255, 255, 0.15)',
                border: '1px solid rgba(212, 175, 55, 0.4)',
              }}
            >
              {/* Ornate Gold Corners */}
              <RoyalCorner position="top-left" />
              <RoyalCorner position="top-right" />
              <RoyalCorner position="bottom-left" />
              <RoyalCorner position="bottom-right" />

              {/* Envelope Flap Creases */}
              <div className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none">
                {/* Top Flap SVG */}
                <div
                  className={`absolute top-0 left-0 right-0 h-1/2 origin-top transition-transform duration-700 ease-in-out ${
                    stage === 'opening' || stage === 'revealed' ? '-rotate-x-180 opacity-40' : 'rotate-x-0'
                  }`}
                >
                  <svg viewBox="0 0 400 200" preserveAspectRatio="none" className="w-full h-full">
                    <polygon
                      points="0,0 400,0 200,195"
                      fill="#380e1b"
                      stroke="var(--accent-gold)"
                      strokeWidth="1.2"
                      strokeOpacity="0.4"
                    />
                    <polygon
                      points="20,0 380,0 200,175"
                      fill="#2a0913"
                      opacity="0.85"
                    />
                  </svg>
                </div>

                {/* Left & Right Envelope Folds */}
                <svg
                  viewBox="0 0 400 300"
                  preserveAspectRatio="none"
                  className="w-full h-full absolute inset-0 opacity-40"
                >
                  <polygon
                    points="0,0 180,150 0,300"
                    fill="#20060e"
                    stroke="var(--accent-gold)"
                    strokeWidth="0.8"
                    strokeOpacity="0.3"
                  />
                  <polygon
                    points="400,0 220,150 400,300"
                    fill="#20060e"
                    stroke="var(--accent-gold)"
                    strokeWidth="0.8"
                    strokeOpacity="0.3"
                  />
                  <polygon
                    points="0,300 200,160 400,300"
                    fill="#1b040b"
                    stroke="var(--accent-gold)"
                    strokeWidth="1"
                    strokeOpacity="0.4"
                  />
                </svg>
              </div>

              {/* Sliding Gold Card Content that emerges on tap */}
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  onOpened();
                }}
                className={`absolute left-4 right-4 sm:left-8 sm:right-8 h-[92%] rounded-xl p-5 sm:p-6 transition-all duration-1000 ease-out flex flex-col items-center justify-between text-center cursor-pointer ${
                  stage === 'revealed'
                    ? '-translate-y-24 shadow-2xl opacity-100'
                    : stage === 'opening'
                    ? '-translate-y-12 opacity-95'
                    : 'translate-y-2 opacity-0 pointer-events-none'
                }`}
                style={{
                  background: 'linear-gradient(135deg, #fffbf2 0%, #faecc8 45%, #f1d798 100%)',
                  border: '2px solid #aa7c11',
                  boxShadow: '0 20px 40px rgba(0,0,0,0.8)',
                }}
              >
                <div className="text-[10px] font-sans tracking-[0.25em] text-[var(--brand-crimson-dark)] uppercase font-bold">
                  Royal Wedding Invitation
                </div>

                <div className="my-1">
                  <div className="font-cinzel-dec text-xl sm:text-2xl font-bold text-[#440915] tracking-wider">
                    Satyam & Harshita
                  </div>
                  <div className="font-script text-base text-[#7c2d12] mt-0.5">
                    are getting married
                  </div>
                </div>

                <div className="text-xs font-cinzel font-semibold text-[#66101f] tracking-widest border-y border-[#aa7c11]/40 py-1 px-4">
                  {wedding.displayDate}
                </div>

                <div className="text-[10px] font-sans font-semibold text-[#7c2d12] uppercase tracking-wider">
                  {wedding.venue.name} • {wedding.venue.city}
                </div>

                <div className="mt-1 flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--brand-crimson-dark)] text-[#ffffff] text-[10px] font-cinzel font-bold uppercase tracking-wider shadow-sm animate-pulse">
                  <span>Click to Enter Website</span>
                  <ChevronDown className="w-3 h-3 text-[var(--accent-gold-light)]" />
                </div>
              </div>

              {/* Center Wax Seal with Monogram & Call to Action (When closed) */}
              <div
                className={`absolute inset-0 flex flex-col items-center justify-center z-20 transition-all duration-500 ${
                  stage !== 'closed' ? 'opacity-0 scale-90 pointer-events-none' : 'opacity-100'
                }`}
              >
                <div className="text-center px-4 mb-2">
                  <p className="font-serif-luxury text-xs text-[var(--accent-gold-light)] tracking-widest uppercase mb-1">
                    ॥ श्री गणेशाय नमः ॥
                  </p>
                  <p className="font-script text-xl sm:text-2xl text-[var(--text-primary)] drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                    Dubey & Pathak Family
                  </p>
                </div>

                <div className="my-2">
                  <WaxSealBadge
                    initials={wedding.couple.initials}
                    city={wedding.venue.city}
                    size="lg"
                    isPulsing={true}
                  />
                </div>

                <div className="mt-3 flex items-center gap-2 px-5 py-2 rounded-full bg-[var(--bg-card)] border border-[var(--accent-gold)]/40 backdrop-blur-md shadow-lg animate-pulse">
                  <span className="w-2 h-2 rounded-full bg-[var(--accent-gold)] animate-ping" />
                  <span className="text-[11px] font-cinzel tracking-widest text-[var(--text-secondary)] uppercase font-bold">
                    Tap to open invitation
                  </span>
                </div>
              </div>
            </div>

            {/* Envelope Base Shadow */}
            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-[85%] h-8 bg-black/70 rounded-full blur-xl pointer-events-none" />
          </div>

          {/* Call to action dismiss button when card is revealed */}
          {stage === 'revealed' && (
            <button
              type="button"
              onClick={handleDismiss}
              className="relative z-50 mt-8 flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-gradient-to-r from-[var(--brand-crimson-dark)] via-[var(--brand-crimson)] to-[var(--brand-crimson-dark)] text-[#ffffff] font-cinzel text-xs sm:text-sm font-bold tracking-widest uppercase border border-[var(--accent-gold)]/70 shadow-[0_10px_30px_rgba(168,28,56,0.6)] hover:shadow-[0_0_35px_rgba(212,175,55,0.7)] hover:scale-105 transition-all duration-300 cursor-pointer animate-bounce"
            >
              <span>Explore Wedding Invitation</span>
              <ChevronDown className="w-4 h-4 text-[var(--accent-gold-light)]" />
            </button>
          )}
        </>
      )}
    </div>
  );
};
