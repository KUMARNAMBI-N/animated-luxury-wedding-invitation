import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { useWedding } from '@/context/WeddingContext';

export const CouplePortrait: React.FC = () => {
  const { config } = useWedding();
  const isAnzarFathima = config.id === 'anzar-fathima';

  return (
    <section className="relative w-full bg-[#F9F2E1] py-16 px-4 overflow-hidden flex flex-col items-center">
      {/* Background warm radiance */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-[#DFBD79]/20 blur-3xl pointer-events-none" />

      <div className="w-full max-w-lg mx-auto flex flex-col items-center text-center">
        {/* Vintage Gold Oval Photo Frame (Authentic 964/1211 Aspect Ratio) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 35 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-[88vw] sm:w-[380px] md:w-[400px] max-w-[400px] group"
          style={{ aspectRatio: '964 / 1211' }}
        >
          {/* Subtle gold glow behind frame */}
          <div className="absolute -inset-3 rounded-[48px] bg-gradient-to-r from-[#DFBD79]/25 via-[#C6A15B]/35 to-[#DFBD79]/25 opacity-75 blur-xl group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

          {/* Main Vintage Frame Image */}
          <div className="relative w-full h-full rounded-[38px] overflow-hidden drop-shadow-[0_20px_40px_rgba(61,7,16,0.3)]">
            {isAnzarFathima ? (
              <img
                src="/images/frame-image.png"
                alt="Anzar &amp; Fathima Vintage Gold Portrait"
                className="w-full h-full object-contain select-none transform transition-transform duration-700 group-hover:scale-102"
                draggable="false"
              />
            ) : (
              <div className="relative w-full h-full flex items-center justify-center">
                {/* Couple Portrait Photo Inside Frame */}
                <div
                  className="absolute overflow-hidden rounded-[50%] flex items-center justify-center bg-[#27040A]"
                  style={{
                    left: '18%',
                    top: '14.5%',
                    width: '64%',
                    height: '71%',
                  }}
                >
                  <img
                    src={config.photos.framedPortrait}
                    alt={`${config.couple.formattedNames} Royal Portrait`}
                    className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105"
                  />
                </div>

                {/* Vintage Gold Frame Overlay */}
                <img
                  src="/images/vintage-gold-frame-empty.png"
                  alt="Vintage Gold Frame"
                  className="absolute inset-0 w-full h-full object-contain select-none pointer-events-none z-10"
                  draggable="false"
                />
              </div>
            )}

            {/* Soft Light Sheen Sweep */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/15 to-transparent pointer-events-none transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out z-20" />
          </div>

          {/* Golden Sparkle Badge */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
            className="absolute -top-3 -right-3 text-[#DFBD79] z-20"
          >
            <Sparkles className="w-6 h-6 filter drop-shadow(0 0 8px rgba(223,189,121,0.85))" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default CouplePortrait;
