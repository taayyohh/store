'use client'

import { ReactElement } from 'react'
import { loadStripe, StripeElementsOptions } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import config from '@/constants/config'

export function CheckoutForm({ children }: { children: ReactElement }) {
  const stripePromise = loadStripe(config.stripePublic as string)
  const options: StripeElementsOptions = {
    mode: 'payment' as 'payment',
    currency: 'usd',
    amount: 5000,
    appearance: {
      theme: 'night' as 'night',
      labels: 'floating' as 'floating',
    },
  }

  return (
    <Elements stripe={stripePromise} options={options}>
      {children}
    </Elements>
  )
}
