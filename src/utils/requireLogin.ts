import { NextRequest, NextResponse } from 'next/server'
import { isLoggedIn } from './isLoggedIn'
import { LOGIN_COOKIE_NAME } from '@/constants'

function requireLogin(routeHandler: (req: NextRequest) => Promise<NextResponse>) {
  return async function protectedRouteHandler(req: NextRequest) {
    if (!(await isLoggedIn(req.cookies.get(LOGIN_COOKIE_NAME)!))) {
      return NextResponse.redirect('/login') // redirect to login page
    }
    return routeHandler(req)
  }
}

export default requireLogin
