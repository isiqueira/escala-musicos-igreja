import { prisma } from '../src/prisma';

beforeAll(async () => {
  await prisma.$connect();
});

afterAll(async () => {
  await prisma.$disconnect();
});

afterEach(async () => {
  // Limpa apenas os dados de teste, não as tabelas
  const models = Object.keys(prisma).filter(
    key => !key.startsWith('_') && !key.startsWith('$')
  );

  for (const model of models) {
    await prisma[model].deleteMany();
  }
});
