/** @type {import('next').NextConfig} */

const nextConfig = {
      reactStrictMode: true,
      images: {
            remotePatterns: [
                  {
                        protocol: 'https',
                        hostname: 'bertioga-mugs.s3.sa-east-1.amazonaws.com',
                        port: '',
                  },
            ],
      },
};

export default nextConfig;