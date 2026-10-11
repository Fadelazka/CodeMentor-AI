import React from "react";
import { interpolate, random, useCurrentFrame } from "remotion";
import { CODE_FRAGMENTS, COLORS } from "../theme";

type Props = {
  start: number;
  end: number;
};

/**
 * Fragmen kode melayang pelan dengan glow cyan, muncul lalu menghilang.
 */
export const FloatingCode: React.FC<Props> = ({ start, end }) => {
  const frame = useCurrentFrame();

  const life = interpolate(frame, [start, start + 30, end - 30, end], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  if (life <= 0) return null;

  return (
    <div style={{ position: "absolute", inset: 0, opacity: life }}>
      {CODE_FRAGMENTS.map((text, i) => {
        const seedX = random(`fx${i}`);
        const seedY = random(`fy${i}`);
        const phase = random(`fp${i}`);
        const speed = 14 + random(`fs${i}`) * 18;
        const driftY = Math.sin((frame / 30) * 0.6 + phase * Math.PI * 2) * speed;
        const driftX =
          Math.cos((frame / 30) * 0.4 + phase * Math.PI * 2) * (speed * 0.5);
        const left = 8 + seedX * 78;
        const top = 12 + seedY * 72;
        const size = 26 + random(`fz${i}`) * 16;
        const rot = (random(`fr${i}`) - 0.5) * 14;

        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: `${left}%`,
              top: `${top}%`,
              transform: `translate(${driftX}px, ${driftY}px) rotate(${rot}deg)`,
              fontFamily: "'JetBrains Mono', 'Consolas', monospace",
              fontSize: size,
              color: COLORS.cyan,
              opacity: 0.18 + random(`fo${i}`) * 0.22,
              textShadow: `0 0 14px ${COLORS.cyan}`,
              whiteSpace: "nowrap",
            }}
          >
            {text}
          </div>
        );
      })}
    </div>
  );
};
