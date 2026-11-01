import React, { useState, useEffect } from 'react';
import { Languages } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { Language } from '../data/translations';

export const LanguageToggle: React.FC<{ className?: string }> = ({ className = '' }) => {
  const { language, setLanguage } = useLanguage();
  const [activeLang, setActiveLang] = useState<Language>(language);

  // Keep in sync with global context
  useEffect(() => {
    setActiveLang(language);
  }, [language]);

  const handleSelect = (lang: Language) => {
    if (lang === activeLang) return;
    setActiveLang(lang); // Immediate 0ms local response
    setLanguage(lang);   // Background transition for full page
  };

  const isHindi = activeLang === 'hi';

  return (
    <div
      className={`flex items-center p-1 rounded-full border border-[var(--accent-gold)]/60 bg-[var(--bg-card-elevated)]/90 backdrop-blur-md shadow-[0_6px_20px_rgba(0,0,0,0.5)] hover:border-[var(--accent-gold)] transition-colors duration-200 h-9 ${className}`}
      role="group"
      aria-label="Language selection"
    >
      <Languages className="w-3.5 h-3.5 text-[var(--accent-gold)] ml-1.5 mr-1 shrink-0" />

      {/* 2-Segment Switch with GPU-accelerated sliding highlight pill */}
      <div className="relative flex items-center">
        {/* Sliding Active Pill */}
        <div
          className="absolute top-0 bottom-0 left-0 w-1/2 rounded-full bg-gradient-to-r from-[var(--brand-crimson-dark)] to-[var(--brand-crimson)] border border-[var(--accent-gold)]/50 shadow-sm transition-transform duration-200 ease-out will-change-transform pointer-events-none"
          style={{
            transform: isHindi ? 'translateX(100%)' : 'translateX(0%)',
          }}
        />

        {/* English Option */}
        <button
          type="button"
          onClick={() => handleSelect('en')}
          className={`relative z-10 w-10 sm:w-11 h-7 rounded-full text-xs font-cinzel font-bold tracking-wider cursor-pointer flex items-center justify-center transition-colors duration-150 select-none ${
            !isHindi
              ? 'text-white'
              : 'text-[var(--text-secondary)] hover:text-[var(--accent-gold-light)]'
          }`}
          aria-pressed={!isHindi}
        >
          <span className="leading-none pt-0.5">EN</span>
        </button>

        {/* Hindi Option */}
        <button
          type="button"
          onClick={() => handleSelect('hi')}
          className={`relative z-10 w-10 sm:w-11 h-7 rounded-full text-xs font-bold cursor-pointer flex items-center justify-center transition-colors duration-150 select-none ${
            isHindi
              ? 'text-white'
              : 'text-[var(--text-secondary)] hover:text-[var(--accent-gold-light)]'
          }`}
          style={{ fontFamily: "var(--font-devanagari-heading)" }}
          aria-pressed={isHindi}
        >
          <span className="leading-none pt-0.5">हिंदी</span>
        </button>
      </div>
    </div>
  );
};
