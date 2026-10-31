import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Countdown from './Countdown';
import { useWedding } from '@/context/WeddingContext';

export const Hero: React.FC = () => {
  const { config } = useWedding();
  const containerRef = useRef<HTMLElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Scroll parallax for individual layers
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const layer1Y = useTransform(scrollYProgress, [0, 1], ['0px', '25px']);
  const layer2Y = useTransform(scrollYProgress, [0, 1], ['0px', '45px']);
  const layer3Y = useTransform(scrollYProgress, [0, 1], ['0px', '65px']);
  const layer4Y = useTransform(scrollYProgress, [0, 1], ['0px', '85px']);
  const layer5Y = useTransform(scrollYProgress, [0, 1], ['0px', '110px']);
  const layer6Y = useTransform(scrollYProgress, [0, 1], ['0px', '55px']);
  const layer7Y = useTransform(scrollYProgress, [0, 1], ['0px', '130px']);
  const layer8Y = useTransform(scrollYProgress, [0, 1], ['0px', '160px']);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 2;
      const y = (e.clientY / innerHeight - 0.5) * 2;
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-[100svh] overflow-hidden bg-[#0a0508] flex flex-col justify-between"
      style={{ minHeight: 'max(100svh, 640px)' }}
    >
      {/* 
        Background Layer Stage:
        Strictly preserves the 3072 / 5460 artboard aspect ratio across all devices
        while covering 100% of width and 100% of height.
      */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{
            minWidth: '100%',
            minHeight: '100%',
            aspectRatio: '3072 / 5460',
            backgroundColor: '#0a0508',
          }}
        >
          {/* L1: Palace Backdrop / Sky */}
          <motion.div
            style={{
              position: 'absolute',
              left: '13.7695%',
              top: '40.7143%',
              width: '68.3594%',
              height: '36.9048%',
              zIndex: 1,
              y: layer1Y,
            }}
            animate={{ x: mousePos.x * 4, y: mousePos.y * 3 }}
            transition={{ ease: 'easeOut', duration: 0.5 }}
          >
            <img
              src="/images/L1.webp"
              alt="Palace Sky"
              className="w-full h-full block select-none opacity-95"
              draggable="false"
              loading="eager"
            />
          </motion.div>

          {/* L2: Palace Domes and Minarets */}
          <motion.div
            style={{
              position: 'absolute',
              left: '10.2865%',
              top: '3.49817%',
              width: '78.5482%',
              height: '63.1136%',
              zIndex: 2,
              y: layer2Y,
            }}
            animate={{ x: mousePos.x * 7, y: mousePos.y * 5 }}
            transition={{ ease: 'easeOut', duration: 0.5 }}
          >
            <img
              src="/images/L2.webp"
              alt="Palace Domes"
              className="w-full h-full block select-none"
              draggable="false"
              loading="lazy"
            />
          </motion.div>

          {/* Floating Golden Particles */}
          <div className="absolute inset-0 z-[2.5] pointer-events-none overflow-hidden">
            {[...Array(18)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full bg-gradient-to-tr from-[#DFBD79] to-[#FFF4D0] opacity-75"
                style={{
                  width: Math.random() * 3.5 + 2 + 'px',
                  height: Math.random() * 3.5 + 2 + 'px',
                  left: `${(i * 6.5 + 4) % 94}%`,
                  top: `${(i * 8.5 + 6) % 88}%`,
                  filter: 'blur(0.4px) drop-shadow(0 0 6px rgba(223,189,121,0.9))',
                }}
                animate={{
                  y: [0, -22, 0],
                  x: [0, i % 2 === 0 ? 7 : -7, 0],
                  opacity: [0.35, 0.9, 0.35],
                }}
                transition={{
                  duration: 3.8 + (i % 3),
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: i * 0.2,
                }}
              />
            ))}
          </div>

          {/* L3: Courtyard Pillars */}
          <motion.div
            style={{
              position: 'absolute',
              left: '0%',
              top: '0%',
              width: '100%',
              height: '69.011%',
              zIndex: 3,
              y: layer3Y,
            }}
            animate={{ x: mousePos.x * 10, y: mousePos.y * 7 }}
            transition={{ ease: 'easeOut', duration: 0.5 }}
          >
            <img
              src="/images/L3.webp"
              alt="Courtyard Pillars"
              className="w-full h-full block select-none"
              draggable="false"
              loading="lazy"
            />
          </motion.div>

          {/* L4: Royal Lantern with Warm Golden Glow & Sway */}
          <motion.div
            style={{
              position: 'absolute',
              left: '8.13802%',
              top: '-2.82051%',
              width: '38.3138%',
              height: '48.6447%',
              zIndex: 4,
              y: layer4Y,
            }}
            animate={{ x: mousePos.x * 12, y: mousePos.y * 8 }}
            transition={{ ease: 'easeOut', duration: 0.5 }}
          >
            {/* Ambient warm lantern glow aura */}
            <div className="absolute top-[32%] left-[45%] -translate-x-1/2 -translate-y-1/2 w-28 h-28 rounded-full bg-[#DFBD79]/30 blur-2xl pointer-events-none animate-pulse" />

            <motion.div
              style={{
                width: '100%',
                height: '100%',
                transformOrigin: '50% 0%',
              }}
              animate={{ rotate: [-2.5, 2.5, -2.5] }}
              transition={{ repeat: Infinity, duration: 4.4, ease: 'easeInOut' }}
            >
              <img
                src="/images/L4.webp"
                alt="Royal Lantern"
                className="w-full h-full block select-none filter drop-shadow(0 0 16px rgba(223,189,121,0.75)) drop-shadow(0 0 30px rgba(223,189,121,0.4))"
                draggable="false"
                loading="lazy"
              />
            </motion.div>
          </motion.div>

          {/* L5: Courtyard Ground & Couple Scene */}
          <motion.div
            style={{
              position: 'absolute',
              left: '0%',
              top: '43.1319%',
              width: '100%',
              height: '56.8681%',
              zIndex: 5,
              y: layer5Y,
            }}
            animate={{ x: mousePos.x * 14, y: mousePos.y * 9 }}
            transition={{ ease: 'easeOut', duration: 0.5 }}
          >
            <img
              src="/images/L5.webp"
              alt="Courtyard and Couple"
              className="w-full h-full block select-none"
              draggable="false"
              loading="lazy"
            />
          </motion.div>

          {/* L6: Crescent Moon & Star Garland */}
          <motion.div
            style={{
              position: 'absolute',
              left: '18.6849%',
              top: '0%',
              width: '71.6797%',
              height: '13.1319%',
              zIndex: 6,
              y: layer6Y,
            }}
            animate={{ x: mousePos.x * 8, y: mousePos.y * 5 }}
            transition={{ ease: 'easeOut', duration: 0.5 }}
          >
            <motion.div
              style={{
                width: '100%',
                height: '100%',
                transformOrigin: '50% 0%',
              }}
              animate={{ rotate: [-1.4, 1.4, -1.4] }}
              transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut' }}
            >
              <img
                src="/images/L6.webp"
                alt="Crescent Moon Garland"
                className="w-full h-full block select-none filter drop-shadow(0 0 12px rgba(223,189,121,0.75))"
                draggable="false"
                loading="lazy"
              />
            </motion.div>
          </motion.div>

          {/* L7: Foreground Royal Archways */}
          <motion.div
            style={{
              position: 'absolute',
              left: '10.4818%',
              top: '-19.304%',
              width: '89.8438%',
              height: '114.084%',
              zIndex: 7,
              y: layer7Y,
            }}
            animate={{ x: mousePos.x * 18, y: mousePos.y * 11 }}
            transition={{ ease: 'easeOut', duration: 0.4 }}
          >
            <motion.div
              style={{
                width: '100%',
                height: '100%',
                transformOrigin: '50% 0%',
              }}
              animate={{ rotate: [-0.6, 0.6, -0.6] }}
              transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }}
            >
              <img
                src="/images/L7.webp"
                alt="Palace Archway"
                className="w-full h-full block select-none"
                draggable="false"
                loading="lazy"
              />
            </motion.div>
          </motion.div>

          {/* L8: Front Foliage & Silhouette */}
          <motion.div
            style={{
              position: 'absolute',
              left: '-41.1458%',
              top: '-1.4652%',
              width: '68.099%',
              height: '84.8535%',
              zIndex: 8,
              y: layer8Y,
            }}
            animate={{ x: mousePos.x * 22, y: mousePos.y * 14 }}
            transition={{ ease: 'easeOut', duration: 0.3 }}
          >
            <motion.div
              style={{
                width: '100%',
                height: '100%',
                transformOrigin: '50% 0%',
              }}
              animate={{ rotate: [1.2, -1.2, 1.2] }}
              transition={{ repeat: Infinity, duration: 5.4, ease: 'easeInOut' }}
            >
              <img
                src="/images/L8.webp"
                alt="Front Foliage"
                className="w-full h-full block select-none"
                draggable="false"
                loading="lazy"
              />
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Atmospheric Vignette Gradients */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 z-20 h-1/4"
        style={{ background: 'linear-gradient(to bottom, rgba(10,5,8,0.7) 0%, transparent 100%)' }}
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-2/5"
        style={{ background: 'linear-gradient(to top, rgba(10,5,8,0.95) 0%, rgba(10,5,8,0.6) 60%, transparent 100%)' }}
      />
      <div
        className="pointer-events-none absolute inset-y-0 left-0 z-20 w-8"
        style={{ background: 'linear-gradient(to right, #0a0508, transparent)' }}
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 z-20 w-8"
        style={{ background: 'linear-gradient(to left, #0a0508, transparent)' }}
      />

      {/* 
        Hero Content Layer (Z-30):
        Flex column with justify-between so that names & countdown stay at the top,
        and Save The Date + Invitation message sit comfortably at the bottom without overlap!
      */}
      <div className="relative z-30 flex flex-col justify-between h-full min-h-[100svh] text-white py-10 sm:py-12 px-4 sm:px-6">
        {/* Top: Names & Countdown Reel */}
        <div className="flex flex-col items-center pt-2 sm:pt-4 text-center">
          {/* Groom Name */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="text-6xl sm:text-7xl md:text-8xl font-vivaldi text-[#FFF8E7] drop-shadow-[0_4px_18px_rgba(0,0,0,0.9)] tracking-wide font-normal"
          >
            {config.couple.groom}
          </motion.p>

          {/* Script Ampersand */}
          <motion.p
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="font-vivaldi text-3xl sm:text-4xl text-[#DFBD79] my-0 sm:my-1 drop-shadow-md"
          >
            &amp;
          </motion.p>

          {/* Bride Name */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.5 }}
            className="text-6xl sm:text-7xl md:text-8xl font-vivaldi text-[#FFF8E7] drop-shadow-[0_4px_18px_rgba(0,0,0,0.9)] tracking-wide font-normal"
          >
            {config.couple.bride}
          </motion.p>

          {/* Authentic Countdown Banner in End-Date Frame */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.7 }}
            className="mt-6 sm:mt-7"
          >
            <Countdown />
          </motion.div>
        </div>

        {/* Bottom: Save the Date & Invitation Message */}
        <div className="flex flex-col items-center px-4 pb-2 sm:pb-4 text-center">
          {/* Save the Date Tagline */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mb-4 sm:mb-5 flex flex-col items-center gap-1.5 select-none"
          >
            <span
              className="font-helvetica text-[8px] sm:text-[9.5px] tracking-[0.35em] uppercase text-[#DCB978]"
              style={{
                textShadow: '0 0 10px rgba(0,0,0,0.9), 0 1px 3px rgba(0,0,0,0.8)',
              }}
            >
              {config.messages.heroTagline}
            </span>

            {/* Date Display */}
            <div className="flex items-center gap-3">
              <div
                className="h-[1px] w-9 bg-[#DCB978]"
                style={{ filter: 'drop-shadow(0 0 4px rgba(0,0,0,0.9))' }}
              />
              <span
                className="whitespace-nowrap font-vivre text-[20px] sm:text-[24px] tracking-[0.16em] uppercase text-[#FFF8E7]"
                style={{
                  textShadow:
                    '0 0 18px rgba(239,216,122,0.9), 0 0 8px rgba(239,216,122,0.6), 0 0 2px rgba(255,255,255,0.8), 0 1px 3px rgba(0,0,0,0.6)',
                }}
              >
                {config.event.formattedDate}
              </span>
              <div
                className="h-[1px] w-9 bg-[#DCB978]"
                style={{ filter: 'drop-shadow(0 0 4px rgba(0,0,0,0.9))' }}
              />
            </div>
          </motion.div>

          {/* Invitation Message */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="max-w-[430px] font-helvetica text-xs sm:text-[13px] leading-relaxed text-[#F9F2E1]/95"
            style={{ textShadow: '0 1px 5px rgba(0,0,0,0.85)' }}
          >
            {config.messages.invitationMessage}
          </motion.p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
