// hero.ts
import { heroui } from "@heroui/react";
export default heroui({
  themes: {
    light: {
      colors: {
        danger: {
          DEFAULT: "#ef4444",
          foreground: "#fff",
        },
        primary: {
          DEFAULT: "#166534",
          foreground: "#fff",
        },
        focus: "#166534",
      },
    },
    dark: {
      colors: {
        primary: {
          DEFAULT: "#66AAF9",
          foreground: "#000",
        },
        focus: "#66AAF9",
      },
    },
  },
});
