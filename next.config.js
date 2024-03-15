/** @type {import('next').NextConfig} */
const runtimeCaching = require('next-pwa/cache');

const nextDataIndex = runtimeCaching.findIndex(
  (entry) => entry.options.cacheName === 'next-data'
);

if (nextDataIndex !== -1) {
  runtimeCaching[nextDataIndex].handler = 'NetworkFirst';
} else {
  throw new Error('Failed to find next-data object in runtime caching');
}

const withPWA = require('next-pwa')({
  dest: 'public',
  runtimeCaching,
  register: true,
  skipWaiting: true,
  // disable: process.env.NODE_ENV === 'development'
});

const nextConfig = {
  reactStrictMode: true
};

module.exports = withPWA(nextConfig);
