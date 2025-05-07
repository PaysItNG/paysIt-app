import type { NextConfig } from "next";
import nextTranspileModules from "next-transpile-modules";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: [
      "static.vecteezy.com",
      "www.paysit.net",
      "img.freepik.com",
      "res.cloudinary.com",
    ],
  },
};

const withTM = nextTranspileModules(["react-haiku"]);
module.exports = withTM({});

export default nextConfig;
