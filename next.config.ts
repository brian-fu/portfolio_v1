import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The chat route reads data/prompt.md at runtime, so it has to ship with the
  // serverless bundle rather than being left behind as an unreferenced file.
  outputFileTracingIncludes: {
    "/api/ask": ["./data/prompt.md"],
  },
};

export default nextConfig;
