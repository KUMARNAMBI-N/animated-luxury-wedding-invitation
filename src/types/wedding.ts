export interface GalleryPhoto {
  id: number;
  src: string;
  caption: string;
}

export interface WeddingConfig {
  id: string; // 'hafiz-aisha' | 'anzar-fathima'
  pageTitle: string;
  metaDescription: string;
  
  // Couple Info
  couple: {
    groom: string;
    bride: string;
    formattedNames: string; // e.g. "Hafiz & Aisha"
  };

  // Branding
  brand: {
    name: string; // "BEYOND CARDS"
    tagline: string;
    websiteUrl?: string;
  };

  // Event Details
  event: {
    title: string; // e.g. "Wedding Celebration" or "Walima"
    dateString: string; // e.g. "2026-11-20" or pending
    formattedDate: string; // e.g. "28 Jun 2026" or "[Wedding Date]"
    dayOfWeek: string; // e.g. "SUNDAY" or "[Day]"
    time: string; // e.g. "11:30 AM" or "[Time]"
    targetIsoDate?: string; // ISO string for countdown or undefined if pending
    hasConfirmedDate: boolean;
  };

  // Venue Details
  venue: {
    name: string;
    address: string;
    mapQuery: string;
    illustration?: string;
  };

  // RSVP Details
  rsvp: {
    deadlineText: string; // e.g. "Kindly Let Us Know By 26th Of June"
    contactPhone: string; // WhatsApp number
    whatsappDefaultMessage: string;
  };

  // Messages & Story
  messages: {
    heroTagline: string; // "Save the Date"
    invitationMessage: string;
    storyHeading?: string;
    storySubheading?: string;
    storyQuote: string;
  };

  // Blessings & Dua
  blessings: {
    arabicDua: string;
    englishTranslation: string;
    gratitudeText: string;
  };

  // Couple Photographs
  photos: {
    storyPhoto: string;
    framedPortrait: string;
    gallery: GalleryPhoto[];
  };

  // Ambient Audio
  music: {
    title: string;
  };
}

