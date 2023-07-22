import { IProduct } from '@/models/Product'

export interface ProductResponse {
  product: IProduct
}

export async function fetchProduct(
  slug: string,
  referrer: string | null
): Promise<ProductResponse | undefined> {
  if (!referrer) return

  const response = await fetch(`${referrer}api/products/${slug}`)
  if (!response.ok) {
    throw new Error('Failed to fetch data')
  }
  return await response.json()
}
