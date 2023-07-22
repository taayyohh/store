import { stripe } from '@/stripe/stripe-sdk'
import { IProduct } from '@/models/Product'
import Stripe from 'stripe'

export async function fetchStripeProduct(
  product: IProduct
): Promise<Stripe.Response<Stripe.Product>> {
  return await stripe.products.retrieve(product.stripeId)
}
