import { Resolver, Arg, Query, Mutation, Root, FieldResolver } from 'type-graphql'
import { Brand, Item } from '../../entities'

@Resolver(() => Brand)
export default class BrandResolver {
  @FieldResolver(() => Item)
  items(@Root() brand: Brand) {
    return Item.findByIds(brand.itemIds)
  }

  @Query(() => [Brand])
  async brands(): Promise<Brand[] | undefined> {
    try {
      const brands = await Brand.find()
      return brands.map((brand: Brand) => brand)
    } catch (err) {
      throw new Error(`Something goes wrong ${err}`)
    }
  }

  @Mutation(() => Brand)
  async createBrand(@Arg('brandName') brandName: string): Promise<Brand> {
    try {
      const brand = await Brand.create({
        name: brandName
      }).save()

      return brand
    } catch (err) {
      throw new Error(`Something goes wrong ${err}`)
    }
  }
}
