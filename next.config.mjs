/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "lh3.googleusercontent.com",
      "lh3.googlercontent.com",
      "3.34.135.181",
      "swyp53.store"
    ]
  },
  env: {
    IMAGE_PATH: process.env.IMAGE_PATH
  }
};

export default nextConfig;
