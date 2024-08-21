/** @type {import('next').NextConfig} */
const path = require('path');

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
  openAnalyzer: true,
});

const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'openmarket.weniv.co.kr',
        port: '',
        pathname: '/**',
      },
    ],
  },
  typescript: {},
  serverRuntimeConfig: {
    PROJECT_ROOT: __dirname,
  },
  distDir: '.next',
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    }),
      config.resolve.extensions.push('.ts', '.tsx');
    return config;
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'src/styles')],
    prependData: `@import "./common/_variables.scss";`,
  },
  trailingSlash: false,
  swcMinify: true,
  compiler: {
    reactRemoveProperties: { properties: ['^data-cy$'] },
  },
  experimental: {
    optimizePackageImports: [
      'components',
      'containers',
      'actions',
      'hooks',
      'lib',
      'services',
      'store',
      'types',
      'utils',
    ],
  },
};

module.exports = withBundleAnalyzer(nextConfig);
