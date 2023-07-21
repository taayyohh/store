import ProductPage from '@/modules/store/components/ProductPage'
import { fetchProduct } from '@/modules/store/utils/fetchProduct'
import { fetchStripeProduct } from '@/stripe/utils/fetchStripeProduct'
import { CheckoutForm } from '@/modules/store/components/CheckoutForm'

export default async function Page(context: any) {
  // console.log('c', context)
  const product = await fetchProduct(context.params.name)
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
