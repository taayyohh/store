import { BASE_URL } from '@/constants'
import { ProductsResponse } from '@/app/admin/products/page'

export async function fetchProducts(page = 1, limit = 10): Promise<ProductsResponse> {
  const response = await fetch(`${BASE_URL}/api/products?page=${page}&limit=${limit}`)
  if (!response.ok) {
    throw new Error('Failed to fetch data')
  }
  return await response.json()
}
