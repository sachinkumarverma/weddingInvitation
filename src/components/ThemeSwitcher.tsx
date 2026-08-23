import React from 'react';
import { Moon, Flower, Sparkles } from 'lucide-react';

interface ThemeSwitcherProps {
  theme: 'default' | 'pink' | 'midnight';
  setTheme: (theme: 'default' | 'pink' | 'midnight') => void;
}

export const ThemeSwitcher: React.FC<ThemeSwitcherProps> = ({ theme, setTheme }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  React.useEffect(() => {
    if (theme === 'default') {
      document.documentElement.removeAttribute('data-theme');
    } else {
      document.documentElement.setAttribute('data-theme', theme);
    }
  }, [theme]);

  const themes = [
    { id: 'default', name: 'Royal Dark', icon: Moon, color: 'bg-[#1a0810]' },
    { id: 'pink', name: 'Rose Pink', icon: Flower, color: 'bg-[#ffe4e6]' },
    { id: 'midnight', name: 'Midnight', icon: Sparkles, color: 'bg-[#0f0b29]' },
  ] as const;

  return (
    <div className="fixed top-5 left-5 z-50 flex flex-col items-start gap-2">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-10 h-10 rounded-full bg-[var(--bg-card)] border border-[var(--accent-gold)] text-[var(--accent-gold)] flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-300"
        aria-label="Theme options"
      >
        <PaletteIcon theme={theme} />
      </button>

      <div
        className={`flex flex-col gap-2 transition-all duration-300 origin-top ${
          isOpen ? 'scale-y-100 opacity-100' : 'scale-y-0 opacity-0 pointer-events-none'
        }`}
      >
        {themes.map((t) => {
          const Icon = t.icon;
          const isActive = theme === t.id;
          return (
            <button
              key={t.id}
              type="button"
              onClick={() => {
                setTheme(t.id);
                setIsOpen(false);
              }}
              className={`flex items-center gap-2 p-2 rounded-full border transition-all duration-300 ${
                isActive
                  ? 'bg-[var(--accent-gold)] text-[var(--bg-primary)] border-[var(--accent-gold)]'
                  : 'bg-[var(--bg-card)] text-[var(--accent-gold)] border-[var(--accent-gold)]/30 hover:border-[var(--accent-gold)]'
              }`}
            >
              <div className={`w-6 h-6 rounded-full flex items-center justify-center ${t.color}`}>
                <Icon className="w-3.5 h-3.5" />
              </div>
              <span className="text-xs font-cinzel font-bold pr-2">{t.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

const PaletteIcon = ({ theme }: { theme: string }) => {
  if (theme === 'pink') return <Flower className="w-5 h-5" />;
  if (theme === 'midnight') return <Sparkles className="w-5 h-5" />;
  return <Moon className="w-5 h-5" />;
};
