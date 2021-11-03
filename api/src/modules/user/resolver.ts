import { Resolver, Arg, Mutation, ObjectType, Field, Ctx, Query } from 'type-graphql'
import { User } from '../../entities'
import { UserInput } from './input'
import argon2 from 'argon2'
import { getConnection } from 'typeorm'
import { MyContext } from 'src/utils'

@ObjectType()
class FieldError {
  @Field()
  field: string

  @Field()
  message: string
}

@ObjectType()
class UserResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[]

  @Field(() => User, { nullable: true })
  user?: User
}

@Resolver()
export default class UserResolver {
  @Query(() => User, { nullable: true })
  async me(@Ctx() { req }: MyContext) {
    // you are not logged in
    if(!req.session.userId) {
      return null
    }
    return User.findOne(req.session.userId);
  }
  @Mutation(() => UserResponse)
  async login(
    @Arg('usernameOrEmail') usernameOrEmail: string,
    @Arg('password') password: string,
    @Ctx() { req }: MyContext
  ): Promise<UserResponse> {
    const user = await User.findOne(
      usernameOrEmail.includes("@")
        ? { where: { email: usernameOrEmail } }
        : { where: { username: usernameOrEmail } }
    );
    if (!user) {
      return {
        errors: [
          {
            field: "usernameOrEmail",
            message: "that username doesn't exist",
          },
        ],
      };
    }
    const valid = await argon2.verify(user.password, password)
    if(!valid) {
      return {
        errors: [
          {
            field: "password",
            message: "incorrect password"
          }
        ]
      }
    }

    req.session.userId = user.id

    return {
      user
    }
  }

  @Mutation(() => UserResponse)
  async register(
    @Arg('options') options: UserInput,
    @Ctx() { req }: MyContext
  ): Promise<UserResponse> {
    if(options.email.length <= 2) {
      return {
        errors: [
          {
            field: "username or email",
            message: "length must be greater than 2"
          }
        ]
      }
    }

    if(options.password.length <= 3) {
      return {
        errors: [
          {
            field: "password",
            message: "length must be greater than 2"
          }
        ]
      }
    }
    const hashedPassword = await argon2.hash(options.password)
    let user;
    try {
      const result = await getConnection()
        .createQueryBuilder()
        .insert()
        .into(User)
        .values({
          username: options.username,
          email: options.email,
          password: hashedPassword
        })
        .returning("*")
        .execute()
      user = result.raw[0];
    } catch (err) {
      // duplicate username error
      if(err.code === '23505') {
        return {
          errors: [
            {
              field: "username",
              message: "username already taken"
            }
          ]
        }
      }
    }

    return {
      user
    }
  }
}
