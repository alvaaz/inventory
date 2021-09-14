import { Item } from '../item/item.interface'
import { ObjectId } from 'mongodb'

export interface Category {
  _id: ObjectId
  name: string
  items?: Array<Item>
}
