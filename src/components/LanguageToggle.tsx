import React from 'react';
import { Languages } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const LanguageToggle: React.FC<{ className?: string }> = ({ className = '' }) => {
  const { language, setLanguage, isHindi } = useLanguage();

  return (
    <div
      className={`flex items-center gap-1.5 p-1.5 rounded-full border border-[var(--accent-gold)]/60 bg-[var(--bg-card-elevated)]/90 backdrop-blur-md shadow-[0_8px_24px_rgba(0,0,0,0.5)] transition-all duration-300 hover:border-[var(--accent-gold)] min-h-[42px] ${className}`}
      role="group"
      aria-label="Language selection"
    >
      <Languages className="w-3.5 h-3.5 text-[var(--accent-gold)] ml-1.5 mr-0.5 shrink-0 hidden sm:block" />

      {/* English Option */}
      <button
        type="button"
        onClick={() => setLanguage('en')}
        className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-cinzel font-bold tracking-wider transition-all duration-300 cursor-pointer min-h-[32px] sm:min-h-[34px] flex items-center justify-center ${
          language === 'en'
            ? 'bg-gradient-to-r from-[var(--brand-crimson-dark)] to-[var(--brand-crimson)] text-white shadow-md border border-[var(--accent-gold)]/50'
            : 'text-[var(--text-secondary)] hover:text-[var(--accent-gold-light)]'
        }`}
        aria-pressed={language === 'en'}
      >
        <span className="pt-0.5 pb-0.5 inline-block leading-normal">EN</span>
      </button>

      {/* Hindi Option */}
      <button
        type="button"
        onClick={() => setLanguage('hi')}
        className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-bold transition-all duration-300 cursor-pointer min-h-[32px] sm:min-h-[34px] flex items-center justify-center ${
          isHindi
            ? 'bg-gradient-to-r from-[var(--brand-crimson-dark)] to-[var(--brand-crimson)] text-white shadow-md border border-[var(--accent-gold)]/50'
            : 'text-[var(--text-secondary)] hover:text-[var(--accent-gold-light)]'
        }`}
        style={{ fontFamily: "var(--font-devanagari-heading)" }}
        aria-pressed={isHindi}
      >
        <span className="pt-0.5 pb-0.5 inline-block leading-normal">हिंदी</span>
      </button>
    </div>
  );
};
