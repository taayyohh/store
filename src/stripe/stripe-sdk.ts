import Stripe from 'stripe'
import config from '@/constants/config'
const stripe = new Stripe(config.stripeSecret as string, {
  apiVersion: '2022-11-15',
})
export { stripe }
