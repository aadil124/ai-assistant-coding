import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import connectDB from './config/db.js';
import routes from './routes/index.js';
import { errorHandler } from './middleware/error.middleware.js';
import { startScheduler } from './services/scheduler.service.js';

// Load Env variables
dotenv.config();

const app = express();

// Middlewares
app.use(helmet());
app.use(cors({
  origin: '*', // Adjust origins as needed for security
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization', 'x-workspace-id']
}));
app.use(express.json());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Health Check API
app.get('/health', (req, res) => {
  res.status(200).json({ success: true, status: 'API operational' });
});

// API Routes
app.use('/api/v1', routes);

// Global Error Handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

// Connect Database and Start Server
const init = async () => {
  await connectDB();
  
  app.listen(PORT, () => {
    console.log(`CreatorSuite API Server running on port ${PORT} in ${process.env.NODE_ENV} mode.`);
    
    // Start background publishing scheduler
    startScheduler();
  });
};

init();
