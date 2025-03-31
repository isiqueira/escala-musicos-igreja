module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    roots: ['<rootDir>/tests'],       // Pasta onde estão os testes
    moduleNameMapper: {
      '^@/(.*)$': '<rootDir>/src/$1' // Aliases para imports (se usados)
    },
    setupFilesAfterEnv: ['<rootDir>/tests/setup/jest.setup.ts'], // Arquivo de setup global
    collectCoverage: true,            // Gerar relatório de cobertura
    coverageDirectory: 'coverage',     // Pasta de saída do relatório
    testMatch: [
      '**/*.test.ts',                 // Padrão de arquivos de teste
    ]
};
