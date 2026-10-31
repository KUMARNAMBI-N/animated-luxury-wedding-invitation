import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import { useWedding } from '@/context/WeddingContext';

export const PhotoGallery: React.FC = () => {
  const { config } = useWedding();
  const couplePhotos = config.photos.gallery;
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);

  const openLightbox = (idx: number) => setSelectedIdx(idx);
  const closeLightbox = () => setSelectedIdx(null);

  const prevPhoto = () => {
    if (selectedIdx === null) return;
    setSelectedIdx((selectedIdx - 1 + couplePhotos.length) % couplePhotos.length);
  };

  const nextPhoto = () => {
    if (selectedIdx === null) return;
    setSelectedIdx((selectedIdx + 1) % couplePhotos.length);
  };

  return (
    <section className="relative w-full bg-[#F9F2E1] py-12 sm:py-14 overflow-hidden border-t border-b border-[#C6A15B]/20">
      <div className="max-w-xl mx-auto px-4 mb-6 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center"
        >
          <span className="font-helvetica text-[9px] sm:text-[10px] tracking-[0.3em] uppercase text-[#6B0D1D]/75 font-semibold">
            Capturing Memories
          </span>
          <h2 className="font-normal font-vivaldi text-4xl sm:text-5xl text-[#6B0D1D] mt-1 mb-2">
            Moments of Forever
          </h2>
          <div className="flex items-center gap-2">
            <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-[#C6A15B]" />
            <Camera className="w-3.5 h-3.5 text-[#C6A15B]" />
            <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-[#C6A15B]" />
          </div>
        </motion.div>
      </div>

      {/* Horizontal Scrolling Gallery Strip */}
      <div className="w-full overflow-x-auto hide-scrollbar py-4 px-4 sm:px-6 cursor-grab active:cursor-grabbing">
        <div className="flex gap-3.5 sm:gap-4.5 min-w-max mx-auto items-center">
          {couplePhotos.map((photo, index) => (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: (index % 5) * 0.08 }}
              whileHover={{ scale: 1.04, y: -4 }}
              onClick={() => openLightbox(index)}
              className="relative w-48 sm:w-56 h-64 sm:h-72 flex-shrink-0 rounded-2xl overflow-hidden cursor-pointer shadow-xl border border-[#C6A15B]/40 group bg-[#3D0710]"
            >
              <img
                src={photo.src}
                alt={photo.caption}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="eager"
              />

              {/* Overlay with luxury caption */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#27040A]/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                <span className="font-vivre text-xs sm:text-sm text-[#F9F2E1] font-medium tracking-wide">
                  {photo.caption}
                </span>
                <div className="flex items-center gap-1.5 text-[#DFBD79] text-[10px] mt-1">
                  <Maximize2 className="w-3 h-3" />
                  <span>View Portrait</span>
                </div>
              </div>

              {/* Gold foil corner accent */}
              <div className="absolute top-2.5 right-2.5 w-3.5 h-3.5 border-t border-r border-[#DFBD79] pointer-events-none opacity-80" />
            </motion.div>
          ))}
        </div>
      </div>

      <div className="text-center mt-3">
        <span className="font-helvetica text-[11px] text-[#33251E]/60 tracking-wider">
          Swipe horizontally to explore &bull; Tap photo to view full portrait
        </span>
      </div>

      {/* Interactive Lightbox Modal */}
      <AnimatePresence>
        {selectedIdx !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4"
            onClick={closeLightbox}
          >
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-5 right-5 text-white/80 hover:text-white p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors z-50"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Navigation Buttons */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                prevPhoto();
              }}
              className="absolute left-4 text-white/80 hover:text-white p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors z-50"
            >
              <ChevronLeft className="w-8 h-8" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                nextPhoto();
              }}
              className="absolute right-4 text-white/80 hover:text-white p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors z-50"
            >
              <ChevronRight className="w-8 h-8" />
            </button>

            {/* Lightbox Content */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-lg max-h-[85vh] flex flex-col items-center bg-[#27040A] p-3 rounded-2xl border border-[#DFBD79]/50 shadow-2xl"
            >
              <img
                src={couplePhotos[selectedIdx].src}
                alt={couplePhotos[selectedIdx].caption}
                className="max-h-[70vh] w-auto object-contain rounded-xl"
              />
              <div className="mt-3 text-center">
                <p className="font-vivre text-lg text-[#DFBD79]">
                  {couplePhotos[selectedIdx].caption}
                </p>
                <p className="font-helvetica text-xs text-white/60 mt-1">
                  {selectedIdx + 1} of {couplePhotos.length}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default PhotoGallery;
