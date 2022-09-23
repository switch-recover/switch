/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                theme: {
                    DEFAULT: "#B4F2FF",
                    dark: "#9ADBFC",
                },
            },
        },
    },
    plugins: [],
}
