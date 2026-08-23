import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import { WeddingConfig } from '../types';
import { RoyalCorner, GoldDivider } from './Ornaments';

export const GallerySection: React.FC<{ wedding: WeddingConfig }> = ({ wedding }) => {
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);
  const [category, setCategory] = useState<string>('all');

  const filteredPhotos = category === 'all'
    ? wedding.gallery
    : wedding.gallery.filter(p => p.category === category);

  const availableCategories = Array.from(new Set(wedding.gallery.map(p => p.category)));

  // Keyboard navigation for Lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedPhotoIndex === null) return;
      if (e.key === 'Escape') setSelectedPhotoIndex(null);
      if (e.key === 'ArrowRight') {
        setSelectedPhotoIndex((prev) => (prev! + 1) % filteredPhotos.length);
      }
      if (e.key === 'ArrowLeft') {
        setSelectedPhotoIndex((prev) => (prev! - 1 + filteredPhotos.length) % filteredPhotos.length);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedPhotoIndex, filteredPhotos.length]);

  // Lock body scroll when Lightbox is open
  useEffect(() => {
    if (selectedPhotoIndex !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [selectedPhotoIndex]);

  return (
    <section className="py-20 px-4 max-w-6xl mx-auto relative">
      <div className="text-center mb-12">
        <p className="font-script text-2xl sm:text-3xl text-[var(--text-primary)]">
          Captured in Golden Light
        </p>
        <h2 className="font-cinzel text-3xl sm:text-4xl font-bold text-gold-gradient tracking-wider uppercase mt-1">
          Moments & Memories
        </h2>
        <p className="text-xs sm:text-sm font-sans text-[var(--text-secondary)] max-w-md mx-auto mt-2">
          Glimpses into our shared laughter, quiet whispers, and the timeless beauty of our journey.
        </p>
        <GoldDivider variant="lotus" className="max-w-xs mx-auto my-4" />

        {/* Category Filters */}
        {availableCategories.length > 1 && (
          <div className="flex flex-wrap items-center justify-center gap-2 mt-5">
            {['all', ...availableCategories].map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-xs font-cinzel tracking-wider uppercase transition-all cursor-pointer ${
                  category === cat
                    ? 'bg-[var(--accent-gold)] text-[var(--bg-card-dark)] font-bold shadow-[0_0_15px_rgba(212,175,55,0.4)]'
                    : 'bg-[var(--bg-card)]/60 text-[var(--text-secondary)] border border-[var(--accent-gold)]/30 hover:border-[var(--accent-gold)]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Editorial Masonry Gallery Grid */}
      <div 
        className={`grid gap-5 mx-auto ${
          filteredPhotos.length === 1 
            ? 'grid-cols-1 max-w-md' 
            : filteredPhotos.length === 2
            ? 'grid-cols-1 sm:grid-cols-2 max-w-5xl'
            : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
        }`}
      >
        {filteredPhotos.map((photo, index) => {
          const isSpanTwo = photo.aspectRatio === 'wide' || index === 2;

          return (
            <div
              key={photo.id}
              onClick={() => setSelectedPhotoIndex(index)}
              data-cursor="VIEW"
              className={`relative rounded-2xl overflow-hidden border border-[var(--accent-gold)]/30 bg-[var(--bg-card)] group cursor-pointer shadow-lg hover:border-[var(--accent-gold)] hover:shadow-[0_15px_35px_rgba(212,175,55,0.2)] transition-all duration-500 ${
                isSpanTwo ? 'sm:col-span-2' : ''
              } ${photo.aspectRatio === 'portrait' ? 'h-[480px]' : 'h-72'}`}
            >
              <img
                src={photo.url}
                alt={photo.title}
                referrerPolicy="no-referrer"
                style={{ objectPosition: photo.objectPosition || 'center' }}
                className="w-full h-full object-cover filter brightness-95 contrast-105 group-hover:scale-108 transition-transform duration-700"
              />

              {/* Gold Gradient Overlay on Hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-primary)] via-[#140409]/20 to-transparent opacity-80 group-hover:opacity-95 transition-opacity duration-300 pointer-events-none gallery-gradient" />

              {/* Photo Title & Caption */}
              <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                <div>
                  <h3 className="font-cinzel text-base sm:text-lg font-bold text-white drop-shadow-md gallery-title">
                    {photo.title}
                  </h3>
                  <p className="font-script text-sm text-[#ca8a04] gallery-subtitle">
                    {photo.subtitle}
                  </p>
                </div>
                <div className="w-8 h-8 rounded-full bg-[var(--accent-gold)]/20 border border-[var(--accent-gold)]/60 flex items-center justify-center text-[var(--accent-gold)] group-hover:bg-[var(--accent-gold)] group-hover:text-[#140409] transition-all">
                  <Maximize2 className="w-4 h-4" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Full-screen Lightbox Modal via Portal */}
      {selectedPhotoIndex !== null && createPortal(
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-2xl p-4 animate-in fade-in duration-200"
          onClick={() => setSelectedPhotoIndex(null)}
        >
          <button
            type="button"
            id="lightbox-close-button"
            aria-label="Close Lightbox"
            onClick={(e) => { e.stopPropagation(); setSelectedPhotoIndex(null); }}
            className="hidden sm:flex absolute top-6 right-6 z-50 p-2.5 rounded-full bg-[var(--bg-card)]/80 border border-[var(--accent-gold)]/40 text-[var(--accent-gold)] hover:scale-110 hover:border-[var(--accent-gold)] transition-all cursor-pointer shadow-lg"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Previous Button */}
          <button
            type="button"
            aria-label="Previous Photo"
            onClick={(e) => {
              e.stopPropagation();
              setSelectedPhotoIndex((prev) => (prev! - 1 + filteredPhotos.length) % filteredPhotos.length);
            }}
            className="absolute left-2 sm:left-8 z-50 p-2 sm:p-3 rounded-full bg-[var(--bg-card)]/80 border border-[var(--accent-gold)]/40 text-[var(--accent-gold)] hover:scale-110 hover:border-[var(--accent-gold)] transition-all cursor-pointer shadow-lg"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          {/* Next Button */}
          <button
            type="button"
            aria-label="Next Photo"
            onClick={(e) => {
              e.stopPropagation();
              setSelectedPhotoIndex((prev) => (prev! + 1) % filteredPhotos.length);
            }}
            className="absolute right-2 sm:right-8 z-50 p-2 sm:p-3 rounded-full bg-[var(--bg-card)]/80 border border-[var(--accent-gold)]/40 text-[var(--accent-gold)] hover:scale-110 hover:border-[var(--accent-gold)] transition-all cursor-pointer shadow-lg"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          {/* Image & Caption Container */}
          <div 
            className="max-w-4xl max-h-[85vh] flex flex-col items-center relative z-10 mt-6 sm:mt-0"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Mobile Close Button (Positioned just above the image) */}
            <button
              type="button"
              aria-label="Close Lightbox"
              onClick={(e) => { e.stopPropagation(); setSelectedPhotoIndex(null); }}
              className="sm:hidden self-end mb-3 p-2 rounded-full bg-[var(--bg-card)]/80 border border-[var(--accent-gold)]/40 text-[var(--accent-gold)] cursor-pointer shadow-lg"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative rounded-2xl overflow-hidden border-2 border-[var(--accent-gold)]/60 shadow-[0_20px_60px_rgba(0,0,0,0.9)] max-h-[70vh]">
              <RoyalCorner position="top-left" />
              <RoyalCorner position="top-right" />
              <img
                src={filteredPhotos[selectedPhotoIndex].url}
                alt={filteredPhotos[selectedPhotoIndex].title}
                referrerPolicy="no-referrer"
                className="max-h-[70vh] w-auto object-contain rounded-2xl"
              />
            </div>

            <div className="text-center mt-4">
              <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-gold-gradient">
                {filteredPhotos[selectedPhotoIndex].title}
              </h3>
              <p className="font-script text-base sm:text-lg text-[var(--text-primary)] mt-0.5">
                {filteredPhotos[selectedPhotoIndex].subtitle}
              </p>
              <div className="text-[11px] font-sans text-[var(--accent-gold)]/70 mt-1">
                {selectedPhotoIndex + 1} of {filteredPhotos.length}
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}
    </section>
  );
};
