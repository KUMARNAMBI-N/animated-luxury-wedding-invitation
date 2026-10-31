import { useState, useEffect } from 'react';

export interface CountdownTime {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  formattedDays: string;
  formattedHours: string;
  formattedMinutes: string;
  formattedSeconds: string;
  isPast: boolean;
}

export function useCountdown(targetDateStr: string = '2026-06-28T11:30:00+05:30'): CountdownTime {
  const calculateTimeLeft = (): CountdownTime => {
    let target = new Date(targetDateStr).getTime();
    const now = new Date().getTime();
    let difference = target - now;

    // If target date is past (e.g. testing in late 2026 or future),
    // calculate remaining time towards the next upcoming 28 June celebration
    // so the countdown timer remains dynamic and alive as requested.
    if (difference <= 0) {
      const nextTarget = new Date(targetDateStr);
      const currentYear = new Date().getFullYear();
      nextTarget.setFullYear(currentYear + (now > nextTarget.getTime() ? 1 : 0));
      difference = nextTarget.getTime() - now;
    }

    if (difference <= 0) {
      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        formattedDays: '00',
        formattedHours: '00',
        formattedMinutes: '00',
        formattedSeconds: '00',
        isPast: true,
      };
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((difference / 1000 / 60) % 60);
    const seconds = Math.floor((difference / 1000) % 60);

    return {
      days,
      hours,
      minutes,
      seconds,
      formattedDays: String(days).padStart(2, '0'),
      formattedHours: String(hours).padStart(2, '0'),
      formattedMinutes: String(minutes).padStart(2, '0'),
      formattedSeconds: String(seconds).padStart(2, '0'),
      isPast: false,
    };
  };

  const [timeLeft, setTimeLeft] = useState<CountdownTime>(calculateTimeLeft);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDateStr]);

  return timeLeft;
}
