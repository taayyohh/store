import User from '@/models/User'
import bcrypt from 'bcrypt'
import connectDb from '@/utils/db'
import { NextRequest, NextResponse } from 'next/server'

export const POST = connectDb(async (req: NextRequest) => {
  const { username, password } = await req.json()

  try {
    const existingUser = await User.findOne({ username })
    if (existingUser) {
      return NextResponse.json({ error: 'User already exists' }, { status: 500 })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    let role = 'user' // Default role for subsequent signups
    const isFirstSignup = (await User.countDocuments()) === 0
    if (isFirstSignup) {
      role = 'superadmin' // Super admin role for the first signup
    }

    const user = new User({ username, password: hashedPassword, role })
    await user.save()

    return NextResponse.json({ error: 'User created successfully' }, { status: 201 })
  } catch (err) {
    return NextResponse.json({ error: 'Error creating user' }, { status: 500 })
  }
})
