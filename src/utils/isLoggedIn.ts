import jwt from 'jsonwebtoken'
import { RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies'
import { LOGIN_COOKIE_NAME } from '@/constants'

export async function isLoggedIn(cookie: RequestCookie): Promise<boolean> {
  if (cookie.name === LOGIN_COOKIE_NAME) {
    try {
      jwt.verify(cookie.value, process.env.JWT_SECRET || '')
      return true
    } catch (err) {
      return false
    }
  }
  return false
}
