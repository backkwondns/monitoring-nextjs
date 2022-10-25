import cursor from './mongoConnect';

const findOne = async <RequestT, ResponseT>(collection: string, filter: RequestT) => {
  try {
    const client = await cursor;
    return client.collection(collection).findOne<ResponseT>(filter);
  } catch (error: unknown) {
    throw new Error('Error Occurred');
  }
};

export default findOne;
