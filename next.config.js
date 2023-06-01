/** @type {import('next').NextConfig} */
const path = require("path");

module.exports = {
  reactStrictMode: true,
  typescript: {},
  serverRuntimeConfig: {
    PROJECT_ROOT: __dirname,
  },
  distDir: ".next",
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },
  sassOptions: {
    includePaths: [path.join(__dirname, "src/styles")],
    prependData: `@import "./common/_mixins.scss"; @import "./common/_variables.scss";`,
  },
  trailingSlash: false,
  swcMinify: true,
  compiler: {
    reactRemoveProperties: { properties: ["^data-cy$"] },
  },
};
