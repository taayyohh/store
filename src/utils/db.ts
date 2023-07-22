import mongoose, { ConnectOptions } from 'mongoose'
import { NextRequest, NextResponse } from 'next/server'
import config from '@/constants/config'

const connectDb =
  (handler: (req: NextRequest, res: NextResponse) => Promise<void | NextResponse<any>>) =>
  async (req: NextRequest, res: NextResponse) => {
    if (mongoose.connections[0].readyState) {
      return handler(req, res)
    }
    await mongoose.connect(config.mongo as string, {} as ConnectOptions)
    return handler(req, res)
  }

export default connectDb
