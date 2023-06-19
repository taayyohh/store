export const LOGIN_COOKIE_NAME = 'Login-Cookie'
export const BASE_URL =
  process.env.NODE_ENV === 'production'
    ? 'https://store.lucid.haus'
    : 'http://localhost:3000'
