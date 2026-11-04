import { WeddingConfig } from '@/types/wedding';

/**
 * Wedding Configuration for A & A
 * Brand: Beyond Cards
 *
 * All couple-specific details, wedding dates, venue, contact information,
 * and photographs are centralized here and can be updated as the user provides them.
 */
export const hafizAishaConfig: WeddingConfig = {
  id: 'hafiz-aisha',
  pageTitle: 'A & A – Royal Wedding Invitation | Beyond Cards',
  metaDescription:
    'In the name of Allah, the Most Gracious, the Most Merciful. We cordially invite you to celebrate the wedding union of A and A.',

  // Couple Names
  couple: {
    groom: 'A',
    bride: 'A',
    formattedNames: 'A & A',
  },

  // Beyond Cards Branding
  brand: {
    name: 'BEYOND CARDS',
    tagline: 'Luxury Bespoke Digital Invitations',
    websiteUrl: 'https://beyondcards.luxury',
  },

  // Wedding Event Schedule
  // NOTE: Keep configurable until final dates are supplied by the user.
  event: {
    title: 'Wedding Celebration', // e.g. "Nikah & Walima" or "Wedding Celebration"
    dateString: '2026-11-20', // Default pending date for live countdown testing
    formattedDate: 'Date To Be Announced', // Display string until finalized
    dayOfWeek: 'Celebration Day',
    time: 'Time To Be Announced',
    targetIsoDate: '2026-11-20T11:30:00+05:30', // Valid upcoming ISO date for countdown reel
    hasConfirmedDate: false, // Flag indicating whether final date is locked in
  },

  // Venue Location
  venue: {
    name: 'Venue To Be Announced',
    address: 'Location details will be shared soon',
    mapQuery: 'Luxury Wedding Convention Centre',
    illustration: '/images/our-story/the-venue.png',
  },

  // RSVP Configuration
  rsvp: {
    deadlineText: 'RSVP details and deadline to be announced soon',
    contactPhone: '+919999999999', // Configurable contact phone
    whatsappDefaultMessage: 'Salam! We received the wedding invitation for A & A.',
  },

  // Wedding & Story Messages
  messages: {
    heroTagline: 'Save the Date',
    invitationMessage:
      'In the name of Allah, the Most Gracious, the Most Merciful. With the blessings of our parents and families, we joyfully invite you to witness and celebrate the sacred union of our hearts. Your prayers and presence will grace our celebration.',
    storyHeading: 'Our Story',
    storySubheading: 'WRITTEN IN THE STARS',
    storyQuote:
      'In the tapestry of life, Allah wrote a beautiful new beginning for our hearts to meet and journey together forever.',
  },

  // Duas & Blessings
  blessings: {
    arabicDua: 'بَارَكَ اللَّهُ لَكُمَا وَبَارَكَ عَلَيْكُمَا وَجَمَعَ بَيْنَكُمَا فِي خَيْرٍ',
    englishTranslation:
      'May Allah bless you both, shower His blessings upon you, and unite you in goodness.',
    gratitudeText:
      'With grateful hearts and prayers, we eagerly look forward to celebrating this blessed new chapter with you.',
  },

  // Photographs - Dedicated separate directory for Hafiz & Aisha
  // No photographs belonging to Anzar and Fathima are referenced here!
  photos: {
    storyPhoto: '/couples/hafiz-aisha/our-story.png',
    framedPortrait: '/couples/hafiz-aisha/portrait.png',
    gallery: [
      { id: 1, src: '/couples/hafiz-aisha/gallery-1.png', caption: 'Moments of Serenity' },
      { id: 2, src: '/couples/hafiz-aisha/gallery-2.png', caption: 'Together in Grace' },
      { id: 3, src: '/couples/hafiz-aisha/gallery-3.png', caption: 'A Sacred Promise' },
      { id: 4, src: '/couples/hafiz-aisha/gallery-4.png', caption: 'Joyful Beginnings' },
      { id: 5, src: '/couples/hafiz-aisha/gallery-5.png', caption: 'Bound by Faith' },
      { id: 6, src: '/couples/hafiz-aisha/gallery-6.png', caption: 'Timeless Elegance' },
      { id: 7, src: '/couples/hafiz-aisha/gallery-7.png', caption: 'Whispers of Love' },
      { id: 8, src: '/couples/hafiz-aisha/gallery-8.png', caption: 'Forever & Always' },
    ],
  },

  // Ambient Music
  music: {
    title: 'A & A Royal Wedding Theme',
  },
};

export default hafizAishaConfig;

