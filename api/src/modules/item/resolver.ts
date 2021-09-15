import { Item, ItemModel, BrandModel, CategoryModel, Brand, Category } from '../../entities'
import { timeDifference } from '../../utils'
import { ObjectId } from 'mongodb'
import { Resolver, Arg, Query, Mutation, FieldResolver, Root } from 'type-graphql'
import { ItemInput } from './input'

@Resolver(() => Item)
export default class ItemResolver {
  @Query(() => Item)
  async item(@Arg('itemId') itemId: ObjectId): Promise<Item | undefined> {
    try {
      const item = await ItemModel.findById(itemId)
      return {
        _id: item._id,
        name: item.name,
        model: item.model,
        brand: item.brand,
        code: item.code,
        createdAt: new Date(item.createdAt).toLocaleString('es-CL'),
        updatedAt: timeDifference(new Date(), new Date(item.updatedAt)),
        category: item.category
      }
    } catch (err) {
      throw new Error(`Something goes wrong ${err}`)
    }
  }
  @Query(() => [Item])
  async items(): Promise<Item[] | undefined> {
    try {
      const items = await ItemModel.find()
      return items.map((item: Item) => {
        return {
          _id: item._id,
          name: item.name,
          brand: item.brand,
          model: item.model,
          category: item.category,
          code: item.code,
          createdAt: new Date(item.createdAt).toLocaleString('es-CL'),
          updatedAt: timeDifference(new Date(), new Date(item.updatedAt))
        }
      })
    } catch (err) {
      throw new Error(`Something goes wrong ${err}`)
    }
  }

  @FieldResolver(() => Brand)
  async brand(@Root('brand') brand: ObjectId): Promise<Brand> {
    const data = await BrandModel.findById(brand)
    return {
      name: data.name,
      _id: data._id
    }
  }

  @FieldResolver(() => Category)
  async category(@Root('category') category: ObjectId): Promise<Category> {
    const data = await CategoryModel.findById(category)
    return {
      name: data.name,
      _id: data._id
    }
  }

  @Mutation(() => Item)
  async createItem(@Arg('itemInput') itemInput: ItemInput): Promise<Item> {
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
