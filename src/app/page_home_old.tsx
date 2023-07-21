import { fetchProducts } from '@/modules/store/utils/fetchProducts'
import ProductList from '@/modules/store/components/ProductList'

const Home = async () => {
  const productsData = await fetchProducts(1, 10)

  return (
    <div>
      <ProductList initialData={productsData} />
    </div>
  )
}

export default Home
