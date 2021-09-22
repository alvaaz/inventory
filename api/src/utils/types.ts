import { createBrandLoader } from "./createBrandLoader";
import { createCategoryLoader } from "./createCategoryLoader";

export type MyContext = {
  brandLoader: ReturnType<typeof createBrandLoader>;
  categoryLoader: ReturnType<typeof createCategoryLoader>;
};
