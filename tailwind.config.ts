// tailwind.config.js
const withMT = require("@material-tailwind/react/utils/withMT"); // Use /html/utils/withMT for plain HTML/Vue

module.exports = withMT({
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
});
