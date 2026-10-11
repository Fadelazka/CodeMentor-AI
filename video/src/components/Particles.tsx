import React from "react";
import { interpolate, random, useCurrentFrame } from "remotion";
import { COLORS } from "../theme";

type Props = {
  start: number;
  end: number;
  cx: number;
  cy: number;
  count?: number;
};

/**
 * Partikel: pecahan teks "Error:" yang berhamburan lalu berkonvergensi
 * ke arah inti orb. Posisi memakai random() berbasis seed agar deterministik.
 */
export const Particles: React.FC<Props> = ({
  start,
  end,
  cx,
  cy,
  count = 90,
}) => {
  const frame = useCurrentFrame();

  const appear = interpolate(frame, [start, start + 18], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const fade = interpolate(frame, [end - 20, end], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const progress = interpolate(frame, [start, start + 70], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  if (appear <= 0 || fade <= 0) return null;

  const items = Array.from({ length: count }, (_, i) => {
    const angle = random(`pa${i}`) * Math.PI * 2;
    const radius = 260 + random(`pr${i}`) * 320;
    const rotSpeed = (random(`ps${i}`) - 0.5) * 2.4;
    const spin = frame * rotSpeed * 0.02;
    const a = angle + spin;
    const r = interpolate(progress, [0, 1], [radius, 18], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });
    const x = cx + Math.cos(a) * r;
    const y = cy + Math.sin(a) * r;
    const size = 3 + random(`pz${i}`) * 7;
    const isError = random(`pc${i}`) > 0.55;
    const color = isError ? COLORS.error : COLORS.cyan;
    const op = (0.35 + random(`po${i}`) * 0.65) * appear * fade;
    return { x, y, size, color, op, rot: (random(`pd${i}`) - 0.5) * 360 };
  });

  return (
    <div style={{ position: "absolute", inset: 0 }}>
      {items.map((p, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: p.x,
            top: p.y,
            width: p.size,
            height: p.size,
            transform: `translate(-50%, -50%) rotate(${p.rot}deg)`,
            background: p.color,
            borderRadius: i % 3 === 0 ? "2px" : "50%",
            opacity: p.op,
            boxShadow: `0 0 ${p.size * 3}px ${p.color}`,
          }}
        />
      ))}
    </div>
  );
};
