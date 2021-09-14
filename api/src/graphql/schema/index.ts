import { buildSchema } from 'graphql'

export default buildSchema(`
  type Item {
    _id: ID
    name: String!
    model: String!
    category: Category
    brand: Brand
    code: String!
    createdAt: String
    updatedAt: String
  }
  type Brand {
    _id: ID
    name: String!
    items: [Item]
  }
  type Category {
    _id: ID
    name: String!
    items: [Item]
  }
  input ItemInput {
    name: String!
    model: String!
    category: ID!
    brand: ID!
  }
  input BrandInput {
    name: String!
  }
  input CategoryInput {
    name: String!
  }
  type RootQuery {
    item(itemId: String): Item
    items: [Item]
    brand(brandId: String): Brand
    brands: [Brand]
    category(categoryId: String): Category
    categories: [Category]
  }
  type RootMutation {
    createItem(itemInput: ItemInput): Item
    createBrand(brandInput: BrandInput): Brand
    createCategory(categoryInput: CategoryInput): Item
  }
  schema {
    query: RootQuery
    mutation: RootMutation
  }
`)
