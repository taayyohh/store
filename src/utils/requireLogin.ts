import { NextRequest, NextResponse } from 'next/server'
import isLoggedIn from './isLoggedIn'

function requireLogin(routeHandler: (req: NextRequest) => Promise<NextResponse>) {
  return async function protectedRouteHandler(req: NextRequest) {
    if (!(await isLoggedIn(req))) {
      return NextResponse.redirect('/login') // redirect to login page
    }
    return routeHandler(req)
  }
}

export default requireLogin
