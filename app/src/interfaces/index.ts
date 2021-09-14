export type Brand = {
  _id: string
  name: string
}

export type Category = {
  _id: string
  name: string
}

export type Option = {
  value: string;
  label: string;
}

export type Options = Option[]

export type Item = {
  _id: string
  code: string
  name: string
  model: string
  brand: Brand
  category: Category
  createdAt: string
  updatedAt: string
}

export type Items = Item[]

export type IActions = {
  fieldsChanged: string;
  selectChanged: string;
  changeForm: string;
  submittedForm: string;
  reset: string;
}

export type State = {
  name: string;
  brand: {
    value: string;
    label: string;
  } | null;
  model: string;
  category: {
    value: string;
    label: string;
  } | null;
  code: string;
}
