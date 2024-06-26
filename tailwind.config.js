/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./app/**/*.{js,ts,jsx,tsx}",
		"./pages/**/*.{js,ts,jsx,tsx}",
		"./components/**/*.{js,ts,jsx,tsx}",

		// Or if using `src` directory:
		"./src/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {
			colors: {
				primary: "#F5F5F5",
				secondary: "#f2c88c",
			},
			placeholderColor: {
				blue: "#0000ff",
				white: "#ffffff",
			},
			screens: {
				xs: "450px",
				md: "950px",
				smallMenu: "1050px",
				mdLg: "1250px",
			},
			fontFamily: {
				indieFlower: ["'Indie Flower'", "cursive"],
				amaticSC: ["'Amatic SC'", "cursive"],
			},
			backgroundImage: {
				"cart-background":
					"url('/public/assets/otherPhotos/pots_background.jpeg')",
			},
		},
	},
	variants: {
		extend: {
			placeholderColor: ["responsive", "dark", "focus", "hover", "active"],
		},
	},
	plugins: [require("@tailwindcss/forms"), require("tailwind-scrollbar")],
};
