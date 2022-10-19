import cursor from './mongoConnect';

const createIndex = async (collection: string): Promise<unknown | null> => {
  try {
    const client = await cursor;
    // return await client.collection(collection).createIndex({ data: 1 }, { expireAfterSeconds: 432000 });
    await client.collection(collection).createIndex({ createdAt: 1 }, { expireAfterSeconds: 3600 });
    return null;
  } catch (error: unknown) {
    return error;
  }
};

export default createIndex;
