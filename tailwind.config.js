/** @type {import('tailwindcss').Config} */
export const content = [
  "./pages/**/*.{js,ts,jsx,tsx,mdx}",
  "./components/**/*.{js,ts,jsx,tsx,mdx}",
  "./app/**/*.{js,ts,jsx,tsx,mdx}",
]
export const theme = {
  extend: {
    colors: {
      background: "rgb(var(--background))",
      foreground: "rgb(var(--foreground))",
      border: "rgb(var(--border))",
      lilac: "rgb(var(--lilac))",
      "alice-blue": "rgb(var(--alice-blue))",
      "lime-green": "rgb(var(--lime-green))",
      yellow: "rgb(var(--yellow))",
      orange: "rgb(var(--orange))",
      red: "rgb(var(--red))",
      pink: "rgb(var(--pink))",
    },
    fontFamily: {
      "grotesk-casual": ["var(--font-grotesk-casual)"],
      "grotesk-tight": ["var(--font-grotesk-tight)"],
      "grotesk-wide": ["var(--font-grotesk-wide)"],
    },
  },
}
export const plugins = []
