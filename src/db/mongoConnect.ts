import { Db, MongoClient } from 'mongodb';

if (!process.env.MONGODB_URI) {
  throw new Error('Invalid environment variable: "MONGODB_URI"');
}
const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB;
const options = {};

// eslint-disable-next-line no-console
console.log(`connect to ${uri}`);
if (!process.env.MONGODB_URI) {
  throw new Error('Please add your Mongo URI to .env');
}

const cursor = async (): Promise<Db> => {
  const client = new MongoClient(uri, options);
  await client.connect();
  return client.db(dbName);
};

export default cursor();
