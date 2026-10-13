"use client";

export function PythonIllustration() {
  return (
    <svg viewBox="0 0 300 120" className="h-auto w-full" fill="none">
      <rect width="300" height="120" rx="10" fill="#0A0B14" />

      <g transform="translate(110, 20)">
        <path d="M40 0 C20 0 15 10 15 20 L15 30 L40 30 L40 35 L5 35 C-5 35 -8 45 -8 55 C-8 65 -5 75 5 75 L15 75 L15 65 C15 55 20 50 30 50 L55 50 C65 50 70 45 70 35 L70 20 C70 10 60 0 40 0 Z" fill="#00E5FF" opacity="0.8" />
        <path d="M30 45 C10 45 5 55 5 65 L5 75 L20 75 L20 65 C20 60 25 55 35 55 L60 55 C70 55 75 50 75 40 L75 25 C75 15 65 5 45 5" fill="#FFB020" opacity="0.8" />
        <circle cx="25" cy="15" r="3" fill="#0A0B14" />
        <circle cx="55" cy="40" r="3" fill="#0A0B14" />
      </g>

      <text x="20" y="40" fontSize="10" fontFamily="monospace" fill="#3B4263">
        def
      </text>
      <text x="245" y="100" fontSize="10" fontFamily="monospace" fill="#3B4263">
        print()
      </text>
    </svg>
  );
}

export function JavaScriptIllustration() {
  return (
    <svg viewBox="0 0 300 120" className="h-auto w-full" fill="none">
      <rect width="300" height="120" rx="10" fill="#0A0B14" />

      <rect x="100" y="20" width="100" height="80" rx="8" fill="#F7DF1E" />

      <path d="M115 90 L115 55 L135 55 L135 75 C135 82 128 82 128 75 L128 70" stroke="#0A0B14" strokeWidth="6" fill="none" strokeLinecap="round" />
      <path d="M150 55 L175 55 L175 70 L150 70 L150 82 L175 82" stroke="#0A0B14" strokeWidth="6" fill="none" strokeLinecap="round" strokeLinejoin="round" />

      <text x="20" y="40" fontSize="10" fontFamily="monospace" fill="#3B4263">
        const
      </text>
      <text x="240" y="100" fontSize="10" fontFamily="monospace" fill="#3B4263">
        =&gt; {"{}"}
      </text>
    </svg>
  );
}

export function JavaIllustration() {
  return (
    <svg viewBox="0 0 300 120" className="h-auto w-full" fill="none">
      <rect width="300" height="120" rx="10" fill="#0A0B14" />

      <g transform="translate(100, 25)">
        <path d="M10 20 L90 20 L82 70 C80 80 70 85 50 85 C30 85 20 80 18 70 Z" fill="#EA2D2E" />
        <ellipse cx="50" cy="20" rx="40" ry="8" fill="#FF6B35" />

        <path d="M35 10 Q40 0 35 -10" stroke="#FF6B35" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.6" />
        <path d="M50 5 Q55 -5 50 -15" stroke="#FF6B35" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.7" />
        <path d="M65 10 Q70 0 65 -10" stroke="#FF6B35" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.6" />
      </g>

      <text x="20" y="100" fontSize="10" fontFamily="monospace" fill="#3B4263">
        public class
      </text>
    </svg>
  );
}

export function CppIllustration() {
  return (
    <svg viewBox="0 0 300 120" className="h-auto w-full" fill="none">
      <rect width="300" height="120" rx="10" fill="#0A0B14" />

      <g transform="translate(110, 30)">
        <circle cx="40" cy="40" r="35" fill="#00599C" />
        <circle cx="40" cy="40" r="22" fill="#0A0B14" />
        <path d="M40 20 L40 60 M20 40 L60 40" stroke="#00599C" strokeWidth="6" strokeLinecap="round" transform="translate(-8,-8)" opacity="0.4" />
      </g>

      <text x="185" y="55" fontSize="24" fontWeight="900" fill="#00E5FF" opacity="0.6">
        +
      </text>
      <text x="205" y="75" fontSize="24" fontWeight="900" fill="#00E5FF" opacity="0.6">
        +
      </text>

      <text x="20" y="40" fontSize="10" fontFamily="monospace" fill="#3B4263">
        #include
      </text>
    </svg>
  );
}

export function PhpIllustration() {
  return (
    <svg viewBox="0 0 300 120" className="h-auto w-full" fill="none">
      <rect width="300" height="120" rx="10" fill="#0A0B14" />

      <g transform="translate(110, 20)">
        <ellipse cx="40" cy="45" rx="40" ry="30" fill="#7C4DFF" />
        <circle cx="28" cy="35" r="4" fill="#0A0B14" />
        <circle cx="52" cy="35" r="4" fill="#0A0B14" />
        <ellipse cx="40" cy="55" rx="15" ry="8" fill="#9B6DFF" />
        <path d="M15 50 Q5 55 10 65" stroke="#7C4DFF" strokeWidth="3" fill="none" strokeLinecap="round" />
        <path d="M65 50 Q75 55 70 65" stroke="#7C4DFF" strokeWidth="3" fill="none" strokeLinecap="round" />
      </g>

      <text x="20" y="105" fontSize="10" fontFamily="monospace" fill="#3B4263">
        &lt;?php
      </text>
      <text x="240" y="105" fontSize="10" fontFamily="monospace" fill="#3B4263">
        ?&gt;
      </text>
    </svg>
  );
}
