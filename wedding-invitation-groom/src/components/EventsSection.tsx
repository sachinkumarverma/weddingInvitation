import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Plus } from 'lucide-react';
import { WeddingConfig, WeddingEvent } from '../types';
import { ImperialCorner, GoldDivider } from './Ornaments';
import { useLanguage } from '../context/LanguageContext';
import { ScrollReveal } from './ScrollReveal';

const EventImageSlider: React.FC<{ images: string[]; name: string }> = ({ images, name }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // Change image every 3 seconds
    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <div className="relative h-44 sm:h-64 rounded-2xl overflow-hidden mb-5 border border-[var(--accent-gold)]/25">
      {images.map((image, index) => (
        <img
          key={index}
          src={image}
          alt={`${name} - ${index + 1}`}
          referrerPolicy="no-referrer"
          className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000 ${
            index === currentIndex ? 'opacity-100 z-0' : 'opacity-0 -z-10'
          } group-hover:scale-108 transition-transform filter brightness-90`}
        />
      ))}
      <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-card-dark)]/90 via-transparent to-transparent pointer-events-none z-10 event-image-overlay" />
      <div className="absolute bottom-3 left-4 right-4 z-20">
        <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-[#ffffff] drop-shadow-md">
          {name}
        </h3>
      </div>
      {/* Dots Indicator */}
      <div className="absolute top-3 right-4 flex gap-1 z-20">
        {images.map((_, index) => (
          <div
            key={index}
            className={`w-1.5 h-1.5 rounded-full ${
              index === currentIndex ? 'bg-[var(--accent-gold)]' : 'bg-white/40'
            } transition-colors`}
          />
        ))}
      </div>
    </div>
  );
};

export const EventsSection: React.FC<{ wedding: WeddingConfig }> = ({ wedding }) => {
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const { isHindi, t } = useLanguage();

  const filteredEvents = activeFilter === 'all'
    ? wedding.events
    : wedding.events.filter(e => e.id === activeFilter);

  const getMotifIcon = (motif: WeddingEvent['motif']) => {
    switch (motif) {
      case 'pooja':
        return '🪔';
      case 'tilak':
        return '✨';
      case 'haldi':
        return '🌼';
      case 'mehendi':
        return '🪷';
      case 'sangeet':
        return '🪕';
      case 'wedding':
        return '👑';
      case 'reception':
        return '🥂';
      default:
        return '✨';
    }
  };

  const getMotifLabel = (motif: WeddingEvent['motif']) => {
    if (isHindi) {
      switch (motif) {
        case 'pooja': return 'माता पूजन';
        case 'tilak': return 'तिलक एवं आशीर्वाद';
        case 'haldi': return 'हल्दी रस्म';
        case 'mehendi': return 'मेहंदी उत्सव';
        case 'sangeet': return 'संगीत संध्या';
        case 'wedding': return 'शुभ विवाह';
        case 'reception': return 'प्रीतिभोज';
        default: return motif;
      }
    }
    switch (motif) {
      case 'pooja': return 'Mata Poojan';
      case 'tilak': return 'Tilak & Blessings';
      case 'haldi': return 'Haldi Ritual';
      case 'mehendi': return 'Mehendi Ceremony';
      case 'sangeet': return 'Sangeet Sandhya';
      case 'wedding': return 'The Wedding';
      case 'reception': return 'Grand Reception';
      default: return motif;
    }
  };

  const handleAddToCalendar = (event: WeddingEvent) => {
    addToNativeCalendar({
      title: isHindi ? `${event.name} • सत्यम एवं हर्षिता विवाह` : `${event.name} • Satyam & Harshita Wedding`,
      description: `${event.description}\n${isHindi ? 'स्थान' : 'Venue'}: ${event.venue}, ${event.address}`,
      location: `${event.venue}, ${event.address}`,
      startDate: wedding.weddingDate,
      endDate: '2026-12-03T02:00:00',
    });
  };

  return (
    <section id="events-section" className="py-15 px-4 max-w-6xl mx-auto relative scroll-mt-6">
      <div className="text-center mb-12">
        <p className="font-script text-2xl sm:text-3xl text-[var(--text-primary)] py-0.5">
          {t('events.subtitle')}
        </p>
        <h2 className="font-cinzel text-3xl sm:text-4xl font-bold text-gold-gradient tracking-wider uppercase mt-1 pt-2 pb-1 inline-block leading-snug">
          {t('events.title')}
        </h2>
        <p className="text-xs sm:text-sm font-sans text-[var(--text-secondary)] max-w-lg mx-auto mt-2">
          {t('events.intro')}
        </p>
        <GoldDivider variant="imperial" className="max-w-xs mx-auto my-4" />

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
          <button
            type="button"
            onClick={() => setActiveFilter('all')}
            className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-cinzel tracking-wider uppercase transition-all cursor-pointer min-h-[38px] flex items-center justify-center ${
              activeFilter === 'all'
                ? 'royal-gold-btn border border-[var(--accent-gold)]'
                : 'bg-[var(--bg-card)]/60 text-[var(--text-secondary)] border border-[var(--accent-gold)]/30 hover:border-[var(--accent-gold)]'
            }`}
          >
            <span className="pt-0.5 pb-0.5 inline-block leading-normal">{t('events.allRituals')}</span>
          </button>
          {wedding.events.map((e) => (
            <button
              key={e.id}
              type="button"
              onClick={() => setActiveFilter(e.id)}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-cinzel tracking-wider uppercase transition-all cursor-pointer min-h-[38px] flex items-center justify-center ${
                activeFilter === e.id
                  ? 'royal-gold-btn border border-[var(--accent-gold)]'
                  : 'bg-[var(--bg-card)]/60 text-[var(--text-secondary)] border border-[var(--accent-gold)]/30 hover:border-[var(--accent-gold)]'
              }`}
            >
              <span className="pt-0.5 pb-0.5 inline-block leading-normal">{e.name.split('&')[0]}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Events Cards Grid */}
      <div 
        className={`grid gap-8 items-stretch mx-auto ${
          filteredEvents.length === 1 
            ? 'grid-cols-1 max-w-xl' 
            : 'grid-cols-1 md:grid-cols-2'
        }`}
      >
        {filteredEvents.map((event, index) => (
          <ScrollReveal key={event.id} delay={(index % 2) * 0.12} className="h-full">
            <div
              className="relative rounded-3xl p-6 sm:p-8 royal-midnight-card flex flex-col justify-between group hover:border-[var(--accent-gold)] hover:shadow-[0_20px_50px_rgba(212,175,55,0.25)] transition-all duration-500 h-full"
            >
              <ImperialCorner position="top-left" size={36} />
              <ImperialCorner position="top-right" size={36} />
              <ImperialCorner position="bottom-left" size={36} />
              <ImperialCorner position="bottom-right" size={36} />

              <div className="flex flex-col flex-1">
                {/* Event Header with Motif Emoji & Badge */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <div 
                    className="event-motif-box w-11 h-11 flex items-center justify-center rounded-xl border border-[var(--accent-gold)]/40 bg-[#181145] shadow-md"
                  >
                    <span className="text-xl drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">{getMotifIcon(event.motif)}</span>
                  </div>
                  
                  <div
                    className="event-motif-badge flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[var(--accent-gold)]/40 text-xs font-cinzel font-bold tracking-wider uppercase bg-black/40 text-[var(--accent-gold)] shadow-sm min-h-[30px]"
                  >
                    <span className="w-1.5 h-1.5 rotate-45 border border-current opacity-80 shrink-0"></span>
                    <span className="inline-block leading-none transform translate-y-[0.5px]">{getMotifLabel(event.motif)}</span>
                    <span className="w-1.5 h-1.5 rotate-45 border border-current opacity-80 shrink-0"></span>
                  </div>
                </div>

                {/* Event Image Banner */}
                {event.images && event.images.length > 1 ? (
                  <EventImageSlider images={event.images} name={event.name} />
                ) : (
                  <div className="relative h-44 sm:h-64 rounded-2xl overflow-hidden mb-5 border border-[var(--accent-gold)]/30">
                    <img
                      src={event.image}
                      alt={event.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 filter brightness-90"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-primary-dark)]/90 via-transparent to-transparent pointer-events-none event-image-overlay" />
                    <div className="absolute bottom-3 left-4 right-4 z-10">
                      <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-[#ffffff] drop-shadow-md">
                        {event.name}
                      </h3>
                    </div>
                  </div>
                )}

                {/* Subtitle & Description */}
                {event.subTitle && (
                  <div className="font-script text-xl sm:text-2xl text-[var(--text-primary)] mb-2 tracking-wide">
                    {event.subTitle}
                  </div>
                )}

                <p className="text-xs sm:text-sm font-sans text-[var(--text-secondary)] leading-relaxed mb-6 flex-1">
                  {event.description}
                </p>

                {/* Key Details List */}
                <div className="space-y-2.5 py-4 border-y border-[var(--accent-gold)]/20 text-xs sm:text-sm font-sans">
                  <div className="flex items-center gap-2.5 text-[var(--text-primary)]">
                    <Calendar className="w-4 h-4 text-[var(--accent-gold)] shrink-0" />
                    <span className="font-semibold font-cinzel">{event.date}</span>
                  </div>

                  <div className="flex items-center gap-2.5 text-[var(--text-primary)]">
                    <Clock className="w-4 h-4 text-[var(--accent-gold)] shrink-0" />
                    <span>{event.time}</span>
                  </div>

                  <div className="flex items-start gap-2.5 text-[var(--text-primary)]">
                    <MapPin className="w-4 h-4 text-[var(--accent-gold)] shrink-0 mt-0.5" />
                    <span>
                      <strong>{event.venue}</strong> — {event.address}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between gap-3 mt-6 pt-2">
                <button
                  type="button"
                  data-cursor="ADD"
                  onClick={() => handleAddToCalendar(event)}
                  className="royal-gold-btn flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-cinzel font-bold tracking-wider uppercase cursor-pointer whitespace-nowrap border border-[var(--accent-gold)]"
                >
                  <Plus className="w-4 h-4 text-[#080616] shrink-0" />
                  <span className="leading-normal pt-0.5">{t('events.saveDateBtn')}</span>
                </button>

                <a
                  href={wedding.venue.googleMapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  data-cursor="MAP"
                  className="royal-secondary-btn flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-xs font-cinzel font-semibold tracking-wider uppercase cursor-pointer whitespace-nowrap transition-all"
                >
                  <MapPin className="w-4 h-4 text-[var(--accent-gold)] shrink-0" />
                  <span className="leading-normal pt-0.5">{t('events.directionsBtn')}</span>
                </a>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
};
