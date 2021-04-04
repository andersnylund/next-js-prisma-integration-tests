module.exports = {
  roots: ['<rootDir>'],
  moduleFileExtensions: ['js', 'ts', 'tsx', 'json'],
  testPathIgnorePatterns: [
    '<rootDir>[/\\\\](node_modules|.next|extension)[/\\\\]',
  ],
  transformIgnorePatterns: [
    '[/\\\\](node_modules|extension)[/\\\\].+\\.(ts|tsx)$',
  ],
  transform: {
    '^.+\\.(ts|tsx)$': 'babel-jest',
  },
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100,
    },
  },
  collectCoverageFrom: [
    '**/*.{ts,tsx}',
    '!**/node_modules/**',
    '!extension/**',
  ],
  setupFilesAfterEnv: ['<rootDir>/test/setup.ts'],
};
