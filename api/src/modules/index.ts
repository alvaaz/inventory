import ItemResolver from './item/resolver'
import CategoryResolver from './brand/resolver'
import BrandResolver from './category/resolver'

export const resolvers = [BrandResolver, CategoryResolver, ItemResolver] as const
