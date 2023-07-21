import { fetchProducts } from '@/modules/store/utils/fetchProducts'
import ProductList from '@/modules/store/components/ProductList'
import { headers } from 'next/headers'

const Home = async () => {
  const headersList = headers()
  const referer = headersList.get('referer')
  if (!referer) return null

  const productsData = await fetchProducts(1, 10, referer)

  return (
    <div>
      <ProductList initialData={productsData} />
    </div>
  )
}

export default Home
