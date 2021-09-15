import { Field, ID, ObjectType } from 'type-graphql'
import { getModelForClass, prop } from '@typegoose/typegoose'
import { Item } from './'
import { ObjectId } from 'mongodb'
import { Schema } from 'mongoose'

@ObjectType()
export class Brand {
  @Field(() => ID)
  readonly _id: ObjectId

  @Field(() => String)
  @prop({ required: true })
  name: string

  @Field(() => [Item])
  @prop({ type: Schema.Types.ObjectId, ref: 'Item' })
  items?: Item[]
}

export const BrandModel = getModelForClass(Brand)
