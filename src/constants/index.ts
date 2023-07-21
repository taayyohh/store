export const LOGIN_COOKIE_NAME = 'Login-Cookie'
export const BASE_URL =
  process.env.NODE_ENV === 'production'
    ? 'garden.lucid.haus'
    : 'http://localhost:3000'
export const STRIPE_BASE_URL = 'https://api.stripe.com'
