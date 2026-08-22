import React from 'react';
import { WeddingConfig } from '../types';
import { RoyalCorner, GoldDivider } from './Ornaments';

export const FamilySection: React.FC<{ wedding: WeddingConfig }> = ({ wedding }) => {
  const { familyBlessings } = wedding;

  return (
    <section className="py-20 px-4 max-w-5xl mx-auto relative text-center">
      <div className="mb-12">
        <p className="font-script text-2xl sm:text-3xl text-[var(--text-primary)]">
          Rooted in Heritage & Lineage
        </p>
        <h2 className="font-cinzel text-3xl sm:text-4xl font-bold text-gold-gradient tracking-wider uppercase mt-1">
          With Sacred Blessings
        </h2>
        <GoldDivider variant="lotus" className="max-w-xs mx-auto my-4" />
      </div>

      {/* Sanskrit Shloka Blessing Card */}
      <div className="relative rounded-3xl p-8 sm:p-12 bg-[var(--bg-card)]/85 border border-[var(--accent-gold)]/40 backdrop-blur-md shadow-2xl mb-12">
        <RoyalCorner position="top-left" />
        <RoyalCorner position="top-right" />
        <RoyalCorner position="bottom-left" />
        <RoyalCorner position="bottom-right" />

        <div className="max-w-2xl mx-auto">
          <p className="font-serif-luxury text-lg sm:text-2xl text-[var(--accent-gold-light)] tracking-wide leading-relaxed font-semibold">
            {familyBlessings.shlokaSanskrit}
          </p>

          <div className="h-[1px] w-24 bg-[var(--accent-gold)]/40 mx-auto my-4" />

          <p className="text-xs sm:text-sm font-sans text-[var(--text-secondary)] italic">
            "{familyBlessings.shlokaEnglish}"
          </p>
        </div>
      </div>

      {/* Families Lineage Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
        {familyBlessings.patrons.map((patron, idx) => (
          <div
            key={idx}
            className="relative p-6 sm:p-8 rounded-2xl bg-[#1c0810]/80 border border-[var(--accent-gold)]/30 shadow-lg"
          >
            <RoyalCorner position="top-left" />
            <RoyalCorner position="bottom-right" />

            <h3 className="font-cinzel text-xl font-bold text-gold-gradient tracking-wide mb-4 pb-2 border-b border-[var(--accent-gold)]/20">
              {patron.family}
            </h3>

            <ul className="space-y-2.5">
              {patron.members.map((member, mIdx) => (
                <li key={mIdx} className="flex items-center gap-2 text-xs sm:text-sm font-sans text-[var(--text-secondary)]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-gold)]" />
                  <span>{member}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
};
