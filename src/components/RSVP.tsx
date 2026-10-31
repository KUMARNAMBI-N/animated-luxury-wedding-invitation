import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { CheckCircle2, Send, Users, HeartHandshake, XCircle, RotateCcw } from 'lucide-react';
import { useWedding } from '@/context/WeddingContext';

interface RsvpRecord {
  attending: boolean;
  guestName: string;
  guestCount: number;
  message: string;
  submittedAt: string;
}

export const RSVP: React.FC = () => {
  const { config } = useWedding();
  const storageKey = `wedding_rsvp_${config.id}`;

  const [rsvpData, setRsvpData] = useState<RsvpRecord | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [attendingChoice, setAttendingChoice] = useState<boolean>(true);

  // Form fields
  const [guestName, setGuestName] = useState('');
  const [guestCount, setGuestCount] = useState(1);
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(storageKey);
      if (stored) {
        setRsvpData(JSON.parse(stored));
      } else {
        setRsvpData(null);
      }
    } catch (e) {
      console.warn('Could not read from localStorage', e);
    }
  }, [storageKey]);

  const triggerCelebrationConfetti = () => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.65 },
        colors: ['#C6A15B', '#DFBD79', '#6B0D1D', '#3D0710', '#FFFFFF'],
      });
    } catch (e) {
      // Graceful fallback
    }
  };

  const openForm = (choice: boolean) => {
    setAttendingChoice(choice);
    setModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName.trim()) return;

    setIsSubmitting(true);

    const newRecord: RsvpRecord = {
      attending: attendingChoice,
      guestName: guestName.trim(),
      guestCount: attendingChoice ? guestCount : 0,
      message: message.trim(),
      submittedAt: new Date().toLocaleString(),
    };

    try {
      localStorage.setItem(storageKey, JSON.stringify(newRecord));
      setRsvpData(newRecord);
    } catch (err) {
      console.error('Failed to save to localStorage:', err);
    }

    setIsSubmitting(false);
    setModalOpen(false);

    if (attendingChoice) {
      triggerCelebrationConfetti();
    }
  };

  const handleSendViaWhatsApp = () => {
    if (!rsvpData) return;
    const phone = (config.rsvp.contactPhone || '').replace(/\D/g, '') || '919898880093';
    const text = rsvpData.attending
      ? `Assalamu Alaikum! RSVP Confirmation for ${config.couple.formattedNames}'s Wedding:\n\nGuest Name: ${rsvpData.guestName}\nAttending: Yes (Count: ${rsvpData.guestCount})\nWishes: ${rsvpData.message || 'Heartiest congratulations!'}`
      : `Assalamu Alaikum! RSVP Notice for ${config.couple.formattedNames}'s Wedding:\n\nGuest Name: ${rsvpData.guestName}\nAttending: No, sending prayers and best wishes from afar.\nWishes: ${rsvpData.message || 'May Allah bless you both!'}`;

    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(text)}`, '_blank');
  };

  const handleReset = () => {
    try {
      localStorage.removeItem(storageKey);
      setRsvpData(null);
    } catch (e) {
      // ignore
    }
  };

  return (
    <section className="relative w-full bg-[#F9F2E1] py-14 px-4 overflow-hidden flex flex-col items-center">
      <div className="w-full max-w-lg mx-auto flex flex-col items-center text-center">
        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="font-normal font-vivaldi text-4xl sm:text-5xl text-[#6B0D1D] mb-2 lowercase"
        >
          will you join us ?
        </motion.h2>

        {/* Subtitle Message */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="text-center px-4 text-base sm:text-lg font-helvetica font-normal text-[#6B0D1D] max-w-md leading-relaxed"
        >
          {config.rsvp.deadlineText}
        </motion.p>

        {/* Existing Confirmation Card or Buttons */}
        <div className="mt-8 w-full flex flex-col items-center">
          {rsvpData ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="w-full max-w-md rounded-2xl bg-[#3D0710] border border-[#C6A15B] p-6 text-white text-center shadow-2xl relative"
            >
              <div className="flex justify-center mb-3">
                {rsvpData.attending ? (
                  <CheckCircle2 className="w-10 h-10 text-[#DFBD79]" />
                ) : (
                  <XCircle className="w-10 h-10 text-rose-300" />
                )}
              </div>

              <h3 className="font-vivre text-2xl text-[#F9F2E1]">
                {rsvpData.attending ? 'We look forward to seeing you!' : 'Thank you for letting us know!'}
              </h3>

              <p className="font-helvetica text-sm text-[#F9F2E1]/80 mt-2">
                Response recorded for <strong className="text-[#DFBD79]">{rsvpData.guestName}</strong>
                {rsvpData.attending && ` (${rsvpData.guestCount} attending)`}.
              </p>

              {rsvpData.message && (
                <p className="font-helvetica text-xs italic text-[#F9F2E1]/60 mt-3 border-t border-white/10 pt-3">
                  "{rsvpData.message}"
                </p>
              )}

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-6">
                <button
                  onClick={handleSendViaWhatsApp}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-helvetica font-medium transition-all shadow-md"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Notify via WhatsApp</span>
                </button>

                <button
                  onClick={handleReset}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white/80 text-xs font-helvetica transition-all"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Edit RSVP</span>
                </button>
              </div>
            </motion.div>
          ) : (
            <div className="flex flex-col items-center gap-3.5 w-full">
              {/* Button 1: Yes, I'll Be There */}
              <motion.button
                type="button"
                onClick={() => openForm(true)}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="group relative inline-flex h-10 w-44 shrink-0 cursor-pointer items-center justify-center transition-transform outline-none select-none font-helvetica shadow-xl"
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
                  Yes, I'll Be There
                </span>
              </motion.button>

              {/* Button 2: No, I Can't Make It */}
              <motion.button
                type="button"
                onClick={() => openForm(false)}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="group relative inline-flex h-10 w-44 shrink-0 cursor-pointer items-center justify-center transition-transform outline-none select-none font-helvetica shadow-md"
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
                    fill="#FFFFFF"
                    stroke="#510310"
                    strokeWidth="1.2"
                  />
                </svg>
                <span className="relative z-10 inline-flex items-center justify-center gap-1.5 px-6 text-sm leading-none whitespace-nowrap font-vivre text-[#510310]">
                  No, I Can't Make It
                </span>
              </motion.button>
            </div>
          )}
        </div>
      </div>

      {/* RSVP Modal */}
      <AnimatePresence>
        {modalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
            onClick={() => setModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-md bg-[#27040A] border border-[#C6A15B] rounded-3xl p-6 sm:p-8 text-white shadow-2xl overflow-hidden"
            >
              <h3 className="font-vivre text-2xl sm:text-3xl text-center text-[#F9F2E1]">
                {attendingChoice ? "Join the Celebration" : 'Sending Blessings'}
              </h3>
              <p className="font-helvetica text-xs text-center text-[#DFBD79] mt-1 tracking-wider uppercase">
                {config.couple.formattedNames}
              </p>

              <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
                <div>
                  <label className="block text-xs font-helvetica uppercase tracking-widest text-[#DFBD79] mb-1.5">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    placeholder="e.g. Brother Ahmad & Family"
                    className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-[#C6A15B]/50 text-white placeholder-white/40 focus:outline-none focus:border-[#DFBD79] text-sm font-helvetica"
                  />
                </div>

                {attendingChoice && (
                  <div>
                    <label className="block text-xs font-helvetica uppercase tracking-widest text-[#DFBD79] mb-1.5">
                      Number of Attendees
                    </label>
                    <div className="flex items-center gap-3">
                      <Users className="w-5 h-5 text-[#DFBD79]" />
                      <input
                        type="number"
                        min={1}
                        max={10}
                        value={guestCount}
                        onChange={(e) => setGuestCount(parseInt(e.target.value, 10) || 1)}
                        className="w-24 px-4 py-2 rounded-xl bg-black/40 border border-[#C6A15B]/50 text-white text-center text-sm font-helvetica"
                      />
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-xs font-helvetica uppercase tracking-widest text-[#DFBD79] mb-1.5">
                    Personal Wishes / Dua (Optional)
                  </label>
                  <textarea
                    rows={3}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Share your prayers and heartfelt wishes..."
                    className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-[#C6A15B]/50 text-white placeholder-white/40 focus:outline-none focus:border-[#DFBD79] text-sm font-helvetica resize-none"
                  />
                </div>

                <div className="flex gap-3 mt-4">
                  <button
                    type="button"
                    onClick={() => setModalOpen(false)}
                    className="flex-1 py-2.5 rounded-full border border-white/20 text-white/70 hover:bg-white/10 text-xs font-helvetica transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 py-2.5 rounded-full bg-gradient-to-r from-[#DFBD79] to-[#C6A15B] text-[#3D0710] font-helvetica font-semibold text-xs transition-all shadow-lg hover:brightness-110 flex items-center justify-center gap-1.5"
                  >
                    <HeartHandshake className="w-4 h-4" />
                    <span>Submit RSVP</span>
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default RSVP;
