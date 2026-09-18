import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The chat route reads data/prompt.md at runtime, so it has to ship with the
  // serverless bundle rather than being left behind as an unreferenced file.
  outputFileTracingIncludes: {
    "/api/ask": ["./data/prompt.md"],
  },

  // PostHog's own domains are on every content blocker's list, so analytics is
  // served from this origin instead. Swap `us` for `eu` on a EU cloud project.
  async rewrites() {
    return [
      // The asset rules have to come before the catch-all.
      {
        source: "/ingest/static/:path*",
        destination: "https://us-assets.i.posthog.com/static/:path*",
      },
      {
        source: "/ingest/array/:path*",
        destination: "https://us-assets.i.posthog.com/array/:path*",
      },
      {
        source: "/ingest/:path*",
        destination: "https://us.i.posthog.com/:path*",
      },
    ];
  },

  // PostHog's API expects trailing slashes to survive the proxy.
  skipTrailingSlashRedirect: true,
};

export default nextConfig;
