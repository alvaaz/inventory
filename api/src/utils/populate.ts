import { ObjectId } from 'mongoose'
import { Brand, BrandModel, Category, CategoryModel } from '../entities'

export const category = async (categoryId: ObjectId): Promise<Category> => {
  try {
    const category = await CategoryModel.findById(categoryId)
    return {
      _id: category._id,
      name: category.name
    }
  } catch (err) {
    throw new Error(`Something goes wrong ${err}`)
  }
}

export const brand = async (brandId: ObjectId): Promise<Brand> => {
  try {
    const brand = await BrandModel.findById(brandId)
    return {
      _id: brand._id,
      name: brand.name
    }
  } catch (err) {
    throw new Error(`Something goes wrong ${err}`)
  }
}
