import loaders from "./loaders";

export default async () => {
  const server = await loaders();

  server.start(() =>
    console.log(
      `🚀 Server ready at http://localhost:4000`
    )
  );
};
