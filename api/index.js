import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import authRoutes from '../server/routes/auth.js';
import financeRoutes from '../server/routes/finance.js';
import transactionRoutes from '../server/routes/transactions.js';
import { sequelize } from '../server/models/index.js';
import { seedDatabase } from '../server/models/seed.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/finance', financeRoutes);
app.use('/api/transactions', transactionRoutes);
app.use('/auth', authRoutes);
app.use('/finance', financeRoutes);
app.use('/transactions', transactionRoutes);

app.get('/api', (req, res) => {
  res.json({ message: 'Finance API is running' });
});

app.get('/', (req, res) => {
  res.json({ message: 'Finance API is running' });
});

export default async function handler(req, res) {
  if (!globalThis.__dbInitialized) {
    try {
      await sequelize.authenticate();
      await sequelize.sync({ alter: true });
      await seedDatabase();
      globalThis.__dbInitialized = true;
    } catch (error) {
      console.error('Database initialization failed:', error);
    }
  }

  return app(req, res);
}
