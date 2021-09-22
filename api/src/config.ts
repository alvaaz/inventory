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
  host: "localhost",
  port: 5432,
  username: "alvarogoederivera",
  password: "",
  database: "alvarogoederivera",
  entities: [Brand, Category, Item, User],
  synchronize: true,
  logging: true
};
