import React from 'react'
import { ICategory } from '@/models/Category'

interface IProductCardProps {
  name: string
  price: number
  quantity?: number
  description?: string
  category?: ICategory
  fulfillmentStatus?: 'pending' | 'in_progress' | 'completed'
}

const ProductCard: React.FC<IProductCardProps> = ({
  name,
  price,
  description,
  quantity,
  category,
  fulfillmentStatus,
}) => (
  <div className="m-4 transform transition duration-500 ease-in-out hover:scale-105 hover:shadow-lg border border-gray-200 rounded-lg overflow-hidden">
    <div className="p-4">
      <h2 className="font-bold text-xl mb-2">{name}</h2>
      <p className="text-gray-700 text-base">${price}</p>
      {description && <p className="mt-2 text-gray-700">{description}</p>}
      {quantity !== undefined && (
        <p className="mt-2 text-gray-700">Quantity: {quantity}</p>
      )}
      {category && <p className="mt-2 text-gray-700">Category: {category.name}</p>}
      {fulfillmentStatus && (
        <p className="mt-2 text-gray-700">Fulfillment Status: {fulfillmentStatus}</p>
      )}
    </div>
  </div>
)

export default ProductCard
