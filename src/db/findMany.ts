import cursor from './mongoConnect';

const findMany = async <RequestT, ResponseT>(
  collection: string,
  filter: RequestT,
  sortDirection?: 1 | -1,
  sort = '',
  limit = 10,
) => {
  try {
    const client = await cursor;
    return client.collection(collection).find<ResponseT>(filter).sort(sort, sortDirection).limit(limit).toArray();
  } catch (error: unknown) {
    throw new Error('Error Occurred');
  }
};

export default findMany;
