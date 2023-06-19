import { Schema, model, Document } from 'mongoose'
import { ICategory } from '@/models/Category'
import mongoose from 'mongoose' // Add this line

// Product model

export interface IProduct extends Document {
  name: string
  price: number
  quantity: number
  description: string
  category: ICategory
  fulfillmentStatus: 'pending' | 'in_progress' | 'completed'
  // Add more fields as needed...
}

const productSchema = new Schema<IProduct>({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, default: 0 },
  description: { type: String },
  category: { type: Schema.Types.ObjectId, ref: 'Category' },
  fulfillmentStatus: {
    type: String,
    enum: ['pending', 'in_progress', 'completed'],
    default: 'pending',
  },
  // Add more fields as needed...
})

// Check if the model is already compiled
const Product = mongoose.models.Product || model<IProduct>('Product', productSchema)

export default Product
