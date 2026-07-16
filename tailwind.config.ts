import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#2EA3F2",
        "primary-hover": "#82C0C7",
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
        container: "1080px",
      },
    },
  },
  plugins: [],
};

export default config;
