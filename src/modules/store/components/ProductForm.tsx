'use client'

import React, { useState, ChangeEvent, FormEvent } from 'react'
import * as Yup from 'yup'
import Notification from '@/components/Notification'
import SingleImageUpload from '@/components/SingleImageUpload'
import { stripe } from '@/stripe/stripe-sdk'
import { getIpfsGateway } from '@/utils/getIpfsGetway'

interface ProductFormProps {
  // Add any additional props for the component here
}

export interface ProductFormData {
  name: string
  price: number
  quantity: number
  description: string
  category: string
  imageUri: string
  stripeId: string
}

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  price: Yup.number().required('Price is required'),
  quantity: Yup.number().required('Quantity is required'),
  description: Yup.string(),
  category: Yup.string().required('Category is required'),
  imageUri: Yup.string().required('Image is required'),
  stripeId: Yup.string().required('Stripe Id required'),
})

const ProductForm: React.FC<ProductFormProps> = () => {
  const [formData, setFormData] = useState<ProductFormData>({
    name: '',
    price: 0,
    quantity: 0,
    description: '',
    category: '',
    imageUri: '',
    stripeId: '',
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [errorMessage, setErrorMessage] = useState('')
  const [showNotification, setShowNotification] = useState(false)

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }))
  }

  const handleCloseNotification = () => {
    setShowNotification(false)
    setErrorMessage('')
  }

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()

    try {
      const stripeProduct = await stripe.products.create({
        name: formData.name,
        description: formData.description,
        images: [getIpfsGateway(formData.imageUri)],
        statement_descriptor: 'LucidHaus'
      })
      const storedProduct = {
        ...formData,
        stripeId: stripeProduct.id,
      }
      await validationSchema.validate(storedProduct, { abortEarly: false })

      const response = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(storedProduct),
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

  const slugify = (text: string) => {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '')
  }

  const { name, price, quantity, description, category, imageUri } = formData

  return (
    <form
      onSubmit={handleSubmit}
      className="border mt-12 px-6 pt-8 pb-20 max-w-xl mx-auto flex flex-col space-y-4 max-h-[70vh] overflow-y-scroll text-white"
    >
      <h2 className="text-right mb-8 border-b pb-2">Create Product</h2>
      <div className="flex flex-col space-y-1">
        <label htmlFor="name" className="text-xs font-medium uppercase">
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={name}
          onChange={handleChange}
          className={`p-3 border-b bg-transparent focus:outline-none ${
            errors.name ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {errors.name && <span className="text-red-500 text-sm">{errors.name}</span>}
      </div>

      <div className="flex flex-col space-y-1">
        <label htmlFor="price" className="text-xs font-medium uppercase">
          Price
        </label>
        <input
          type="number"
          id="price"
          name="price"
          value={price}
          onChange={handleChange}
          className={`p-3 border-b bg-transparent focus:outline-none ${
            errors.price ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {errors.price && <span className="text-red-500 text-sm">{errors.price}</span>}
      </div>

      <div className="flex flex-col space-y-1">
        <label htmlFor="quantity" className="text-xs font-medium uppercase">
          Quantity
        </label>
        <input
          type="number"
          id="quantity"
          name="quantity"
          value={quantity}
          onChange={handleChange}
          className={`p-3 border-b bg-transparent focus:outline-none ${
            errors.quantity ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {errors.quantity && (
          <span className="text-red-500 text-sm">{errors.quantity}</span>
        )}
      </div>

      <div className="flex flex-col space-y-1">
        <label htmlFor="description" className="text-xs font-medium uppercase">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          value={description}
          onChange={handleChange}
          className={`p-3 border-b bg-transparent focus:outline-none ${
            errors.description ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {errors.description && (
          <span className="text-red-500 text-sm">{errors.description}</span>
        )}
      </div>

      <div className="flex flex-col space-y-1">
        <label htmlFor="category" className="text-xs font-medium uppercase">
          Category
        </label>
        <input
          type="text"
          id="category"
          name="category"
          value={category}
          onChange={handleChange}
          className={`p-3 border-b bg-transparent focus:outline-none ${
            errors.category ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {errors.category && (
          <span className="text-red-500 text-sm">{errors.category}</span>
        )}
      </div>

      <div className="flex flex-col space-y-1">
        <label htmlFor="slug" className="text-xs font-medium uppercase">
          Slug
        </label>
        <input
          type="text"
          id="slug"
          name="slug"
          value={slugify(name)}
          readOnly
          className={`p-3 border-b bg-transparent focus:outline-none ${
            errors.category ? 'border-red-500' : 'border-gray-300'
          }`}
        />
      </div>
      <SingleImageUpload handleChange={setFormData} name="imageUri" value={imageUri} />
      <button
        type="submit"
        className="p-3 mt-8 bg-gray-50 hover:bg-gray-200 text-xs text-black uppercase font-bold focus:outline-none"
      >
        Create
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
