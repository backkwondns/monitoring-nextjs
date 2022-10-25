import { UpdateResult } from 'mongodb';
import cursor from './mongoConnect';

const insertOne = async <FilterT, DataT>(
  collection: string,
  filter: FilterT,
  data: DataT,
  upsert = false,
): Promise<UpdateResult> => {
  try {
    const client = await cursor;
    return await client.collection(collection).updateOne(filter, { ...data }, { upsert });
  } catch (error: unknown) {
    throw new Error("Error Occurred");
  }
};

export default insertOne;
