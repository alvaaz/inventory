import { Field, ObjectType, ID } from 'type-graphql'
import { nanoid } from 'nanoid'
import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  ManyToOne,
  BaseEntity,
  RelationId
} from "typeorm";
import { Category, Brand } from './'

@ObjectType()
@Entity()
export class Item extends BaseEntity{
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  readonly id: number;

  @Field()
  @Column()
  name: string

  @Field()
  @ManyToOne(() => Brand, (brand) => brand.items)
  brand: Brand

  @RelationId((item: Item) => item.brand)
  @Column()
  brandId: number;

  @Field()
  @Column()
  model: string

  @Field()
  @Column()
  description: string

  @Field()
  @ManyToOne(() => Category, (category) => category.items)
  category: Category

  @RelationId((item: Item) => item.category)
  @Column()
  categoryId: number;

  @Field()
  @Column({ type: "varchar", default: nanoid(5) })
  code: string

  @Field(() => String)
  @CreateDateColumn()
  createdAt: string

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: string
}

