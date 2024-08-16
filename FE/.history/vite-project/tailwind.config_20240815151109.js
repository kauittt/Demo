/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        colors: {
            main: "#109CF1", //* Màu chủ đạo
            text: "#3A3A49", //* Màu chữ
            white: "#FFF", //* Trắng
            bgr: "#F5F5F5", //* Background
            border: "#EBEFF2",
            grey: "lightgrey",
            black: "#000",
            red: "#FD4848",
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
