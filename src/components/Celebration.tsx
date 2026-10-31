import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Phone, Clock, CalendarDays, Check, Download, ExternalLink } from 'lucide-react';
import { useWedding } from '@/context/WeddingContext';

export const Celebration: React.FC = () => {
  const { config } = useWedding();
  const [showCalendarOptions, setShowCalendarOptions] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  const eventDetails = {
    title: `${config.event.title} of ${config.couple.formattedNames}`,
    description: config.messages.invitationMessage,
    location: `${config.venue.name}, ${config.venue.address}`,
    startDate: (config.event.dateString || '20261120').replace(/-/g, '') + 'T113000',
    endDate: (config.event.dateString || '20261120').replace(/-/g, '') + 'T153000',
  };

  const handleDownloadICS = () => {
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Beyond Cards//${config.couple.formattedNames} Wedding//EN
CALSCALE:GREGORIAN
METHOD:PUBLISH
BEGIN:VEVENT
UID:${config.id}-wedding@beyondcards.luxury
DTSTAMP:20260101T000000Z
DTSTART;TZID=Asia/Kolkata:${eventDetails.startDate}
DTEND;TZID=Asia/Kolkata:${eventDetails.endDate}
SUMMARY:${eventDetails.title}
DESCRIPTION:${eventDetails.description}
LOCATION:${eventDetails.location}
STATUS:CONFIRMED
BEGIN:VALARM
TRIGGER:-PT24H
ACTION:DISPLAY
DESCRIPTION:Reminder: ${eventDetails.title} tomorrow!
END:VALARM
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', `${config.couple.groom}-${config.couple.bride}-Wedding.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setShowCalendarOptions(false);
  };

  const handleGoogleCalendar = () => {
    const googleUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
      eventDetails.title
    )}&dates=${eventDetails.startDate}/${eventDetails.endDate}&details=${encodeURIComponent(
      eventDetails.description
    )}&location=${encodeURIComponent(eventDetails.location)}`;
    window.open(googleUrl, '_blank', 'noopener,noreferrer');
    setShowCalendarOptions(false);
  };

  const copyPhoneNumber = () => {
    navigator.clipboard.writeText(config.rsvp.contactPhone);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2500);
  };

  return (
    <section className="relative w-full bg-[#F9F2E1] py-16 px-4 overflow-hidden flex flex-col items-center">
      {/* Floral Background Accents */}
      <img
        src="/images/floral.png"
        alt=""
        className="absolute left-0 w-full h-auto z-0 pointer-events-none select-none opacity-40 top-1/2 -translate-y-1/2"
      />

      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="flex flex-col items-center text-center mb-8 relative z-10"
      >
        <span className="font-helvetica text-[9px] sm:text-[10px] tracking-[0.3em] uppercase text-[#6B0D1D]/75 font-semibold">
          Cordially Invited To
        </span>
        <h2 className="font-normal font-vivaldi text-4xl sm:text-5xl text-[#6B0D1D] mt-1 mb-2">
          The Celebrations
        </h2>
        <div className="h-[1.5px] w-14 bg-gradient-to-r from-transparent via-[#C6A15B] to-transparent" />
      </motion.div>

      {/* Royal Burgundy Hanging Banner */}
      <motion.div
        initial={{ opacity: 0, y: -40, scaleY: 0.92 }}
        whileInView={{ opacity: 1, y: 0, scaleY: 1 }}
        viewport={{ once: true }}
        transition={{ type: 'spring', damping: 20, stiffness: 100 }}
        className="relative w-full max-w-[370px] sm:max-w-[410px] flex justify-center drop-shadow-[0_20px_40px_rgba(61,7,16,0.35)] z-10"
      >
        {/* Banner Graphic */}
        <div className="relative w-full">
          <img
            src="/images/bg-banner.png"
            alt="The Celebrations Banner"
            className="w-full h-auto object-contain select-none pointer-events-none drop-shadow-2xl"
          />

          {/* Banner Content Overlay */}
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center text-white px-8 pt-4 pb-12">
            {/* Event Name */}
            <motion.p
              initial={{ opacity: 0, scale: 0.85 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.25, duration: 0.8 }}
              className="font-patung text-4xl sm:text-5xl font-normal text-[#F9F2E1] tracking-wider drop-shadow-md"
            >
              {config.event.title}
            </motion.p>

            {/* Date */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.35, duration: 0.8 }}
              className="mt-3.5 sm:mt-4 flex flex-col items-center"
            >
              <div className="flex items-center gap-2">
                <CalendarDays className="w-4 h-4 text-[#DFBD79]" />
                <p className="font-vivre text-2xl sm:text-3xl text-[#F9F2E1] tracking-wide font-medium">
                  {config.event.formattedDate}
                </p>
              </div>
              <p className="font-vivre text-sm sm:text-base text-[#DFBD79] tracking-widest uppercase mt-0.5">
                {config.event.dayOfWeek}
              </p>
            </motion.div>

            {/* Time */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.45, duration: 0.8 }}
              className="mt-2.5 sm:mt-3 flex items-center gap-2"
            >
              <Clock className="w-4 h-4 text-[#DFBD79]" />
              <p className="font-vivre text-base sm:text-lg text-[#F9F2E1] tracking-wider">
                {config.event.time}
              </p>
            </motion.div>

            {/* Contact */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.55, duration: 0.8 }}
              onClick={copyPhoneNumber}
              className="mt-3 sm:mt-4 flex items-center gap-2 cursor-pointer group bg-black/30 px-3.5 py-1 rounded-full border border-[#DFBD79]/35 hover:border-[#DFBD79] transition-all"
            >
              <Phone className="w-3.5 h-3.5 text-[#DFBD79]" />
              <p className="font-vivre text-xs sm:text-sm text-[#F9F2E1] tracking-wider">
                {config.rsvp.contactPhone}
              </p>
              {copiedPhone ? (
                <span className="text-[10px] text-green-300 font-helvetica flex items-center gap-0.5">
                  <Check className="w-3 h-3" /> Copied
                </span>
              ) : (
                <span className="text-[9px] text-[#DFBD79]/80 font-helvetica opacity-0 group-hover:opacity-100 transition-opacity">
                  Tap to copy
                </span>
              )}
            </motion.div>

            {/* Add to Calendar Button with Authentic Notched Shape */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.65, duration: 0.8 }}
              className="relative mt-5 sm:mt-6"
            >
              <button
                type="button"
                onClick={() => setShowCalendarOptions(!showCalendarOptions)}
                className="group relative inline-flex h-10 w-44 shrink-0 cursor-pointer items-center justify-center transition-transform outline-none select-none hover:-translate-y-px active:translate-y-px font-helvetica text-white shadow-xl"
              >
                {/* Authentic notched SVG background */}
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
                  Add to Calendar
                </span>
              </button>

              {/* Calendar Options Dropdown */}
              <AnimatePresence>
                {showCalendarOptions && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 5 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 5 }}
                    className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-52 bg-[#27040A] border border-[#C6A15B] rounded-xl shadow-2xl p-2 z-30 text-left"
                  >
                    <button
                      onClick={handleGoogleCalendar}
                      className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-helvetica text-[#F9F2E1] hover:bg-[#6B0D1D] transition-colors"
                    >
                      <span className="flex items-center gap-2">
                        <ExternalLink className="w-3.5 h-3.5 text-[#DFBD79]" />
                        Google Calendar
                      </span>
                    </button>
                    <button
                      onClick={handleDownloadICS}
                      className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-helvetica text-[#F9F2E1] hover:bg-[#6B0D1D] transition-colors"
                    >
                      <span className="flex items-center gap-2">
                        <Download className="w-3.5 h-3.5 text-[#DFBD79]" />
                        Apple / Outlook (.ics)
                      </span>
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Celebration;
