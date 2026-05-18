import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // ─── PERFORMANCE: Turbopack & Build ─────────────────────────────
  
  // Development mode - WSL2 optimization
  onDemandEntries: {
    maxInactiveAge: 60 * 60 * 1000, // Keep pages for 1 hour
    pagesBufferLength: 5, // Compile 5 pages ahead
  },

  // ─── IMAGE OPTIMIZATION ─────────────────────────────────────────────
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60 * 60 * 24 * 365, // 1 year cache for images
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },

  // ─── RESPONSE COMPRESSION ───────────────────────────────────────────
  compress: true,

  // ─── SECURITY: React Strict Mode ────────────────────────────────────
  reactStrictMode: true,

  // ─── TURBOPACK: Enable for production builds ────────────────────────
  // Turbopack is enabled by default in Next.js 16
  // Note: webpack customizations are not compatible with Turbopack
  // turbopack: {},

  // ─── SECURITY: Hide X-Powered-By Header ─────────────────────────────
  poweredByHeader: false,

  // ─── PRODUCTION: Disable Source Maps for Security ───────────────────
  // Uncomment for production deployment to reduce bundle size and hide source code
  // productionBrowserSourceMaps: false,
};

export default nextConfig;
