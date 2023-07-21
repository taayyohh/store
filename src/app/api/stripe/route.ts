import { stripe } from '@/stripe/stripe-sdk'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const { price } = await req.json()
  const paymentIntent = await stripe.paymentIntents.create({
    amount: price,
    currency: 'usd',
    automatic_payment_methods: {
      enabled: true,
    },
  })
  return NextResponse.json({ ...paymentIntent }, { status: 200 })
}
