import { IProduct } from '@/models/Product'
import ProductList from '@/modules/store/components/ProductList'
import { fetchProducts } from '@/modules/store/utils/fetchProducts'
import config from "@/constants/config";

export interface ProductsResponse {
  products: IProduct[]
}

async function getProducts(): Promise<ProductsResponse> {
  return await fetchProducts(1, 10, config.BASE_URL as string)
}

export default async function Page() {
  const productsData = await getProducts()

  return (
    <div>
      <ProductList initialData={productsData} />
    </div>
  )
}
