
import { gql } from '@apollo/client';

export const BRANDS = gql`
  query {
    brands {
      id
      name
    }
  }
`;

export const CATEGORIES = gql`
  query {
    categories {
      id
      name
    }
  }
`;

export const ITEMS = gql`
  query {
    items{
      id
      code
      name
      category {
        id
        name
      }
      brand {
        id
        name
      }
      updatedAt
      createdAt
    }
  }
`;

export const CREATE_ITEM = gql`
  mutation CreateItem($name: String!, $category: ID!, $brand: ID!, $model: String!){
    createItem(input: {
      name: $name
      model: $model
      brandId: $brand
      categoryId: $category
    }){
      id
      code
    }
  }
`

export const CREATE_BRAND = gql`
  mutation CreateBrand($name: String!){
    createBrand(brandName: $name) {
      id
      name
    }
  }
`

export const CREATE_CATEGORY = gql`
  mutation CreateCategory($name: String!){
    createCategory(categoryName: $name) {
      id
      name
    }
  }
`
export const ITEM = gql`
  query Item($id: ID!){
    item(itemId: $id) {
      id
      name
      code
      model
      category {
        name
      }
      brand {
        name
      }
      code
      createdAt
      updatedAt
    }
  }
`

export const DELETE_ITEM = gql`
  mutation DeleteItem($id: ID!){
    deleteItem(id: $id)
  }
`
