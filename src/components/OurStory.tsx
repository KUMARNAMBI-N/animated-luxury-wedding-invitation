import React from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { useWedding } from '@/context/WeddingContext';

export const OurStory: React.FC = () => {
  const { config } = useWedding();

  return (
    <section className="relative w-full bg-[#F9F2E1] py-14 sm:py-16 px-4 overflow-hidden">
      {/* Decorative floral background ornaments */}
      <div className="absolute top-0 right-0 w-44 sm:w-56 h-44 sm:h-56 opacity-30 pointer-events-none select-none">
        <img src="/images/floral.png" alt="" className="w-full h-full object-contain" />
      </div>
      <div className="absolute bottom-0 left-0 w-44 sm:w-56 h-44 sm:h-56 opacity-30 pointer-events-none select-none rotate-180">
        <img src="/images/floral.png" alt="" className="w-full h-full object-contain" />
      </div>

      <div className="w-full max-w-lg mx-auto flex flex-col items-center text-center">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center mb-6"
        >
          <span className="font-helvetica text-[9px] sm:text-[10px] tracking-[0.3em] uppercase text-[#6B0D1D]/75 font-semibold">
            {config.messages.storySubheading || 'Destined by Grace'}
          </span>
          <h2 className="font-normal font-vivaldi text-4xl sm:text-5xl text-[#6B0D1D] mt-1 mb-2">
            {config.messages.storyHeading || 'Our Story'}
          </h2>
          <div className="flex items-center gap-2">
            <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-[#C6A15B]" />
            <Heart className="w-3.5 h-3.5 text-[#C6A15B] fill-[#C6A15B]/40" />
            <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-[#C6A15B]" />
          </div>
        </motion.div>

        {/* Romantic Photo Composition */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 25 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full flex items-center justify-center my-2 group"
        >
          <div className="relative w-full max-w-md rounded-2xl overflow-hidden shadow-2xl border border-[#C6A15B]/30 bg-[#FAF8F5]">
            <img
              src={config.photos.storyPhoto}
              alt={`${config.couple.formattedNames} Story Portrait`}
              className="w-full h-auto object-contain transform transition-transform duration-700 group-hover:scale-103"
            />
            {/* Subtle light sheen */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#3D0710]/20 via-transparent to-transparent pointer-events-none" />
          </div>
        </motion.div>

        {/* Romantic Story Quote */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="mt-6 px-4 max-w-sm sm:max-w-md"
        >
          <p className="font-vivre text-lg sm:text-xl text-[#5A0C19] text-center leading-relaxed font-normal">
            {config.messages.storyQuote}
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default OurStory;
