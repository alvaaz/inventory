import { ItemModel } from '../../item/item.model'
import { Item } from '../../item/item.interface'
import { CategoryModel } from '../../category/category.model'
import { Category } from '../../category/category.interface'
import { BrandModel } from '../../brand/brand.model'
import { Brand } from '../../brand/brand.interface'
import { timeDifference } from '../../utils'
import { ObjectId } from 'mongodb'

const category = async (categoryId: Category): Promise<Category> => {
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

const brand = async (brandId: Brand): Promise<Brand> => {
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

export default {
  async item({ itemId }: { itemId: ObjectId }): Promise<Item | undefined> {
    try {
      const item = await ItemModel.findById(itemId)
      return {
        _id: item._id,
        name: item.name,
        brand: brand.bind(this, item.brand),
        model: item.model,
        category: category.bind(this, item.category),
        code: item.code,
        createdAt: new Date(item.createdAt).toLocaleString('es-CL'),
        updatedAt: timeDifference(new Date(), new Date(item.updatedAt))
      }
    } catch (err) {
      throw new Error(`Something goes wrong ${err}`)
    }
  },
  async items(): Promise<Item[] | undefined> {
    try {
      const items = await ItemModel.find()
      return items.map((item: Item) => {
        return {
          _id: item._id,
          name: item.name,
          brand: brand.bind(this, item.brand),
          model: item.model,
          category: category.bind(this, item.category),
          code: item.code,
          createdAt: new Date(item.createdAt).toLocaleString('es-CL'),
          updatedAt: timeDifference(new Date(), new Date(item.updatedAt))
        }
      })
    } catch (err) {
      throw new Error(`Something goes wrong ${err}`)
    }
  },
  async createItem({ itemInput }: { itemInput: Item }): Promise<Item> {
    try {
      const newItem = new ItemModel({
        name: itemInput.name,
        brand: itemInput.brand,
        model: itemInput.model,
        category: itemInput.category
      })

      await newItem.save()

      await BrandModel.updateOne(
        {
          _id: newItem.brand
        },
        { $addToSet: { items: newItem } }
      )

      await CategoryModel.updateOne(
        {
          _id: newItem.category
        },
        { $addToSet: { items: newItem } }
      )

      const { _id, name, brand, model, category, code, createdAt, updatedAt } = newItem

      return {
        _id,
        name,
        brand,
        category,
        model,
        code,
        createdAt,
        updatedAt
      }
    } catch (err) {
      throw new Error(`Something goes wrong ${err}`)
    }
  }
}
