import express from 'express';
import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';
import AppRouter from './routes/index';

dotenv.config();

const app = express();
const prisma = new PrismaClient();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(AppRouter());

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export { app, prisma };
