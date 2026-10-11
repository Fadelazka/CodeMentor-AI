'use client';

import { useEffect, useState } from 'react';

interface HeroBackgroundVideoProps {
  src: string;
  webmSrc?: string;
  poster?: string;
  className?: string;
}

export function HeroBackgroundVideo({
  src,
  poster,
  className = '',
}: HeroBackgroundVideoProps) {
  const [shouldRender, setShouldRender] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const isMobile = window.matchMedia('(max-width: 767px)').matches;
    if (isMobile) return;

    const conn = (navigator as { connection?: { effectiveType?: string } }).connection;
    if (conn?.effectiveType) {
      const slow = ['slow-2g', '2g', '3g'].includes(conn.effectiveType);
      if (slow) return;
    }

    setShouldRender(true);
  }, []);

  useEffect(() => {
    if (process.env.NODE_ENV !== 'production') {
      console.log('[HeroVideo] shouldRender:', shouldRender);
      console.log('[HeroVideo] isLoaded:', isLoaded);
      console.log('[HeroVideo] hasError:', hasError);
    }
  }, [shouldRender, isLoaded, hasError]);

  if (!shouldRender) {
    if (process.env.NODE_ENV !== 'production') {
      console.log('[HeroVideo] Not rendering — shouldRender=false');
    }
    return null;
  }

  if (hasError) {
    if (process.env.NODE_ENV !== 'production') {
      console.log('[HeroVideo] Error — hasError=true');
    }
    return null;
  }

  return (
    <div
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
      aria-hidden="true"
    >
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster={poster}
        onLoadedData={() => setIsLoaded(true)}
        onError={() => setHasError(true)}
        className={`
          absolute inset-0 w-full h-full object-cover
          scale-105 transition-opacity duration-[2000ms]
          mix-blend-screen
          ${isLoaded ? 'opacity-35' : 'opacity-0'}
        `}
        style={{
          filter: 'blur(0.5px) saturate(0.8)',
        }}
      >
        <source src={src} type="video/mp4" />
      </video>

      {/* Gradient overlay for readability */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-[#0A0E27]/20 via-[#0A0E27]/40 to-[#0A0E27]/70"
      />

      {/* Radial vignette */}
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#0A0E27_100%)] opacity-40"
      />
    </div>
  );
}
