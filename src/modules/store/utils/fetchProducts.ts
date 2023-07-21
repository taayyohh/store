import { ProductsResponse } from '@/app/admin/products/page'

export async function fetchProducts(
  page = 1,
  limit = 10,
  referrer: string
): Promise<ProductsResponse> {
  const response = await fetch(`${referrer}api/products?page=${page}&limit=${limit}`)
  if (!response.ok) {
    throw new Error('Failed to fetch data')
  }
  return await response.json()
}
