import cursor from './mongoConnect';

const findOne = async <RequestT, ResponseT>(collection: string, filter: RequestT) => {
  try {
    const client = await cursor;
    return client.collection(collection).findOne<ResponseT>(filter);
  } catch (error: any) {
    throw new Error(error);
  }
};

export default findOne;
