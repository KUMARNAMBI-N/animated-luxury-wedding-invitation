import React, { useState } from 'react';
import { WeddingProvider, useWedding } from '@/context/WeddingContext';
import Preloader from '@/components/Preloader';
import Hero from '@/components/Hero';
import OurStory from '@/components/OurStory';
import PhotoGallery from '@/components/PhotoGallery';
import Celebration from '@/components/Celebration';
import Venue from '@/components/Venue';
import CouplePortrait from '@/components/CouplePortrait';
import RSVP from '@/components/RSVP';
import Blessings from '@/components/Blessings';
import Footer from '@/components/Footer';
import MusicPlayer from '@/components/MusicPlayer';
import { Crown, Sparkles } from 'lucide-react';

const InvitationApp: React.FC = () => {
  const { config, activeCoupleId, setCouple, availableCouples } = useWedding();
  const [preloaderFinished, setPreloaderFinished] = useState(false);
  const [switcherOpen, setSwitcherOpen] = useState(false);

  return (
    <div className="min-h-screen w-full bg-[#F4EFE6] text-[#33251E] flex flex-col justify-start items-center overflow-x-hidden antialiased selection:bg-[#C6A15B]/30 selection:text-[#650B1B] relative">
      {/* Cinematic Opening Preloader */}
      <Preloader onComplete={() => setPreloaderFinished(true)} />

      {/* Floating Music Ambient Control */}
      <MusicPlayer />

      {/* 
        Independent Invitation Switcher Pill:
        Enables seamless switching between A & A (default) and Anzar & Fathima
      */}
      <div className="fixed top-4 right-4 z-40">
        <div className="relative">
          <button
            onClick={() => setSwitcherOpen(!switcherOpen)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#27040A]/85 backdrop-blur-md border border-[#DFBD79]/40 text-[#DFBD79] hover:border-[#DFBD79] transition-all shadow-xl text-[11px] font-helvetica tracking-wider"
            title="Switch Wedding Invitation"
          >
            <Crown className="w-3.5 h-3.5 text-[#DFBD79]" />
            <span className="font-medium">{config.couple.formattedNames}</span>
          </button>

          {switcherOpen && (
            <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-[#27040A] border border-[#DFBD79]/50 shadow-2xl p-2 text-left z-50 animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="px-3 py-1.5 border-b border-white/10 mb-1">
                <span className="text-[9px] font-helvetica tracking-widest text-[#DFBD79]/70 uppercase">
                  Select Invitation
                </span>
              </div>
              {availableCouples.map((c) => (
                <button
                  key={c.id}
                  onClick={() => {
                    setCouple(c.id);
                    setSwitcherOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-helvetica transition-all ${
                    activeCoupleId === c.id
                      ? 'bg-[#6B0D1D] text-[#FFF8E7] font-semibold'
                      : 'text-white/80 hover:bg-white/10'
                  }`}
                >
                  <span>{c.name}</span>
                  {activeCoupleId === c.id && <Sparkles className="w-3 h-3 text-[#DFBD79]" />}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* 
        Main Invitation Container:
        - 100% full viewport width on mobile (zero side margins).
        - Centered & luxuriously proportioned (480px - 495px) on desktop & tablet.
        - Warm ivory backdrop outside the card.
      */}
      <main className="w-full sm:w-[480px] md:w-[495px] max-w-full bg-[#F9F2E1] min-h-screen sm:my-6 md:my-8 sm:rounded-[36px] sm:border sm:border-[#C6A15B]/35 shadow-[0_25px_80px_rgba(61,7,16,0.2)] flex flex-col relative overflow-hidden transition-all duration-300">
        {/* Section 1: Hero & Countdown Experience */}
        <Hero />

        {/* Section 2: Our Story */}
        <OurStory />

        {/* Section 3: Photo Gallery */}
        <PhotoGallery />

        {/* Section 4: The Celebrations (Walima Invitation Banner) */}
        <Celebration />

        {/* Section 5: The Venue (Palace Illustration & Map) */}
        <Venue />

        {/* Section 6: Couple Portrait (Vintage Gold Oval Frame) */}
        <CouplePortrait />

        {/* Section 7: RSVP (Interactive Response System) */}
        <RSVP />

        {/* Section 8: Final Blessings (Closing Card & Arabic Dua) */}
        <Blessings />

        {/* Section 9: Footer */}
        <Footer />
      </main>
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <WeddingProvider>
      <InvitationApp />
    </WeddingProvider>
  );
};

export default App;
