import React from 'react';
import { WeddingConfig } from '../types';
import { ImperialCorner, GoldDivider } from './Ornaments';
import { useLanguage } from '../context/LanguageContext';

export const FamilySection: React.FC<{ wedding: WeddingConfig }> = ({ wedding }) => {
  const { familyBlessings } = wedding;
  const { t } = useLanguage();

  return (
    <section className="py-20 px-4 max-w-5xl mx-auto relative text-center">
      <div className="mb-12">
        <p className="font-script text-2xl sm:text-3xl text-[var(--text-primary)] py-0.5">
          {t('family.subtitle')}
        </p>
        <h2 className="font-cinzel text-3xl sm:text-4xl font-bold text-gold-gradient tracking-wider uppercase mt-1 pt-2 pb-1 inline-block leading-snug">
          {t('family.title')}
        </h2>
        <GoldDivider variant="imperial" className="max-w-xs mx-auto my-4" />
      </div>

      {/* Sanskrit Shloka Blessing Card */}
      <div className="relative rounded-3xl p-8 sm:p-12 royal-midnight-card shadow-2xl mb-12 min-h-[400px] flex items-center justify-center overflow-hidden">
        {/* Ganesh Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-no-repeat opacity-25 pointer-events-none"
          style={{ backgroundImage: 'url(/ganeshji.webp)', backgroundPosition: 'center 20%' }}
        />

        <ImperialCorner position="top-left" size={42} />
        <ImperialCorner position="top-right" size={42} />
        <ImperialCorner position="bottom-left" size={42} />
        <ImperialCorner position="bottom-right" size={42} />

        <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center text-center mt-32">
          <p className="font-serif-luxury text-[16px] sm:text-2xl text-[var(--accent-gold-light)] tracking-tight sm:tracking-wide leading-loose sm:leading-relaxed font-semibold whitespace-pre sm:whitespace-pre-line drop-shadow-md px-0 w-full overflow-x-visible">
            {familyBlessings.shlokaSanskrit}
          </p>

          <GoldDivider variant="crest" className="w-48 mx-auto my-6" />

          <p className="text-sm sm:text-base font-sans text-[var(--text-secondary)] italic drop-shadow-md font-medium">
            "{familyBlessings.shlokaEnglish}"
          </p>
        </div>
      </div>

      {/* Families Dynastic Lineage Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
        {familyBlessings.patrons.map((patron, idx) => (
          <div
            key={idx}
            className="relative p-6 sm:p-8 rounded-3xl royal-midnight-card group hover:border-[var(--accent-gold)] transition-all duration-300"
          >
            <ImperialCorner position="top-left" size={32} />
            <ImperialCorner position="bottom-right" size={32} />

            <div className="flex items-center gap-2.5 mb-5 pb-3 border-b border-[var(--accent-gold)]/25">
              <span className="w-2 h-2 rotate-45 bg-[var(--accent-gold)] shrink-0" />
              <h3 className="font-cinzel text-xl font-bold text-gold-gradient tracking-wide inline-block leading-snug">
                {patron.family}
              </h3>
            </div>

            <ul className="space-y-3">
              {patron.members.map((member, mIdx) => {
                const match = member.match(/^(.*?)\((?:Mob|मो\.)\s*-\s*([0-9\s]+)\)(.*)$/i);
                return (
                  <li key={mIdx} className="flex items-start gap-2.5 text-xs sm:text-sm font-sans text-[var(--text-secondary)]">
                    <span className="w-1.5 h-1.5 rotate-45 border border-[var(--accent-gold)] bg-[var(--accent-gold)]/30 shrink-0 mt-1.5" />
                    {match ? (
                      <span className="leading-relaxed">
                        {match[1]}(Mob -{' '}
                        <a
                          href={`tel:${match[2].replace(/\s+/g, '')}`}
                          className="text-[var(--accent-gold)] hover:underline hover:text-[var(--accent-gold-light)] font-medium"
                        >
                          {match[2].trim()}
                        </a>
                        ){match[3]}
                      </span>
                    ) : (
                      <span className="leading-relaxed">{member}</span>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
};
