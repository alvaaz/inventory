import { Field, ObjectType, ID } from 'type-graphql'
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, BaseEntity, RelationId } from "typeorm";
import { Item } from './'

@Entity()
@ObjectType()
export class Brand extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  readonly id: number

  @Field()
  @Column({
    length: 100
  })
  name: string

  @Field(() => [Item])
  @OneToMany(() => Item, (item) => item.brand)
  items: Item[]

  @RelationId((brand: Brand) => brand.items)
  @Column("int", { array: true, nullable: true, default: [] })
  itemIds: number[];
}
