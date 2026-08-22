export interface WeddingEvent {
  id: string;
  name: string;
  subTitle?: string;
  date: string;
  time: string;
  venue: string;
  address: string;
  dressCode: string;
  motif: 'haldi' | 'mehendi' | 'wedding' | 'reception' | 'pooja';
  description: string;
  coordinates?: { lat: number; lng: number };
  themeColor: string;
  image: string;
  images?: string[];
}

export interface StoryMilestone {
  year: string;
  title: string;
  subtitle: string;
  description: string;
  image?: string;
  location?: string;
}

export interface GalleryPhoto {
  id: string;
  url: string;
  title: string;
  subtitle: string;
  category: 'portraits' | 'moments' | 'travel' | 'celebration';
  aspectRatio: 'portrait' | 'landscape' | 'square' | 'wide';
  objectPosition?: string;
}

export interface GuestWish {
  id: string;
  name: string;
  relationship: string;
  message: string;
  date: string;
  avatarColor?: string;
}

export interface RSVPData {
  name: string;
  email: string;
  phone: string;
  attending: 'yes' | 'no' | 'undecided';
  guestCount: number;
  events: string[];
  dietary: string;
  hotelNeeded: boolean;
  message: string;
  submittedAt?: string;
}

export type WeddingThemeId = 'royal' | 'modern' | 'floral' | 'palace' | 'minimal';

export interface WeddingTheme {
  id: WeddingThemeId;
  name: string;
  subtitle: string;
  bgGradient: string;
  cardBg: string;
  accentGold: string;
  accentCrimson: string;
  textColor: string;
  secondaryText: string;
  borderSubtle: string;
}

export interface WeddingConfig {
  couple: {
    groom: {
      firstName: string;
      fullName: string;
      title: string;
      parents: string;
      image: string;
    };
    bride: {
      firstName: string;
      fullName: string;
      title: string;
      parents: string;
      image: string;
    };
    initials: string;
    hashtag: string;
    quote: string;
  };
  weddingDate: string; // ISO format: 2026-12-18T19:00:00
  displayDate: string;
  venue: {
    name: string;
    subtitle: string;
    city: string;
    state: string;
    country: string;
    address: string;
    googleMapsUrl: string;
    appleMapsUrl: string;
    image: string;
    cityImage?: string;
    airportDistance: string;
    railwayDistance: string;
  };
  story: StoryMilestone[];
  events: WeddingEvent[];
  gallery: GalleryPhoto[];
  dressCode: {
    title: string;
    tagline: string;
    description: string;
    palettes: { name: string; hex: string; desc: string }[];
    groomInspo: { title: string; desc: string; image: string }[];
    brideInspo: { title: string; desc: string; image: string }[];
  };
  familyBlessings: {
    shlokaSanskrit: string;
    shlokaEnglish: string;
    patrons: { family: string; members: string[] }[];
  };
}
