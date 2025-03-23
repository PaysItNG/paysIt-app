import type { Config } from "tailwindcss";
import {heroui} from "@heroui/react"
import tailwindAnimate from 'tailwindcss-animate';

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
      },
    },
  },
  darkMode: "class",
  plugins: [
    tailwindAnimate,
    heroui({
      themes: {
        light: {
          colors: {
            primary: {
              DEFAULT: '#166534',
              foreground: '#fff',
            },
            focus: '#166534',
          },
        },
        // dark: {
        //   colors: {
        //     primary: {
        //       DEFAULT: '#66AAF9',
        //       foreground: '#000',
        //     },
        //     focus: '#66AAF9',
        //   },
        // },
      },
    }),
  ],
} satisfies Config;
