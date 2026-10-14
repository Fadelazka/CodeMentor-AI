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

const CODE_METEORS = [
  { text: 'const x = 5', start: { x: -5, y: -5 }, end: { x: 105, y: 105 }, delay: 0, duration: 4 },
  { text: 'function foo()', start: { x: 110, y: -5 }, end: { x: -10, y: 105 }, delay: 2, duration: 5 },
  { text: '=> { }', start: { x: -10, y: 30 }, end: { x: 110, y: 130 }, delay: 4, duration: 3.5 },
  { text: 'async await', start: { x: 110, y: 20 }, end: { x: -10, y: 120 }, delay: 6, duration: 4.5 },
  { text: 'return null', start: { x: -5, y: 50 }, end: { x: 105, y: 150 }, delay: 8, duration: 4 },
  { text: 'if (true) {', start: { x: 110, y: 60 }, end: { x: -10, y: 160 }, delay: 10, duration: 5 },
  { text: 'try { } catch { }', start: { x: -10, y: 0 }, end: { x: 110, y: 100 }, delay: 12, duration: 4 },
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
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full bg-[#00E5FF] opacity-30 blur-[120px]"
      />
      <motion.div
        animate={{
          x: [0, -120, 0],
          y: [0, 100, 0],
          scale: [1, 1.3, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        className="absolute -bottom-40 -right-32 w-[600px] h-[600px] rounded-full bg-[#7C4DFF] opacity-30 blur-[140px]"
      />
      <motion.div
        animate={{
          x: [0, 80, 0],
          y: [0, -100, 0],
          scale: [1, 1.15, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
        className="absolute top-1/2 left-1/3 w-[400px] h-[400px] rounded-full bg-[#FF3B6B] opacity-25 blur-[130px]"
      />

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.06]"
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
          animate={{ y: '-10vh', opacity: [0, 0.25, 0.25, 0] }}
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

      {/* Code meteors — diagonal shooting stars */}
      {CODE_METEORS.map((meteor, i) => (
        <motion.div
          key={`meteor-${i}`}
          initial={{
            x: `${meteor.start.x}vw`,
            y: `${meteor.start.y}vh`,
            opacity: 0,
          }}
          animate={{
            x: `${meteor.end.x}vw`,
            y: `${meteor.end.y}vh`,
            opacity: [0, 0.9, 0.9, 0],
          }}
          transition={{
            duration: meteor.duration,
            repeat: Infinity,
            delay: meteor.delay,
            ease: 'linear',
          }}
          className="absolute font-mono text-white select-none whitespace-nowrap"
          style={{
            fontSize: '13px',
            textShadow: '0 0 8px rgba(0, 229, 255, 0.75), 0 0 16px rgba(124, 77, 255, 0.6)',
          }}
        >
          {meteor.text}
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
