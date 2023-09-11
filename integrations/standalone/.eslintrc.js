/** @type {import('eslint').Linter.Config} */
module.exports = {
  extends: ['../../config/base.eslintrc.json'],
  ignorePatterns: ['playwright.config.ts'],
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: 'dev.tsconfig.json'
  }
};
