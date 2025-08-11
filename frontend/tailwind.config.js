// tailwind.config.js
import defaultTheme from "tailwindcss/defaultTheme";

export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "oklch(0.145 0 0)",            // dark background (matches your CSS var)
        foreground: "oklch(0.985 0 0)",            // light text
        primary: "oklch(0.205 0 0)",                // primary blue-ish
        "primary-foreground": "oklch(0.985 0 0)",  // white text on primary

        card: "oklch(0.97 0.1 30)",                 // light colorful card bg
        "card-foreground": "oklch(0.145 0 0)",     // dark text on card

        border: "oklch(0.922 0 0)",                 // border color
        ring: "oklch(0.708 0 0)",                   // focus ring color

        secondary: "oklch(0.97 0 0)",                // secondary
        "secondary-foreground": "oklch(0.205 0 0)",

        muted: "oklch(0.97 0 0)",
        "muted-foreground": "oklch(0.556 0 0)",

        accent: "oklch(0.97 0 0)",
        "accent-foreground": "oklch(0.205 0 0)",

        destructive: "oklch(0.577 0.245 27.325)",
        "destructive-foreground": "oklch(0.577 0.245 27.325)",
      },
      fontFamily: {
        sans: ["system-ui", ...defaultTheme.fontFamily.sans],
      },
      borderRadius: {
        lg: "0.625rem",  // match your CSS variable --radius
      },
    },
  },
  plugins: [
    require("tw-animate-css/plugin"),
  ],
};
