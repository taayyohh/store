'use client'

import React, { useEffect, useState } from 'react'
import { IProduct } from '@/models/Product'
import Pagination from './Pagination'
import { ProductsResponse } from '@/app/admin/products/page'
import { BASE_URL } from '@/constants'
import ProductCard from '@/modules/store/components/ProductCard'

interface ProductsListProps {
  initialData: ProductsResponse
}

const ProductsList: React.FC<ProductsListProps> = ({ initialData }) => {
  const [products, setProducts] = useState<IProduct[]>(initialData.products)
  const [currentPage, setCurrentPage] = useState(1)
  const perPage = 10

  useEffect(() => {
    if (currentPage === 1) return

    const fetchProducts = async () => {
      try {
        const response = await fetch(
          `${BASE_URL}/api/products?page=${currentPage}&limit=${perPage}`
        )
        const data = await response.json()
        if (response.ok) {
          setProducts(data.products)
        } else {
          throw new Error(data.error)
        }
      } catch (error) {
        console.error('Error fetching products:', error)
      }
    }

    fetchProducts()
  }, [currentPage])

  return (
    <div>
      <div className="text-2xl mb-4">Products</div>
      <div className="flex flex-col">
        {products.map((product: IProduct) => (
          <ProductCard key={product._id} name={product.name} price={product.price} />
        ))}
      </div>

      <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} />
    </div>
  )
}

export default ProductsList
