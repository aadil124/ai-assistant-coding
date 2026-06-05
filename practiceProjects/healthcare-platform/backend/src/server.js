import dotenv from 'dotenv';
import mongoose from 'mongoose';
import app from './app.js';

dotenv.config();

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/telehealth';

// Mock Redis client stub mapping standard commands
class RedisStub {
  constructor() {
    this.store = new Map();
  }
  async get(key) {
    return this.store.get(key) || null;
  }
  async setex(key, seconds, value) {
    this.store.set(key, value);
    // Auto purge simulation
    setTimeout(() => {
      this.store.delete(key);
    }, seconds * 1000);
    return 'OK';
  }
  async del(key) {
    this.store.delete(key);
    return 1;
  }
  async exists(key) {
    return this.store.has(key) ? 1 : 0;
  }
  async quit() {
    return 'OK';
  }
}

const redis = new RedisStub();
export default redis;

// Connect to MongoDB & launch
mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('Successfully connected to MongoDB.');
    app.listen(PORT, () => {
      console.log(`Server is running in production mode on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('MongoDB database connection failure:', err);
    process.exit(1);
  });
