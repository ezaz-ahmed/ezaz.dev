/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme")

module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    screens: {
      xs: '360px',
      sm: '640px',
      md: '768px',
      lg: '992px',
      xl: '1200px',
      '2xl': '1400px',
    },
    fontFamily: {
      sans: ['Matter', ...defaultTheme.fontFamily.sans],
    },
    primary: "rgb(var(--color-primary) / <alpha-value>)",
    text: "rgb(var(--color-text) / <alpha-value>)",
    success: "rgb(var(--color-success) / <alpha-value>)",
    info: "rgb(var(--color-info) / <alpha-value>)",
    warn: "rgb(var(--color-warn) / <alpha-value>)",
    error: "rgb(var(--color-error) / <alpha-value>)",
    transparent: "transparent",
    current: "currentColor",

    extend: {
      colors: {
        bglight: "#F9FAFB",
        marrslight: "#1C9A9A",
        marrsgreen: "#007A7A",
        marrsdark: "#004D4D",
        cardlight: "#EFF3F3",

        // bgdark: "#2D2D2D",
        bgdark: "#1D2A35",
        carrilight: "#57DCB4",
        carrigreen: "#05CE91",
        carridark: "#00835B",

        // carddark: "#383838",
        carddark: "#22323F",
        textlight: "#F9FAFB",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
}
