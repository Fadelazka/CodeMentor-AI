/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  images: {
    remotePatterns: [
      // Tetap izinkan semua domain (opsional, bisa dihapus jika ingin lebih ketat)
      { protocol: "https", hostname: "**" },
      // Tambahkan domain khusus untuk Vercel Blob
      { protocol: "https", hostname: "*.public.blob.vercel-storage.com" }
    ]
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  experimental: {
    serverActions: { bodySizeLimit: "4mb" },
  },
};
module.exports = nextConfig;