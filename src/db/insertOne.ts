import { InsertOneResult } from 'mongodb';
import cursor from './mongoConnect';

const insertOne = async <T>(collection: string, data: T): Promise<InsertOneResult | unknown> => {
  try {
    const client = await cursor;
    return await client.collection(collection).insertOne(data);
  } catch (error: unknown) {
    return error;
  }
};

export default insertOne;
