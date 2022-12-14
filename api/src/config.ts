import dotenv from "dotenv";
import { ConnectionOptions } from 'typeorm'
import { Brand, Category, Item, User } from './entities'
dotenv.config();

const env = (name: string): string => {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing: process.env['${name}'].`);
  }

  return value;
};

export const config: ConnectionOptions = {
  type: "postgres",
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  username: process.env.DB_PASSWORD,
  password: process.env.DB_USER,
  database: process.env.DB_NAME,
  entities: [Brand, Category, Item, User],
  synchronize: true,
  logging: true,
  migrations: ["dist/migration/*.js"]
};
