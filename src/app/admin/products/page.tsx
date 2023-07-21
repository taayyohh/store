import { IProduct } from '@/models/Product'
import ProductList from '@/modules/store/components/ProductList'
import { fetchProducts } from '@/modules/store/utils/fetchProducts'

export interface ProductsResponse {
  products: IProduct[]
}

export default async function Page() {
  const productsData = await fetchProducts(1, 10)

  return (
    <div>
      <ProductList initialData={productsData} />
    </div>
  )
}
