import serverLoader from "./server";
import typeormLoader from "./typeorm";

export default async () => {
  await typeormLoader();
  await serverLoader();
};
