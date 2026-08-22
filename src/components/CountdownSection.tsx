import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Sparkles } from 'lucide-react';
import { WeddingConfig } from '../types';
import { addToNativeCalendar } from '../utils/calendar';
import { RoyalCorner, GoldDivider } from './Ornaments';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export const CountdownSection: React.FC<{ wedding: WeddingConfig }> = ({ wedding }) => {
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
      description: `Dubey & Pathak Family cordially invite you to celebrate the Royal Wedding of ${wedding.couple.groom.fullName} & ${wedding.couple.bride.fullName} at ${wedding.venue.name}, ${wedding.venue.city}, ${wedding.venue.state}.`,
      location: `${wedding.venue.name}, ${wedding.venue.address}`,
      startDate: wedding.weddingDate,
      endDate: '2026-12-03T02:00:00',
    });
  };

  return (
    <section className="py-20 px-4 max-w-5xl mx-auto text-center relative">
      <div className="mb-10">
        <p className="font-script text-2xl sm:text-3xl text-[var(--text-primary)]">
          Counting Down to Forever
        </p>
        <h2 className="font-cinzel text-3xl sm:text-4xl font-bold text-gold-gradient tracking-wider uppercase mt-1">
          The Auspicious Countdown
        </h2>
        <GoldDivider variant="lotus" className="max-w-xs mx-auto my-4" />
      </div>

      {/* Countdown Grid Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-6 max-w-3xl mx-auto">
        {[
          { label: 'Days', value: timeLeft.days },
          { label: 'Hours', value: timeLeft.hours },
          { label: 'Minutes', value: timeLeft.minutes },
          { label: 'Seconds', value: timeLeft.seconds },
        ].map((item, index) => (
          <div
            key={index}
            className="relative p-5 sm:p-7 rounded-2xl border border-[var(--accent-gold)]/35 bg-[var(--bg-card)]/80 backdrop-blur-md shadow-[0_12px_30px_rgba(0,0,0,0.6)] group hover:border-[var(--accent-gold)] transition-all duration-300"
          >
            <RoyalCorner position="top-left" />
            <RoyalCorner position="bottom-right" />

            <div className="font-cinzel-dec text-3xl sm:text-5xl font-bold text-gold-gradient tracking-tight">
              {String(item.value).padStart(2, '0')}
            </div>

            <div className="text-[11px] sm:text-xs font-cinzel font-semibold tracking-[0.25em] text-[var(--text-secondary)] uppercase mt-2 group-hover:text-[var(--accent-gold-light)] transition-colors">
              {item.label}
            </div>
          </div>
        ))}
      </div>

      {/* Single Native Calendar Button */}
      <div className="flex items-center justify-center mt-10">
        <button
          type="button"
          id="native-calendar-button"
          data-cursor="CALENDAR"
          onClick={handleAddWeddingToCalendar}
          className="flex items-center gap-2.5 px-8 py-3.5 rounded-full border border-[var(--accent-gold)]/70 bg-gradient-to-r from-[var(--brand-crimson-dark)] via-[var(--brand-crimson)] to-[var(--brand-crimson-dark)] text-[#ffffff] hover:shadow-[0_0_30px_rgba(212,175,55,0.6)] hover:scale-105 text-xs sm:text-sm font-cinzel font-bold tracking-widest uppercase transition-all duration-300 cursor-pointer shadow-[0_10px_25px_rgba(168,28,56,0.5)]"
        >
          <Calendar className="w-4 h-4 text-[var(--accent-gold-light)]" />
          Save the Date
        </button>
      </div>
    </section>
  );
};

