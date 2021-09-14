
import { gql } from '@apollo/client';

export const BRANDS = gql`
  query {
    brands {
      _id
      name
    }
  }
`;

export const CATEGORIES = gql`
  query {
    categories {
      _id
      name
    }
  }
`;

export const ITEMS = gql`
  query {
    items{
      _id
      code
      name
      category {
        _id
        name
      }
      brand {
        _id
        name
      }
      updatedAt
      createdAt
    }
  }
`;

export const CREATE_ITEM = gql`
  mutation CreateItem($name: String!, $category: ID!, $brand: ID!, $model: String!){
    createItem(itemInput: {
      name: $name
      model: $model
      brand: $brand
      category: $category
    }){
      _id
      code
    }
  }
`

export const CREATE_BRAND = gql`
  mutation CreateBrand($name: String!){
    createBrand(brandInput: {
      name: $name
    }) {
      _id
      name
    }
  }
`

export const CREATE_CATEGORY = gql`
  mutation CreateCategory($name: String!){
    createCategory(categoryInput: {
      name: $name
    }) {
      _id
      name
    }
  }
`
export const ITEM = gql`
  query Item($id: String!){
    item(itemId: $id) {
      _id
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
