/** @type {import('eslint').Linter.Config} */
module.exports = {
  extends: ['../../config/base.eslintrc.json'],
  ignorePatterns: ['playwright.*.ts'],
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: 'tsconfig.json'
  }
};
