import { Resolver, Arg, Query, Mutation,FieldResolver, Root } from 'type-graphql'
import { Category, Item} from '../../entities'

@Resolver(() => Category)
export default class CategoryResolver {
  @FieldResolver(() => Item)
  items(@Root() category: Category) {
    return Item.findByIds(category.itemIds)
  }
  @Query(() => [Category])
  async categories(): Promise<Category[] | undefined> {
    try {
      const categories = await Category.find()
      return categories.map((category: Category) => category)
    } catch (err) {
      throw new Error(`Something goes wrong ${err}`)
    }
  }

  @Mutation(() => Category)
  async createCategory(@Arg('categoryName') categoryName: string): Promise<Category> {
    try {
      const category = await Category.create({
        name: categoryName
      }).save()

      return category
    } catch (err) {
      throw new Error(`Something goes wrong ${err}`)
    }
  }
}
