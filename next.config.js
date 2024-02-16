/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: "http",
				hostname: "127.0.0.1",
			},
			{
				protocol: "https",
				hostname: "i.imgur.com",
			},
			{
				protocol: "http",
				hostname: "api.labic.dev.br",
			},
			{
				protocol: "https",
				hostname: "api.labic.dev.br",
			},
		],
	},
}

module.exports = nextConfig
