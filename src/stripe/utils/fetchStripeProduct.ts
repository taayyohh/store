import { stripe } from '@/stripe/stripe-sdk'
import { IProduct } from '@/models/Product'
import Stripe from 'stripe'

export async function fetchStripeProduct(
  product: IProduct | undefined
): Promise<Stripe.Response<Stripe.Product> | undefined> {
  if (!product) return
  return await stripe.products.retrieve(product.stripeId)
}
