import React from 'react';
import { WeddingConfig } from '../types';
import { ImperialCorner, GoldDivider } from './Ornaments';
import { useLanguage } from '../context/LanguageContext';
import { ScrollReveal } from './ScrollReveal';

export const CoupleSection: React.FC<{ wedding: WeddingConfig }> = ({ wedding }) => {
  const { groom, bride } = wedding.couple;
  const { t } = useLanguage();

  return (
    <section className="py-20 px-4 max-w-6xl mx-auto relative">
      <div className="text-center mb-14">
        <p className="font-script text-2xl sm:text-3xl text-[var(--text-primary)] py-0.5">
          {t('couple.subtitle')}
        </p>
        <h2 className="font-cinzel text-3xl sm:text-4xl font-bold text-gold-gradient tracking-wider uppercase mt-1 pt-2 pb-1 inline-block leading-snug">
          {t('couple.title')}
        </h2>
        <GoldDivider variant="imperial" className="max-w-xs mx-auto my-4" />
      </div>

      {/* Split Screen / Stacked Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">
        {/* Groom Card */}
        <ScrollReveal delay={0.05} className="h-full">
          <div className="relative group rounded-3xl p-6 sm:p-8 royal-midnight-card flex flex-col justify-between transition-all duration-500 hover:border-[var(--accent-gold)] hover:shadow-[0_20px_50px_rgba(212,175,55,0.25)] h-full">
            <ImperialCorner position="top-left" size={36} />
            <ImperialCorner position="top-right" size={36} />
            <ImperialCorner position="bottom-left" size={36} />
            <ImperialCorner position="bottom-right" size={36} />

            <div>
              {/* Royal Palace Jharokha Arch Portrait Frame */}
              <div className="couple-arch-frame relative mx-auto w-56 h-64 sm:w-60 sm:h-72 rounded-t-[5rem] rounded-b-2xl overflow-hidden border-2 border-[var(--accent-gold)]/60 shadow-[0_15px_35px_rgba(0,0,0,0.8)] ring-1 ring-[var(--accent-gold)]/30 ring-offset-4 ring-offset-[#0d0928] mb-6 group-hover:scale-102 transition-transform duration-500">
                <img
                  src={groom.image}
                  alt={groom.fullName}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-[center_15%] filter brightness-95 contrast-105 group-hover:scale-108 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-primary-dark)]/85 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-3 left-0 right-0 text-center">
                  <span className="couple-title-badge font-cinzel text-[11px] font-bold tracking-[0.25em] text-[var(--accent-gold-light)] uppercase bg-black/85 px-4 py-1 rounded-full border border-[var(--accent-gold)]/60 shadow-md inline-block transform translate-y-[1px]">
                    {groom.title}
                  </span>
                </div>
              </div>

              {/* Groom Details */}
              <div className="text-center">
                <h3 className="font-cinzel-dec text-2xl sm:text-3xl font-bold text-gold-gradient tracking-wide pt-2 pb-1 inline-block leading-normal">
                  {groom.fullName}
                </h3>
                
                <div className="text-xs font-cinzel font-semibold text-[var(--accent-gold)] tracking-wider uppercase mt-1">
                  {t('couple.sonOf')} {groom.parents}
                </div>

                {groom.bio && (
                  <p className="text-xs sm:text-sm font-sans text-[var(--text-secondary)] mt-4 leading-relaxed max-w-md mx-auto">
                    {groom.bio}
                  </p>
                )}
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Bride Card */}
        <ScrollReveal delay={0.15} className="h-full">
          <div className="relative group rounded-3xl p-6 sm:p-8 royal-midnight-card flex flex-col justify-between transition-all duration-500 hover:border-[var(--accent-gold)] hover:shadow-[0_20px_50px_rgba(212,175,55,0.25)] h-full">
            <ImperialCorner position="top-left" size={36} />
            <ImperialCorner position="top-right" size={36} />
            <ImperialCorner position="bottom-left" size={36} />
            <ImperialCorner position="bottom-right" size={36} />

            <div>
              {/* Royal Palace Jharokha Arch Portrait Frame */}
              <div className="couple-arch-frame relative mx-auto w-56 h-64 sm:w-60 sm:h-72 rounded-t-[5rem] rounded-b-2xl overflow-hidden border-2 border-[var(--accent-gold)]/60 shadow-[0_15px_35px_rgba(0,0,0,0.8)] ring-1 ring-[var(--accent-gold)]/30 ring-offset-4 ring-offset-[#0d0928] mb-6 group-hover:scale-102 transition-transform duration-500">
                <img
                  src={bride.image}
                  alt={bride.fullName}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-[center_15%] filter brightness-95 contrast-105 group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-primary-dark)]/85 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-3 left-0 right-0 text-center">
                  <span className="couple-title-badge font-cinzel text-[11px] font-bold tracking-[0.25em] text-[var(--accent-gold-light)] uppercase bg-black/85 px-4 py-1 rounded-full border border-[var(--accent-gold)]/60 shadow-md inline-block transform translate-y-[1px]">
                    {bride.title}
                  </span>
                </div>
              </div>

              {/* Bride Details */}
              <div className="text-center">
                <h3 className="font-cinzel-dec text-2xl sm:text-3xl font-bold text-gold-gradient tracking-wide pt-2 pb-1 inline-block leading-normal">
                  {bride.fullName}
                </h3>
                
                <div className="text-xs font-cinzel font-semibold text-[var(--accent-gold)] tracking-wider uppercase mt-1">
                  {t('couple.daughterOf')} {bride.parents}
                </div>

                {bride.bio && (
                  <p className="text-xs sm:text-sm font-sans text-[var(--text-secondary)] mt-4 leading-relaxed max-w-md mx-auto">
                    {bride.bio}
                  </p>
                )}
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};
