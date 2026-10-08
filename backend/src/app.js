import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import adminRoutes from './routes/adminRoutes.js';
import contactRoutes from './routes/contactRoutes.js';
import siteContentRoutes from './routes/siteContentRoutes.js';
import { errorHandler, notFound } from './middleware/errorMiddleware.js';

export function createApp(allowedOrigins) {
  const app = express();

  app.use(helmet());
  app.use(cors({
    credentials: true,
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) return callback(null, true);
      return callback(new Error('Origin is not allowed by CORS.'));
    },
  }));
  app.use(express.json({ limit: '16kb' }));
  app.use('/api/content', siteContentRoutes);
  app.use('/api/inquiries', contactRoutes);
  app.use('/api/admin', adminRoutes);
  app.use(notFound);
  app.use(errorHandler);

  return app;
}
