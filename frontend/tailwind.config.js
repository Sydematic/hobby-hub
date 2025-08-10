// tailwind.config.js
import defaultTheme from "tailwindcss/defaultTheme";

export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "#242424",         // dark gray background
        foreground: "#ffffff",         // white text
        primary: "#646cff",            // your blue primary
        "primary-foreground": "#ffffff", // white text on primary
        // Add others as needed
      },
      fontFamily: {
        sans: ["system-ui", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [
    require("tw-animate-css/plugin"),
  ],
};
