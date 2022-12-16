/** @type {import('jest').Config} */
module.exports = {
  testEnvironment: 'jsdom',
  testMatch: ['<rootDir>/src/**/*.{spec,test}.{ts,tsx}'],
  transform: {
    '^.+\\.(js|jsx|mjs|cjs|ts|tsx)$': '<rootDir>/jest/babelTransform.js',
    '^.+\\.css$': '<rootDir>/jest/emptyTransform.js',
    '^(?!.*\\.(js|jsx|mjs|cjs|ts|tsx|css|json)$)': '<rootDir>/jest/emptyTransform.js'
  },
  transformIgnorePatterns: ['[/\\\\]node_modules[/\\\\].+\\.(js|jsx|mjs|cjs|ts|tsx)$', '^.+\\.module\\.(css|sass|scss)$'],
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
  watchPlugins: ['jest-watch-typeahead/filename', 'jest-watch-typeahead/testname'],
  reporters: [
    'default',
    [
      'jest-junit',
      {
        suiteNameTemplate: '{filepath}',
        classNameTemplate: vars => '[jest] ' + vars.filepath.replaceAll('/', '.').split('.test.')[0],
        titleTemplate: '{classname} > {title}'
      }
    ]
  ]
};
