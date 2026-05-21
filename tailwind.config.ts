import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ceu: {
          50: "#eaf6ff",
          100: "#cfe9ff",
          200: "#a4d4ff",
          300: "#75bdff",
          400: "#4ea7ff",
          500: "#2f8cf0",
          600: "#1f6fcc",
          700: "#1a59a3",
        },
        sol: {
          100: "#fff6cc",
          200: "#ffe785",
          300: "#ffd84a",
          400: "#ffc81f",
          500: "#f5b400",
        },
        menta: {
          100: "#dff7ec",
          200: "#b6efd2",
          300: "#7fe0b1",
          400: "#4ccf95",
          500: "#26b87a",
          600: "#179560",
        },
        coral: {
          100: "#ffe1d9",
          200: "#ffbaa9",
          300: "#ff8d75",
          400: "#ff6a4d",
          500: "#ee4d30",
        },
      },
      fontFamily: {
        sans: ["var(--font-nunito)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        chunky: "0 6px 0 rgba(0,0,0,0.12), 0 10px 20px rgba(0,0,0,0.08)",
        chunkyLg:
          "0 8px 0 rgba(0,0,0,0.14), 0 14px 28px rgba(0,0,0,0.10)",
      },
      borderRadius: {
        xl2: "1.25rem",
        "3xl": "1.75rem",
      },
      keyframes: {
        pop: {
          "0%": { transform: "scale(0.7)", opacity: "0" },
          "70%": { transform: "scale(1.05)", opacity: "1" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        wiggle: {
          "0%, 100%": { transform: "rotate(-3deg)" },
          "50%": { transform: "rotate(3deg)" },
        },
        floaty: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" },
        },
      },
      animation: {
        pop: "pop 0.35s ease-out",
        wiggle: "wiggle 0.4s ease-in-out 2",
        floaty: "floaty 3s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
