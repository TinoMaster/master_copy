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
        secondary: "#6366f1",
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
          "50": "#eeeeff",
          "100": "#e0e1ff",
          "200": "#c7c8fe",
          "300": "#a5a7fc",
          "400": "#8184f8",
          "500": "#6366f1",
          "600": "#4649e5",
          "700": "#383bca",
          "800": "#3032a3",
          "900": "#2e3081",
          "950": "#1b1c4b",
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
