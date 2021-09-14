import { Document, Schema, model } from 'mongoose'
import { Category } from './category.interface'

const categorySchema = new Schema({
  name: {
    type: String,
    required: true
  },
  items: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Item'
    }
  ]
})

export const CategoryModel = model<Category & Document>('Category', categorySchema)
