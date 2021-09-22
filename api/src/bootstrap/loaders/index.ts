import serverLoader from "./server";
import typeormLoader from "./typeorm";
import { GraphQLServer } from "graphql-yoga";

export default async (): Promise<GraphQLServer> => {
  await serverLoader();
  await typeormLoader();
  return serverLoader();
};
