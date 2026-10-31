import React from 'react';
import { motion } from 'framer-motion';
import { Compass } from 'lucide-react';
import { useWedding } from '@/context/WeddingContext';

export const Venue: React.FC = () => {
  const { config } = useWedding();
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    config.venue.mapQuery || `${config.venue.name} ${config.venue.address}`
  )}`;

  return (
    <section className="relative w-full bg-[#F9F2E1] py-16 px-4 overflow-hidden flex flex-col items-center">
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
            Location &amp; Destination
          </span>
          <h2 className="font-normal font-vivaldi text-4xl sm:text-5xl text-[#6B0D1D] mt-1 mb-2">
            The Venue
          </h2>
          <div className="flex items-center gap-2">
            <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-[#C6A15B]" />
            <Compass className="w-3.5 h-3.5 text-[#C6A15B]" />
            <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-[#C6A15B]" />
          </div>
        </motion.div>

        {/* Traditional Palace & Palm Trees Illustration */}
        <motion.div
          initial={{ opacity: 0, y: 35, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full flex items-center justify-center my-3"
        >
          <div className="w-full max-w-md rounded-2xl overflow-hidden drop-shadow-xl">
            <img
              src={config.venue.illustration || '/images/our-story/the-venue.png'}
              alt={`${config.venue.name} Palace Illustration`}
              className="w-full h-auto object-contain transform hover:scale-103 transition-transform duration-700 select-none"
            />
          </div>
        </motion.div>

        {/* Venue Details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-4 flex flex-col items-center"
        >
          <p className="font-helvetica text-2xl sm:text-[26px] text-[#33251E] font-normal tracking-wide">
            {config.venue.name}
          </p>
          <p className="font-helvetica text-base sm:text-lg text-[#33251E]/80 font-normal tracking-wider mt-1">
            {config.venue.address}
          </p>

          {/* Authentic Notched Maroon Get Direction Button */}
          <motion.a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="group relative inline-flex h-10 w-44 shrink-0 cursor-pointer items-center justify-center transition-transform outline-none select-none font-helvetica mt-6 shadow-xl"
          >
            <svg
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 h-full w-full"
              viewBox="0 0 173 40"
              preserveAspectRatio="none"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11.5342 0.792969C11.0257 2.57883 9.92997 4.47782 7.98145 5.19824C7.22396 5.47987 6.37023 5.56223 5.5625 5.35645V5.35742C5.55701 5.35606 5.55139 5.35394 5.5459 5.35254C5.39213 7.7755 4.20281 9.13757 2.98926 9.88086C2.34936 10.2727 1.71223 10.4879 1.2373 10.6055C1.06745 10.6475 0.916585 10.6753 0.792969 10.6963V29.2959C0.916633 29.3169 1.06732 29.3447 1.2373 29.3867C1.71224 29.5042 2.34926 29.7195 2.98926 30.1113C4.20266 30.8544 5.39174 32.2164 5.5459 34.6387C5.55135 34.6373 5.55705 34.6361 5.5625 34.6348V34.6357C6.37026 34.4299 7.22393 34.5123 7.98145 34.7939C9.93013 35.5143 11.0257 37.4133 11.5342 39.1992H97.501C97.5247 39.1993 97.5478 39.202 97.5703 39.2061H161.465C161.973 37.42 163.068 35.5202 165.017 34.7998L165.016 34.7988C165.773 34.517 166.628 34.4357 167.436 34.6416V34.6406C167.441 34.6419 167.446 34.6432 167.451 34.6445C167.605 32.2221 168.795 30.8603 170.009 30.1172C170.649 29.7253 171.286 29.5101 171.761 29.3926C171.931 29.3505 172.081 29.3228 172.205 29.3018V21.8828C172.183 21.8333 172.171 21.7784 172.171 21.7207V10.7119C172.047 10.6909 171.896 10.6631 171.727 10.6211C171.252 10.5036 170.615 10.2883 169.975 9.89648C168.761 9.15322 167.571 7.79136 167.417 5.36816C167.412 5.36951 167.407 5.37173 167.401 5.37305V5.37207C166.594 5.57793 165.74 5.49547 164.982 5.21387C163.034 4.49356 161.938 2.59458 161.43 0.808594H89.834C89.7974 0.808592 89.7621 0.80221 89.7285 0.792969H11.5342Z"
                fill="#510310"
                stroke="#DFBD79"
                strokeWidth="1"
              />
            </svg>
            <span className="relative z-10 inline-flex items-center justify-center gap-1.5 px-6 text-sm leading-none whitespace-nowrap font-vivre text-[#FFF8E7]">
              Get Direction
            </span>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default Venue;
