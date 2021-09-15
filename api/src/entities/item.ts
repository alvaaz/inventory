import { Field, ID, ObjectType } from 'type-graphql'
import { getModelForClass, prop } from '@typegoose/typegoose'
import { nanoid } from 'nanoid'
import { ObjectId } from 'mongodb'
import { Category, Brand } from './'

@ObjectType()
export class Item {
  @Field(() => ID)
  readonly _id: ObjectId

  @Field()
  @prop({ required: true })
  name: string

  @Field(() => Brand)
  @prop({ ref: 'Brand' })
  brand: Brand

  @Field()
  @prop({ required: true })
  model: string

  @Field(() => Category)
  @prop({ ref: 'Category' })
  category: Category

  @Field()
  @prop({ default: (): string => nanoid(5) })
  code: string

  @Field(() => String)
  createdAt: string

  @Field(() => String)
  updatedAt: string
}

export const ItemModel = getModelForClass(Item, { schemaOptions: { timestamps: true } })
