import { buildSchema as typeGraphqlBuildSchema } from "type-graphql";
import { resolvers } from "../modules";

export const buildSchema = () =>
  typeGraphqlBuildSchema({
    resolvers: resolvers,
    validate: false,
    nullableByDefault: true,
    emitSchemaFile: {
      path: __dirname + '/../schema.gql'
    }
  });
