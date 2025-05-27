'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

export default function LandingPage() {
  const letters = ['S', 'P', 'I', 'N', 'E'];
  const scrollRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ['start start', 'end start'],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], [0, 100]);

  return (
    <main
      ref={scrollRef}
      className="relative flex min-h-screen text-white overflow-hidden justify-center items-start"
    >
      {/* Background Image with parallax */}
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-0 w-full h-screen z-[-1]"
      >
        <Image
          src="/IMG_5548.jpg"
          alt="Tattoo background"
          fill
          priority
          className="object-cover"
        />
      </motion.div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40 z-[-1]" />

      {/* Content Wrapper */}
      <div className="w-full max-w-5xl px-4 sm:px-8 lg:px-12 pt-20 sm:pt-28 md:pt-36 flex flex-col items-center text-center">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{
            opacity: 1,
            scale: [1, 1.05, 1],
            rotate: [0, 2, -2, 0],
          }}
          transition={{
            duration: 4,
            ease: 'easeInOut',
            repeat: Infinity,
          }}
          className="mb-6"
        >
          <Image
            src="/logo1.PNG"
            alt="Logo"
            width={960}
            height={960}
            className="w-[160px] sm:w-[220px] md:w-[320px] lg:w-[400px] h-auto mx-auto"
          />
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex justify-center flex-wrap text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-bold tracking-widest mb-4 text-white drop-shadow-[0_0_30px_rgba(220,230,255,0.9)]"
        >
          {letters.map((char, i) => (
            <motion.span
              key={i}
              animate={{
                y: [0, -5, 0, 5, 0],
                textShadow: [
                  '0 0 5px #dce6ff',
                  '0 0 15px #eaf2ff',
                  '0 0 30px #ffffff',
                  '0 0 15px #eaf2ff',
                  '0 0 5px #dce6ff',
                ],
              }}
              transition={{
                repeat: Infinity,
                duration: 3,
                ease: 'easeInOut',
                delay: i * 0.2,
              }}
              className="mx-2 sm:mx-3 md:mx-4"
            >
              {char}
            </motion.span>
          ))}
        </motion.h1>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-sm sm:text-base md:text-lg lg:text-xl text-blue-200 mb-8 px-2 sm:px-0 max-w-2xl"
        >
          Custom drops. Premium ink. Designed for the bold. Limited runs, forever fresh.
        </motion.p>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          whileHover={{
            scale: 1.1,
            boxShadow: '0 0 35px rgba(235,245,255,0.95)',
          }}
          className="relative"
        >
          <Button
            asChild
            className="text-base sm:text-xl md:text-2xl px-6 sm:px-10 md:px-14 py-4 sm:py-5 md:py-6 bg-gray-900 hover:bg-gray-300 text-white font-black tracking-widest rounded-2xl shadow-[0_0_40px_rgba(235,245,255,0.95)]"
          >
            <a href="/shop">Enter Store</a>
          </Button>
        </motion.div>
      </div>
    </main>
  );
}
