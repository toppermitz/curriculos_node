import { MongoClient } from 'mongodb';
import { logger } from './logger.js';

const uri = process.env.MONGODB_URI ?? 'mongodb://localhost:27017';

function dbNameFromUri(connectionString) {
  try {
    const parsed = new URL(connectionString);
    const path = parsed.pathname.replace(/^\//, '');
    return path || null;
  } catch {
    return null;
  }
}

const dbName = process.env.MONGODB_DB ?? dbNameFromUri(uri) ?? 'curriculodb';

const client = new MongoClient(uri, { serverSelectionTimeoutMS: 5000 });

export async function connect() {
  await client.connect();
  logger.info({ uri: uri.replace(/\/\/[^@]*@/, '//***@'), db: dbName }, 'mongodb connected');
}

export async function close() {
  await client.close();
  logger.info('mongodb disconnected');
}

export function getCollection(name) {
  return client.db(dbName).collection(name);
}
