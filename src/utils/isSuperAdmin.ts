import jwt, { JwtPayload } from 'jsonwebtoken'
import { RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies'

const secretKey = process.env.JWT_SECRET || ''
async function isSuperAdmin(cookie?: RequestCookie): Promise<boolean> {
  if (!cookie) {
    // If the cookie is not present, return false
    return false
  }

  let decodedToken: string | JwtPayload
  try {
    decodedToken = jwt.verify(cookie.value, secretKey) // Verify the token
  } catch (err) {
    // If the token is invalid, return false
    return false
  }

  // Make sure decodedToken is an object before accessing the role property
  if (typeof decodedToken === 'object' && 'role' in decodedToken) {
    // If the user has the "superadmin" role, return true, else false
    return decodedToken.role === 'superadmin'
  }

  return false
}

export default isSuperAdmin
