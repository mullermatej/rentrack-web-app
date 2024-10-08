/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			fontFamily: {
				nunito: ['Nunito', 'sans-serif'],
			},
			colors: {
				'main-blue': '#2463EB',
				'main-yellow': '#FFD460',
				'dark-blue': '#2D4059',
				'light-red': '#EA5455',
				success: '#2F7D31',
				error: '#D3302F',
				warning: '#ED6D03',
				purplish: '#22085E',
			},
		},
	},
	plugins: ['@tailwindcss/forms'],
};
