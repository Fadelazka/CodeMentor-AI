import React from "react";
import { interpolate, random, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS } from "../theme";

type Props = {
  cx: number;
  cy: number;
  start: number;
  end: number;
  /** frame saat orb kolaps jadi kilatan cahaya */
  collapseAt: number;
};

/**
 * Orb holografik: cincin-cincin saling mengunci, inti cyan terang,
 * jaringan garis neural yang berdenyut keluar. Berputar terus-menerus,
 * lalu menguncup saat collapseAt.
 */
export const AIOrb: React.FC<Props> = ({ cx, cy, start, end, collapseAt }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const grow = interpolate(frame, [start, start + 40], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const collapse = interpolate(frame, [collapseAt, collapseAt + 22], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const gone = interpolate(frame, [end - 10, end], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const scale = (0.4 + grow * 0.6) * collapse * gone;
  if (scale <= 0.001) return null;

  const t = frame / fps;
  const pulse = 0.85 + Math.sin(t * 4) * 0.15;
  const R = 150;

  const rings = [
    { rx: R, ry: R * 0.42, rot: t * 46, color: COLORS.cyan, w: 3 },
    { rx: R * 0.92, ry: R * 0.62, rot: -t * 62 + 60, color: COLORS.violet, w: 3 },
    { rx: R * 0.72, ry: R * 0.72, rot: t * 88 + 30, color: COLORS.cyan, w: 2 },
    { rx: R * 1.08, ry: R * 0.34, rot: -t * 34 + 120, color: COLORS.violet, w: 2 },
  ];

  const rays = Array.from({ length: 16 }, (_, i) => {
    const a = (i / 16) * Math.PI * 2 + t * 0.5;
    const len = 60 + random(`rl${i}`) * 70;
    const wobble = Math.sin(t * 3 + i) * 12;
    return {
      x1: cx + Math.cos(a) * 26,
      y1: cy + Math.sin(a) * 26,
      x2: cx + Math.cos(a) * (len + wobble),
      y2: cy + Math.sin(a) * (len + wobble),
      color: i % 2 === 0 ? COLORS.cyan : COLORS.violet,
      op: 0.3 + random(`ro${i}`) * 0.5,
    };
  });

  return (
    <svg
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        transform: `scale(${scale})`,
        transformOrigin: `${cx}px ${cy}px`,
        overflow: "visible",
      }}
    >
      <defs>
        <radialGradient id="orbCore">
          <stop offset="0" stopColor="#FFFFFF" />
          <stop offset="0.4" stopColor={COLORS.cyan} />
          <stop offset="1" stopColor={COLORS.cyan} stopOpacity="0" />
        </radialGradient>
      </defs>

      {rays.map((r, i) => (
        <line
          key={i}
          x1={r.x1}
          y1={r.y1}
          x2={r.x2}
          y2={r.y2}
          stroke={r.color}
          strokeWidth="2"
          opacity={r.op * pulse}
        />
      ))}

      <circle cx={cx} cy={cy} r={R * 1.5} fill="url(#orbCore)" style={{ opacity: 0.22 * pulse }} />

      {rings.map((rg, i) => (
        <ellipse
          key={i}
          cx={cx}
          cy={cy}
          rx={rg.rx}
          ry={rg.ry}
          fill="none"
          stroke={rg.color}
          strokeWidth={rg.w}
          opacity="0.85"
          transform={`rotate(${rg.rot} ${cx} ${cy})`}
        />
      ))}

      <circle cx={cx} cy={cy} r={26 * pulse} fill="url(#orbCore)" />
      <circle cx={cx} cy={cy} r={10 * pulse} fill="#FFFFFF" />
    </svg>
  );
};
