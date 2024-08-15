/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        colors: {
            main: "#109CF1", //* Màu chủ đạo
            text: "#3A3A49", //* Màu chữ
            hover: "#F2F9FF", //* Màu khi hover
            white: "#fff", //* Trắng
            bgr: "#F5F6F8", //* Background
        },
        extend: {
            fontFamily: {
                sans: ["Manrope", "sans-serif"],
            },
            boxShadow: {
                custom: "rgba(50, 50, 105, 0.15) 0px 2px 5px 0px, rgba(0, 0, 0, 0.05) 0px 1px 1px 0px",
            },
        },
    },
    plugins: [],
};
