import { Response, Request } from "express";
import { Redis } from "ioredis";
import { createBrandLoader } from "./createBrandLoader";
import { createCategoryLoader } from "./createCategoryLoader";

interface SessionData {
  userId: number;
}

export type MyContext = {
  req: Request & { session: { userId: number } };
  res: Response,
  redis: Redis
  brandLoader: ReturnType<typeof createBrandLoader>;
  categoryLoader: ReturnType<typeof createCategoryLoader>;
};
