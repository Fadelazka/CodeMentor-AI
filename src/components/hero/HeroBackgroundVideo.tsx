'use client';

import { useEffect, useRef, useState } from 'react';

interface HeroBackgroundVideoProps {
  src: string;
  webmSrc?: string;
  poster?: string;
  className?: string;
}

export function HeroBackgroundVideo({
  src,
  webmSrc,
  poster,
  className = '',
}: HeroBackgroundVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [shouldRender, setShouldRender] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    // Respect reduced motion
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    // Skip on mobile (< 768px)
    const isMobile = window.matchMedia('(max-width: 767px)').matches;
    if (isMobile) return;

    // Skip on slow connections
    const conn = (navigator as any).connection;
    if (conn?.effectiveType) {
      const slow = ['slow-2g', '2g', '3g'].includes(conn.effectiveType);
      if (slow) return;
    }

    setShouldRender(true);
  }, []);

  if (!shouldRender || hasError) return null;

  return (
    <div
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
      aria-hidden="true"
    >
      <video
        ref={videoRef}
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
        {webmSrc && <source src={webmSrc} type="video/webm" />}
        <source src={src} type="video/mp4" />
      </video>

      {/* Gradient overlay — lebih tipis */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-[#0A0E27]/20 via-[#0A0E27]/40 to-[#0A0E27]/70"
      />

      {/* Vignette radial — lebih ringan */}
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#0A0E27_100%)] opacity-40"
      />
    </div>
  );
}
