import DataLoader from 'dataloader'
import { Category } from '../entities'

export const createCategoryLoader = () =>
  new DataLoader<number, Category>(async (categoryIds) => {
    const categories = await Category.findByIds(categoryIds as number[])
    const categoryIdToCategory: Record<number, Category> = {}
    categories.forEach((category) => {
      categoryIdToCategory[category.id] = category
    })
    const sortedBrands = categoryIds.map((categoryId) => categoryIdToCategory[categoryId])

    return sortedBrands
  })
