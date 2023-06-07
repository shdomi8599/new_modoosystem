/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  experimental: {
    forceSwcTransforms: true, //실험적 기능 체험해보는 중,
  },
};

module.exports = nextConfig;
