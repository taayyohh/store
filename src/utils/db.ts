import mongoose, { ConnectOptions } from 'mongoose'
import { NextRequest, NextResponse } from 'next/server'

const connectDb =
  (handler: (req: NextRequest, res: NextResponse) => Promise<void | NextResponse<any>>) =>
  async (req: NextRequest, res: NextResponse) => {
    if (mongoose.connections[0].readyState) {
      return handler(req, res)
    }
    await mongoose.connect(process.env.MONGODB_URI as string, {} as ConnectOptions)
    return handler(req, res)
  }

export default connectDb
