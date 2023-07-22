import { IProduct } from '@/models/Product'
import ProductList from '@/modules/store/components/ProductList'
import { fetchProducts } from '@/modules/store/utils/fetchProducts'
import { headers } from 'next/headers'

export interface ProductsResponse {
  products: IProduct[]
}

export default async function Page() {
  const headersList = headers()
  const referer = headersList.get('referer')
  const productsData = await fetchProducts(1, 10, referer)

  return (
    <div>
      <ProductList initialData={productsData} />
    </div>
  )
}
