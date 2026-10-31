import { Variants } from 'framer-motion';

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 35 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
  },
};

export const fadeDown: Variants = {
  hidden: { opacity: 0, y: -30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
  },
};

export const scaleUp: Variants = {
  hidden: { opacity: 0, scale: 0.88 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};

export const staggerContainer = (staggerChildren: number = 0.15, delayChildren: number = 0): Variants => ({
  hidden: {},
  visible: {
    transition: {
      staggerChildren,
      delayChildren,
    },
  },
});

export const royalBannerDrop: Variants = {
  hidden: { opacity: 0, y: -60, scaleY: 0.85, transformOrigin: 'top center' },
  visible: {
    opacity: 1,
    y: 0,
    scaleY: 1,
    transition: {
      type: 'spring',
      damping: 18,
      stiffness: 90,
      duration: 1.2,
    },
  },
};

export const goldenShine: Variants = {
  animate: {
    backgroundPosition: ['200% 0', '-200% 0'],
    transition: {
      repeat: Infinity,
      duration: 3.5,
      ease: 'linear',
    },
  },
};

export const swingingLantern = (delay: number = 0): Variants => ({
  animate: {
    rotate: [-3.5, 3.5],
    y: [-2, 2],
    transition: {
      repeat: Infinity,
      repeatType: 'reverse',
      duration: 3.8,
      ease: 'easeInOut',
      delay,
    },
  },
});

