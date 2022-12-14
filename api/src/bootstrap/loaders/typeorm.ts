import { createConnection, Connection } from "typeorm";
import { config } from "../../config";

export default async (): Promise<Connection> => {
  try {
    return createConnection(config);
  } catch (error) {
    console.log('MongoDB connection error. Please make sure MongoDB is running. ' + error)
  }
}
