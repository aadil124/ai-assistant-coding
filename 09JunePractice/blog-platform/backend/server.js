import app from './app.js';
import connectDB from './config/db.js';

const PORT = process.env.PORT || 5000;

// Initialize database connection and listen on the configured port
const startServer = async () => {
  // Connect to MongoDB
  await connectDB();

  // Start listening
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT} in ${process.env.NODE_ENV || 'development'} mode`);
  });
};

startServer().catch((error) => {
  console.error(`Fatal error during server startup: ${error.message}`);
  process.exit(1);
});
