export const COLORS = {
  bgFrom: "#0A0E27",
  bgTo: "#1A0B3D",
  cyan: "#00E5FF",
  violet: "#7C4DFF",
  success: "#00FF9D",
  error: "#FF3B6B",
  text: "#FFFFFF",
} as const;

export const FPS = 30;
export const DURATION_IN_FRAMES = 360; // 12 detik
export const WIDTH = 1920;
export const HEIGHT = 1080;

export const LANGUAGES = [
  { name: "Python", color: "#3B82F6" },
  { name: "JavaScript", color: "#FACC15" },
  { name: "Java", color: "#FB923C" },
  { name: "C++", color: "#2DD4BF" },
  { name: "PHP", color: "#A855F7" },
] as const;

export const CODE_FRAGMENTS = [
  "def hello():",
  "console.log",
  "public class",
  "print(x)",
  "<?php",
] as const;
