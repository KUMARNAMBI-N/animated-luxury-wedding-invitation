import React from 'react';
import { motion } from 'framer-motion';
import { Heart, ArrowUp, Sparkles } from 'lucide-react';
import { useWedding } from '@/context/WeddingContext';

export const Footer: React.FC = () => {
  const { config } = useWedding();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative w-full bg-[#1F0308] py-12 px-4 text-[#F9F2E1]/80 border-t border-[#C6A15B]/30 flex flex-col items-center text-center">
      <div className="max-w-xl mx-auto flex flex-col items-center">
        {/* Beyond Cards Luxury Emblem */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="w-14 h-14 mb-4 filter drop-shadow-[0_4px_16px_rgba(223,189,121,0.6)] cursor-pointer"
          onClick={scrollToTop}
        >
          <img
            src="/beyond-cards.svg"
            alt="Beyond Cards Luxury Emblem"
            className="w-full h-full object-contain"
          />
        </motion.div>

        {/* Beyond Cards Wordmark */}
        <div className="flex flex-col items-center mb-5">
          <span className="font-serif tracking-[0.35em] text-xs sm:text-[13px] uppercase text-[#FFF5D1] font-semibold">
            {config.brand.name}
          </span>
          <span className="font-helvetica tracking-[0.25em] text-[9px] uppercase text-[#DFBD79]/70 mt-0.5">
            {config.brand.tagline}
          </span>
        </div>

        <div className="w-16 h-px bg-gradient-to-r from-transparent via-[#C6A15B]/60 to-transparent mb-5" />

        {/* Royal Couple Signature */}
        <p className="font-vivaldi text-3xl sm:text-4xl text-[#DFBD79] drop-shadow-sm">
          {config.couple.formattedNames}
        </p>

        {/* Celebrating eternal love */}
        <div className="flex items-center gap-2 mt-2 text-xs font-helvetica text-[#F9F2E1]/70">
          <span>Celebrating eternal love</span>
          <motion.div
            animate={{ scale: [1, 1.25, 1] }}
            transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          >
            <Heart className="w-3.5 h-3.5 text-[#DFBD79] fill-[#DFBD79]" />
          </motion.div>
          <span>{config.event.formattedDate}</span>
        </div>

        {/* Back to top button */}
        <button
          onClick={scrollToTop}
          className="mt-6 flex items-center gap-1.5 text-[11px] font-helvetica uppercase tracking-widest text-[#C6A15B] hover:text-[#DFBD79] transition-all py-2 px-5 rounded-full border border-[#C6A15B]/40 hover:border-[#DFBD79] bg-white/5 hover:bg-white/10 shadow-lg"
        >
          <ArrowUp className="w-3.5 h-3.5" />
          <span>Back to Top</span>
        </button>

        {/* Minimal Royal Copyright */}
        <p className="font-helvetica text-[10px] text-[#F9F2E1]/45 mt-8 tracking-wider">
          &copy; 2026 {config.couple.formattedNames} &bull; Bespoke Invitation by {config.brand.name}.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
