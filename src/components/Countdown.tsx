import React from 'react';
import { motion } from 'framer-motion';
import { useCountdown } from '@/hooks/useCountdown';
import { useWedding } from '@/context/WeddingContext';

interface DigitReelProps {
  digit: string;
}

const DigitReel: React.FC<DigitReelProps> = ({ digit }) => {
  const num = parseInt(digit, 10) || 0;

  return (
    <div className="relative inline-block w-[1ch] h-[1.15em] overflow-hidden leading-none tabular-nums">
      <motion.div
        initial={false}
        animate={{ y: `-${num * 10}%` }}
        transition={{ type: 'spring', stiffness: 280, damping: 26 }}
        className="flex flex-col"
      >
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
          <span key={n} className="h-[1.15em] flex items-center justify-center">
            {n}
          </span>
        ))}
      </motion.div>
    </div>
  );
};

interface CountdownUnitProps {
  value: string;
  label: string;
}

const CountdownUnit: React.FC<CountdownUnitProps> = ({ value, label }) => {
  const padded = value.padStart(2, '0');

  return (
    <div className="flex flex-col items-center min-w-[52px]">
      <div className="font-vivre text-[28px] sm:text-[32px] leading-tight tabular-nums text-[#FFF8E7] drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
        <div className="flex items-center justify-center">
          <DigitReel digit={padded[0]} />
          <DigitReel digit={padded[1]} />
        </div>
      </div>
      <span className="font-helvetica text-[8px] sm:text-[9px] tracking-[0.2em] -mt-1 text-white/70 uppercase">
        {label}
      </span>
    </div>
  );
};

export const Countdown: React.FC = () => {
  const { config } = useWedding();
  const { formattedDays, formattedHours, formattedMinutes, formattedSeconds } = useCountdown(
    config.event.targetIsoDate || '2026-11-20T11:30:00+05:30'
  );

  return (
    <div className="relative h-[78px] w-[303px] select-none flex items-center justify-center drop-shadow-[0_6px_16px_rgba(0,0,0,0.6)]">
      {/* Background Frame Image */}
      <img
        src="/images/end-date.png"
        alt="Countdown to the wedding"
        className="absolute inset-0 w-full h-full object-contain pointer-events-none"
        draggable="false"
      />

      {/* Countdown Content - exactly aligned with the frame */}
      <div className="relative z-10 flex gap-2.5 sm:gap-3 items-center justify-center px-4 w-full h-full">
        <CountdownUnit value={formattedDays} label="Days" />
        <CountdownUnit value={formattedHours} label="Hours" />
        <CountdownUnit value={formattedMinutes} label="Minutes" />
        <CountdownUnit value={formattedSeconds} label="Seconds" />
      </div>
    </div>
  );
};

export default Countdown;
