import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  experimental: {
    ppr: true,
    clientSegmentCache: true,
    nodeMiddleware: true,
  },
  serverExternalPackages: ['knex', 'pg', 'pg-query-stream'],
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // הגדרות עבור client-side bundling - התעלמות מדריברים שלא נחוצים
      config.resolve = config.resolve || {};
      config.resolve.fallback = {
        ...config.resolve.fallback,
        'better-sqlite3': false,
        'mysql': false,
        'mysql2': false,
        'oracledb': false,
        'pg-native': false,
        'sqlite3': false,
        'tedious': false,
        'pg-query-stream': false,
      };
    }
    return config;
  },
};

export default nextConfig;