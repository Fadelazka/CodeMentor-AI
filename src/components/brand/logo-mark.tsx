"use client";

interface LogoMarkProps {
  className?: string;
  size?: number;
}

export function LogoMark({ className = "w-9 h-9", size = 36 }: LogoMarkProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 64 64"
      width={size}
      height={size}
      className={className}
      aria-label="CodeMentor AI"
      role="img"
    >
      <defs>
        <linearGradient id="cmLogoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FF3B6B" />
          <stop offset="100%" stopColor="#FF6B35" />
        </linearGradient>
      </defs>

      <rect width="64" height="64" rx="14" fill="#0A0E27" />

      <rect
        x="1"
        y="1"
        width="62"
        height="62"
        rx="13"
        fill="none"
        stroke="url(#cmLogoGradient)"
        strokeWidth="1.5"
        strokeOpacity="0.3"
      />

      <path
        d="M20 22 L12 32 L20 42"
        stroke="url(#cmLogoGradient)"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <path
        d="M44 22 L52 32 L44 42"
        stroke="url(#cmLogoGradient)"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <path
        d="M36 20 L28 44"
        stroke="#00E5FF"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  );
}
