const colors = require('tailwindcss/colors');
module.exports = {
	purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
	darkMode: false, // or 'media' or 'class'
	theme: {
		extend: {
			colors: {
				cyan: colors.cyan,
				teal: colors.teal,
				primary: '#FF6363',
				secondary: {
					100: '#E2E2D5',
					200: '#888883',
				},
				teal_dark: '#17252A',
				teal_custom_darker: '#2B7A78',
				teal_custom: '#3AAFA9',
				teal_gray: '#DEF2F1',
				teal_white: '#FEFFFF',
			},
			screens: {
				lg: '1030px',
			},
			fontFamily: {
				Montserrat: ['Montserrat'],
			},
		},
	},
	variants: {
		extend: {},
	},
	plugins: [require('@tailwindcss/forms')],
};
