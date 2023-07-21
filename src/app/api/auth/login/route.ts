import User, { IUser } from '@/models/User'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import connectDb from '@/utils/db'
import { NextRequest, NextResponse } from 'next/server'
import { LOGIN_COOKIE_NAME } from '@/constants'

const secretKey = process.env.JWT_SECRET || ''

const generateToken = (user: IUser) => {
  return jwt.sign({ username: user.username, role: user.role }, secretKey, {
    expiresIn: '1h', // Set an expiration time for the token
  })
}

export const POST = connectDb(async (req: NextRequest) => {
  const { username, password } = await req.json()

  try {
    const user = await User.findOne({ username })
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 401 })
    }

    const passwordMatch = await bcrypt.compare(password, user.password)
    if (!passwordMatch) {
      return NextResponse.json({ error: 'incorrect password' }, { status: 401 })
    }

    // Set cookie
    const token = generateToken(user)
    const response = NextResponse.json(
      { message: 'Logged In' },
      { status: 201, headers: {} }
    )

    response.cookies.set(LOGIN_COOKIE_NAME, token, {
      httpOnly: false,
      // sameSite: 'lax', // Set a suitable SameSite attribute value
      secure: process.env.NODE_ENV === 'production', // Set secure flag for production environment
      path: '/', // Set the cookie path as per your application needs
      // maxAge: 60 * 60, // Set the maximum age of the cookie in seconds (1 hour in this case)
    })

    return response
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Error logging in' }, { status: 500 })
  }
})
