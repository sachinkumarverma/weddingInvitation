import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { sound } from '../utils/soundEngine';
import { weddingData } from '../data/weddingData';

export const EasterEggModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
}> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 animate-in zoom-in-95 duration-200">
      <div className="relative p-8 rounded-3xl bg-[var(--bg-card)] border-2 border-[var(--accent-gold)] max-w-md text-center shadow-[0_0_50px_rgba(212,175,55,0.4)]">
        <div className="text-4xl mb-3">✨ 👑 🥂</div>
        <h3 className="font-cinzel-dec text-2xl font-bold text-gold-gradient mb-2">
          A Royal Toast!
        </h3>
        <p className="font-script text-xl text-[var(--text-primary)] mb-3">
          You discovered our secret wedding blessing.
        </p>
        <p className="text-xs font-sans text-[var(--text-secondary)] leading-relaxed mb-6">
          "May love be the song our hearts dance to, today and through every tomorrow."
          <br />
          <span className="text-[var(--accent-gold-light)] font-semibold mt-2 inline-block">
            — {weddingData.couple.groom.firstName} & {weddingData.couple.bride.firstName}
          </span>
        </p>
        <button
          type="button"
          onClick={onClose}
          className="px-8 py-2.5 rounded-full bg-[var(--accent-gold)] text-[var(--bg-card-dark)] font-cinzel font-bold text-xs uppercase tracking-wider hover:bg-[var(--accent-gold-light)] transition-all cursor-pointer"
        >
          Cheers to Love!
        </button>
      </div>
    </div>
  );
};
