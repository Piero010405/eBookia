// next.config.js
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    // Aquí puedes quitar 'images.amazon.com' si usas el proxy.
    // Solo déjalo si lo sigues necesitando para otras urls de Amazon.
  },
  // --- Paso de la Solución 1: Rewrites ---
  async rewrites() {
    return [
      {
        source: '/api/proxy-image/:path*',
        destination: 'http://images.amazon.com/:path*',
      },
    ];
  },
};

export default nextConfig;