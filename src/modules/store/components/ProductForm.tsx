'use client'

import React, { useState, ChangeEvent, FormEvent } from 'react'
import * as Yup from 'yup'
import Notification from '@/components/Notification'

interface ProductFormProps {
  // Add any additional props for the component here
}

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  price: Yup.number().required('Price is required'),
  // Add more validation rules as needed...
})

const ProductForm: React.FC<ProductFormProps> = () => {
  const [name, setName] = useState('')
  const [price, setPrice] = useState(0)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [errorMessage, setErrorMessage] = useState('')
  const [showNotification, setShowNotification] = useState(false)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    if (name === 'name') {
      setName(value)
    } else if (name === 'price') {
      setPrice(Number(value))
    }
  }

  const handleCloseNotification = () => {
    setShowNotification(false)
    setErrorMessage('')
  }

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()

    try {
      await validationSchema.validate({ name, price }, { abortEarly: false })

      const response = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, price }),
      })

      const data = await response.json()

      if (!response.ok) {
        setErrorMessage(data.error)
        setShowNotification(true)
      } else {
        console.log('Product created successfully:', data)
      }
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const validationErrors: Record<string, string> = {}

        error.inner.forEach((err) => {
          if (err.path) {
            validationErrors[err.path] = err.message
          }
        })

        setErrors(validationErrors)
      } else {
        console.error(error)
      }
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto flex flex-col space-y-4">
      <div className="flex flex-col space-y-1">
        <label htmlFor="name" className="text-sm font-medium">
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={name}
          onChange={handleChange}
          className={`p-3 border rounded focus:outline-none text-black ${
            errors.name ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {errors.name && <span className="text-red-500 text-sm">{errors.name}</span>}
      </div>

      <div className="flex flex-col space-y-1">
        <label htmlFor="price" className="text-sm font-medium">
          Price
        </label>
        <input
          type="number"
          id="price"
          name="price"
          value={price}
          onChange={handleChange}
          className={`p-3 border rounded focus:outline-none text-black ${
            errors.price ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {errors.price && <span className="text-red-500 text-sm">{errors.price}</span>}
      </div>

      <button
        type="submit"
        className="p-3 bg-gray-800 hover:bg-gray-900 text-white rounded focus:outline-none"
      >
        Create Product
      </button>

      <Notification
        message={errorMessage}
        isVisible={showNotification}
        onClose={handleCloseNotification}
      />
    </form>
  )
}

export default ProductForm
