import 'reflect-metadata'
import { buildSchema } from 'type-graphql'
import { connect } from './db'
import { resolvers } from './modules'
import { ObjectIdScalar } from './utils'
import { ObjectId } from 'mongodb'
import { GraphQLServer } from 'graphql-yoga'

async function bootstrap() {
  const schema = await buildSchema({
    resolvers: resolvers,
    scalarsMap: [{ type: ObjectId, scalar: ObjectIdScalar }],
    validate: false,
    nullableByDefault: true,
    emitSchemaFile: {
      path: __dirname + '/schema.gql'
    }
  })
  connect()
  const server = new GraphQLServer({ schema })
  server.start(() => console.log('Server is running on localhost:4000'))
}
bootstrap()
