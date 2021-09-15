import { Field, InputType, ID } from 'type-graphql'
import { ObjectId } from 'mongodb'

@InputType()
export class ItemInput {
  @Field()
  name: string

  @Field()
  model: string

  @Field(() => ID)
  category: ObjectId

  @Field(() => ID)
  brand: ObjectId
}
