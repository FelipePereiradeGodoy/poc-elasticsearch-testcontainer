import type { Config } from '@jest/types';

const jestE2eConfig: Config.InitialOptions = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: '../../',
  testMatch: ['<rootDir>/tests/e2e/**/*.spec.ts'],
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  collectCoverageFrom: [
    '<rootDir>/src/**/*.(t|j)s',
    '<rootDir>/tests/e2e/**/*.(t|j)s',
  ],
  coverageDirectory: '<rootDir>/coverage',
  testEnvironment: 'node',
  globalSetup: '<rootDir>/jest.global-setup.ts',
  globalTeardown: '<rootDir>/jest.global-teardown.ts',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.after-env.ts'],
};

export default jestE2eConfig;
