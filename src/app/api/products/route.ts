import connectDb from '@/utils/db'
import { AuthenticatedRequest, verifyToken } from '@/utils/verifyToken'
import { NextResponse } from 'next/server'
import protect from '@/utils/protect'
import Product from '@/models/Product'

export const POST = connectDb(
  protect(async (req: AuthenticatedRequest) => {
    const { name, price } = await req.json()

    try {
      const product = new Product({ name, price })
      await product.save()
      return NextResponse.json({ error: 'Product created successfully' }, { status: 201 })
    } catch (err) {
      return NextResponse.json({ error: 'Error creating product' }, { status: 500 })
    }
  })
)

export const GET = connectDb(async (req) => {
  const page = parseInt(req.nextUrl.searchParams.get('page') as string) || 1
  const limit = parseInt(req.nextUrl.searchParams.get('limit') as string) || 10
  const skip = (page - 1) * limit

  try {
    const products = await Product.find({}).skip(skip).limit(limit).exec()
    return NextResponse.json({ products }, { status: 200 })
  } catch (err) {
    return NextResponse.json({ error: 'Error fetching products' }, { status: 500 })
  }
})
