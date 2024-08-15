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
        extend: {},
    },
    plugins: [],
};
