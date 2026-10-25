import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
<<<<<<< HEAD
=======
  reactCompiler: true,
>>>>>>> dev
  images: {
    remotePatterns: [
      {
        protocol: 'https',
<<<<<<< HEAD
        hostname: 'ftp.goit.study',
      },
=======
        hostname: 'example.com',
      },
      {
        protocol: 'https',
        hostname: 'ftp.goit.study',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '5000',
      },
>>>>>>> dev
    ],
  },
};

export default nextConfig;
