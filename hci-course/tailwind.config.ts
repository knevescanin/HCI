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
        background: "#F9F9F9",
        textPrimary: "#333333",
        themePrimary: "#1A20AB"
      },
      fontFamily: {
        latoRegular: ['var(--font-lato-regular)'],
        latoBlack: ['var(--font-lato-black)'],
      },
    },
  },
  plugins: [],
};
export default config;
