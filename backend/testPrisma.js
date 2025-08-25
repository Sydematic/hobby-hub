import 'dotenv/config';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function testConnection() {
  try {
    const result = await prisma.$queryRaw`SELECT 1`;
    console.log('✅ Database works:', result);
  } catch (err) {
    console.error('❌ Database error:', err);
  } finally {
    await prisma.$disconnect();
  }
}

testConnection();
