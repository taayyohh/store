/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  env: {
    NFT_STORAGE_TOKEN: process.env.NFT_STORAGE_TOKEN,
    MERKLE: process.env.MERKLE,
  },
  images: {
    domains: ['ipfs.io', 'nftstorage.link', 'ipfs.zora.co'],
  },
}

module.exports = nextConfig
