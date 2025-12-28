import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cyber: {
          black: "#0A0A0A",
          dark: "#0D0221",
          grid: "#1A1A2E",
          purple: "#B026FF",
        },
        neon: {
          pink: "#FF10F0",
          cyan: "#00FFF0",
          yellow: "#FFFF00",
          purple: "#B026FF",
          blue: "#00D4FF",
          green: "#39FF14",
        },
      },
      fontFamily: {
        orbitron: ["Orbitron", "sans-serif"],
        "space-mono": ["Space Mono", "monospace"],
        rajdhani: ["Rajdhani", "sans-serif"],
        "share-tech": ["Share Tech Mono", "monospace"],
        "exo-2": ["Exo 2", "sans-serif"],
      },
      boxShadow: {
        "neon-pink": "0 0 20px #FF10F0, 0 0 40px #FF10F0",
        "neon-cyan": "0 0 20px #00FFF0, 0 0 40px #00FFF0",
        "neon-yellow": "0 0 20px #FFFF00, 0 0 40px #FFFF00",
        "neon-purple": "0 0 20px #B026FF, 0 0 40px #B026FF",
        "glow-sm": "0 0 10px currentColor",
        "glow-md": "0 0 20px currentColor",
        "glow-lg": "0 0 30px currentColor",
        "glow-xl": "0 0 40px currentColor",
      },
      animation: {
        "glitch-1": "glitch-1 0.3s infinite",
        "glitch-2": "glitch-2 0.3s infinite",
        "pulse-neon": "pulse-neon 2s ease-in-out infinite",
        "scan-line": "scan-line 8s linear infinite",
        flicker: "flicker 3s linear infinite",
        float: "float 6s ease-in-out infinite",
        "matrix-rain": "matrix-rain 20s linear infinite",
        shimmer: "shimmer 2s infinite",
      },
      keyframes: {
        "glitch-1": {
          "0%, 100%": { transform: "translate(0)" },
          "33%": { transform: "translate(-2px, 2px)" },
          "66%": { transform: "translate(2px, -2px)" },
        },
        "glitch-2": {
          "0%, 100%": { transform: "translate(0)" },
          "33%": { transform: "translate(2px, -2px)" },
          "66%": { transform: "translate(-2px, 2px)" },
        },
        "pulse-neon": {
          "0%, 100%": {
            opacity: "1",
            filter: "brightness(1) drop-shadow(0 0 10px currentColor)",
          },
          "50%": {
            opacity: "0.8",
            filter: "brightness(1.2) drop-shadow(0 0 20px currentColor)",
          },
        },
        "scan-line": {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100vh)" },
        },
        flicker: {
          "0%, 100%": { opacity: "1" },
          "41.99%": { opacity: "1" },
          "42%": { opacity: "0" },
          "43%": { opacity: "0" },
          "43.01%": { opacity: "1" },
          "47.99%": { opacity: "1" },
          "48%": { opacity: "0" },
          "49%": { opacity: "0" },
          "49.01%": { opacity: "1" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        "matrix-rain": {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100%)" },
        },
        shimmer: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
      },
      backgroundImage: {
        "cyber-gradient": "linear-gradient(45deg, #FF10F0, #00FFF0)",
        hologram: "linear-gradient(90deg, #00FFF0, #FF10F0, #FFFF00)",
        "grid-cyber":
          "linear-gradient(to right, rgba(0, 255, 240, 0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(0, 255, 240, 0.1) 1px, transparent 1px)",
      },
      backgroundSize: {
        "grid-pattern": "50px 50px",
      },
    },
  },
  plugins: [],
};

export default config;
