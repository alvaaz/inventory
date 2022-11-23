import { Resolver, Arg, Mutation, ObjectType, Field, Ctx, Query } from 'type-graphql'
import { User } from '../../entities'
import { UserInput } from './input'
import argon2 from 'argon2'
import { getConnection } from 'typeorm'
import { MyContext } from '../../utils'
import { sendEmail } from '../../utils/sendEmail'
import { v4 } from 'uuid'

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
  @Mutation(() => UserResponse)
  async changePassword(
    @Arg("token") token: string,
    @Arg("newPassword") newPassword: string,
    @Ctx() {redis}: MyContext
  ): Promise<UserResponse> {
     if(newPassword.length <= 2) {
      return {
        errors: [
          {
            field: "newPassword",
            message: "La contraseña debe contener más de 2 caracteres"
          }
        ]
      }
    }
    const key = 'forgotPassword' + token
    const userId = await redis.get(key)
    if(!userId) {
      return {
        errors: [
          {
            field: "token",
            message: "Token invalido"
          }
        ]
      }
    }
    const userIdNum = parseInt(userId);
    const user = await User.findOne(userIdNum)

    if(!user) {
      return {
        errors: [
          {
            field: "token",
            message: "Usuario no existe"
          }
        ]
      }
    }

    await User.update({ id: userIdNum }, { password: await argon2.hash(newPassword) })

    await redis.del(key)

    return { user }
  }

  @Mutation(() => Boolean)
  async forgotPassword(
    @Arg("email") email: string,
    @Ctx() { redis }: MyContext
  ) {
    const user = await User.findOne({ where: { email } });
    if(!user) {
      return true;
    }

    const token = v4();

    await redis.set('forgotPassword' + token, user.id, 'ex', 60 * 60 * 24);

    await sendEmail(email, `<a href="http://localhost:3000/change-password/${token}">Reset Password</a>`)

    return true
  }

  @Query(() => User, { nullable: true })
  async me(@Ctx() { req }: MyContext) {
    // you are not logged in
    console.log(req.session)
    if(!req.session.userId) {
      return null
    }
    return User.findOne(req.session.userId);
  }
  @Mutation(() => UserResponse)
  async login(
    @Arg('options') options: UserInput,
    @Ctx() { req }: MyContext
  ): Promise<UserResponse> {
    const user = await User.findOne({ where: { email: options.email } });
    if (!user) {
      return {
        errors: [
          {
            field: "email",
            message: "that email doesn't exist",
          },
        ],
      };
    }
    const valid = await argon2.verify(user.password, options.password)
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
            field: "email",
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
            message: "La contraseña debe contener más de 2 caracteres"
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
          email: options.email,
          password: hashedPassword
        })
        .returning("*")
        .execute()
      user = result.raw[0];
    } catch (err) {
      if(err.code === "23505") {
        return {
          errors: [
            {
              field: "email",
              message: "Email ya existe. Por favor elige otro."
            }
          ]
        }
      }
    }
    return {
      user
    }
  }

  @Mutation(() => Boolean)
  logout(@Ctx() { req, res }: MyContext) {
    return new Promise((resolve, reject) =>
      req.session.destroy((err) => {
        res.clearCookie(process.env.COOKIE_NAME);
        if (err) {
          console.log(err);
          resolve(false);
          return
        }
        resolve(true);
      })
    );
  }
}
