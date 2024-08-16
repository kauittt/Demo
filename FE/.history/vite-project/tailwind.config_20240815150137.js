/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        colors: {
            main: "#f5f5f5", //* Màu chủ đạo
            text: "#109CF1", //* Màu chữ
            hover: "#F2F9FF", //* Màu khi hover
            white: "#fff", //* Trắng
            bgr: "#F5F6F8", //* Background
            grey: "lightgrey",
            black: "black",
            red: "red",
        },
        extend: {
            fontFamily: {
                sans: ["Work Sans", "sans-serif"],
            },
            boxShadow: {
                custom: "rgba(50, 50, 105, 0.15) 0px 2px 5px 0px, rgba(0, 0, 0, 0.05) 0px 1px 1px 0px",
            },
        },
    },
    plugins: [],
};
