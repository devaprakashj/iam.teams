import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#6C3CE1", // Brand Purple
          hover: "#5A2ECC",
        },
        cta: {
          DEFAULT: "#FF6B35", // Brand Orange
          hover: "#E85A24",
        },
        dark: "#1A1A1A",
        gray: {
          text: "#666666",
          light: "#999999",
          border: "#E5E7EB",
          bg: "#F9FAFB",
        },
        background: "#FFFFFF",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      borderRadius: {
        'card': '16px',
        'button': '8px',
      },
      boxShadow: {
        card: "0 4px 24px rgba(0,0,0,0.08)",
      }
    },
  },
  plugins: [],
};
export default config;

