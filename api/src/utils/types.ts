import { Response, Request } from "express";
import { createBrandLoader } from "./createBrandLoader";
import { createCategoryLoader } from "./createCategoryLoader";

interface SessionData {
  userId: number;
}

export type MyContext = {
  req: Request & { session: { userId: number } };
  res: Response,
  brandLoader: ReturnType<typeof createBrandLoader>;
  categoryLoader: ReturnType<typeof createCategoryLoader>;
};
