import 'dotenv/config';
import { createApp } from './app.js';
import { connectDatabase } from './config/database.js';
import { validateEnvironment } from './config/env.js';

const { port, allowedOrigins } = validateEnvironment();
await connectDatabase(process.env.MONGODB_URI);

const app = createApp(allowedOrigins);
app.listen(port, () => {
  console.log(`Inquiry API listening on port ${port}`);
});
