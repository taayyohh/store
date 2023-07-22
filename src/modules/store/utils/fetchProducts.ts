import { ProductsResponse } from '@/app/admin/products/page'

export async function fetchProducts(
  page = 1,
  limit = 10,
  referrer: string | null
): Promise<ProductsResponse | undefined> {
  if (!referrer) return

  const response = await fetch(`${referrer}api/products?page=${page}&limit=${limit}`)
  if (!response.ok) {
    throw new Error('Failed to fetch data')
  }
  return await response.json()
}
