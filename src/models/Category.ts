// Category model
import { Document, model, Schema } from 'mongoose'
import * as mongoose from 'mongoose'

export interface ICategory extends Document {
  name: string
}

const categorySchema = new Schema<ICategory>({
  name: { type: String, required: true },
})

export const Category =
  mongoose.models.Category || model<ICategory>('Category', categorySchema)
