import React from 'react';
import { WeddingConfig } from '../types';
import { RoyalCorner, GoldDivider } from './Ornaments';

export const CoupleSection: React.FC<{ wedding: WeddingConfig }> = ({ wedding }) => {
  const { groom, bride } = wedding.couple;

  return (
    <section className="py-20 px-4 max-w-6xl mx-auto relative">
      <div className="text-center mb-14">
        <p className="font-script text-2xl sm:text-3xl text-[var(--text-primary)]">
          Destined by Love, Blessed by Heaven
        </p>
        <h2 className="font-cinzel text-3xl sm:text-4xl font-bold text-gold-gradient tracking-wider uppercase mt-1">
          The Bride & The Groom
        </h2>
        <GoldDivider variant="lotus" className="max-w-xs mx-auto my-4" />
      </div>

      {/* Split Screen / Stacked Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">
        {/* Bride Card */}
        <div className="relative group rounded-3xl p-6 sm:p-8 bg-[var(--bg-card)]/80 border border-[var(--accent-gold)]/35 backdrop-blur-md shadow-[0_15px_40px_rgba(0,0,0,0.6)] flex flex-col justify-between transition-all duration-500 hover:border-[var(--accent-gold)] hover:shadow-[0_20px_50px_rgba(212,175,55,0.2)]">
          <RoyalCorner position="top-left" />
          <RoyalCorner position="top-right" />
          <RoyalCorner position="bottom-left" />
          <RoyalCorner position="bottom-right" />

          <div>
            {/* Portrait Image Frame */}
            <div className="relative mx-auto w-48 h-56 sm:w-56 sm:h-64 rounded-2xl overflow-hidden border-2 border-[var(--accent-gold)]/60 shadow-[0_10px_25px_rgba(0,0,0,0.8)] mb-6 group-hover:scale-103 transition-transform duration-500">
              <img
                src={bride.image}
                alt={bride.fullName}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-top filter brightness-95 contrast-105 group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-card-dark)]/80 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-2 left-0 right-0 text-center">
                <span className="font-cinzel text-[10px] font-bold tracking-[0.25em] text-white uppercase bg-[var(--brand-crimson-dark)]/80 px-3 py-0.5 rounded-full border border-[var(--accent-gold)]/40">
                  {bride.title}
                </span>
              </div>
            </div>

            {/* Bride Details */}
            <div className="text-center">
              <h3 className="font-cinzel-dec text-2xl sm:text-3xl font-bold text-gold-gradient tracking-wide">
                {bride.fullName}
              </h3>
              
              <div className="text-xs font-cinzel font-semibold text-[var(--accent-gold)] tracking-wider uppercase mt-1">
                Daughter of {bride.parents}
              </div>

              <p className="text-xs sm:text-sm font-sans text-[var(--text-secondary)] mt-4 leading-relaxed max-w-md mx-auto">
                {bride.bio}
              </p>
            </div>
          </div>
        </div>

        {/* Groom Card */}
        <div className="relative group rounded-3xl p-6 sm:p-8 bg-[var(--bg-card)]/80 border border-[var(--accent-gold)]/35 backdrop-blur-md shadow-[0_15px_40px_rgba(0,0,0,0.6)] flex flex-col justify-between transition-all duration-500 hover:border-[var(--accent-gold)] hover:shadow-[0_20px_50px_rgba(212,175,55,0.2)]">
          <RoyalCorner position="top-left" />
          <RoyalCorner position="top-right" />
          <RoyalCorner position="bottom-left" />
          <RoyalCorner position="bottom-right" />

          <div>
            {/* Portrait Image Frame */}
            <div className="relative mx-auto w-48 h-56 sm:w-56 sm:h-64 rounded-2xl overflow-hidden border-2 border-[var(--accent-gold)]/60 shadow-[0_10px_25px_rgba(0,0,0,0.8)] mb-6 group-hover:scale-103 transition-transform duration-500">
              <img
                src={groom.image}
                alt={groom.fullName}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-top filter brightness-95 contrast-105 group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-card-dark)]/80 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-2 left-0 right-0 text-center">
                <span className="font-cinzel text-[10px] font-bold tracking-[0.25em] text-white uppercase bg-[var(--brand-crimson-dark)]/80 px-3 py-0.5 rounded-full border border-[var(--accent-gold)]/40">
                  {groom.title}
                </span>
              </div>
            </div>

            {/* Groom Details */}
            <div className="text-center">
              <h3 className="font-cinzel-dec text-2xl sm:text-3xl font-bold text-gold-gradient tracking-wide">
                {groom.fullName}
              </h3>
              
              <div className="text-xs font-cinzel font-semibold text-[var(--accent-gold)] tracking-wider uppercase mt-1">
                Son of {groom.parents}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
