import { IUser } from '@/models/User'
import jwt from 'jsonwebtoken'
import { NextRequest, NextResponse } from 'next/server'

export interface AuthenticatedRequest extends NextRequest {
  user?: IUser
}

const secretKey = process.env.JWT_SECRET || ''

export const verifyToken = (req: AuthenticatedRequest) => {
  const token = req.headers.get('authorization')?.split(' ')[1]

  if (!token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  jwt.verify(token, secretKey, (err, user) => {
    if (err) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    req.user = user as IUser
  })
}
