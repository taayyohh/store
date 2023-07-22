import ProductPage from '@/modules/store/components/ProductPage'
import { fetchProduct, ProductResponse } from '@/modules/store/utils/fetchProduct'
import { fetchStripeProduct } from '@/stripe/utils/fetchStripeProduct'
import { CheckoutForm } from '@/modules/store/components/CheckoutForm'
import config from '@/constants/config'

async function getProduct(): Promise<ProductResponse> {
  return await fetchProduct('lucidhaus-garden-session-vi', config.BASE_URL as string)
}

export default async function Page(context: any) {
  const product = await getProduct()
  const stripeProduct = await fetchStripeProduct(product.product)

  return (
    <>
      <CheckoutForm>
        <ProductPage
          product={product?.product}
          stripeProduct={stripeProduct}
          succeeded={context?.searchParams?.redirect_status === 'succeeded'}
          referer={config.BASE_URL as string}
        />
      </CheckoutForm>
    </>
  )
}
