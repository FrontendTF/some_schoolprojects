/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/*.html", "./footer_links/*.html"],
  theme: {
    colors: {
      white: "#FFFFFF",
      bg_white: "#F4F4F4",
      black: "#000000",
      yellow: "#FBF315",
      gray: "#53565A",
      green: "#528217",
      er_red: "rgb(231, 52, 63)",
      er_blue: "rgb(0, 117, 191)",
      er_violet: "rgb(108, 71, 150)",
      red: "rgb(138, 17, 28)", 
      blue: "rgb(32, 80, 149)",
      orange: "#78473b", 
      black_70: "rgba(0, 0, 0, 0.8)",
      lightgray: "rgb(211,211,211)",
    },
    container: {
      center: true,
    },

    extend: {
      backgroundImage: {
        "hero-image": "url('/assets/stock_images/shutterstock_605013488.jpg')",
      },
      listStyleType: {
        disc: "disc",
      },
      screens: {
        xs: "360px",
      },
    },
  },
  plugins: [],
};
