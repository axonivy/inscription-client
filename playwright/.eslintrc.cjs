/** @type {import('eslint').Linter.Config} */
module.exports = {
  extends: ['../config/base.eslintrc.json'],
  ignorePatterns: ['**/{node_modules,lib}', 'playwright.*.ts'],
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: 'tsconfig.json'
  }
};
