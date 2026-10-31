import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const initParallax = (element: HTMLElement | string, speed: number = 0.5) => {
  return gsap.to(element, {
    y: () => speed * 100,
    ease: 'none',
    scrollTrigger: {
      trigger: element,
      start: 'top bottom',
      end: 'bottom top',
      scrub: true,
    },
  });
};

export const initRevealOnScroll = (element: HTMLElement | string, options?: { y?: number; duration?: number }) => {
  return gsap.fromTo(
    element,
    {
      opacity: 0,
      y: options?.y ?? 40,
    },
    {
      opacity: 1,
      y: 0,
      duration: options?.duration ?? 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: element,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    }
  );
};

