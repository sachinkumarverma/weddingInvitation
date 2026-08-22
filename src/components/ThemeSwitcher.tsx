import React, { useState, useEffect } from 'react';
import { Moon, Sun, Palette } from 'lucide-react';

export const ThemeSwitcher: React.FC = () => {
  const [theme, setTheme] = useState<'default' | 'light' | 'rose'>('default');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (theme === 'default') {
      document.documentElement.removeAttribute('data-theme');
    } else {
      document.documentElement.setAttribute('data-theme', theme);
    }
  }, [theme]);

  const themes = [
    { id: 'default', name: 'Royal Dark', icon: Moon, color: 'bg-[#1a0810]' },
    { id: 'light', name: 'Ivory Light', icon: Sun, color: 'bg-[#fcfbf8]' },
    { id: 'rose', name: 'Rose Gold', icon: Palette, color: 'bg-[#2e1a20]' },
  ] as const;

  return (
    <div className="fixed top-5 left-5 z-50 flex flex-col items-start gap-2">
      <button
        type="button"
        data-cursor="THEME"
        onClick={() => setIsOpen(!isOpen)}
        className="group relative flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 rounded-full border border-[var(--accent-gold)]/50 bg-[var(--bg-card-elevated)]/85 backdrop-blur-md text-[var(--accent-gold)] shadow-[0_8px_24px_rgba(0,0,0,0.5)] transition-all duration-300 hover:scale-110 hover:border-[var(--accent-gold)] hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] active:scale-95 cursor-pointer z-50"
        aria-label="Switch Theme"
      >
        <Palette className="w-5 h-5 group-hover:text-[var(--accent-gold-light)] transition-colors" />
      </button>

      {isOpen && (
        <div className="flex flex-col gap-2 p-2 bg-[var(--bg-card-elevated)]/90 backdrop-blur-md border border-[var(--accent-gold)]/30 rounded-2xl animate-fade-in shadow-xl">
          {themes.map((t) => {
            const Icon = t.icon;
            return (
              <button
                key={t.id}
                onClick={() => {
                  setTheme(t.id);
                  setIsOpen(false);
                }}
                className={`flex items-center gap-3 px-3 py-2 rounded-xl transition-all ${
                  theme === t.id ? 'bg-[var(--accent-gold)]/20' : 'hover:bg-[var(--accent-gold)]/10'
                }`}
              >
                <div className={`w-4 h-4 rounded-full border border-[var(--accent-gold)]/50 ${t.color}`} />
                <span className="text-xs font-sans text-[var(--text-primary)] whitespace-nowrap">
                  {t.name}
                </span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
