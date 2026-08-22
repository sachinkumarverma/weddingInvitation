import React, { useState } from 'react';
import { Share2, Copy, Check, QrCode, Instagram } from 'lucide-react';
import { WeddingConfig } from '../types';
import { RoyalCorner, GoldDivider } from './Ornaments';

export const ShareSection: React.FC<{ wedding: WeddingConfig }> = ({ wedding }) => {
  const [copied, setCopied] = useState(false);
  const [showQR, setShowQR] = useState(false);

  const inviteMessage = `✨ Royal Wedding Invitation ✨\n\nYou are cordially invited to celebrate the union of ${wedding.couple.groom.fullName} & ${wedding.couple.bride.fullName} on ${wedding.displayDate} at ${wedding.venue.name}, ${wedding.venue.city}, ${wedding.venue.state}.\n\nExplore our interactive digital invitation: ${window.location.href}\n\n#${wedding.couple.hashtag.replace('#', '')}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleWhatsAppShare = () => {
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(inviteMessage)}`;
    window.open(url, '_blank');
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${wedding.couple.groom.firstName} & ${wedding.couple.bride.firstName} — Royal Wedding Invitation`,
          text: `You are cordially invited to celebrate the union of ${wedding.couple.groom.firstName} & ${wedding.couple.bride.firstName} in ${wedding.venue.city}, ${wedding.venue.state}.`,
          url: window.location.href,
        });
      } catch (e) {
        console.warn('Share cancelled', e);
      }
    } else {
      handleCopyLink();
    }
  };

  return (
    <section className="py-16 px-4 max-w-4xl mx-auto text-center relative">
      <div className="mb-8">
        <p className="font-script text-2xl text-[var(--text-primary)]">Share the Celebration</p>
        <h2 className="font-cinzel text-3xl font-bold text-gold-gradient tracking-wider uppercase mt-1">
          {wedding.couple.hashtag}
        </h2>
        <p className="text-xs sm:text-sm font-sans text-[var(--text-secondary)] max-w-md mx-auto mt-2">
          Tag your joyous moments, dance videos, and regal portraits with our official wedding hashtag!
        </p>
        <GoldDivider variant="diamond" className="max-w-xs mx-auto my-4" />
      </div>

      {/* Share Action Buttons */}
      <div className="flex flex-wrap items-center justify-center gap-4">
        {/* WhatsApp Share */}
        <button
          type="button"
          id="share-whatsapp-btn"
          data-cursor="WHATSAPP"
          onClick={handleWhatsAppShare}
          className="flex items-center gap-2.5 px-6 py-3 rounded-full bg-[#1b5e20] text-[#ffffff] font-cinzel text-xs font-bold tracking-wider uppercase border border-[#81c784]/40 shadow-lg hover:scale-105 hover:bg-[#2e7d32] transition-all cursor-pointer"
        >
          <Share2 className="w-4 h-4" />
          Share via WhatsApp
        </button>

        {/* Copy Link */}
        <button
          type="button"
          id="copy-invite-btn"
          data-cursor="COPY"
          onClick={handleCopyLink}
          className="flex items-center gap-2 px-6 py-3 rounded-full bg-[var(--bg-card)] border border-[var(--accent-gold)]/50 text-[var(--text-secondary)] hover:border-[var(--accent-gold)] hover:bg-[#34111d] font-cinzel text-xs font-semibold tracking-wider uppercase transition-all shadow-md cursor-pointer"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4 text-[var(--accent-gold)]" />
              Link Copied!
            </>
          ) : (
            <>
              <Copy className="w-4 h-4 text-[var(--accent-gold)]" />
              Copy Invitation Link
            </>
          )}
        </button>

        {/* QR Code Modal Toggle */}
        <button
          type="button"
          id="show-qr-code-btn"
          onClick={() => setShowQR(true)}
          className="flex items-center gap-2 px-5 py-3 rounded-full bg-[var(--bg-card)] border border-[var(--accent-gold)]/30 text-[var(--text-secondary)] hover:text-[#ffffff] hover:border-[var(--accent-gold)] font-cinzel text-xs tracking-wider uppercase transition-all cursor-pointer"
        >
          <QrCode className="w-4 h-4 text-[var(--accent-gold)]" />
          Scan QR
        </button>
      </div>

      {/* QR Code Modal */}
      {showQR && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 animate-in fade-in">
          <div className="relative p-8 rounded-3xl bg-[#1c0810] border border-[var(--accent-gold)]/50 max-w-sm text-center shadow-2xl">
            <RoyalCorner position="top-left" />
            <RoyalCorner position="top-right" />
            <RoyalCorner position="bottom-left" />
            <RoyalCorner position="bottom-right" />

            <h3 className="font-cinzel text-lg font-bold text-gold-gradient mb-1">
              Invitation QR Code
            </h3>
            <p className="text-xs font-sans text-[var(--text-secondary)] mb-4">
              Scan with mobile camera to open the invitation
            </p>

            <div className="p-4 bg-white rounded-2xl inline-block border-2 border-[var(--accent-gold)] shadow-inner mb-4">
              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(
                  window.location.href
                )}`}
                alt="Wedding QR Code"
                className="w-44 h-44"
              />
            </div>

            <div className="text-xs font-cinzel text-[var(--accent-gold)] font-bold">
              {wedding.couple.initials} • Bhopal 2026
            </div>

            <button
              type="button"
              onClick={() => setShowQR(false)}
              className="mt-5 px-6 py-2 rounded-full border border-[var(--accent-gold)]/40 text-[var(--text-secondary)] text-xs font-cinzel hover:bg-[var(--accent-gold)]/10"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </section>
  );
};
