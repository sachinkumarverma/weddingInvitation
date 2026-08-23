import React, { useState, useEffect } from 'react';
import { MapPin, Navigation, Plane, Train, ExternalLink } from 'lucide-react';
import { WeddingConfig } from '../types';
import { RoyalCorner, GoldDivider } from './Ornaments';

const venueImages = [
  '/marriage_garden1.png',
  '/marriage_garden2.jpg',
  '/marriage_garden3.jpg',
  '/marriage_garden4.jpg'
];

export const VenueSection: React.FC<{ wedding: WeddingConfig }> = ({ wedding }) => {
  const { venue } = wedding;
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % venueImages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="venue-section" className="py-20 px-4 max-w-6xl mx-auto relative scroll-mt-6">
      {venue.cityImage && (
        <div className="absolute inset-0 -z-10 rounded-3xl overflow-hidden opacity-10">
          <img src={venue.cityImage} alt={venue.city} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#16050b] via-transparent to-[#0f0407]" />
        </div>
      )}
      
      <div className="text-center mb-12 relative z-10">
        <p className="font-script text-2xl sm:text-3xl text-[var(--text-primary)]">
          A Royal Celebration in the City of Lakes
        </p>
        <h2 className="font-cinzel text-3xl sm:text-4xl font-bold text-gold-gradient tracking-wider uppercase mt-1">
          The Wedding Venue
        </h2>
        <GoldDivider variant="lotus" className="max-w-xs mx-auto my-4" />
      </div>

      {/* Main Venue Showcase Card */}
      <div className="relative rounded-3xl overflow-hidden border border-[var(--accent-gold)]/40 bg-[var(--bg-card)]/80 backdrop-blur-md shadow-2xl z-10">
        <RoyalCorner position="top-left" />
        <RoyalCorner position="top-right" />

        {/* Hero Venue Image Carousel */}
        <div className="relative h-72 sm:h-96 w-full overflow-hidden">
          {venueImages.map((src, idx) => (
            <img
              key={src}
              src={src}
              alt={`${venue.name} - View ${idx + 1}`}
              referrerPolicy="no-referrer"
              className={`absolute inset-0 w-full h-full object-cover filter brightness-90 contrast-105 transition-opacity duration-1000 ${
                idx === currentImageIndex ? 'opacity-100 z-0' : 'opacity-0 -z-10'
              }`}
            />
          ))}
          
          {/* Carousel Indicators */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
            {venueImages.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setCurrentImageIndex(idx)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  idx === currentImageIndex ? 'w-6 bg-[var(--accent-gold)]' : 'w-2 bg-white/50 hover:bg-white/80'
                }`}
                aria-label={`Go to image ${idx + 1}`}
              />
            ))}
          </div>

          <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-primary)] via-[#140409]/40 to-transparent venue-overlay pointer-events-none z-10" />
          
          <div className="absolute bottom-6 left-6 right-6 text-center sm:text-left flex flex-col sm:flex-row sm:items-end justify-between gap-4 z-20 pointer-events-auto">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--brand-crimson-dark)]/80 border border-[var(--accent-gold)]/40 text-[var(--text-primary)] text-xs font-cinzel mb-2 venue-badge-text">
                <MapPin className="w-3.5 h-3.5 text-[var(--accent-gold-light)]" />
                <span>{venue.city}, {venue.state}</span>
              </div>
              <h3 className="font-cinzel-dec text-2xl sm:text-4xl font-bold text-[#ffffff] drop-shadow-lg venue-title">
                {venue.name}
              </h3>
              <p className="text-xs sm:text-sm font-sans text-[var(--text-primary)] mt-1 max-w-xl venue-address">
                {venue.address}
              </p>
            </div>

            <div className="flex flex-wrap gap-3 justify-center">
              <a
                href={venue.googleMapsUrl}
                target="_blank"
                rel="noreferrer"
                data-cursor="MAP"
                className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[var(--accent-gold)] text-[var(--bg-card-dark)] font-cinzel font-bold text-xs tracking-wider uppercase hover:bg-[var(--accent-gold-light)] hover:scale-105 transition-all shadow-lg"
              >
                <Navigation className="w-3.5 h-3.5" />
                Google Maps
              </a>
              <a
                href={venue.appleMapsUrl}
                target="_blank"
                rel="noreferrer"
                className="btn-secondary flex items-center gap-2 px-5 py-2.5 rounded-full font-cinzel text-xs tracking-wider uppercase cursor-pointer"
              >
                <ExternalLink className="w-3.5 h-3.5 text-[var(--accent-gold)] apple-maps-icon" />
                Apple Maps
              </a>
            </div>
          </div>
        </div>

        {/* Travel & Amenities Grid */}
        <div className="p-6 sm:p-8 grid grid-cols-1 sm:grid-cols-2 gap-6 border-t border-[var(--accent-gold)]/20">
          <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-[var(--bg-card)] border border-[var(--accent-gold)]/20">
            <div className="p-2.5 rounded-xl bg-[var(--brand-crimson-dark)]/40 border border-[var(--accent-gold)]/30 text-[var(--accent-gold)] shrink-0">
              <Plane className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-cinzel text-xs font-bold text-[var(--text-secondary)] uppercase">
                By Air
              </h4>
              <p className="text-xs font-sans text-[var(--text-secondary)] mt-1">
                {venue.airportDistance}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-[var(--bg-card)] border border-[var(--accent-gold)]/20">
            <div className="p-2.5 rounded-xl bg-[var(--brand-crimson-dark)]/40 border border-[var(--accent-gold)]/30 text-[var(--accent-gold)] shrink-0">
              <Train className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-cinzel text-xs font-bold text-[var(--text-secondary)] uppercase">
                By Rail
              </h4>
              <p className="text-xs font-sans text-[var(--text-secondary)] mt-1">
                {venue.railwayDistance}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
