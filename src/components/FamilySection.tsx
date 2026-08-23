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
      <div className="relative rounded-3xl p-8 sm:p-12 border border-[var(--accent-gold)]/40 shadow-2xl mb-12 min-h-[400px] flex items-center justify-center overflow-hidden bg-[var(--bg-card)]/90 backdrop-blur-md">
        
        {/* Ganesh Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-no-repeat opacity-25 pointer-events-none"
          style={{ backgroundImage: 'url(/ganeshji.png)', backgroundPosition: 'center 20%' }}
        />

        <RoyalCorner position="top-left" />
        <RoyalCorner position="top-right" />
        <RoyalCorner position="bottom-left" />
        <RoyalCorner position="bottom-right" />

        <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center text-center mt-32">
          <p className="font-serif-luxury text-[14px] sm:text-2xl text-[var(--accent-gold-light)] tracking-tight sm:tracking-wide leading-loose sm:leading-relaxed font-semibold whitespace-pre sm:whitespace-pre-line drop-shadow-md px-0 w-full overflow-x-visible">
            {familyBlessings.shlokaSanskrit}
          </p>

          <div className="h-[1px] w-24 bg-[var(--accent-gold)]/50 mx-auto my-6" />

          <p className="text-sm sm:text-base font-sans text-[var(--text-secondary)] italic drop-shadow-md font-medium">
            "{familyBlessings.shlokaEnglish}"
          </p>
        </div>
      </div>

      {/* Families Lineage Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
        {familyBlessings.patrons.map((patron, idx) => (
          <div
            key={idx}
            className="relative p-6 sm:p-8 rounded-2xl bg-[var(--bg-card)] border border-[var(--accent-gold)]/30 shadow-lg"
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
