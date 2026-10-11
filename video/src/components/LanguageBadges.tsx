import React from "react";
import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS, LANGUAGES } from "../theme";

type Props = {
  cx: number;
  cy: number;
  start: number;
  end: number;
};

/**
 * Lencana bahasa (Python, JavaScript, Java, C++, PHP) mengorbit inti orb.
 */
export const LanguageBadges: React.FC<Props> = ({ cx, cy, start, end }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const life = interpolate(frame, [start, start + 25, end - 25, end], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  if (life <= 0) return null;

  const t = frame / fps;
  const orbit = 320;

  return (
    <div style={{ position: "absolute", inset: 0, opacity: life }}>
      {LANGUAGES.map((lang, i) => {
        const base = (i / LANGUAGES.length) * Math.PI * 2;
        const a = base + t * 0.35;
        const x = cx + Math.cos(a) * orbit;
        const y = cy + Math.sin(a) * orbit * 0.62;
        const depth = 0.7 + (Math.sin(a) + 1) * 0.15;
        return (
          <div
            key={lang.name}
            style={{
              position: "absolute",
              left: x,
              top: y,
              transform: `translate(-50%, -50%) scale(${depth})`,
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "8px 16px",
              borderRadius: 999,
              background: "rgba(10,14,39,0.72)",
              border: `1.5px solid ${lang.color}`,
              boxShadow: `0 0 20px ${lang.color}66`,
              fontFamily: "'JetBrains Mono', 'Consolas', monospace",
              fontSize: 20,
              color: COLORS.text,
              whiteSpace: "nowrap",
            }}
          >
            <span
              style={{
                width: 12,
                height: 12,
                borderRadius: "50%",
                background: lang.color,
                boxShadow: `0 0 10px ${lang.color}`,
              }}
            />
            {lang.name}
          </div>
        );
      })}
    </div>
  );
};
