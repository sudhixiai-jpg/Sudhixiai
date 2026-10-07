import type { Config } from "tailwindcss";

// Tokens reproduced from the approved SUDHIXAI Stitch design system
// ("Deep Tech Architecture" / homepage code.html config block).
const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./data/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        surface: "#051424",
        "surface-dim": "#051424",
        "surface-bright": "#2c3a4c",
        "surface-container-lowest": "#010f1f",
        "surface-container-low": "#0d1c2d",
        "surface-container": "#122131",
        "surface-container-high": "#1c2b3c",
        "surface-container-highest": "#273647",
        "on-surface": "#d4e4fa",
        "on-surface-variant": "#c2c6d6",
        "inverse-surface": "#d4e4fa",
        "inverse-on-surface": "#233143",
        outline: "#8c909f",
        "outline-variant": "#424754",
        "surface-tint": "#adc6ff",
        primary: "#adc6ff",
        "on-primary": "#002e6a",
        "primary-container": "#4d8eff",
        "on-primary-container": "#00285d",
        "inverse-primary": "#005ac2",
        secondary: "#c0c1ff",
        "on-secondary": "#1000a9",
        "secondary-container": "#3131c0",
        "on-secondary-container": "#b0b2ff",
        tertiary: "#4cd7f6",
        "on-tertiary": "#003640",
        "tertiary-container": "#009eb9",
        "on-tertiary-container": "#002f38",
        error: "#ffb4ab",
        "on-error": "#690005",
        "error-container": "#93000a",
        "on-error-container": "#ffdad6",
        "primary-fixed": "#d8e2ff",
        "primary-fixed-dim": "#adc6ff",
        "on-primary-fixed": "#001a42",
        "on-primary-fixed-variant": "#004395",
        "secondary-fixed": "#e1e0ff",
        "secondary-fixed-dim": "#c0c1ff",
        "on-secondary-fixed": "#07006c",
        "on-secondary-fixed-variant": "#2f2ebe",
        "tertiary-fixed": "#acedff",
        "tertiary-fixed-dim": "#4cd7f6",
        "on-tertiary-fixed": "#001f26",
        "on-tertiary-fixed-variant": "#004e5c",
        background: "#051424",
        "on-background": "#d4e4fa",
        "surface-variant": "#273647",
      },
      borderRadius: {
        DEFAULT: "0.125rem",
        lg: "0.25rem",
        xl: "0.5rem",
        full: "0.75rem",
      },
      spacing: {
        "space-2xs": "2px",
        "space-xs": "4px",
        "space-sm": "8px",
        "space-md": "12px",
        "space-base": "16px",
        "space-lg": "24px",
        "space-xl": "32px",
        "space-2xl": "48px",
        "space-3xl": "64px",
        "space-4xl": "96px",
        "space-section": "128px",
        "grid-margin-mobile": "16px",
        "grid-margin-tablet": "24px",
        "grid-margin-desktop": "48px",
        "gutter-mobile": "12px",
        "gutter-tablet": "16px",
        "gutter-desktop": "24px",
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "Geist", "sans-serif"],
        mono: ["JetBrains Mono", "var(--font-geist-mono)", "monospace"],
      },
      fontSize: {
        "display-hero": [
          "64px",
          { lineHeight: "68px", letterSpacing: "-0.035em", fontWeight: "700" },
        ],
        "display-hero-mobile": [
          "40px",
          { lineHeight: "44px", letterSpacing: "-0.03em", fontWeight: "700" },
        ],
        "headline-xl": [
          "48px",
          { lineHeight: "54px", letterSpacing: "-0.03em", fontWeight: "600" },
        ],
        "headline-xl-mobile": [
          "32px",
          { lineHeight: "38px", letterSpacing: "-0.025em", fontWeight: "600" },
        ],
        "headline-lg": [
          "36px",
          { lineHeight: "42px", letterSpacing: "-0.025em", fontWeight: "600" },
        ],
        "headline-lg-mobile": [
          "26px",
          { lineHeight: "32px", letterSpacing: "-0.02em", fontWeight: "600" },
        ],
        "headline-md": [
          "24px",
          { lineHeight: "32px", letterSpacing: "-0.02em", fontWeight: "500" },
        ],
        "headline-sm": [
          "18px",
          { lineHeight: "26px", letterSpacing: "-0.015em", fontWeight: "500" },
        ],
        "body-lg": [
          "16px",
          { lineHeight: "26px", letterSpacing: "-0.01em", fontWeight: "400" },
        ],
        "body-base": [
          "14px",
          { lineHeight: "22px", letterSpacing: "-0.005em", fontWeight: "400" },
        ],
        "body-sm": [
          "13px",
          { lineHeight: "20px", letterSpacing: "0em", fontWeight: "400" },
        ],
        "mono-code": [
          "13px",
          { lineHeight: "20px", letterSpacing: "0em", fontWeight: "400" },
        ],
        "mono-label": [
          "12px",
          { lineHeight: "16px", letterSpacing: "0.04em", fontWeight: "500" },
        ],
        "mono-caption": [
          "11px",
          { lineHeight: "14px", letterSpacing: "0.05em", fontWeight: "400" },
        ],
      },
      boxShadow: {
        glow: "0 0 16px rgba(77,142,255,0.25)",
        "glow-cyan": "0 0 25px -5px rgba(76,215,246,0.35)",
        "glow-blue": "0 0 25px -5px rgba(77,142,255,0.35)",
        "glow-lg": "0 0 50px -10px rgba(76,215,246,0.25)",
        "card-hover": "0 20px 40px -15px rgba(0,0,0,0.7), 0 0 20px -5px rgba(76,215,246,0.15)",
        header: "0 1px 8px rgba(0,0,0,0.4)",
        drawer: "0 12px 32px -8px rgba(0,0,0,0.7)",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" },
        },
        shimmer: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
      },
      animation: {
        marquee: "marquee 35s linear infinite",
        float: "float 5s ease-in-out infinite",
        shimmer: "shimmer 2.5s infinite",
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      maxWidth: {
        content: "1280px",
      },
    },
  },
  plugins: [],
};

export default config;
