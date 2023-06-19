import { NextRequest, NextResponse } from 'next/server'
import { LOGIN_COOKIE_NAME } from '@/constants'

export async function POST(_req: NextRequest, res: NextResponse) {
  // Set cookie
  const response = NextResponse.json(
    { message: 'Logged Out Successfully' },
    { status: 201, headers: {} }
  )

  response.cookies.delete(LOGIN_COOKIE_NAME)

  return response
}
