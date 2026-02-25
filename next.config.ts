import type { NextConfig } from "next";
import { withSentryConfig } from "@sentry/nextjs";

const nextConfig: NextConfig = {
  /* config options here */
};

export default withSentryConfig(nextConfig, {
  // Sentry options
  silent: true, // Suppresses source map upload logs
  org: "get-rich-portfolio-ag",
  project: "translateshop",
});
