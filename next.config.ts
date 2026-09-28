import type { NextConfig } from "next";

const config: NextConfig = {
  images: { formats: ["image/avif", "image/webp"] },
  async redirects() {
    return [
      // Same invite as theredactedunit.com/discord. Temporary, so the invite can change without breaking links.
      { source: "/discord", destination: "https://discord.gg/MKtCk4fBXt", permanent: false },
    ];
  },
};

export default config;
