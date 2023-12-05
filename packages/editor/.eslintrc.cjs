/** @type {import('eslint').Linter.Config} */
module.exports = {
  extends: ['../../config/base.eslintrc.json'],
  ignorePatterns: ['vitest.config.*ts'],
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: 'tsconfig.json'
  },
  plugins: ['@tanstack/query', 'testing-library']
};
