import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "static.vecteezy.com" },
      { protocol: "https", hostname: "www.paysit.net" },
      { protocol: "https", hostname: "img.freepik.com" },
      { protocol: "https", hostname: "res.cloudinary.com" },
    ],
  },
  typescript: {
    // !! WARN !!
    // Disabling type checking might lead to production bugs
    ignoreBuildErrors: true,
  },
  basePath: "",
  // For Next.js 13+, use transpilePackages instead of next-transpile-modules
  transpilePackages: [
    "tfjs-image-recognition-base",
    "node-fetch",
    "face-api.js",
    "@tensorflow/tfjs-core",
    "react-haiku",
  ],
  webpack: (config, { isServer }) => {
    // Provide browser-compatible empty modules for Node.js specific imports
    // config.module.rules.push({
    //   test: /\.svg$/,
    //   use: ["@svgr/webpack", "style-loader", "css-loader"],
    // });
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        encoding: false,
        path: false,
        os: false,
        crypto: false,
      };
    }

    return config;
  },
};

export default nextConfig;
