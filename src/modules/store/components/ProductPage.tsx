'use client'

import { IProduct } from '@/models/Product'
import Image from 'next/image'
import { getIpfsGateway } from '@/utils/getIpfsGetway'
import { PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js'
import Stripe from 'stripe'
import { ChangeEvent, FormEvent, useState } from 'react'
import * as Yup from 'yup'
import { motion } from 'framer-motion'

const ProductPage = ({
  product,
  succeeded,
  referer,
}: {
  product: IProduct | undefined
  stripeProduct?: Stripe.Product | undefined
  succeeded: boolean
  referer: string
}) => {
  const stripe = useStripe()
  const elements = useElements()
  const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined)

  const validationSchema = Yup.object().shape({
    // Existing validation rules ...
    donationAmount: Yup.number()
      .integer('Please enter a whole number :)')
      .min(1, 'Please enter a donation amount :)')
      .required('Please enter a donation amount :)'),
  })

  const [donationAmount, setDonationAmount] = useState<number>(0)
  const [donationError, setDonationError] = useState<string>('')
  const handleChangeDonation = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setDonationAmount(parseFloat(value))
  }
  const [showForm, setShowForm] = useState(false)

  if (!stripe || !elements) return null

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()

    // Trigger form validation and wallet collection
    const { error: submitError } = await elements.submit()
    if (submitError) {
      // Show error to your customer
      setErrorMessage(submitError.message)
      return
    }

    // Validate the donation amount using Yup
    try {
      await validationSchema.validate({ donationAmount }, { abortEarly: false })
      setDonationError('')
    } catch (validationError) {
      if (validationError instanceof Yup.ValidationError) {
        const errorMessages: Record<string, string> = {}
        validationError.inner.forEach((err) => {
          if (err.path === 'donationAmount') {
            errorMessages[err.path] = err.message
          }
        })
        setDonationError(errorMessages.donationAmount || '')
      } else {
        console.error(validationError)
      }
      return
    }

    const stripePayment = await fetch('/api/stripe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ price: Math.round(donationAmount * 100) }),
    })
    const paymentIntent: Stripe.PaymentIntent = await stripePayment.json()

    const { error } = await stripe.confirmPayment({
      //`Elements` instance that was used to create the Payment Element
      elements,
      clientSecret: paymentIntent.client_secret as string,
      confirmParams: {
        return_url: referer,
      },
    })

    if (error) {
      // This point will only be reached if there is an immediate error when
      // confirming the payment. Show error to your customer (for example, payment
      // details incomplete)
      setErrorMessage(error.message)
    } else {
      // Your customer will be redirected to your `return_url`. For some payment
      // methods like iDEAL, your customer will be redirected to an intermediate
      // site first to authorize the payment, then redirected to the `return_url`.
    }
  }

  return (
    <div className={'flex flex-col text-white w-full sm:w-[1280px] mx-auto items-center'}>
      <div className="text-3xl sm:text-4xl font-bold mb-6 sm:mb-12 text-center">
        {product?.name}
      </div>

      <div
        className={
          'flex flex-col sm:flex-row mx-auto w-full sm:w-[800px] gap-12 justify-center items-center'
        }
      >
        <div className={'flex flex-col'}>
          <div
            className={'flex rounded-3xl overflow-hidden h-[500px] w:full sm:w-[400px]'}
          >
            <Image
              src={getIpfsGateway(product?.imageUri || '')}
              alt={`image for ${product?.name}`}
              width={400}
              height={500}
              style={{ objectFit: 'contain' }}
            />
          </div>
        </div>
        <div className={'flex flex-col'}>
          <div>{product?.description}</div>
        </div>
      </div>

      {(!succeeded && (
        <>
          <div className={'mt-12'}>
            ♥️ This event is free and donations are highly encouraged ♥️
          </div>
          <motion.button
            onClick={() => setShowForm((flag) => !flag)}
            initial={{ height: '6rem' }}
            animate={{ height: !showForm ? '6rem' : 0, overflow: 'hidden' }}
            transition={{ duration: 0.2 }}
            className={`${
              showForm ? 'mb-0 h-0' : 'h-24 mb-12'
            } text-3xl w-full border mt-8 rounded-xl hover:bg-white hover:text-black transition-colors max-w-[600px]`}
          >
            Donate {'<3'}
          </motion.button>

          <motion.div
            initial={{ height: 0 }}
            animate={{ height: showForm ? 'auto' : 0 }}
            transition={{ duration: 0.2 }}
          >
            {showForm && (
              <form
                onSubmit={handleSubmit}
                className={
                  'pt-8 mt-8 border-t w-full sm:w-[600px] mb-12 border p-4 sm:p-12'
                }
              >
                <div className="flex flex-col space-y-1 pb-4">
                  <label
                    htmlFor="donationAmount"
                    className="text-xs font-medium uppercase"
                  >
                    Donation Amount (USD)
                  </label>
                  <input
                    type="number"
                    id="donationAmount"
                    name="donationAmount"
                    value={donationAmount}
                    onChange={handleChangeDonation}
                    className={`p-3 border-b bg-transparent focus:outline-none text-5xl appearance-none ${
                      donationError ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder={'$'}
                  />
                  {donationError && (
                    <span className="text-red-500 text-sm">{donationError}</span>
                  )}
                </div>

                <PaymentElement />
                <button
                  type="submit"
                  disabled={!stripe || !elements}
                  className={
                    'h-12 w-full border mt-8 rounded-xl hover:bg-white hover:text-black transition-colors'
                  }
                >
                  Submit Payment
                </button>
              </form>
            )}
          </motion.div>
        </>
      )) || (
        <div className={'p-40 max-w-3xl text-center'}>
          <h2 className={'text-4xl'}>Thank you for donating!</h2> Be sure to follow{' '}
          <a href={'https://www.instagram.com/bkgreengardner/?hl=en'} target={'_blank'}>
            @bkgreengardener
          </a>{' '}
          who stewards the Good Life Garden and continues to hold down the community!
        </div>
      )}
    </div>
  )
}

export default ProductPage
