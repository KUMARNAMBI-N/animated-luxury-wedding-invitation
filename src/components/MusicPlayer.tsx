import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';
import { motion } from 'framer-motion';

export const MusicPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const intervalRef = useRef<number | null>(null);

  // Soft oriental harp / kalimba wedding melody notes (frequencies in Hz)
  const melodyNotes = [
    261.63, 293.66, 329.63, 392.0, 440.0, 523.25, 440.0, 392.0,
    349.23, 329.63, 293.66, 329.63, 392.0, 440.0, 523.25, 587.33,
    659.25, 587.33, 523.25, 440.0, 392.0, 329.63, 293.66, 261.63
  ];

  const playNote = (freq: number) => {
    if (!audioCtxRef.current) return;
    const ctx = audioCtxRef.current;
    if (ctx.state === 'suspended') {
      ctx.resume();
    }

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    // Gentle warm acoustic sine tone
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, ctx.currentTime);

    gain.gain.setValueAtTime(0.001, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.08, ctx.currentTime + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 1.8);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 1.85);
  };

  const toggleMusic = () => {
    if (isPlaying) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (audioCtxRef.current && audioCtxRef.current.state === 'running') {
        audioCtxRef.current.suspend();
      }
      setIsPlaying(false);
    } else {
      if (!audioCtxRef.current) {
        const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        audioCtxRef.current = new AudioContextClass();
      }
      if (audioCtxRef.current.state === 'suspended') {
        audioCtxRef.current.resume();
      }

      setIsPlaying(true);
      let step = 0;
      // Play immediately
      playNote(melodyNotes[0]);

      intervalRef.current = window.setInterval(() => {
        step = (step + 1) % melodyNotes.length;
        playNote(melodyNotes[step]);
      }, 550);
    }
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (audioCtxRef.current) audioCtxRef.current.close();
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1 }}
      className="fixed bottom-5 right-5 z-40"
    >
      <button
        onClick={toggleMusic}
        className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-[#3D0710]/90 hover:bg-[#6B0D1D] text-[#F9F2E1] border border-[#C6A15B]/50 shadow-2xl backdrop-blur-md transition-all group"
        title={isPlaying ? 'Mute Music' : 'Play Wedding Ambient Melody'}
      >
        {isPlaying ? (
          <>
            <Volume2 className="w-4 h-4 text-[#DFBD79] animate-pulse" />
            <div className="flex items-center gap-0.5 h-3">
              <span className="w-0.5 h-2 bg-[#DFBD79] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
              <span className="w-0.5 h-3 bg-[#DFBD79] rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
              <span className="w-0.5 h-1.5 bg-[#DFBD79] rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
            <span className="text-[11px] font-vivre tracking-wider text-[#DFBD79]">Ambient Music</span>
          </>
        ) : (
          <>
            <Music className="w-4 h-4 text-[#DFBD79]" />
            <VolumeX className="w-3.5 h-3.5 text-[#F9F2E1]/60" />
            <span className="text-[11px] font-vivre tracking-wider text-[#F9F2E1]/80">Play Music</span>
          </>
        )}
      </button>
    </motion.div>
  );
};

export default MusicPlayer;

