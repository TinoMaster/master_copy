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
        primary: "#0ea5e9",
        secondary: "#ec4749",
        /* darkMode: '#151618', */
        darkMode: "#121823",
        lightDarkMode: "#111827",
        darkContrast: "#161e2d",
        pri: {
          "50": "#f0faff",
          "100": "#e0f5fe",
          "200": "#bae8fd",
          "300": "#7dd5fc",
          "400": "#38bcf8",
          "500": "#0ea5e9",
          "600": "#028ac7",
          "700": "#0370a1",
          "800": "#075e85",
          "900": "#0c506e",
          "950": "#083549",
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
        "720p": "1400px",
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
