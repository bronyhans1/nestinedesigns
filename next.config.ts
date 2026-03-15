import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  serverExternalPackages: ['pdfkit', 'fontkit'],
};

export default nextConfig;
