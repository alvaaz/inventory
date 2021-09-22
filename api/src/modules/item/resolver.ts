import { Item, Brand, Category } from '../../entities'
import { Resolver, Arg, Mutation, Query, FieldResolver, Root, Ctx, Int, ID } from 'type-graphql'
import { ItemInput } from './input'
import { MyContext, timeDifference } from './../../utils'

@Resolver(() => Item)
export default class ItemResolver {
  @FieldResolver(() => Brand)
  brand(@Root() item: Item,
  @Ctx() { brandLoader }: MyContext
  ) {
    return brandLoader.load(item.brandId)
  }
  @FieldResolver(() => Category)
  category(@Root() item: Item,
  @Ctx() { categoryLoader }: MyContext) {
    return categoryLoader.load(item.categoryId)
  }
  @Query(() => Item)
  async item(@Arg('itemId', () => ID) itemId: number) {
    try {
      const item = await Item.findOne(itemId)
      return {
        ...item,
        createdAt: new Date(item.createdAt).toLocaleString('es-CL'),
        updatedAt: timeDifference(new Date(), new Date(item.updatedAt)),
      }
    } catch (err) {
      throw new Error(`Something goes wrong ${err}`)
    }
  }
  @Query(() => [Item])
  async items() {
    try {
      const items = await Item.find()
      return items.map(async (item: Item) => {
        return {
          ...item,
          createdAt: new Date(item.createdAt).toLocaleString('es-CL'),
          updatedAt: timeDifference(new Date(), new Date(item.updatedAt))
        }
      })
    } catch (err) {
      throw new Error(`Something goes wrong ${err}`)
    }
  }

  @Mutation(() => Item)
  async createItem(@Arg("input") input: ItemInput): Promise<Item> {
    try {
      const brand = await Brand.findOne(input.brandId);

      if (!brand) {
        throw new Error("Invalid brand ID");
      }
      const category = await Category.findOne(input.categoryId);

      if (!category) {
        throw new Error("Invalid category ID");
      }

      return Item.create({
        ...input,
        category,
        brand
      }).save()

    } catch (err) {
      throw new Error(`Something goes wrong ${err}`)
    }
  }
  @Mutation(() => Boolean)
  async deleteItem(
    @Arg("id", () => Int) id: number,
  ): Promise<boolean> {
    await Item.delete({ id });
    return true;
  }
}
