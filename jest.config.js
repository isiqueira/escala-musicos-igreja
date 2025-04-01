"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    coverageDirectory: './coverage',
    collectCoverageFrom: [
        'src/**/*.ts',
        '!src/**/*.d.ts',
        '!src/server.ts'
    ],
    verbose: true
};
exports.default = config;
