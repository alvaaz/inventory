import { Item } from '../item/item.interface'
import { ObjectId } from 'mongodb'

export interface Brand {
  _id: ObjectId
  name: string
  items?: Array<Item>
}
