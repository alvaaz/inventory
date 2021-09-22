import { createBrandLoader } from '../../utils/createBrandLoader';
import { createCategoryLoader } from '../../utils/createCategoryLoader';
import { buildSchema } from "../../utils";
import { GraphQLServer } from "graphql-yoga";

export default async () => {
  return new GraphQLServer({
    schema: await buildSchema(),
    context: {
      categoryLoader: createCategoryLoader(),
      brandLoader: createBrandLoader()
    }
  })
}
