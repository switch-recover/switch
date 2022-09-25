/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}", "./layouts/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                theme: {
                    DEFAULT: "#B4F2FF",
                    dark: "#9ADBFC",
                    darker: "#0095b3",
                    light: "#CDF6FF",
                    lighter: "#E7FBFF",
                },
            },
        },
    },
    plugins: [],
    safelist: [
        {
            pattern: /bg-theme-(dark|light|lighter)/,
            variants: ["hover", "active"],
        },
        {
            pattern: /bg-gray-(50|200|300)/,
            variants: ["hover", "active"],
        },
    ],
}
