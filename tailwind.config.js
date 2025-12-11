/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{ts,tsx}",
    "node_modules/flowbite-react/lib/esm/**/*.js",
    "node_modules/flowbite/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          text: "#3B3024",
          cream: "#FAF4E7",
          gold: "#CBB279",
          green: "#97BE5A",
          teal: "#063942",
          lime: "#D1F96D",
        },
      },

      keyframes: {
        "border-flow": {
          "0%": { backgroundPosition: "0% 50%" },
          "100%": { backgroundPosition: "200% 50%" },
        },
      },
      animation: {
        "border-flow": "border-flow 12s linear infinite",
      },
    },
  },

  plugins: [require("flowbite/plugin")],
};
