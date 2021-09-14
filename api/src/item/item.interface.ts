import { ObjectId } from 'mongodb'
import { Category } from '../category/category.interface'
import { Brand } from '../brand/brand.interface'

export interface Item {
  _id: ObjectId
  name: string
  model: string
  brand: Brand
  category: Category
  code: string
  createdAt: string
  updatedAt: string
}
