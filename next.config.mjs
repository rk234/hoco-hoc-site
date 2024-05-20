/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "export",
    images: {
        unoptimized: true
    },
    experimental: { missingSuspenseWithCSRBailout: false }
};

export default nextConfig;
