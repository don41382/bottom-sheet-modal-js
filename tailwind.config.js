/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./example/**/*.{html,js}"],
    theme: {
        extend: {
            colors: {
                'primary': '#4a90e2',
                'primary-dark': '#357ab8',
                'secondary': '#e24a4a',
                'success': '#4ae24a',
                'warning': '#e2e24a',
                'info': '#4ae2e2',
            },
        },
    },
    plugins: [],
}