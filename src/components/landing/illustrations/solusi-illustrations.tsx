"use client";

export function RealTimeIllustration() {
  return (
    <svg viewBox="0 0 400 200" className="h-auto w-full" fill="none">
      <rect width="400" height="200" rx="12" fill="#0A0B14" />

      <rect x="60" y="30" width="280" height="140" rx="8" fill="#0F1119" stroke="#1E2233" strokeWidth="1.5" />
      <rect x="55" y="170" width="290" height="8" rx="4" fill="#1E2233" />

      <rect x="80" y="55" width="120" height="6" rx="2" fill="#3B4263" />
      <rect x="80" y="71" width="90" height="6" rx="2" fill="#3B4263" />
      <rect x="80" y="87" width="100" height="6" rx="2" fill="#FF3B6B" />
      <rect x="80" y="103" width="70" height="6" rx="2" fill="#3B4263" />

      <rect x="220" y="60" width="100" height="70" rx="12" fill="#00E5FF" fillOpacity="0.15" stroke="#00E5FF" strokeWidth="1.5" strokeOpacity="0.6" />
      <rect x="232" y="76" width="60" height="5" rx="2" fill="#00E5FF" />
      <rect x="232" y="88" width="76" height="5" rx="2" fill="#00E5FF" opacity="0.7" />
      <rect x="232" y="100" width="50" height="5" rx="2" fill="#00E5FF" opacity="0.5" />
      <rect x="232" y="112" width="70" height="5" rx="2" fill="#00E5FF" opacity="0.3" />

      <path d="M365 45 L355 70 L365 70 L355 95 L375 65 L365 65 Z" fill="#FFB020" />
    </svg>
  );
}

export function IndonesianLanguageIllustration() {
  return (
    <svg viewBox="0 0 400 200" className="h-auto w-full" fill="none">
      <rect width="400" height="200" rx="12" fill="#0A0B14" />

      <rect x="80" y="40" width="240" height="120" rx="16" fill="#0F1119" stroke="#7C4DFF" strokeWidth="1.5" strokeOpacity="0.4" />

      <path d="M110 160 L110 185 L140 160 Z" fill="#0F1119" stroke="#7C4DFF" strokeWidth="1.5" strokeOpacity="0.4" />

      <text x="100" y="75" fontSize="11" fontWeight="700" fill="#00FF9D">
        Penjelasan:
      </text>
      <text x="100" y="95" fontSize="10" fill="#A1A1AA">
        Error terjadi karena nilai kosong,
      </text>
      <text x="100" y="112" fontSize="10" fill="#A1A1AA">
        sehingga len(nilai) = 0 dan
      </text>
      <text x="100" y="129" fontSize="10" fill="#A1A1AA">
        terjadi pembagian dengan nol.
      </text>
      <text x="100" y="146" fontSize="10" fontWeight="700" fill="#FF6B35">
        Perbaiki dengan validasi if not nilai.
      </text>

      <g transform="translate(340, 60)">
        <rect width="40" height="14" fill="#FF3B6B" />
        <rect y="14" width="40" height="14" fill="#FFFFFF" />
        <rect x="-3" y="0" width="3" height="40" fill="#3B4263" />
      </g>
    </svg>
  );
}

export function RecommendationIllustration() {
  return (
    <svg viewBox="0 0 400 200" className="h-auto w-full" fill="none">
      <rect width="400" height="200" rx="12" fill="#0A0B14" />

      <g transform="translate(90, 50)">
        <rect width="100" height="18" rx="3" fill="#00E5FF" />
        <rect y="22" width="100" height="18" rx="3" fill="#7C4DFF" />
        <rect y="44" width="100" height="18" rx="3" fill="#FF6B35" />
        <rect y="66" width="100" height="18" rx="3" fill="#00FF9D" />
        <rect y="88" width="100" height="18" rx="3" fill="#FFB020" />
      </g>

      <path d="M210 100 L260 100" stroke="#7C4DFF" strokeWidth="2" strokeDasharray="4 4" />
      <path d="M255 95 L265 100 L255 105" stroke="#7C4DFF" strokeWidth="2" fill="none" />

      <circle cx="310" cy="100" r="40" fill="#7C4DFF" fillOpacity="0.15" />
      <circle cx="310" cy="100" r="28" fill="#7C4DFF" fillOpacity="0.25" />
      <circle cx="310" cy="100" r="16" fill="#7C4DFF" fillOpacity="0.4" />
      <circle cx="310" cy="100" r="6" fill="#7C4DFF" />

      <path d="M360 40 L363 48 L371 51 L363 54 L360 62 L357 54 L349 51 L357 48 Z" fill="#00E5FF" opacity="0.7" />
    </svg>
  );
}
