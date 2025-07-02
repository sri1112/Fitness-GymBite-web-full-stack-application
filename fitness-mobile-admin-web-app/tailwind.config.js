// tailwind.config.js
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx,html}"],
  theme: {
    extend: {
      colors: {
        loginBtn: "rgb(201, 66, 0)", // 👈 no quotes around the rgb value!
      },
      borderRadius: {
        mdx: "8px",
      },
    },
  },
  plugins: [],
};
