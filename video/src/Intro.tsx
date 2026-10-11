import React from "react";
import {
  AbsoluteFill,
  interpolate,
  random,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { COLORS } from "./theme";
import { Logo } from "./Logo";
import { FloatingCode } from "./components/FloatingCode";
import { Particles } from "./components/Particles";
import { AIOrb } from "./components/AIOrb";
import { LanguageBadges } from "./components/LanguageBadges";

/**
 * Intro CodeMentor AI, 12 detik @ 30fps (360 frame), 1920x1080.
 *
 * 0-60   : fade-in, fragmen kode melayang, "Error:" berdenyut
 * 60-150 : "Error:" pecah jadi partikel -> berkonvergensi jadi orb
 * 150-240: garis neural berdenyut, lencana bahasa mengorbit, teks RAG/LLM
 * 240-330: orb kolaps -> kilatan -> terbentuk logo + cincin gradien + tagline
 * 330-360: logo berdenyut, fade ke hitam dengan sisa glow
 */

const BARS = {
  errorIn: 12,
  errorOut: 78,
  particlesStart: 58,
  particlesEnd: 150,
  orbStart: 78,
  orbCollapse: 250,
  onboarding: 150,
  neuralEnd: 246,
  flashStart: 252,
  flashPeak: 264,
  logoStart: 262,
  taglineStart: 288,
  pulseStart: 322,
  fadeOut: 344,
};

export const Intro: React.FC = () => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();
  const cx = width / 2;
  const cy = height / 2;

  // Kamera dolly-in pelan sepanjang durasi.
  const cameraScale = interpolate(frame, [0, 360], [1.0, 1.07], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Fade dari hitam di awal.
  const fromBlack = interpolate(frame, [0, 30], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Fade ke hitam di akhir + sisa glow.
  const toBlack = interpolate(frame, [BARS.fadeOut, 360], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // "Error:" muncul & berdenyut, lalu menghilang (pecah jadi partikel).
  const errorIn = interpolate(frame, [BARS.errorIn, BARS.errorIn + 22], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const errorOut = interpolate(frame, [BARS.particlesStart, BARS.errorOut], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const errorPulse = 0.9 + Math.sin((frame / 30) * 6) * 0.1;
  const errorScale = interpolate(frame, [BARS.particlesStart, BARS.errorOut], [1, 1.6], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Kilatan cahaya besar saat orb kolaps -> logo.
  const flash = interpolate(
    frame,
    [BARS.flashStart, BARS.flashPeak, BARS.flashPeak + 26],
    [0, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Logo muncul setelah kilatan.
  const logoIn = interpolate(frame, [BARS.logoStart, BARS.logoStart + 34], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const logoScale = interpolate(frame, [BARS.logoStart, BARS.logoStart + 34], [0.86, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const logoPulse =
    frame >= BARS.pulseStart
      ? 1 + Math.sin(((frame - BARS.pulseStart) / 30) * 4) * 0.02
      : 1;

  // Cincin gradien berputar di belakang logo.
  const ringRot = frame * 0.6;

  // Tagline fade-in.
  const taglineIn = interpolate(
    frame,
    [BARS.taglineStart, BARS.taglineStart + 30],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Teks "RAG • LLM • Vector DB" melingkar lembut.
  const ragIn = interpolate(frame, [BARS.orbStart + 40, BARS.orbStart + 80], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const ragOut = interpolate(frame, [BARS.neuralEnd - 30, BARS.neuralEnd], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const showLogo = frame >= BARS.logoStart;

  return (
    <AbsoluteFill style={{ background: "#000" }}>
      <AbsoluteFill
        style={{
          transform: `scale(${cameraScale})`,
          background: `radial-gradient(circle at 50% 42%, ${COLORS.bgTo} 0%, ${COLORS.bgFrom} 62%, #05070f 100%)`,
          overflow: "hidden",
        }}
      >
        {/* Grid halus latar */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            opacity: 0.12,
            backgroundImage:
              "linear-gradient(rgba(0,229,255,0.25) 1px, transparent 1px), linear-gradient(90deg, rgba(124,77,255,0.25) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
            maskImage:
              "radial-gradient(circle at 50% 45%, black 0%, transparent 78%)",
            WebkitMaskImage:
              "radial-gradient(circle at 50% 45%, black 0%, transparent 78%)",
          }}
        />

        {/* Fragmen kode melayang */}
        <FloatingCode start={0} end={BARS.orbCollapse} />

        {/* Teks Error: berdenyut di tengah */}
        {frame < BARS.errorOut && (
          <div
            style={{
              position: "absolute",
              left: cx,
              top: cy,
              transform: `translate(-50%, -50%) scale(${errorScale})`,
              opacity: errorIn * errorOut * errorPulse,
              fontFamily: "'JetBrains Mono', 'Consolas', monospace",
              fontSize: 120,
              fontWeight: 700,
              color: COLORS.error,
              textShadow: `0 0 40px ${COLORS.error}, 0 0 90px ${COLORS.error}88`,
              letterSpacing: 2,
            }}
          >
            Error:
          </div>
        )}

        {/* Partikel pecahan */}
        <Particles
          start={BARS.particlesStart}
          end={BARS.particlesEnd}
          cx={cx}
          cy={cy}
        />

        {/* Orb holografik */}
        <AIOrb
          cx={cx}
          cy={cy}
          start={BARS.orbStart}
          end={BARS.orbCollapse + 22}
          collapseAt={BARS.orbCollapse}
        />

        {/* Lencana bahasa mengorbit */}
        <LanguageBadges
          cx={cx}
          cy={cy}
          start={BARS.onboarding}
          end={BARS.neuralEnd}
        />

        {/* Teks teknologi */}
        <div
          style={{
            position: "absolute",
            left: cx,
            top: cy + 240,
            transform: "translate(-50%, -50%)",
            opacity: ragIn * ragOut,
            fontFamily: "'JetBrains Mono', 'Consolas', monospace",
            fontSize: 26,
            letterSpacing: 8,
            color: COLORS.cyan,
            textShadow: `0 0 18px ${COLORS.cyan}`,
          }}
        >
          RAG • LLM • VECTOR DB
        </div>

        {/* Kilatan cahaya */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            opacity: flash,
            background: `radial-gradient(circle at 50% 50%, #FFFFFF 0%, ${COLORS.cyan} 26%, ${COLORS.violet} 52%, transparent 74%)`,
          }}
        />

        {/* Logo + cincin gradien + tagline */}
        {showLogo && (
          <div
            style={{
              position: "absolute",
              left: cx,
              top: cy - 40,
              transform: `translate(-50%, -50%) scale(${logoScale * logoPulse})`,
              opacity: logoIn,
            }}
          >
            <svg
              width={900}
              height={900}
              viewBox="0 0 900 900"
              style={{ position: "absolute", left: -50, top: -50, opacity: 0.9 }}
            >
              <defs>
                <linearGradient id="ringGrad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0" stopColor={COLORS.cyan} />
                  <stop offset="1" stopColor={COLORS.violet} />
                </linearGradient>
              </defs>
              <g transform={`rotate(${ringRot} 450 450)`}>
                <circle
                  cx="450"
                  cy="450"
                  r="330"
                  fill="none"
                  stroke="url(#ringGrad)"
                  strokeWidth="4"
                  strokeDasharray="180 90"
                  opacity="0.85"
                />
                <circle
                  cx="450"
                  cy="450"
                  r="372"
                  fill="none"
                  stroke="url(#ringGrad)"
                  strokeWidth="2"
                  strokeDasharray="70 150"
                  opacity="0.6"
                />
              </g>
              <g transform={`rotate(${-ringRot * 1.4} 450 450)`}>
                <circle
                  cx="450"
                  cy="450"
                  r="300"
                  fill="none"
                  stroke={COLORS.violet}
                  strokeWidth="2"
                  strokeDasharray="12 26"
                  opacity="0.5"
                />
              </g>
            </svg>
            <Logo size={800} uid="intro-logo" />
          </div>
        )}

        {showLogo && (
          <div
            style={{
              position: "absolute",
              left: cx,
              top: cy + 470,
              transform: "translate(-50%, -50%)",
              opacity: taglineIn * (1 - toBlack * 0.4),
              fontFamily: "'Space Grotesk', 'Segoe UI', sans-serif",
              fontSize: 44,
              fontWeight: 600,
              letterSpacing: 1,
              color: COLORS.text,
              textShadow: `0 0 26px ${COLORS.cyan}66`,
            }}
          >
            Debug Smarter. Learn Faster.
          </div>
        )}

        {/* Overlay fade dari / ke hitam */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "#000",
            opacity: (1 - fromBlack) + toBlack * 0.88,
            pointerEvents: "none",
          }}
        />

        {/* Sisa glow saat fade-out */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: `radial-gradient(circle at 50% 46%, ${COLORS.cyan}22 0%, transparent 60%)`,
            opacity: toBlack * 0.6,
            pointerEvents: "none",
          }}
        />

        {/* Seed acak sekali agar semua posisi deterministik per render */}
        <div style={{ display: "none" }}>{random("seed")}</div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
