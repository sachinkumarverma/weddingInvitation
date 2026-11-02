import React, { useState, useEffect } from 'react';
import { Calendar } from 'lucide-react';
import { WeddingConfig } from '../types';
import { addToNativeCalendar } from '../utils/calendar';
import { GoldDivider } from './Ornaments';
import { useLanguage } from '../context/LanguageContext';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export const CountdownSection: React.FC<{ wedding: WeddingConfig }> = ({ wedding }) => {
  const { t } = useLanguage();
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const target = new Date(wedding.weddingDate).getTime();

    const calculate = () => {
      const now = new Date().getTime();
      const difference = target - now;

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    };

    calculate();
    const interval = setInterval(calculate, 1000);
    return () => clearInterval(interval);
  }, [wedding.weddingDate]);

  const handleAddWeddingToCalendar = () => {
    addToNativeCalendar({
      title: `${wedding.couple.groom.fullName} & ${wedding.couple.bride.fullName}'s Royal Wedding`,
      description: `Pathak Family cordially invite you to celebrate the Royal Wedding of ${wedding.couple.groom.fullName} & ${wedding.couple.bride.fullName} at ${wedding.venue.name}, ${wedding.venue.city}, ${wedding.venue.state}.`,
      location: `${wedding.venue.name}, ${wedding.venue.address}`,
      startDate: wedding.weddingDate,
      endDate: '2026-12-03T02:00:00',
    });
  };

  return (
    <section className="py-12 px-4 max-w-5xl mx-auto text-center relative">
      <div className="mb-10">
        <p className="font-script text-2xl sm:text-3xl text-[var(--text-primary)] py-0.5">
          {t('countdown.subtitle')}
        </p>
        <h2 className="font-cinzel text-3xl sm:text-4xl font-bold text-gold-gradient tracking-wider uppercase mt-1 pt-2 pb-1 inline-block leading-snug">
          {t('countdown.title')}
        </h2>
        <GoldDivider variant="imperial" className="max-w-xs mx-auto my-4" />
      </div>

      {/* Celestial Royal Chronometer Dials */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 max-w-3xl mx-auto">
        {[
          { label: t('countdown.days'), value: timeLeft.days },
          { label: t('countdown.hours'), value: timeLeft.hours },
          { label: t('countdown.minutes'), value: timeLeft.minutes },
          { label: t('countdown.seconds'), value: timeLeft.seconds },
        ].map((item, index) => (
          <div
            key={index}
            className="countdown-dial relative w-32 h-32 sm:w-36 sm:h-36 mx-auto rounded-full border-2 border-[var(--accent-gold)]/60 bg-gradient-to-b from-[#181145] to-[#0a071c] shadow-[0_12px_35px_rgba(0,0,0,0.8),inset_0_0_20px_rgba(212,175,55,0.2)] flex flex-col items-center justify-center group hover:scale-105 hover:border-[var(--accent-gold)] transition-all duration-300 ring-1 ring-[var(--accent-gold)]/30 ring-offset-4 ring-offset-[#0a071c]"
          >
            {/* Inner dashed ring */}
            <div className="absolute inset-1.5 rounded-full border border-[var(--accent-gold)]/30 border-dashed pointer-events-none" />

            <div className="font-cinzel-dec text-3xl sm:text-4xl font-bold text-gold-gradient tracking-tight drop-shadow-md">
              {String(item.value).padStart(2, '0')}
            </div>

            <div className="countdown-label text-[10px] sm:text-xs font-cinzel font-bold tracking-[0.2em] text-[var(--accent-gold-light)] uppercase mt-1 group-hover:text-white transition-colors">
              {item.label}
            </div>
          </div>
        ))}
      </div>

      {/* Single Native Calendar Button */}
      <div className="flex items-center justify-center mt-12">
        <button
          type="button"
          id="native-calendar-button"
          data-cursor="CALENDAR"
          onClick={handleAddWeddingToCalendar}
          className="royal-gold-btn flex items-center justify-center gap-2.5 px-8 py-3 rounded-xl border border-[var(--accent-gold)] text-xs sm:text-sm font-cinzel font-bold tracking-widest uppercase transition-all duration-300 cursor-pointer shadow-[0_10px_25px_rgba(0,0,0,0.5)]"
        >
          <Calendar className="w-4 h-4 text-[#080616] shrink-0" />
          <span className="leading-normal pt-0.5">{t('common.saveTheDate')}</span>
        </button>
      </div>
    </section>
  );
};

