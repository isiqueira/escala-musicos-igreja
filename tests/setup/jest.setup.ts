import { prismaMock } from './prisma-mock';

// Mock global do Prisma
global.prisma = prismaMock;

// Outras configurações globais
beforeEach(() => {
  jest.clearAllMocks();
});
