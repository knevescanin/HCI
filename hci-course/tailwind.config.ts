// tailwind.config.js
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
        // Your custom colors are fine here
        background: "#F9F9F9",
        textPrimary: "#333333",
        themePrimary: "#1A20AB"
      },
      fontFamily: {
        // Your custom fonts are fine here
        latoRegular: ['var(--font-lato-regular)'],
        latoBlack: ['var(--font-lato-black)'],
      },
    },
  },
  // Add daisyui to the plugins array
  plugins: [
    require("daisyui") // <-- ADD THIS LINE
  ],

  // Optional: Add DaisyUI specific configuration if needed later
  // daisyui: {
  //   themes: ["light"], // Example: specify themes
  //   base: true, // Use DaisyUI base styles (default)
  //   styled: true, // Use DaisyUI component styles (default)
  //   utils: true, // Use DaisyUI utility classes (default)
  // },
};
export default config;