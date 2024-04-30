/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			colors: {
				'main-blue': '#2463EB',
				success: '#2F7D31',
				error: '#D3302F',
				warning: '#ED6D03',
			},
		},
	},
	plugins: ['@tailwindcss/forms'],
};
