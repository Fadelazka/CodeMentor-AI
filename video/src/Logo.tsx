import React from "react";
import { COLORS } from "./theme";

type LogoProps = {
  size?: number;
  uid?: string;
  showBrain?: boolean;
};

/**
 * Logo CodeMentor AI: heksagon bersudut bulat, di dalamnya tanda kurung
 * kode "</>" menyatu dengan motif otak-sirkuit. Gradien cyan -> violet
 * dengan filter glow neon. Semua digambar inline SVG (tanpa aset eksternal).
 */
export const Logo: React.FC<LogoProps> = ({
  size = 400,
  uid = "cm",
  showBrain = true,
}) => {
  const grad = `${uid}-grad`;
  const glow = `${uid}-glow`;
  const soft = `${uid}-soft`;
  const core = `${uid}-core`;

  // Heksagon "pointy-top" dengan sudut membulat (r = 170, pusat 200,200).
  const hex =
    "M 224.25 44 " +
    "L 322.95 101 Q 347.2 115 347.2 143 " +
    "L 347.2 257 Q 347.2 285 322.95 299 " +
    "L 224.25 356 Q 200 370 175.75 356 " +
    "L 77.05 299 Q 52.8 285 52.8 257 " +
    "L 52.8 143 Q 52.8 115 77.05 101 " +
    "L 175.75 44 Q 200 30 224.25 44 Z";

  const brain =
    "M 128 215 C 128 165 160 140 200 140 C 240 140 272 165 272 215 " +
    "C 272 250 255 272 232 275 C 224 276 216 270 210 276 " +
    "C 204 282 196 282 190 276 C 184 270 176 276 168 275 " +
    "C 145 272 128 250 128 215 Z";

  // Node sirkuit (motif otak) dan rel ke inti.
  const nodes: Array<[number, number]> = [
    [150, 178],
    [250, 178],
    [132, 222],
    [268, 222],
    [162, 258],
    [238, 258],
    [200, 150],
  ];
  const brainCore: [number, number] = [200, 212];

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 400 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id={grad} x1="60" y1="40" x2="340" y2="360">
          <stop offset="0" stopColor={COLORS.cyan} />
          <stop offset="1" stopColor={COLORS.violet} />
        </linearGradient>
        <radialGradient id={core}>
          <stop offset="0" stopColor="#FFFFFF" />
          <stop offset="0.35" stopColor={COLORS.cyan} />
          <stop offset="1" stopColor={COLORS.cyan} stopOpacity="0" />
        </radialGradient>
        <filter id={glow} x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="6" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id={soft} x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="2.2" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Heksagon */}
      <path
        d={hex}
        stroke={`url(#${grad})`}
        strokeWidth="9"
        strokeLinejoin="round"
        strokeLinecap="round"
        filter={`url(#${glow})`}
      />

      {showBrain && (
        <g opacity="0.5">
          <path
            d={brain}
            stroke={`url(#${grad})`}
            strokeWidth="3"
            strokeLinejoin="round"
            fill="none"
          />
          {nodes.map(([x, y], i) => (
            <line
              key={`l${i}`}
              x1={brainCore[0]}
              y1={brainCore[1]}
              x2={x}
              y2={y}
              stroke={COLORS.cyan}
              strokeWidth="2"
              opacity="0.7"
            />
          ))}
          {nodes.map(([x, y], i) => (
            <circle key={`n${i}`} cx={x} cy={y} r="4" fill={COLORS.cyan} />
          ))}
          <circle
            cx={brainCore[0]}
            cy={brainCore[1]}
            r="7"
            fill={`url(#${core})`}
            filter={`url(#${soft})`}
          />
        </g>
      )}

      {/* Tanda kurung kode "</>" */}
      <g
        stroke={`url(#${grad})`}
        strokeWidth="13"
        strokeLinecap="round"
        strokeLinejoin="round"
        filter={`url(#${soft})`}
      >
        <polyline points="175,165 135,205 175,245" />
        <polyline points="225,165 265,205 225,245" />
        <line x1="215" y1="160" x2="185" y2="250" />
      </g>
    </svg>
  );
};
