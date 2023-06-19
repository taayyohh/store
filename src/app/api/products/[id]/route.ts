import connectDb from '@/utils/db'
import { AuthenticatedRequest } from '@/utils/verifyToken'
import Product from '@/models/Product'
import { NextResponse } from 'next/server'
import protect from '@/utils/protect'

export const GET = connectDb(async (req: AuthenticatedRequest) => {
  const productId = req.nextUrl.searchParams.get('id')

  try {
    const product = await Product.findById(productId)
    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 })
    }
    return NextResponse.json({ product }, { status: 200 })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Error fetching product' }, { status: 500 })
  }
})

export const PUT = connectDb(
  protect(async (req: AuthenticatedRequest) => {
    const productId = req.nextUrl.searchParams.get('id')
    const { name, price } = await req.json()

    try {
      const product = await Product.findByIdAndUpdate(
        productId,
        { name, price },
        { new: true }
      )

      if (!product) {
        return NextResponse.json({ error: 'Product not found' }, { status: 404 })
      }

      return NextResponse.json({ product }, { status: 200 })
    } catch (err) {
      return NextResponse.json({ error: 'Error updating product' }, { status: 500 })
    }
  })
)

export const DELETE = connectDb(
  protect(async (req: AuthenticatedRequest) => {
    const productId = req.nextUrl.searchParams.get('id')

    try {
      const product = await Product.findByIdAndDelete(productId)

      if (!product) {
        return NextResponse.json({ error: 'Product not found' }, { status: 404 })
      }

      return NextResponse.json(
        { message: 'Product deleted successfully' },
        { status: 200 }
      )
    } catch (err) {
      return NextResponse.json({ error: 'Error deleting product' }, { status: 500 })
    }
  })
)
