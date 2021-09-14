import { Document, Schema, model } from 'mongoose'
import { Item } from './item.interface'
import { nanoid } from 'nanoid'

const itemSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    brand: {
      type: Schema.Types.ObjectId,
      ref: 'Brand'
    },
    model: {
      type: String,
      required: true
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: 'Category'
    },
    code: {
      type: String,
      default: (): string => nanoid(5)
    }
  },
  {
    timestamps: true
  }
)

export const ItemModel = model<Item & Document>('Item', itemSchema)
