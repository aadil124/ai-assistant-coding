import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import postRoutes from './routes/postRoutes.js';
import commentRoutes from './routes/commentRoutes.js';
import { getCategories, getTags } from './controllers/postController.js';
import { errorHandler } from './middlewares/errorMiddleware.js';

// Load environment variables
dotenv.config();

const app = express();

// Set security HTTP headers
app.use(helmet());

// Enable CORS (Cross-Origin Resource Sharing)
app.use(cors());

// Body parser, reading data from body into req.body
app.use(express.json());

// Development logging format
if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('dev'));
}

// Mount routes
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/posts/:postId/comments', commentRoutes);
app.get('/api/categories', getCategories);
app.get('/api/tags', getTags);


// Catch 404 and route to error handler
app.use((req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  error.statusCode = 404;
  next(error);
});

// Centralized error handler middleware
app.use(errorHandler);

export default app;
