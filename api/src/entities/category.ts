import { Field, ObjectType, ID } from 'type-graphql'
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, BaseEntity, RelationId } from "typeorm";
import { Item } from './'

@Entity()
@ObjectType()
export class Category extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number

  @Field()
  @Column({
    length: 100
  })
  name: string

  @Field(() => [Item])
  @OneToMany(() => Item, (item) => item.brand)
  items: Item[]

  @RelationId((category: Category) => category.items)
  @Column("int", { array: true, nullable: true })
  itemIds: number[];
}
