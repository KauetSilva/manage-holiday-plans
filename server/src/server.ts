import 'dotenv/config';
import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import routes from './routes/index';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(PORT, async () => {
  try {
    await prisma.$connect();
    console.log('Database connection established successfully! ✅');
  } catch (error: any) {
    console.error('Error during Database connection: ❌ ', error);
    if (error?.code === '28P01') {
      console.error(
        'Authentication failed. Please check your database credentials.',
      );
    } else {
      console.error(
        'Unexpected error occurred. Details:',
        error.message || error,
      );
    }

    if (error.code === 'ECONNREFUSED') {
      console.error(
        'Unable to connect to the database. Ensure that the database server is running.',
      );
    }

    process.exit(1);
  }
  console.log(`Server is running on port ${PORT}`);
});

// Adicione este trecho para fechar a conexão com o Prisma quando a aplicação é encerrada.
process.on('SIGINT', async () => {
  await prisma.$disconnect();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  await prisma.$disconnect();
  process.exit(0);
});
