import { Resolver, Arg, Query, Mutation, FieldResolver, Root } from 'type-graphql'
import { Brand, BrandModel } from '../../entities'
import { BrandInput } from './input'

@Resolver(() => Brand)
export default class BrandResolver {
  @Query(() => [Brand])
  async brands(): Promise<Brand[] | undefined> {
    try {
      const brands = await BrandModel.find()
      return brands.map((brand: Brand) => {
        return {
          _id: brand._id,
          name: brand.name
        }
      })
    } catch (err) {
      throw new Error(`Something goes wrong ${err}`)
    }
  }

  @Mutation(() => Brand)
  async createBrand(@Arg('brandInput') brandInput: BrandInput): Promise<Brand> {
    try {
      const newBrand = new BrandModel({
        name: brandInput.name
      })

      await newBrand.save()

      const { _id, name } = newBrand

      return {
        _id,
        name
      }
    } catch (err) {
      throw new Error(`Something goes wrong ${err}`)
    }
  }
}
