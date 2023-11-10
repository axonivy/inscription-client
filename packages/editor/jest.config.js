/** @type {import('jest').Config} */
module.exports = {
  testEnvironment: 'jsdom',
  testMatch: ['<rootDir>/**/src/**/*.{spec,test}.{ts,tsx}'],
  transform: {
    '^.+\\.(js|jsx|mjs|cjs|ts|tsx)$': '<rootDir>/jest/babelTransform.js',
    '^.+\\.css$': '<rootDir>/jest/emptyTransform.js',
    '^(?!.*\\.(js|jsx|mjs|cjs|ts|tsx|css|json)$)': '<rootDir>/jest/emptyTransform.js'
  },
  transformIgnorePatterns: ['[/\\\\]node_modules[/\\\\].+\\.(js|jsx|mjs|cjs|ts|tsx)$', '^.+\\.module\\.(css|sass|scss)$'],
  setupFilesAfterEnv: ['<rootDir>/src/test-utils/setupTests.tsx'],
  watchPlugins: ['jest-watch-typeahead/filename', 'jest-watch-typeahead/testname'],
  moduleDirectories: ['node_modules', 'test-utils'],
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
  ],
  resolver: '<rootDir>/jest/resolver.js'
};
