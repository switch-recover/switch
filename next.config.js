/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    swcMinify: true,
    images: {
        domains: ["s2.coinmarketcap.com", "www.covalenthq.com", "logos.covalenthq.com"],
    },
}

module.exports = nextConfig
