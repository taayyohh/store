const productionConfig = {
  mongo: process.env.MONGODB_URI,
  jwtSecret: process.env.JWT_SECRET,
  nftStoragePublic: process.env.NEXT_PUBLIC_NFT_STORAGE_TOKEN,
  stripeSecret: process.env.STRIPE_SECRET,
  stripePublic: process.env.NEXT_PUBLIC_STRIPE_PUBLIC,
  BASE_URL: process.env.NEXT_PUBLIC_BASE_URL
}

const developmentConfig = {
  mongo: process.env.MONGODB_URI_TEST,
  jwtSecret: process.env.JWT_SECRET,
  nftStoragePublic: process.env.NEXT_PUBLIC_NFT_STORAGE_TOKEN,
  stripeSecret: process.env.STRIPE_TEST_SECRET,
  stripePublic: process.env.NEXT_PUBLIC_STRIPE_TEST_PUBLIC,
  BASE_URL: process.env.NEXT_PUBLIC_BASE_URL_TEST
}


const config =
  process.env.NODE_ENV === 'production' ? productionConfig : developmentConfig

export default config
