const runtimeCaching = require('next-pwa/cache');

const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  runtimeCaching,
  disable: process.env.NODE_ENV !== 'production',
  workboxOptions: {
    disableDevLogs: true
  }
});

const nextConfig = {
  reactStrictMode: true
};

module.exports = withPWA(nextConfig);
