const ignorePatterns = [
  '/node_modules/',
  'config.*.ts',
];

module.exports = {
  preset: 'ts-jest/presets/js-with-babel',
  testEnvironment: 'node',
  testPathIgnorePatterns: ignorePatterns,
  coveragePathIgnorePatterns: ignorePatterns,
  coverageThreshold: {
    global: {
      lines: 95,
    },
  },
  setupFilesAfterEnv: ['./tests/setup.ts'],
};
