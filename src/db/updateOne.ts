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
    const res = await client.collection(collection).updateOne(filter, { ...data }, { upsert });
    return res;
  } catch (error: any) {
    throw new Error(error);
  }
};

export default insertOne;
