import { BrandModel } from '../../brand/brand.model'
import { Brand } from '../../brand/brand.interface'

export default {
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
  },
  async createBrand({ brandInput }: { brandInput: Brand }): Promise<Brand> {
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
