"use client";

// Official-style logos (simplified SVG representations)

export function PythonLogo({ className = "w-16 h-16" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 256 256"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Top snake - blue */}
      <path
        d="M126.916 0c-61.796 0-57.972 26.767-57.972 26.767l.072 27.734h59.014v8.327H44.544S.694 57.104.694 120.837c0 63.734 38.06 61.464 38.06 61.464h22.743v-29.582s-1.227-38.06 37.429-38.06h64.213s36.246.588 36.246-35.066V36.482S204.658.001 126.916 0zm-35.537 18.327a10.68 10.68 0 1 1 0 21.361 10.68 10.68 0 0 1 0-21.361z"
        fill="#3776AB"
      />
      {/* Bottom snake - yellow */}
      <path
        d="M128.084 255.996c61.795 0 57.972-26.767 57.972-26.767l-.072-27.734h-59.014v-8.327h83.486s43.85-2.276 43.85-66.009c0-63.733-38.06-61.463-38.06-61.463h-22.743v29.582s1.227 38.06-37.429 38.06H91.86s-36.245-.588-36.245 35.066v83.11s-5.503 36.482 72.24 36.482h.228zm35.537-18.327a10.68 10.68 0 1 1 0-21.361 10.68 10.68 0 0 1 0 21.361z"
        fill="#FFD43B"
      />
    </svg>
  );
}

export function JavaScriptLogo({ className = "w-16 h-16" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 256 256"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="256" height="256" fill="#F7DF1E" rx="16" />
      <path
        d="M67.312 213.932l19.59-11.856c3.78 6.701 7.218 12.371 15.465 12.371 7.905 0 12.89-3.092 12.89-15.12v-81.798h24.057v82.138c0 24.917-14.606 36.259-35.916 36.259-19.245 0-30.416-9.967-36.087-21.996M152.381 211.354l19.588-11.341c5.157 8.421 11.859 14.607 23.715 14.607 9.969 0 16.325-4.984 16.325-11.858 0-8.248-6.53-11.17-17.528-15.98l-6.013-2.58c-17.357-7.387-28.87-16.667-28.87-36.257 0-18.044 13.747-31.792 35.228-31.792 15.294 0 26.292 5.328 34.196 19.247L210.29 147.43c-4.125-7.389-8.591-10.31-15.465-10.31-7.046 0-11.514 4.468-11.514 10.31 0 7.217 4.468 10.140 14.921 14.601l6.013 2.579c20.436 8.763 31.949 17.699 31.949 37.751 0 21.661-17.013 33.5-39.855 33.5-22.321 0-36.745-10.637-43.767-24.506"
        fill="#000000"
      />
    </svg>
  );
}

export function JavaLogo({ className = "w-16 h-16" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 256 256"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Cup */}
      <path
        d="M96 182s-8 5 6 7c18 2 27 2 47-2 0 0 5 3 12 6-43 18-98-1-65-11z"
        fill="#5382A1"
      />
      <path
        d="M89 162s-9 7 5 8c20 2 36 2 63-3 0 0 4 4 10 6-55 16-116 1-78-11z"
        fill="#5382A1"
      />
      <path
        d="M136 122c11 13-3 24-3 24s28-14 15-32c-12-17-21-25 28-53 0 0-77 19-40 61z"
        fill="#F89820"
      />
      <path
        d="M180 192s6 5-7 9c-25 8-104 10-126 0-8-3 7-8 12-9 5-1 8-1 8-1-9-6-58 12-25 18 91 15 165-6 138-17z"
        fill="#5382A1"
      />
      <path
        d="M100 132s-41 10-14 13c11 2 34 1 55-1 17-1 35-4 35-4s-6 3-10 5c-43 11-125 6-101-6 20-9 35-7 35-7z"
        fill="#5382A1"
      />
      <path
        d="M157 212c40-24 22-47 9-44-3 1-5 2-5 2s1-2 3-3c24-8 41 25-8 47 0 0 2-1 1-2z"
        fill="#5382A1"
      />
    </svg>
  );
}

export function CppLogo({ className = "w-16 h-16" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 256 256"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M128 0L23 61v134l105 61 105-61V61L128 0z" fill="#00599C" />
      <path d="M128 31L47 78v100l81 47 81-47V78l-81-47z" fill="#004482" />
      <path
        d="M108 152c-8 4-16 6-24 6-22 0-40-18-40-40s18-40 40-40c8 0 16 2 24 6v18c-6-4-14-6-22-6-14 0-26 11-26 26s12 26 26 26c8 0 16-2 22-6v18v-8zM240 112h-14v14h-14v-14h-14v-14h14V84h14v14h14v14zM172 112h-14v14h-14v-14h-14v-14h14V84h14v14h14v14z"
        fill="#FFFFFF"
      />
    </svg>
  );
}

export function PhpLogo({ className = "w-16 h-16" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 256 256"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <ellipse cx="128" cy="128" rx="120" ry="70" fill="#777BB3" />
      <text
        x="128"
        y="155"
        textAnchor="middle"
        fontSize="80"
        fontWeight="900"
        fill="#FFFFFF"
        fontFamily="Arial, sans-serif"
      >
        php
      </text>
    </svg>
  );
}
