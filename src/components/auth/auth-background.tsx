'use client';

import { motion } from 'framer-motion';

const CODE_SNIPPETS = [
  { text: '{ }', x: '8%', delay: 0, duration: 18 },
  { text: '</>', x: '18%', delay: 3, duration: 22 },
  { text: 'fn()', x: '32%', delay: 1.5, duration: 20 },
  { text: '=>', x: '45%', delay: 4, duration: 25 },
  { text: '[ ]', x: '58%', delay: 2, duration: 19 },
  { text: 'async', x: '72%', delay: 5, duration: 23 },
  { text: 'return', x: '85%', delay: 2.5, duration: 21 },
  { text: '&&', x: '92%', delay: 6, duration: 24 },
];

export function AuthBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Base gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#05060A] via-[#0A0E27] to-[#1A0B3D]" />

      {/* Animated orbs */}
      <motion.div
        animate={{
          x: [0, 100, 0],
          y: [0, -80, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full bg-[#00E5FF] opacity-20 blur-[120px]"
      />
      <motion.div
        animate={{
          x: [0, -120, 0],
          y: [0, 100, 0],
          scale: [1, 1.3, 1],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        className="absolute -bottom-40 -right-32 w-[600px] h-[600px] rounded-full bg-[#7C4DFF] opacity-20 blur-[140px]"
      />
      <motion.div
        animate={{
          x: [0, 80, 0],
          y: [0, -100, 0],
          scale: [1, 1.15, 1],
        }}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
        className="absolute top-1/2 left-1/3 w-[400px] h-[400px] rounded-full bg-[#FF3B6B] opacity-15 blur-[130px]"
      />

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Floating code snippets */}
      {CODE_SNIPPETS.map((snippet, i) => (
        <motion.div
          key={i}
          initial={{ y: '105vh', opacity: 0 }}
          animate={{ y: '-10vh', opacity: [0, 0.15, 0.15, 0] }}
          transition={{
            duration: snippet.duration,
            repeat: Infinity,
            delay: snippet.delay,
            ease: 'linear',
          }}
          className="absolute font-mono text-white select-none"
          style={{
            left: snippet.x,
            fontSize: '14px',
            letterSpacing: '2px',
          }}
        >
          {snippet.text}
        </motion.div>
      ))}

      {/* Radial vignette overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse at center, transparent 0%, 
            rgba(5,6,10,0.6) 70%, rgba(5,6,10,0.95) 100%)`,
        }}
      />
    </div>
  );
}
