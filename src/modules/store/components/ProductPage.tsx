'use client'

import { IProduct } from '@/models/Product'
import Image from 'next/image'
import { getIpfsGateway } from '@/utils/getIpfsGetway'
import { PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js'
import Stripe from 'stripe'
import React, { ChangeEvent, FormEvent, useCallback, useState } from 'react'
import * as Yup from 'yup'
import { useModal } from '@/hooks/useModal'
import { Modal } from '@/components/Modal'

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

  const { isOpen, closeModal, openModal } = useModal()

  const [formEvent, setFormEvent] = useState<FormEvent | null>(null)
  const handleAttempt = useCallback(
    (event: FormEvent) => {
      setFormEvent(event)
      openModal()
    },
    [openModal]
  )

  if (!stripe || !elements) return null

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()

    return

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

      <div className={'mt-12'}>
        ♥️ This event is free and donations are highly encouraged ♥️
      </div>
      {(!succeeded && (
        <form
          onSubmit={handleAttempt}
          className={'pt-8 mt-8 border-t w-full sm:w-[600px] mb-12 border p-4 sm:p-12'}
        >
          <div className="flex flex-col space-y-1 pb-4">
            <label htmlFor="donationAmount" className="text-xs font-medium uppercase">
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
            Donate
          </button>
        </form>
      )) || (
        <div className={'p-40 max-w-3xl text-center'}>
          <h2 className={'text-4xl'}>Thank you for donating!</h2> Be sure to follow{' '}
          <a href={'https://www.instagram.com/bkgreengardner/?hl=en'} target={'_blank'}>
            @bkgreengardener
          </a>{' '}
          who stewards the Good Life Garden and continues to hold down the community!
        </div>
      )}
      <Modal isOpen={isOpen} closeModal={closeModal}>
        <h2 className="text-2xl font-bold mb-4">Thank you for donating!</h2>
        <p className="text-base">
          100% of the proceeds will go the the artists sharing their crafts with us {'<3'}
        </p>
        <button
          type="button"
          disabled={!stripe || !elements}
          className={
            'h-12 w-full border mt-8 rounded-xl hover:bg-white hover:text-black transition-colors'
          }
          onClick={() => handleSubmit(formEvent as FormEvent)}
        >
          Confirm Donation
        </button>

        <button onClick={closeModal} className="mt-4 p-2 text-white underline">
          No thanks
        </button>
      </Modal>
    </div>
  )
}

export default ProductPage
