import createMDX from "@next/mdx";
import type { NextConfig } from "next";
import { rootPath } from "@/lib/utils";

const nextConfig: NextConfig = {
  /* config options here */
  output: "export",
  trailingSlash: true,
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  images: {
    unoptimized: true,
  },
  assetPrefix: process.env.DEVELOPMENT === "true" ? "/" : rootPath,
};

const withMDX = createMDX({
  // Add markdown plugins here, as desired
  extension: /\.(md|mdx)$/,
});

export default withMDX(nextConfig);
