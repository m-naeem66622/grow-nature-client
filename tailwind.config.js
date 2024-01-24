/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "hero-image":
          "url('https://images.unsplash.com/photo-1493957988430-a5f2e15f39a3')",
      },
      aspectRatio: {
        reel: "9 / 16",
      },
    },
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
  daisyui: {
    themes: [
      {
        garden: {
          ...require("daisyui/src/theming/themes")["garden"],
          primary: "#81C02F",
        },
      },
      "dark",
    ],
  },
};
