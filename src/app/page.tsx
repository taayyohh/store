import ProductPage from '@/modules/store/components/ProductPage'
import { fetchProduct } from '@/modules/store/utils/fetchProduct'
import { fetchStripeProduct } from '@/stripe/utils/fetchStripeProduct'
import { CheckoutForm } from '@/modules/store/components/CheckoutForm'
import { headers } from 'next/headers'

export default async function Page(context: any) {
  const headersList = headers()
  const referer = headersList.get('referer')
  if (!referer) return null

  const product = await fetchProduct('lucidhaus-garden-session-vi', referer)
  const stripeProduct = await fetchStripeProduct(product.product)

  return (
    <>
      <CheckoutForm>
        <ProductPage
          product={product.product}
          stripeProduct={stripeProduct}
          succeeded={context?.searchParams?.redirect_status === 'succeeded'}
        />
      </CheckoutForm>
    </>
  )
}
