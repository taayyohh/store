import { Schema, model, Document } from 'mongoose'
import { ICategory } from '@/models/Category'
import mongoose from 'mongoose'
import slugify from 'slugify'

// Product model

export interface IProduct extends Document {
  name: string
  price: number
  quantity: number
  description: string
  category: ICategory
  imageUri: string
  stripeId: string
  slug: string
}

const productSchema = new Schema<IProduct>({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, default: 0 },
  description: { type: String },
  category: { type: String },
  imageUri: { type: String },
  stripeId: { type: String },
  // category: { type: Schema.Types.ObjectId, ref: 'Category' },
  slug: { type: String, unique: true },
})

// Pre-save hook to automatically generate the slug based on the name field
productSchema.pre<IProduct>('save', function (next) {
  if (this.isModified('name')) {
    this.slug = slugify(this.name, { lower: true })
  }
  next()
})

// Check if the model is already compiled
const Product = mongoose.models.Product || model<IProduct>('Product', productSchema)

export default Product
