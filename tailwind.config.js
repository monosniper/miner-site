/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "base-100": "#16191B",
        "base-100-mob": "#15181B",
        "base-200": "#1E1F25",

        "base-content-100": "rgba(223, 219, 221, 1)",

        "purple-1": "rgba(49, 16, 140, 1)",

        "gray-1": "#1E1F25",
        "gray-2": "#DFDBDD",

        "base-border-100": "#444E54",

        warning: "#8A710F",
      },

      backgroundImage: {
        "gradient-100":
          "radial-gradient(95.92% 60.48% at 0% 100%, #5B39B8 0%, rgba(0, 0, 0, 0.00) 100%), radial-gradient(95.92% 60.48% at 100% 100%, #5B39B8 0%, rgba(0, 0, 0, 0.00) 100%)",
        "gradient-200":
          "radial-gradient(186.4% 100% at 50% 100%, rgba(91, 57, 184, 0.20) 0%, rgba(0, 0, 0, 0.00) 100%)",
        "gradient-300":
          "linear-gradient(90deg, rgba(54, 28, 124, 0.20) 0%, rgba(89, 39, 221, 0.20) 100%)",

        "gradient-400":
          "radial-gradient(80.2% 87.63% at -7.8% 107.42%, #5B39B8 0%, rgba(0, 0, 0, 0.00) 100%), radial-gradient(62.64% 55.93% at 108% 82.47%, #5B39B8 0%, rgba(0, 0, 0, 0.00) 100%)",
      },

      fontFamily: {
        inter: "Inter, sans-serif",
      },
    },
  },
  plugins: [],
};
