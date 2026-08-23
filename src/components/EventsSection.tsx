import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Sparkles, Shirt, Plus } from 'lucide-react';
import { WeddingConfig, WeddingEvent } from '../types';
import { addToNativeCalendar } from '../utils/calendar';
import { RoyalCorner, GoldDivider } from './Ornaments';

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
      <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-card-dark)]/90 via-transparent to-transparent pointer-events-none z-10" />
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

  const filteredEvents = activeFilter === 'all'
    ? wedding.events
    : wedding.events.filter(e => e.id === activeFilter);

  const getMotifIcon = (motif: WeddingEvent['motif']) => {
    switch (motif) {
      case 'pooja':
        return '🪔';
      case 'haldi':
        return '🌼';
      case 'mehendi':
        return '🪷';
      case 'wedding':
        return '👑';
      case 'reception':
        return '🥂';
      default:
        return '✨';
    }
  };

  const getMotifLabel = (motif: WeddingEvent['motif']) => {
    switch (motif) {
      case 'pooja': return 'Mata Poojan';
      case 'haldi': return 'Haldi Ritual';
      case 'mehendi': return 'Mehendi & Sangeet';
      case 'wedding': return 'The Wedding';
      case 'reception': return 'Grand Reception';
      default: return motif;
    }
  };

  const handleAddToCalendar = (event: WeddingEvent) => {
    addToNativeCalendar({
      title: `${event.name} • Satyam & Harshita Wedding`,
      description: `${event.description}\nVenue: ${event.venue}, ${event.address}`,
      location: `${event.venue}, ${event.address}`,
      startDate: wedding.weddingDate,
      endDate: '2026-12-03T02:00:00',
    });
  };

  return (
    <section id="events-section" className="py-20 px-4 max-w-6xl mx-auto relative scroll-mt-6">
      <div className="text-center mb-12">
        <p className="font-script text-2xl sm:text-3xl text-[var(--text-primary)]">
          Sacred Ceremonies & Celebrations
        </p>
        <h2 className="font-cinzel text-3xl sm:text-4xl font-bold text-gold-gradient tracking-wider uppercase mt-1">
          Wedding Itinerary
        </h2>
        <p className="text-xs sm:text-sm font-sans text-[var(--text-secondary)] max-w-lg mx-auto mt-2">
          Join us across four joyous days of vibrant rituals, soulful music, royal feasts, and sacred blessings.
        </p>
        <GoldDivider variant="lotus" className="max-w-xs mx-auto my-4" />

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
          <button
            type="button"
            onClick={() => setActiveFilter('all')}
            className={`px-4 py-1.5 rounded-full text-xs font-cinzel tracking-wider uppercase transition-all cursor-pointer ${
              activeFilter === 'all'
                ? 'bg-[var(--accent-gold)] text-[var(--bg-card-dark)] font-bold shadow-[0_0_15px_rgba(212,175,55,0.4)]'
                : 'bg-[var(--bg-card)]/60 text-[var(--text-secondary)] border border-[var(--accent-gold)]/30 hover:border-[var(--accent-gold)]'
            }`}
          >
            All Rituals
          </button>
          {wedding.events.map((e) => (
            <button
              key={e.id}
              type="button"
              onClick={() => setActiveFilter(e.id)}
              className={`px-4 py-1.5 rounded-full text-xs font-cinzel tracking-wider uppercase transition-all cursor-pointer ${
                activeFilter === e.id
                  ? 'bg-[var(--accent-gold)] text-[var(--bg-card-dark)] font-bold shadow-[0_0_15px_rgba(212,175,55,0.4)]'
                  : 'bg-[var(--bg-card)]/60 text-[var(--text-secondary)] border border-[var(--accent-gold)]/30 hover:border-[var(--accent-gold)]'
              }`}
            >
              {e.name.split('&')[0]}
            </button>
          ))}
        </div>
      </div>

      {/* Events Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
        {filteredEvents.map((event) => (
          <div
            key={event.id}
            className="relative rounded-3xl p-6 sm:p-8 bg-[var(--bg-card)]/85 border border-[var(--accent-gold)]/35 backdrop-blur-md shadow-[0_15px_40px_rgba(0,0,0,0.6)] flex flex-col justify-between group hover:border-[var(--accent-gold)] hover:shadow-[0_20px_50px_rgba(212,175,55,0.25)] transition-all duration-500"
          >
            <RoyalCorner position="top-left" />
            <RoyalCorner position="top-right" />
            <RoyalCorner position="bottom-left" />
            <RoyalCorner position="bottom-right" />

            <div className="flex flex-col flex-1">
              {/* Event Header with Motif Emoji & Badge */}
              <div className="flex items-center justify-between gap-2 mb-4">
                <div 
                  className="w-12 h-12 flex items-center justify-center rounded-2xl border"
                  style={{
                    borderColor: `${event.themeColor}40`,
                    backgroundColor: `${event.themeColor}10`,
                    boxShadow: `inset 0 0 10px ${event.themeColor}10`
                  }}
                >
                  <span className="text-2xl drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">{getMotifIcon(event.motif)}</span>
                </div>
                
                <div
                  className="px-4 py-1.5 rounded-full text-[10px] sm:text-[11px] font-cinzel font-semibold tracking-[0.2em] uppercase border flex items-center gap-2 backdrop-blur-sm"
                  style={{
                    borderColor: `${event.themeColor}40`,
                    color: event.themeColor,
                    backgroundColor: `${event.themeColor}10`,
                  }}
                >
                  <span className="w-1.5 h-1.5 rotate-45 border border-current opacity-80"></span>
                  {getMotifLabel(event.motif)}
                  <span className="w-1.5 h-1.5 rotate-45 border border-current opacity-80"></span>
                </div>
              </div>

              {/* Event Image Banner */}
              {event.images && event.images.length > 1 ? (
                <EventImageSlider images={event.images} name={event.name} />
              ) : (
                <div className="relative h-44 sm:h-64 rounded-2xl overflow-hidden mb-5 border border-[var(--accent-gold)]/25">
                  <img
                    src={event.image}
                    alt={event.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 filter brightness-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-card-dark)]/90 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute bottom-3 left-4 right-4 z-10">
                    <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-[#ffffff] drop-shadow-md">
                      {event.name}
                    </h3>
                  </div>
                </div>
              )}

              {/* Subtitle & Description */}
              {event.subTitle && (
                <div className="font-script text-lg text-[var(--text-primary)] mb-2">
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
            <div className="flex items-center justify-between gap-2.5 mt-6 pt-2">
              <button
                type="button"
                data-cursor="ADD"
                onClick={() => handleAddToCalendar(event)}
                className="btn-primary flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-full text-xs font-cinzel font-semibold tracking-wider uppercase cursor-pointer whitespace-nowrap"
              >
                <Plus className="w-3.5 h-3.5 text-[var(--accent-gold)] shrink-0" />
                <span>Save the Date</span>
              </button>

              <a
                href={wedding.venue.googleMapsUrl}
                target="_blank"
                rel="noreferrer"
                data-cursor="MAP"
                className="btn-secondary flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-full text-xs font-cinzel tracking-wider uppercase cursor-pointer whitespace-nowrap"
              >
                <MapPin className="w-3.5 h-3.5 text-[var(--accent-gold)] shrink-0" />
                <span>Directions</span>
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
