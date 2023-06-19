import { IProduct } from '@/models/Product'
import ProductList from '@/modules/store/components/ProductList'
import { BASE_URL } from '@/constants'

export interface ProductsResponse {
  products: IProduct[]
}

async function fetchProducts(page = 1, limit = 10): Promise<ProductsResponse> {
  const response = await fetch(`${BASE_URL}/api/products?page=${page}&limit=${limit}`)
  if (!response.ok) {
    throw new Error('Failed to fetch data')
  }
  return await response.json()
}

export default async function Page() {
  const productsData = await fetchProducts(1, 10)

  return (
    <div>
      <ProductList initialData={productsData} />
    </div>
  )
}
