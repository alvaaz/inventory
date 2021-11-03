import ItemResolver from './item/resolver'
import CategoryResolver from './brand/resolver'
import BrandResolver from './category/resolver'
import UserResolver from './user/resolver'

export const resolvers = [BrandResolver, CategoryResolver, ItemResolver, UserResolver] as const
