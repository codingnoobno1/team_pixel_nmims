import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
const options = {};

if (!uri) {
  throw new Error('Please add your Mongo URI to .env.local');
}

let client;
let clientPromise;

client = new MongoClient(uri, options);

// Enhance: Log connection status
clientPromise = client.connect().then((connectedClient) => {
  console.log('✅ MongoDB connected');
  return connectedClient;
}).catch((err) => {
  console.error('❌ MongoDB connection failed:', err);
  throw err; // Important to rethrow so dependent code fails too
});

export default clientPromise;
