/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  env: {
    APP_VERSION: process.env.APP_VERSION || 'dev',
    BUILD_TIME: process.env.BUILD_TIME || new Date().toISOString(),
    GIT_SHA: process.env.GIT_SHA || 'unknown',
  },
};

module.exports = nextConfig;
