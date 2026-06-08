import dotenv from 'dotenv';
import mongoose from 'mongoose';
import app from './app.js';

dotenv.config();

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/telehealth';

import redis from './utils/redis.js';
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
