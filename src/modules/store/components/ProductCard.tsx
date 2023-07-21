import React from 'react'
import { ICategory } from '@/models/Category'
import Link from 'next/link'

interface IProductCardProps {
  name: string
  price: number
  slug: string
  quantity?: number
  description?: string
  category?: ICategory
  fulfillmentStatus?: 'pending' | 'in_progress' | 'completed'
}

const ProductCard: React.FC<IProductCardProps> = ({
  name,
  price,
  slug,
  description,
  quantity,
}) => (
  <Link href={`/products/${slug}`}>
    <div className="m-4 border-gray-200 overflow-hidden border">
      <div className="px-6 py-8">
        <h2 className="font-bold text-xl mb-2">{name}</h2>
        <p className="text-gray-700 text-base">${price}</p>
        {description && <p className="mt-2 text-gray-700">{description}</p>}
        {quantity !== undefined && <p className="mt-2">Quantity: {quantity}</p>}
      </div>
    </div>
  </Link>
)

export default ProductCard
