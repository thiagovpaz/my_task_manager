import type { Config } from 'jest';

const config: Config = {
  clearMocks: true,
  collectCoverage: true,
  collectCoverageFrom: undefined,
  coverageReporters: ['text-summary', 'lcov'],
  preset: 'jest-expo',
  testMatch: ['**/*.spec.(ts|tsx)'],
  setupFiles: ['./src/__mocks__/setup.ts'],
};

export default config;
