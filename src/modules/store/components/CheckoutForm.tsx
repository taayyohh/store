'use client'

import { ReactElement } from 'react'
import { loadStripe, StripeElementsOptions } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'

export function CheckoutForm({ children }: { children: ReactElement }) {
  const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC as string)

  const options: StripeElementsOptions = {
    mode: 'payment' as 'payment',
    currency: 'usd',
    amount: 0,
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
