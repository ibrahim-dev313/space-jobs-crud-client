/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  daisyui: {
    themes: [
      {
        mytheme: {

          "primary": "#db3ba8",

          "secondary": "#a913c4",

          "accent": "#aadd61",

          "neutral": "#1b252d",

          "base-100": "#ece8ed",

          "info": "#5c8dd1",

          "success": "#3adfc1",

          "warning": "#f0cc19",

          "error": "#e84a7c",
        },
      },
    ],
  },
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
}

