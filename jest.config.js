export default {
  testEnvironment: 'jest-environment-node',
  transform: {},
  testMatch: ['**/__tests__/**/*.js?(x)', '**/?(*.)+(spec|test).js?(x)'],
  testPathIgnorePatterns: ['\\\\node_modules\\\\'],
  moduleDirectories: ['node_modules', 'src'],
};
