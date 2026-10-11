import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        ink: "#0A0A0A",
        paper: "#FAFAF7",
        vermilion: "#E5484D",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        success: {
          DEFAULT: "#16A34A",
          foreground: "#FAFAF7",
        },
        warning: {
          DEFAULT: "#D97706",
          foreground: "#FAFAF7",
        },
        dark: {
          bg: "#0A0A0A",
          card: "#111111",
          border: "#222222",
          surface: "#1A1A1A",
        },
        navy: {
          DEFAULT: "#0A0E27",
          950: "#060819",
          900: "#0A0E27",
          800: "#0F1433",
          700: "#1A0B3D",
          600: "#241257",
        },
        neon: {
          cyan: "#00E5FF",
          violet: "#7C4DFF",
          pink: "#FF3B6B",
          green: "#3DFFA2",
          amber: "#FFC53D",
          red: "rgb(var(--accent-primary-rgb) / <alpha-value>)",
          orange: "rgb(var(--accent-secondary-rgb) / <alpha-value>)",
        },
        surface: {
          base: "#05060A",
          elevated: "rgba(255,255,255,0.02)",
          overlay: "rgba(255,255,255,0.04)",
          border: "rgba(255,255,255,0.06)",
          "border-hover": "rgba(255,255,255,0.12)",
        },
      },
      boxShadow: {
        "glow-cyan": "0 0 24px -6px rgba(0,229,255,0.55)",
        "glow-violet": "0 0 24px -6px rgba(124,77,255,0.55)",
        "glow-red": "0 0 24px -6px rgba(255,59,107,0.45)",
        "glow-orange": "0 0 24px -6px rgba(255,107,53,0.45)",
        "glow-soft": "0 8px 40px -12px rgba(0,0,0,0.5)",
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        sans: ["var(--font-sans)", "sans-serif"],
        mono: ["var(--font-mono)", "Fira Code", "monospace"],
      },
      borderRadius: {
        none: "0",
        sm: "2px",
        DEFAULT: "2px",
        md: "4px",
        lg: "6px",
      },
      animation: {
        "slide-up": "slideUp 0.4s ease-out",
        "fade-in": "fadeIn 0.4s ease-out",
        "shimmer": "shimmer 2.2s linear infinite",
        "glow-pulse": "glowPulse 3s ease-in-out infinite",
        "float": "float 6s ease-in-out infinite",
        "gradient-x": "gradientX 6s ease infinite",
        "spin-slow": "spin 12s linear infinite",
      },
      keyframes: {
        slideUp: {
          "0%": { transform: "translateY(12px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        glowPulse: {
          "0%, 100%": { opacity: "0.55" },
          "50%": { opacity: "1" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
        gradientX: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
