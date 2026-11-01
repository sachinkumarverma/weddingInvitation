import React from 'react';
import { Languages } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const LanguageToggle: React.FC<{ className?: string }> = ({ className = '' }) => {
  const { language, setLanguage, isHindi } = useLanguage();

  return (
    <div
      className={`flex items-center gap-1 p-1 rounded-full border border-[var(--accent-gold)]/60 bg-[var(--bg-card-elevated)]/90 backdrop-blur-md shadow-[0_6px_20px_rgba(0,0,0,0.5)] transition-all duration-300 hover:border-[var(--accent-gold)] h-9 ${className}`}
      role="group"
      aria-label="Language selection"
    >
      <Languages className="w-3.5 h-3.5 text-[var(--accent-gold)] ml-1.5 mr-0.5 shrink-0 hidden sm:block" />

      {/* English Option */}
      <button
        type="button"
        onClick={() => setLanguage('en')}
        className={`px-2.5 sm:px-3 h-7 rounded-full text-xs font-cinzel font-bold tracking-wider transition-all duration-300 cursor-pointer flex items-center justify-center ${
          language === 'en'
            ? 'bg-gradient-to-r from-[var(--brand-crimson-dark)] to-[var(--brand-crimson)] text-white shadow-sm border border-[var(--accent-gold)]/50'
            : 'text-[var(--text-secondary)] hover:text-[var(--accent-gold-light)]'
        }`}
        aria-pressed={language === 'en'}
      >
        <span className="leading-none pt-0.5">EN</span>
      </button>

      {/* Hindi Option */}
      <button
        type="button"
        onClick={() => setLanguage('hi')}
        className={`px-2.5 sm:px-3 h-7 rounded-full text-xs font-bold transition-all duration-300 cursor-pointer flex items-center justify-center ${
          isHindi
            ? 'bg-gradient-to-r from-[var(--brand-crimson-dark)] to-[var(--brand-crimson)] text-white shadow-sm border border-[var(--accent-gold)]/50'
            : 'text-[var(--text-secondary)] hover:text-[var(--accent-gold-light)]'
        }`}
        style={{ fontFamily: "var(--font-devanagari-heading)" }}
        aria-pressed={isHindi}
      >
        <span className="leading-none pt-0.5">हिंदी</span>
      </button>
    </div>
  );
};
