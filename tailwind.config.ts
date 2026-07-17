import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#2EA3F2",
        "primary-hover": "#82C0C7",
        accent: "#7C5CFF",
        "accent-2": "#22D3EE",
        text: "#666666",
        "text-muted": "#999999",
        heading: "#333333",
        surface: "#F3F3F3",
        border: "#EEEEEE",
        footer: "#222222",
        "footer-bottom": "#1F1F1F",
      },
      fontFamily: {
        sans: ['"Open Sans"', "Arial", "sans-serif"],
      },
      maxWidth: {
        container: "1120px",
      },
      boxShadow: {
        card: "0 8px 24px rgba(46, 163, 242, 0.08), 0 2px 6px rgba(15, 23, 42, 0.04)",
      },
      borderRadius: {
        card: "12px",
      },
    },
  },
  plugins: [],
};

export default config;
