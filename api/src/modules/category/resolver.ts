import { Category, CategoryModel } from '../../entities'
import { Resolver, Arg, Query, Mutation } from 'type-graphql'
import { ObjectId } from 'mongodb'
import { CategoryInput } from './input'

@Resolver(() => Category)
export default class CategoryResolver {
  @Query(() => [Category])
  async categories(): Promise<Category[] | undefined> {
    try {
      const categories = await CategoryModel.find()
      return categories.map((category: Category) => {
        return {
          _id: category._id,
          name: category.name
        }
      })
    } catch (err) {
      throw new Error(`Something goes wrong ${err}`)
    }
  }

  @Mutation(() => Category)
  async createCategory(@Arg('categoryInput') categoryInput: CategoryInput): Promise<Category> {
    try {
      const newCategory = new CategoryModel({
        name: categoryInput.name
      })

      await newCategory.save()

      const { _id, name } = newCategory

      return {
        _id,
        name
      }
    } catch (err) {
      throw new Error(`Something goes wrong ${err}`)
    }
  }
}
