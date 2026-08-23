import React, { useState, useEffect } from 'react';
import { Share2, Copy, Check, QrCode } from 'lucide-react';
import { WeddingConfig } from '../types';
import { RoyalCorner, GoldDivider } from './Ornaments';

export const ShareSection: React.FC<{ wedding: WeddingConfig }> = ({ wedding }) => {
  const [copied, setCopied] = useState(false);
  const [showQR, setShowQR] = useState(false);

  useEffect(() => {
    if (showQR) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [showQR]);

  const shareUrl = "https://harshita-weds-satyam.vercel.app";
  const inviteMessage = `🪔 *॥ श्री गणेशाय नमः ॥* 🪔

✨ *शुभ विवाह* ✨

With the blessings of our beloved families,

💍 *${wedding.couple.groom.fullName}*
&
🌸 *${wedding.couple.bride.fullName}*

cordially invite you to grace the auspicious occasion of their wedding and bless them as they begin their journey of *love, togetherness & forever*. ❤️

_“May this new beginning be filled with endless happiness, love and countless beautiful memories.”_ ✨

🌺 *आपकी गरिमामयी उपस्थिति एवं शुभाशीर्वाद हमारे लिए अत्यंत महत्वपूर्ण हैं।* 🌺

💌 *You are warmly invited to our wedding celebration.*

Please open our *digital wedding invitation* to discover the complete details of the celebrations:

👇✨
${shareUrl}
✨👇

With heartfelt love,  
❤️ *${wedding.couple.groom.firstName} & ${wedding.couple.bride.firstName}* ❤️

_We look forward to celebrating this beautiful beginning with you._ 🥂🌸`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleWhatsAppShare = () => {
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(inviteMessage)}`;
    window.open(url, '_blank');
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
          className="btn-primary btn-whatsapp flex items-center gap-2.5 px-6 py-3 rounded-full font-cinzel text-xs tracking-wider uppercase cursor-pointer"
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
          className="btn-secondary flex items-center gap-2 px-6 py-3 rounded-full font-cinzel text-xs tracking-wider uppercase cursor-pointer"
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
          className="btn-secondary flex items-center gap-2 px-5 py-3 rounded-full font-cinzel text-xs tracking-wider uppercase cursor-pointer"
        >
          <QrCode className="w-4 h-4 text-[var(--accent-gold)]" />
          Scan QR
        </button>
      </div>

      {/* QR Code Modal */}
      {showQR && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 animate-in fade-in">
          <div className="relative p-8 md:p-12 rounded-3xl bg-[var(--bg-card)] border border-[var(--accent-gold)]/50 max-w-sm md:max-w-lg w-full text-center shadow-2xl transition-all duration-300">
            <RoyalCorner position="top-left" />
            <RoyalCorner position="top-right" />
            <RoyalCorner position="bottom-left" />
            <RoyalCorner position="bottom-right" />

            <h3 className="font-cinzel text-lg md:text-2xl font-bold text-gold-gradient mb-1">
              Invitation QR Code
            </h3>
            <p className="text-xs md:text-sm font-sans text-[var(--text-secondary)] mb-4 md:mb-6">
              Scan with mobile camera to open the invitation
            </p>

            <div className="p-4 md:p-6 bg-white rounded-2xl inline-block border-2 border-[var(--accent-gold)] shadow-inner mb-4 md:mb-6 transition-all duration-300">
              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(
                  shareUrl
                )}`}
                alt="Wedding QR Code"
                className="w-44 h-44 md:w-64 md:h-64 object-contain"
              />
            </div>

            <div className="text-xs md:text-sm font-cinzel text-[var(--accent-gold)] font-bold tracking-widest">
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
