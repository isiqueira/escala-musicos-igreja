"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_mock_1 = require("./prisma-mock");
// Mock global do Prisma
global.prisma = prisma_mock_1.prismaMock;
// Outras configurações globais
beforeEach(() => {
    jest.clearAllMocks();
});
