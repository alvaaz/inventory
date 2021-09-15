import { Field, InputType } from 'type-graphql'

@InputType()
export class BrandInput {
  @Field()
  name: string
}
