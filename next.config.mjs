/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export keeps the frontend deployable to any static host / CDN.
  // Remove `output` when you later attach a Node runtime or a CMS.
  output: 'export',
  trailingSlash: true,
  images: {
    // Required for `output: 'export'`. All imagery is local, no remote hosts.
    unoptimized: true,
  },
  reactStrictMode: true,
};

export default nextConfig;
