import React, { useState, useEffect } from 'react';
import Confetti from 'react-confetti';
import { Calendar, MapPin, ChevronDown } from 'lucide-react';
import { sound } from '../utils/soundEngine';
import { ImperialCorner, WaxSealBadge, GoldDivider } from './Ornaments';
import { WeddingConfig } from '../types';
import { addToNativeCalendar } from '../utils/calendar';
import { useLanguage } from '../context/LanguageContext';

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
  const { isHindi, t } = useLanguage();
  // If previously opened, show opened card directly; otherwise start sealed
  const [stage, setStage] = useState<'closed' | 'unsealing' | 'opening' | 'revealed' | 'opened_card'>('closed');
  const [showConfetti, setShowConfetti] = useState(false);
  const [recycleConfetti, setRecycleConfetti] = useState(true);
  const [isDismissing, setIsDismissing] = useState(false);

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

    // If already visited, just close instantly without door animation
    if (hasOpenedBefore) {
      onOpened();
      return;
    }

    setIsDismissing(true);
    // Play a gentle magical chime for entering the site
    sound.playCelebrationChimes();
    
    // Wait for the grand zoom-through animation to complete
    setTimeout(() => {
      onOpened();
      setIsDismissing(false); // Reset state for future re-opens
    }, 1500);
  };

  const handleOpenEnvelope = () => {
    if (stage === 'revealed' || stage === 'opened_card' || stage !== 'closed') {
      return;
    }

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
      setShowConfetti(true);
      setRecycleConfetti(true);

      setTimeout(() => setRecycleConfetti(false), 4000);
      setTimeout(() => setShowConfetti(false), 10000);
    }, 1000);
  };

  const handleAddWeddingToCalendar = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToNativeCalendar({
      title: `${wedding.couple.groom.fullName} & ${wedding.couple.bride.fullName}'s Wedding`,
      description: `${wedding.couple.groom.fullName} & ${wedding.couple.bride.fullName} - ${wedding.venue.name}, ${wedding.venue.city}.`,
      location: `${wedding.venue.name}, ${wedding.venue.address}`,
      startDate: wedding.weddingDate,
      endDate: '2026-12-03T02:00:00',
    });
  };

  const handleOpenMap = (e: React.MouseEvent) => {
    e.stopPropagation();
    window.open(wedding.venue.googleMapsUrl, '_blank');
  };

  return (
    <div
      id="envelope-modal-overlay"
      className={`fixed inset-0 z-50 overflow-hidden ${
        isDismissing ? 'pointer-events-none' : ''
      }`}
    >
      {/* Left Royal Door */}
      <div 
        className={`absolute top-0 left-0 w-1/2 h-full bg-[var(--bg-card)] backdrop-blur-xl border-r-2 border-[var(--accent-gold)]/20 shadow-[10px_0_30px_rgba(0,0,0,0.5)] transition-transform duration-[1800ms] ease-[cubic-bezier(0.7,0,0.2,1)] ${
          isDismissing ? '-translate-x-full' : 'translate-x-0'
        } z-0`}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_right,rgba(212,175,55,0.12)_0%,transparent_60%)]" />
      </div>
      
      {/* Right Royal Door */}
      <div 
        className={`absolute top-0 right-0 w-1/2 h-full bg-[var(--bg-card)] backdrop-blur-xl border-l-2 border-[var(--accent-gold)]/20 shadow-[-10px_0_30px_rgba(0,0,0,0.5)] transition-transform duration-[1800ms] ease-[cubic-bezier(0.7,0,0.2,1)] ${
          isDismissing ? 'translate-x-full' : 'translate-x-0'
        } z-0`}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_left,rgba(212,175,55,0.12)_0%,transparent_60%)]" />
      </div>

      <div className={`relative z-10 w-full h-full overflow-y-auto flex flex-col items-center justify-center p-3 pt-14 pb-10 sm:p-6 transition-all duration-[1200ms] ease-in-out ${
        isDismissing ? 'opacity-0 scale-125 blur-md translate-y-8' : 'opacity-100 scale-100 blur-0 translate-y-0'
      }`}>
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-[100]">
          <Confetti 
            width={window.innerWidth}
            height={window.innerHeight}
            numberOfPieces={250}
            gravity={0.15}
            recycle={recycleConfetti}
            colors={['#ffb7c5', '#ff9eaa', '#ffc0cb', '#d4af37', '#eab308', '#ffffff']}
          />
        </div>
      )}
      {/* Ambient background light radial aura */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(26,18,64,0.75)_0%,rgba(10,7,28,0.96)_75%)] pointer-events-none" />

      {stage === 'opened_card' ? (
        /* ========================================================================= */
        /* DIRECT OPENED CARD VIEW (When accessed via "Card" tab or already opened)  */
        /* ========================================================================= */
        <div
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-sm sm:max-w-md my-auto translate-y-8 sm:translate-y-0 rounded-3xl p-4 sm:p-6 text-center select-none shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9),0_0_40px_rgba(212,175,55,0.25)] border-2 border-[var(--accent-gold)]/70 animate-scale-in"
          style={{
            background: 'linear-gradient(135deg, #fffcf5 0%, #fbedcb 45%, #ebd193 100%)',
            boxShadow: '0 25px 60px rgba(0,0,0,0.8), inset 0 0 40px rgba(212,175,55,0.2)',
          }}
        >
          {/* Ornate Gold Corners */}
          <ImperialCorner position="top-left" size={32} />
          <ImperialCorner position="top-right" size={32} />
          <ImperialCorner position="bottom-left" size={32} />
          <ImperialCorner position="bottom-right" size={32} />

          {/* Inner Decorative Double Border */}
          <div className="border border-[#aa7c11]/40 rounded-2xl p-3 sm:p-5 flex flex-col justify-between">
            {/* Auspicious Shloka */}
            <p className="font-hindi-heading text-[11px] sm:text-xs text-[#181044] tracking-normal font-bold mb-2">
              ॥ श्री गणेशाय नमः ॥
            </p>

            {/* Monogram Seal Badge */}
            <div className="flex justify-center my-1">
              <WaxSealBadge
                initials={wedding.couple.initials}
                size="sm"
              />
            </div>

            {/* Family Invocation */}
            <p className="font-script text-lg sm:text-2xl text-[#140b38] mt-0.5 mb-0.5 leading-tight font-semibold">
              {isHindi ? 'पाठक परिवार' : 'Pathak Family'}
            </p>
            <p className="text-[9px] sm:text-[11px] font-cinzel font-semibold tracking-[0.22em] text-[#634812] uppercase mb-1">
              {t('hero.cordiallyInvite')}
            </p>

            {/* Venue */}
            <div className="my-1 pt-1.5 pb-2">
              <h1 className="font-cinzel-dec text-2xl sm:text-3xl font-bold tracking-wider text-[#140b38] leading-normal pt-1 pb-0.5">
                {wedding.couple.groom.firstName}
              </h1>
              <div className="font-script text-xl sm:text-2xl text-[#9c7820] my-0.5 leading-normal py-0.5 font-bold">
                {t('common.weds')}
              </div>
              <h1 className="font-cinzel-dec text-2xl sm:text-3xl font-bold tracking-wider text-[#140b38] leading-normal pt-1 pb-0.5">
                {wedding.couple.bride.firstName}
              </h1>
            </div>

            <GoldDivider variant="lotus" className="w-full max-w-xs mx-auto my-1.5" />

            {/* Date and Time */}
            <div className="my-1.5 py-1.5 border-y border-[#aa7c11]/30">
              <div className="font-cinzel text-xs sm:text-sm font-bold text-[#181044] tracking-widest uppercase">
                {wedding.displayDate}
              </div>
              <div className="font-sans text-[11px] sm:text-xs text-[#32236e] font-medium mt-1">
                {t('envelope.baratTime')}
              </div>
            </div>

            {/* Venue Location */}
            <div className="my-2">
              <div className="font-cinzel text-xs sm:text-sm font-bold text-[#140b38] tracking-wide">
                {wedding.venue.name}
              </div>
              <div className="font-sans text-[11px] sm:text-xs text-[#41326c] mt-0.5">
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
                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-full bg-gradient-to-r from-[#181044] via-[#281b6e] to-[#181044] hover:from-[#20155a] hover:to-[#20155a] text-[#ffffff] border border-[var(--accent-gold)]/60 text-xs sm:text-sm font-cinzel font-bold tracking-wider uppercase transition-all shadow-md cursor-pointer whitespace-nowrap min-h-[42px]"
              >
                <Calendar className="w-4 h-4 text-[var(--accent-gold-light)] shrink-0" />
                <span className="leading-normal pt-1 pb-0.5 inline-block">{t('common.saveTheDate')}</span>
              </button>

              <button
                type="button"
                id="opened-card-map-btn"
                data-cursor="MAP"
                onClick={handleOpenMap}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-full bg-[var(--bg-card-elevated)]/10 border border-[#181044]/40 text-[#181044] hover:bg-[#181044]/15 text-xs sm:text-sm font-cinzel font-bold tracking-wider uppercase transition-all cursor-pointer whitespace-nowrap min-h-[42px]"
              >
                <MapPin className="w-4 h-4 text-[#181044] shrink-0" />
                <span className="leading-normal pt-1 pb-0.5 inline-block">{t('common.venueMap')}</span>
              </button>
            </div>

            {/* Single Close & View Website button */}
            <div className="mt-2.5 pt-2 border-t border-[#aa7c11]/25 flex items-center justify-center">
              <button
                type="button"
                id="opened-card-close-btn"
                onClick={handleDismiss}
                className="w-full py-2 px-5 rounded-full bg-gradient-to-r from-[#181044] via-[#281b6e] to-[#181044] hover:from-[#20155a] hover:to-[#20155a] text-[#ffffff] border border-[var(--accent-gold)]/50 hover:scale-102 transition-all font-cinzel text-[11px] sm:text-xs font-bold uppercase tracking-widest shadow-sm cursor-pointer"
              >
                {t('common.closeAndView')}
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
            className="relative w-full max-w-sm sm:max-w-md md:max-w-lg aspect-[1.1/1] sm:aspect-[1.3/1] perspective-1000 my-auto translate-y-12 sm:translate-y-0 px-2 sm:px-0"
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
                  : 'scale-105 sm:scale-108 translate-y-0 sm:-translate-y-4'
              }`}
              style={{
                background: 'linear-gradient(145deg, #1b1242 0%, #100a2b 60%, #09051c 100%)',
                boxShadow:
                  '0 25px 60px -15px rgba(0, 0, 0, 0.9), 0 0 40px rgba(212, 175, 55, 0.15), inset 0 1px 2px rgba(255, 255, 255, 0.15)',
                border: '1px solid rgba(212, 175, 55, 0.4)',
              }}
            >
              {/* Ornate Gold Corners */}
              <ImperialCorner position="top-left" size={34} />
              <ImperialCorner position="top-right" size={34} />
              <ImperialCorner position="bottom-left" size={34} />
              <ImperialCorner position="bottom-right" size={34} />

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
                      fill="#221654"
                      stroke="var(--accent-gold)"
                      strokeWidth="1.2"
                      strokeOpacity="0.4"
                    />
                    <polygon
                      points="20,0 380,0 200,175"
                      fill="#180f3d"
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
                    fill="#130c33"
                    stroke="var(--accent-gold)"
                    strokeWidth="0.8"
                    strokeOpacity="0.3"
                  />
                  <polygon
                    points="400,0 220,150 400,300"
                    fill="#130c33"
                    stroke="var(--accent-gold)"
                    strokeWidth="0.8"
                    strokeOpacity="0.3"
                  />
                  <polygon
                    points="0,300 200,160 400,300"
                    fill="#0c0724"
                    stroke="var(--accent-gold)"
                    strokeWidth="1"
                    strokeOpacity="0.4"
                  />
                </svg>
              </div>

              {/* Sliding Gold Card Content that emerges on tap */}
              <div
                id="sliding-gold-card"
                className={`absolute left-4 right-4 sm:left-8 sm:right-8 h-[92%] rounded-xl p-5 sm:p-6 transition-all duration-1000 ease-out flex flex-col items-center justify-between text-center ${
                  stage === 'revealed'
                    ? '-translate-y-10 sm:-translate-y-16 shadow-2xl opacity-100'
                    : stage === 'opening'
                    ? '-translate-y-5 sm:-translate-y-8 opacity-95'
                    : 'translate-y-2 opacity-0 pointer-events-none'
                }`}
                style={{
                  background: 'linear-gradient(135deg, #fffbf2 0%, #faecc8 45%, #f1d798 100%)',
                  border: '2px solid #aa7c11',
                  boxShadow: '0 20px 40px rgba(0,0,0,0.8)',
                }}
              >
                <div className={`text-[10px] ${isHindi ? 'font-hindi-heading tracking-normal normal-case' : 'font-sans tracking-[0.25em] uppercase font-bold'} text-[#181044]`}>
                  {t('envelope.royalInvitation')}
                </div>

                <div className="my-1">
                  <div className="font-cinzel-dec text-xl sm:text-2xl font-bold text-[#140b38] tracking-wider pt-2 pb-0.5 leading-normal">
                    {wedding.couple.groom.firstName} & {wedding.couple.bride.firstName}
                  </div>
                  <div className="font-script text-base text-[#6e5015] mt-0.5 py-0.5 font-semibold">
                    {t('envelope.areGettingMarried')}
                  </div>
                </div>

                <div className="text-xs font-cinzel font-semibold text-[#181044] tracking-widest border-y border-[#aa7c11]/40 py-1 px-4">
                  {wedding.displayDate}
                </div>

                <div className="text-[10px] font-sans font-semibold text-[#6e5015] uppercase tracking-wider">
                  {wedding.venue.name}
                </div>

                <div 
                  onClick={handleDismiss}
                  className="mt-2 flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#181044] via-[#281b6e] to-[#181044] text-[#ffffff] border border-[var(--accent-gold)]/60 text-xs sm:text-sm font-cinzel font-bold uppercase tracking-wider shadow-md hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] cursor-pointer hover:scale-105 transition-all"
                >
                  <ChevronDown className="w-3.5 h-3.5 opacity-0 shrink-0" />
                  <span className="leading-normal pt-0.5 pb-0.5 inline-block">{t('common.viewInvitation')}</span>
                  <ChevronDown className="w-3.5 h-3.5 text-[var(--accent-gold-light)] shrink-0" />
                </div>
              </div>

              {/* Center Wax Seal with Monogram & Call to Action (When closed) */}
              <div
                className={`absolute inset-0 flex flex-col items-center justify-center z-20 transition-all duration-500 ${
                  stage !== 'closed' ? 'opacity-0 scale-90 pointer-events-none' : 'opacity-100'
                }`}
              >
                <div className="text-center px-4 mb-2">
                  <p className="font-hindi-heading text-xs text-[#ffd700] tracking-normal font-bold mb-1 drop-shadow-md">
                    ॥ श्री गणेशाय नमः ॥
                  </p>
                  <p className="font-script text-2xl sm:text-3xl text-[#fdf8f6] tracking-wide font-medium drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
                    {t('hero.familyInvites')}
                  </p>
                </div>

                <div className="my-2">
                  <WaxSealBadge
                    initials={wedding.couple.initials}
                    size="lg"
                    isPulsing={true}
                  />
                </div>

                <div className="mt-3 flex items-center gap-2 px-5 py-2 rounded-full bg-black/60 border border-[#d4af37]/60 backdrop-blur-md shadow-lg animate-pulse">
                  <span className="w-2 h-2 rounded-full bg-[#ffd700] animate-ping" />
                  <span className="text-[11px] font-cinzel tracking-widest text-[#fdf8f6] uppercase font-bold">
                    {t('envelope.tapToOpen')}
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
              className="relative z-50 mt-8 flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full bg-gradient-to-r from-[#181044] via-[#281b6e] to-[#181044] text-[#ffffff] font-cinzel text-xs sm:text-sm font-bold tracking-widest uppercase border border-[var(--accent-gold)]/70 shadow-[0_10px_30px_rgba(24,17,69,0.7)] hover:shadow-[0_0_35px_rgba(212,175,55,0.7)] hover:scale-105 transition-all duration-300 cursor-pointer animate-bounce"
            >
              <ChevronDown className="w-4 h-4 opacity-0 shrink-0" />
              <span className="leading-normal pt-0.5 pb-0.5 inline-block">{t('common.exploreInvitation')}</span>
              <ChevronDown className="w-4 h-4 text-[var(--accent-gold-light)] shrink-0" />
            </button>
          )}
        </>
      )}
      </div>
    </div>
  );
};
