/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/webshop',
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
