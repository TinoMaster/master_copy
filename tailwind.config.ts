import type { Config } from "tailwindcss";

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        primary: "#4672b1",
        secondary: "#ec4749",
        /* darkMode: '#151618', */
        darkMode: "#121823",
        lightDarkMode: "#111827",
        darkContrast: "#161e2d",
        pri: {
          "50": "#f4f6fb",
          "100": "#e8ecf6",
          "200": "#cbd8ec",
          "300": "#9db6dc",
          "400": "#6990c7",
          "500": "#4672b1",
          "600": "#345995",
          "700": "#2b4779",
          "800": "#273e65",
          "900": "#253555",
          "950": "#111827",
        },
        sec: {
          "50": "#fef2f2",
          "100": "#fde3e3",
          "200": "#fdcbcc",
          "300": "#faa7a8",
          "400": "#f57476",
          "500": "#ec4749",
          "600": "#d82a2c",
          "700": "#b61f21",
          "800": "#971d1f",
          "900": "#611819",
          "950": "#440b0c",
        },
      },
      maxWidth: {
        "1080p": "1920px",
        "720p": "1280px",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
