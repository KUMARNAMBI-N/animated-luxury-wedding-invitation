import { WeddingConfig } from '@/types/wedding';

export const anzarFathimaConfig: WeddingConfig = {
  id: 'anzar-fathima',
  pageTitle: 'Anzar & Fathima – Royal Wedding Invitation | Beyond Cards',
  metaDescription:
    'With the blessings of Allah and our families, we joyfully invite you to celebrate the wedding of Anzar and Fathima on 28th June 2026.',

  couple: {
    groom: 'Anzar',
    bride: 'Fathima',
    formattedNames: 'Anzar & Fathima',
  },

  brand: {
    name: 'BEYOND CARDS',
    tagline: 'Luxury Bespoke Digital Invitations',
    websiteUrl: 'https://beyondcards.luxury',
  },

  event: {
    title: 'Walima',
    dateString: '2026-06-28',
    formattedDate: '28 Jun 2026',
    dayOfWeek: 'SUNDAY',
    time: '11:30 AM',
    targetIsoDate: '2026-06-28T11:30:00+05:30',
    hasConfirmedDate: true,
  },

  venue: {
    name: 'Rashaj Convention Centre',
    address: 'Chempakamangalam Thonnakkal',
    mapQuery: 'Rashaj Convention Centre Chempakamangalam Thonnakkal',
    illustration: '/images/our-story/the-venue.png',
  },

  rsvp: {
    deadlineText: 'Kindly Let Us Know By 26th Of June, So We can save you a spot',
    contactPhone: '+919876543210',
    whatsappDefaultMessage: 'Salam! We received the wedding invitation for Anzar & Fathima.',
  },

  messages: {
    heroTagline: 'Save the Date',
    invitationMessage:
      'With the blessings of Allah and our families, we joyfully invite you to celebrate the beginning of our forever. Your presence, prayers, and blessings will make our celebration truly memorable.',
    storyHeading: 'Our Story',
    storySubheading: 'DESTINED BY GRACE',
    storyQuote:
      "He Wasn't Looking For A Story. Neither Was She. Yet Allah Had Already Written The Most Beautiful Chapter For Them Both.",
  },

  blessings: {
    arabicDua: 'بَارَكَ اللَّهُ لَكُمَا وَبَارَكَ عَلَيْكُمَا وَجَمَعَ بَيْنَكُمَا فِي خَيْرٍ',
    englishTranslation:
      'May Allah bless you both, shower His blessings upon you, and unite you in goodness.',
    gratitudeText:
      'With grateful hearts, we seek your prayers and blessings as we begin our forever together.',
  },

  photos: {
    storyPhoto: '/images/our-story-photo.png',
    framedPortrait: '/couple/1.png',
    gallery: [
      { id: 1, src: '/couple/1.png', caption: 'Moments of Grace' },
      { id: 2, src: '/couple/2.png', caption: 'Together in Faith' },
      { id: 3, src: '/couple/3.png', caption: 'Laughter & Warmth' },
      { id: 4, src: '/couple/4.png', caption: 'A Beautiful Promise' },
      { id: 5, src: '/couple/5.png', caption: 'Hand in Hand' },
      { id: 7, src: '/couple/7.png', caption: 'Cherished Memories' },
      { id: 8, src: '/couple/8.png', caption: 'Royal Elegance' },
      { id: 9, src: '/couple/9.png', caption: 'Serenity & Love' },
      { id: 10, src: '/couple/10.png', caption: 'Destined Path' },
      { id: 11, src: '/couple/11.png', caption: 'Whispers of Joy' },
      { id: 12, src: '/couple/12.png', caption: 'Unwavering Bonds' },
      { id: 13, src: '/couple/13.png', caption: 'Forever & Always' },
    ],
  },

  music: {
    title: 'Wedding Ambient Melody',
  },
};

export default anzarFathimaConfig;

