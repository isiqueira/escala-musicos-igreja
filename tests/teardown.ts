import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function cleanTables() {
  const tables = [
    'schedule', 
    'recurringSchedule',
    'musician',
    'church'
  ];

  for (const table of tables) {
    try {
      await prisma.$executeRawUnsafe(
        `TRUNCATE TABLE "${table}" CASCADE;`
      );
    } catch (error) {
      console.error(`Error truncating ${table}:`, error);
    }
  }
}

module.exports = async () => {
  if (process.env.NODE_ENV !== 'test') {
    throw new Error('Teardown só pode ser executado em ambiente de teste');
  }

  await cleanTables();
  await prisma.$disconnect();
};