import { NextRequest, NextResponse } from 'next/server'
import isSuperAdmin from '@/utils/isSuperAdmin'
import { LOGIN_COOKIE_NAME } from '@/constants'

function protect(routeHandler: (req: NextRequest) => Promise<NextResponse>) {
  return async function protectedRouteHandler(req: NextRequest) {
    if (!(await isSuperAdmin(req.cookies.get(LOGIN_COOKIE_NAME)))) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }
    return routeHandler(req)
  }
}

export default protect
