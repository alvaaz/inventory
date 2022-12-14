import DataLoader from 'dataloader'
import { Brand } from '../entities'

export const createBrandLoader = () =>
  new DataLoader<number, Brand>(async (brandIds) => {
    const brands = await Brand.findByIds(brandIds as number[])
    const brandIdToBrand: Record<number, Brand> = {}
    brands.forEach((brand) => {
      brandIdToBrand[brand.id] = brand
    })
    const sortedBrands = brandIds.map((brandId) => brandIdToBrand[brandId])

    return sortedBrands
  })
