/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    images: {
        domains: ["s2.coinmarketcap.com", "www.covalenthq.com", "logos.covalenthq.com"],
    },
    async redirects() {
        return [
            {
                source: "/welcome",
                destination: "/",
                permanent: true,
            },
        ]
    },
}

module.exports = nextConfig
