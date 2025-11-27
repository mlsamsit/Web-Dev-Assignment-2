module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        mono: ["Courier New", "monospace"],
      },
      boxShadow: {
        brutalist: "8px 8px 0px rgba(0, 0, 0, 1)",
      },
      colors: {
        brutalist: {
          yellow: "#FFE500",
          green: "#00FF00",
          purple: "#9D4EDD",
          black: "#000000",
          white: "#FFFFFF",
        },
      },
      borderWidth: {
        brutalist: "3px",
        3: "3px",
      },
      letterSpacing: {
        brutalist: "0.1em",
      },
    },
  },
  plugins: [],
};
