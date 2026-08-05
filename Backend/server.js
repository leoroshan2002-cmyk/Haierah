import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import connectDB from './src/config/db.js';
import authRoutes from './src/routes/authRoutes.js';
import adminRoutes from './src/routes/adminRoutes.js';
import productRoutes from './src/routes/productRoutes.js';
import userRoutes from './src/routes/userRoutes.js';
import orderRoutes from './src/routes/orderRoutes.js';
import paymentRoutes from './src/routes/paymentRoutes.js';
import campaignRoutes from './src/routes/campaignRoutes.js';
import path from 'path';
import { fileURLToPath } from 'url';


const app = express();
const currentFile = fileURLToPath(import.meta.url);
const currentDir = path.dirname(currentFile);

await connectDB();

app.use(cors());
app.use(express.json());

// Handle malformed JSON payloads (body-parser syntax errors)
app.use((err, _req, res, next) => {
  if (err && err.type === 'entity.parse.failed') {
    return res.status(400).json({ message: 'Invalid JSON payload' });
  }
  return next(err);
});

app.use('/uploads', express.static(path.join(currentDir, 'uploads')));

app.get('/', (_req, res) => {
  res.json({ message: 'HAIERAH backend is running' });
});

// routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/payment', paymentRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/campaigns', campaignRoutes);

const DEFAULT_PORT = Number(process.env.PORT || 5000);

const startServer = (port) => {
  const server = app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });

  server.on('error', (error) => {
    if (error.code === 'EADDRINUSE') {
      console.error(`Port ${port} is already in use. Set PORT in .env to a free port or stop the process using that port.`);
    } else {
      console.error(`Failed to start server on port ${port}:`, error.message);
    }
    process.exit(1);
  });
};

startServer(DEFAULT_PORT);