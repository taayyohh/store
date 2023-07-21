import { IProduct } from '@/models/Product'

export interface ProductResponse {
  product: IProduct
}

export async function fetchProduct(
  slug: string,
  referrer: string
): Promise<ProductResponse> {
  const response = await fetch(`${referrer}api/products/${slug}`)
  if (!response.ok) {
    throw new Error('Failed to fetch data')
  }
  return await response.json()
}
