import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Load environment variables for testing
dotenv.config();

beforeAll(async () => {
  // Use a dedicated test database
  const testUri = process.env.MONGODB_URI_TEST || 'mongodb://127.0.0.1:27017/blog-platform-test';
  
  try {
    // Connect to MongoDB
    await mongoose.connect(testUri);
  } catch (error) {
    console.error('Error connecting to the test database:', error.message);
  }
});

afterAll(async () => {
  try {
    // Clean database and close connection
    if (mongoose.connection.readyState !== 0) {
      await mongoose.connection.dropDatabase();
      await mongoose.connection.close();
    }
  } catch (error) {
    // Ignore teardown errors
  }
});

beforeEach(async () => {
  // Clear all database collections before each test to ensure isolation
  if (mongoose.connection.readyState !== 0) {
    const collections = mongoose.connection.collections;
    for (const key in collections) {
      await collections[key].deleteMany({});
    }
  }
});
