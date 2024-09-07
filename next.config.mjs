/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        BASE_URL: process.env.BASE_URL,
    },
    typescript: {
        ignoreBuildErrors: true
    }
};

export default nextConfig;
