import { CategoryModel } from '../../category/category.model'
import { Category } from '../../category/category.interface'

export default {
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
  },
  async createCategory({ categoryInput }: { categoryInput: Category }): Promise<Category> {
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
