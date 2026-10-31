import React from 'react';
import { motion } from 'framer-motion';
import { useWedding } from '@/context/WeddingContext';

export const Blessings: React.FC = () => {
  const { config } = useWedding();

  return (
    <section className="relative w-full bg-[#F9F2E1] pt-4 pb-0 overflow-hidden flex flex-col items-center">
      <div className="w-full max-w-lg px-4 sm:px-5 pb-4">
        {/* Authentic Radial Burgundy Closing Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 25 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="relative rounded-[2.5rem] overflow-hidden shadow-2xl"
          style={{ background: 'radial-gradient(ellipse at center, #7a1020 0%, #4a0812 100%)' }}
        >
          {/* Inner hairline border */}
          <div
            className="absolute inset-3 rounded-[1.75rem] pointer-events-none"
            style={{ border: '1px solid rgba(255,255,255,0.15)' }}
          />

          {/* Card Content */}
          <div className="relative z-10 flex flex-col items-center text-center text-white px-8 sm:px-12 py-12 sm:py-14 gap-0">
            {/* Arabic Dua */}
            <p
              className="text-[1.35rem] sm:text-[1.45rem] leading-loose tracking-wide font-arabic"
              dir="rtl"
              lang="ar"
            >
              {config.blessings.arabicDua}
            </p>

            {/* Subtle Divider 1 */}
            <div className="flex items-center gap-3 my-5 w-40 opacity-40">
              <div className="flex-1 h-px bg-white" />
              <span className="text-xs">✦</span>
              <div className="flex-1 h-px bg-white" />
            </div>

            {/* English Translation */}
            <p className="font-helvetica text-sm leading-relaxed max-w-[280px] opacity-85 tracking-wide">
              {config.blessings.englishTranslation}
            </p>

            {/* Gratitude Subtext */}
            <p className="font-helvetica text-xs leading-relaxed max-w-[260px] opacity-60 mt-4 italic">
              {config.blessings.gratitudeText}
            </p>

            {/* Subtle Divider 2 */}
            <div className="flex items-center gap-3 my-5 w-40 opacity-40">
              <div className="flex-1 h-px bg-white" />
              <span className="text-xs">✦</span>
              <div className="flex-1 h-px bg-white" />
            </div>

            {/* Couple Names */}
            <p className="font-vivaldi text-4xl sm:text-5xl font-normal text-[#F9F2E1] drop-shadow-[0_2px_12px_rgba(223,189,121,0.5)]">
              {config.couple.formattedNames}
            </p>
          </div>
        </motion.div>
      </div>

      {/* Decorative Full-Width Footer Art Banner */}
      <div className="w-full mt-2">
        <img
          src="/images/footer.png"
          alt="Royal Footer Arch"
          className="w-full h-auto block select-none"
          draggable="false"
        />
      </div>
    </section>
  );
};

export default Blessings;
