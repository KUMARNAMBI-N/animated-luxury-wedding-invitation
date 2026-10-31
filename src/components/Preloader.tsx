import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { useWedding } from '@/context/WeddingContext';

interface PreloaderProps {
  onComplete: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const { config } = useWedding();
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsVisible(false);
            onComplete();
          }, 400);
          return 100;
        }
        const increment = Math.floor(Math.random() * 8) + 4;
        return Math.min(prev + increment, 100);
      });
    }, 50);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#F9F2E1] px-6 select-none"
        >
          {/* Subtle gold aura */}
          <div className="absolute w-72 h-72 rounded-full bg-[#DFBD79]/20 blur-3xl pointer-events-none" />

          {/* Names */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center text-center"
          >
            <div className="flex items-center gap-2 mb-3 text-[#C6A15B]">
              <Sparkles className="w-4 h-4 text-[#DFBD79] animate-pulse" />
              <span className="font-helvetica text-[9px] tracking-[0.35em] uppercase text-[#6B0D1D] font-semibold">
                {config.brand.name} PRESENTS
              </span>
              <Sparkles className="w-4 h-4 text-[#DFBD79] animate-pulse" />
            </div>

            <h1 className="font-vivaldi text-5xl sm:text-6xl text-[#6B0D1D]">
              {config.couple.groom}
            </h1>
            <span className="font-vivaldi text-2xl text-[#C6A15B] my-0.5">&amp;</span>
            <h1 className="font-vivaldi text-5xl sm:text-6xl text-[#6B0D1D]">
              {config.couple.bride}
            </h1>
          </motion.div>

          {/* Progress Bar & Counter */}
          <div className="w-48 sm:w-64 mt-8 flex flex-col items-center">
            <div className="w-full h-1 bg-[#6B0D1D]/15 rounded-full overflow-hidden p-[1px] border border-[#C6A15B]/30">
              <motion.div
                className="h-full bg-gradient-to-r from-[#6B0D1D] via-[#C6A15B] to-[#DFBD79] rounded-full"
                style={{ width: `${progress}%` }}
                transition={{ ease: 'easeOut', duration: 0.1 }}
              />
            </div>

            <div className="mt-3 flex items-center justify-center text-xs font-helvetica text-[#33251E]/75 tracking-widest uppercase">
              <span>{progress} %</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
