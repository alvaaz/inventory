import { Document, Schema, model } from 'mongoose'
import { Brand } from './brand.interface'

const brandSchema = new Schema({
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

export const BrandModel = model<Brand & Document>('Brand', brandSchema)
