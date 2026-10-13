"use client";

export function ErrorConfusionIllustration() {
  return (
    <svg viewBox="0 0 400 200" className="h-auto w-full" fill="none">
      <rect width="400" height="200" rx="12" fill="#0A0B14" />

      <rect x="40" y="40" width="240" height="120" rx="8" fill="#0F1119" stroke="#1E2233" strokeWidth="1.5" />

      <circle cx="55" cy="52" r="3" fill="#FF3B6B" />
      <circle cx="67" cy="52" r="3" fill="#FFB020" />
      <circle cx="79" cy="52" r="3" fill="#00FF9D" />

      <rect x="55" y="72" width="100" height="6" rx="2" fill="#3B4263" />
      <rect x="55" y="88" width="160" height="6" rx="2" fill="#3B4263" />
      <rect x="55" y="104" width="80" height="6" rx="2" fill="#FF3B6B" />
      <rect x="55" y="120" width="120" height="6" rx="2" fill="#3B4263" />
      <rect x="55" y="136" width="60" height="6" rx="2" fill="#3B4263" />

      <circle cx="320" cy="100" r="45" fill="#FF3B6B" opacity="0.15" />
      <circle cx="320" cy="100" r="30" fill="#FF3B6B" opacity="0.25" />
      <text x="320" y="118" textAnchor="middle" fontSize="52" fontWeight="900" fill="#FF3B6B">
        ?
      </text>

      <path d="M370 40 L374 52 L386 56 L374 60 L370 72 L366 60 L354 56 L366 52 Z" fill="#7C4DFF" opacity="0.6" />
    </svg>
  );
}

export function TechnicalErrorIllustration() {
  return (
    <svg viewBox="0 0 400 200" className="h-auto w-full" fill="none">
      <rect width="400" height="200" rx="12" fill="#0A0B14" />

      <rect x="50" y="50" width="300" height="100" rx="8" fill="#1A0F14" stroke="#FF3B6B" strokeWidth="1.5" strokeOpacity="0.4" />

      <circle cx="70" cy="75" r="6" fill="#FF3B6B" opacity="0.8" />
      <text x="85" y="79" fontSize="11" fontWeight="700" fill="#FF3B6B">
        Traceback (most recent call last):
      </text>

      <text x="70" y="100" fontSize="10" fontFamily="monospace" fill="#FF6B8A">
        File &quot;main.py&quot;, line 5, in &lt;module&gt;
      </text>
      <text x="70" y="118" fontSize="10" fontFamily="monospace" fill="#FF6B8A">
        TypeError: unsupported operand type(s)
      </text>
      <text x="70" y="136" fontSize="10" fontFamily="monospace" fill="#FF6B8A">
        for +: &apos;int&apos; and &apos;str&apos;
      </text>

      <text x="360" y="70" fontSize="20" fill="#7C4DFF" opacity="0.5">
        ¿
      </text>
      <text x="340" y="140" fontSize="16" fill="#7C4DFF" opacity="0.4">
        #
      </text>
      <text x="40" y="160" fontSize="18" fill="#7C4DFF" opacity="0.3">
        @
      </text>
    </svg>
  );
}

export function OverwhelmedTeacherIllustration() {
  return (
    <svg viewBox="0 0 400 200" className="h-auto w-full" fill="none">
      <rect width="400" height="200" rx="12" fill="#0A0B14" />

      {[60, 90, 120].map((x, i) => (
        <g key={i} opacity={1 - i * 0.25}>
          <circle cx={x} cy="80" r="10" fill="#00E5FF" />
          <rect x={x - 12} y="95" width="24" height="30" rx="4" fill="#00E5FF" opacity="0.6" />
        </g>
      ))}

      <circle cx="320" cy="80" r="20" fill="#FF6B35" />
      <rect x="295" y="105" width="50" height="60" rx="6" fill="#FF6B35" opacity="0.7" />

      <path d="M350 50 L365 40 M360 70 L375 65 M355 90 L370 92" stroke="#FF3B6B" strokeWidth="2.5" strokeLinecap="round" />

      <g opacity="0.5">
        <rect x="200" y="55" width="50" height="24" rx="6" fill="#0F1119" stroke="#3B4263" />
        <rect x="215" y="90" width="55" height="24" rx="6" fill="#0F1119" stroke="#3B4263" />
        <rect x="205" y="125" width="60" height="24" rx="6" fill="#0F1119" stroke="#3B4263" />
      </g>

      <circle cx="320" cy="180" r="14" fill="#FF3B6B" opacity="0.3" />
      <text x="320" y="185" textAnchor="middle" fontSize="16" fontWeight="900" fill="#FF3B6B">
        !
      </text>
    </svg>
  );
}
