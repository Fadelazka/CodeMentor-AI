import { HeroBackgroundVideo } from './HeroBackgroundVideo';

export function HeroBackground() {
  return (
    <>
      {/* Layer 1: Base gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A0E27] to-[#1A0B3D]" />

      {/* Layer 2: Video background */}
      <HeroBackgroundVideo
        src="/hero/hero-background.mp4"
        webmSrc="/hero/hero-background.webm"
        poster="/hero/hero-background-poster.jpg"
      />
    </>
  );
}