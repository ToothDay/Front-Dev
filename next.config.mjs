import { createProxyMiddleware } from "http-proxy-middleware";

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "lh3.googleusercontent.com",
      "lh3.googlercontent.com",
      "3.34.135.181"
    ]
  },
  env: {
    IMAGE_PATH: process.env.IMAGE_PATH
  },
  async rewrites() {
    return [
      {
        source: "/:path*",
        destination: "http://3.34.135.181:8000/:path*"
      }
    ];
  },
  async devServer(app) {
    app.use(
      "/",
      createProxyMiddleware({
        target: "http://3.34.135.181:8000",
        changeOrigin: true,
        pathRewrite: {
          "^/": ""
        }
      })
    );
  }
};

export default nextConfig;
