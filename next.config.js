/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: false,
	images: {
		remotePatterns: [
			{
				hostname: "cdn.sanity.io",
			},
		],
	},
};

module.exports = nextConfig;
