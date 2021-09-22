import { Field, InputType, ID } from 'type-graphql'

@InputType()
export class ItemInput {
  @Field()
  name: string

  @Field()
  model: string

  @Field(() => ID)
  categoryId: number

  @Field(() => ID)
  brandId: number
}
